

import { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, isAdmin: false, isSuperAdmin: false });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          // 1. Try to fetch by UID (Standard way)
          let userDoc = await getDoc(doc(db, 'users', user.uid));
          let userData = userDoc.data();

          // 2. If not found by UID, check if there's an invited document by email
          if (!userData && user.email) {
            const sanitizedEmail = user.email.replace(/[^a-zA-Z0-9]/g, '_');
            const invitedDoc = await getDoc(doc(db, 'users', sanitizedEmail));
            
            if (invitedDoc.exists()) {
              const invitedData = invitedDoc.data();
              // Migrate the document to use UID as ID
              await setDoc(doc(db, 'users', user.uid), {
                ...invitedData,
                uid: user.uid, // Store UID for reference
                lastLogin: new Date()
              });
              // Delete the old email-based document
              await deleteDoc(doc(db, 'users', sanitizedEmail));
              
              userData = invitedData;
            }
          }
          
          setIsAdmin(userData?.role === 'admin' || userData?.role === 'super_admin');
          setIsSuperAdmin(userData?.role === 'super_admin');
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
          setIsSuperAdmin(false);
        }
      } else {
        setIsAdmin(false);
        setIsSuperAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, isSuperAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
