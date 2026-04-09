
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, onSnapshot, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { UserPlus, Shield, Trash2, Search, X, Mail, ShieldCheck, ShieldAlert } from 'lucide-react';
import { logAction } from '../../lib/audit';

interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
  createdAt: any;
}

export default function AdminManager() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ email: '', role: 'admin' as 'admin' | 'super_admin' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const adminsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as AdminUser[];
      setAdmins(adminsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdmin.email) return;

    setIsSubmitting(true);
    try {
      // We use email as ID or a generated ID if we don't have the UID yet.
      // In a real app, we'd probably use a cloud function to create the user in Auth too.
      // Here we just add them to the 'users' collection so they get the role when they login.
      const adminId = newAdmin.email.replace(/[^a-zA-Z0-9]/g, '_');
      await setDoc(doc(db, 'users', adminId), {
        email: newAdmin.email,
        role: newAdmin.role,
        createdAt: serverTimestamp()
      });

      await logAction('CREATE', 'ADMIN', `Added admin: ${newAdmin.email} with role ${newAdmin.role}`);
      setIsModalOpen(false);
      setNewAdmin({ email: '', role: 'admin' });
    } catch (error) {
      console.error('Error adding admin:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAdmin = async (id: string, email: string) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir retirer les droits d'accès pour ${email} ?`)) return;

    try {
      await deleteDoc(doc(db, 'users', id));
      await logAction('DELETE', 'ADMIN', `Removed admin: ${email}`);
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const filteredAdmins = admins.filter(admin => 
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Gestion des Administrateurs</h1>
          <p className="text-gray-500">Gérez les accès et les rôles de l'équipe administrative.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <UserPlus className="w-5 h-5" /> Ajouter un admin
        </button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un administrateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-100 focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-50/50">
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Email</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Rôle</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-8 py-12 text-center">
                    <div className="w-8 h-8 border-4 border-medical-blue/20 border-t-medical-blue rounded-full animate-spin mx-auto"></div>
                  </td>
                </tr>
              ) : filteredAdmins.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-8 py-12 text-center text-gray-500 font-medium">
                    Aucun administrateur trouvé.
                  </td>
                </tr>
              ) : (
                filteredAdmins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-medical-blue/10 group-hover:text-medical-blue transition-colors">
                          <Mail className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-gray-900">{admin.email}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        admin.role === 'super_admin' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {admin.role === 'super_admin' ? <ShieldCheck className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
                        {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button
                        onClick={() => handleDeleteAdmin(admin.id, admin.email)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Retirer les droits"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Admin Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-10 overflow-hidden"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-8">
                <div className="w-16 h-16 bg-medical-blue/10 text-medical-blue rounded-2xl flex items-center justify-center mb-6">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-display font-bold text-gray-900">Ajouter un Admin</h2>
                <p className="text-gray-500">L'utilisateur pourra se connecter avec cet email.</p>
              </div>

              <form onSubmit={handleAddAdmin} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
                  <input
                    type="email"
                    required
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all font-medium"
                    placeholder="exemple@ipfoss.sn"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Rôle</label>
                  <select
                    value={newAdmin.role}
                    onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value as any })}
                    className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all font-medium appearance-none"
                  >
                    <option value="admin">Administrateur Simple</option>
                    <option value="super_admin">Super Administrateur</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Confirmer l'ajout"
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
