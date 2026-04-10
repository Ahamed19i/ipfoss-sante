
import { useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, updateDoc, increment, getDoc, setDoc } from 'firebase/firestore';

export default function VisitTracker() {
  useEffect(() => {
    const trackVisit = async () => {
      // Check if we already tracked this session to avoid double counting on refresh
      const sessionTracked = sessionStorage.getItem('site_visited');
      if (sessionTracked) return;

      const statsRef = doc(db, 'stats', 'site');
      
      try {
        const statsDoc = await getDoc(statsRef);
        
        if (statsDoc.exists()) {
          await updateDoc(statsRef, {
            visits: increment(1)
          });
        } else {
          // Initialize if it doesn't exist (only works if rules allow or if done by admin first)
          // Since rules only allow update for non-admins, we might need to initialize it.
          // But usually the first admin visit will trigger this if we allow create.
          // For now, let's assume it might need initialization.
          await setDoc(statsRef, { visits: 1 }, { merge: true });
        }
        
        sessionStorage.setItem('site_visited', 'true');
      } catch (error) {
        // Silent fail for tracking errors
        console.error("Visit tracking error:", error);
      }
    };

    trackVisit();
  }, []);

  return null;
}
