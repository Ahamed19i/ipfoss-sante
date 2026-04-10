
import { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
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
        // Check if user is admin in Firestore or by email
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();
          const isDefaultAdmin = user.email === 'hassanimhoma2019@gmail.com';
          // Consistency with Firestore rules: check email and verification if it's the default admin
          const isAdminByEmail = isDefaultAdmin && (user.emailVerified || user.providerData.some(p => p.providerId === 'google.com'));
          
          setIsAdmin(userData?.role === 'admin' || userData?.role === 'super_admin' || isAdminByEmail);
          setIsSuperAdmin(userData?.role === 'super_admin' || isAdminByEmail);
        } catch (error) {
          console.error("Error checking admin status:", error);
          // Fallback to email check if Firestore fails
          const isDefaultAdmin = user.email === 'hassanimhoma2019@gmail.com';
          setIsAdmin(isDefaultAdmin);
          setIsSuperAdmin(isDefaultAdmin);
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
