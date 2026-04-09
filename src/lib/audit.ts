
import { db, auth } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'DOWNLOAD';

export async function logAction(action: AuditAction, resource: string, details: string) {
  try {
    const user = auth.currentUser;
    await addDoc(collection(db, 'audit_logs'), {
      userId: user?.uid || 'anonymous',
      userEmail: user?.email || 'anonymous',
      action,
      resource,
      details,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error logging action:', error);
  }
}
