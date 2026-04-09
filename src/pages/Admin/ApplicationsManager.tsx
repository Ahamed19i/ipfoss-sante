
import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, CheckCircle2, XCircle, Clock, Mail, Phone, GraduationCap, FileText, Search, Filter, User } from 'lucide-react';

interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  formation: string;
  motivation: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  createdAt: any;
}

export default function ApplicationsManager() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setApplications(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Application)));
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'applications', id), { status: newStatus });
      fetchApplications();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Supprimer cette candidature ?")) {
      try {
        await deleteDoc(doc(db, 'applications', id));
        fetchApplications();
      } catch (err) {
        console.error("Error deleting application:", err);
      }
    }
  };

  const filteredApps = applications.filter(app => {
    const matchesFilter = filter === 'all' || app.status === filter;
    const matchesSearch = app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         app.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-10 h-10 border-4 border-medical-blue/20 border-t-medical-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">Candidatures</h1>
          <p className="text-gray-500">Gérez les demandes d'inscription reçues.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3 rounded-2xl border border-gray-100 bg-white focus:border-medical-blue outline-none transition-all w-full md:w-64 shadow-sm"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-12 pr-10 py-3 rounded-2xl border border-gray-100 bg-white focus:border-medical-blue outline-none transition-all appearance-none shadow-sm font-bold text-gray-600"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="reviewed">Examiné</option>
              <option value="accepted">Accepté</option>
              <option value="rejected">Refusé</option>
            </select>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredApps.map((app) => (
            <motion.div 
              key={app.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col lg:flex-row lg:items-center gap-8 group hover:shadow-xl transition-all"
            >
              <div 
                className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer"
                onClick={() => setSelectedApp(app)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-medical-light rounded-2xl flex items-center justify-center text-medical-blue shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-gray-900 text-lg">{app.fullName}</h4>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">
                      {app.createdAt?.toDate ? app.createdAt.toDate().toLocaleDateString() : "Date inconnue"}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" /> {app.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" /> {app.phone}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-gray-700">{app.formation}</span>
                </div>

                <div className="flex items-center">
                  <span className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-widest ${
                    app.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                    app.status === 'accepted' ? 'bg-green-100 text-green-600' :
                    app.status === 'rejected' ? 'bg-red-100 text-red-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {app.status === 'pending' ? 'En attente' :
                     app.status === 'accepted' ? 'Accepté' :
                     app.status === 'rejected' ? 'Refusé' : 'Examiné'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-6 lg:pt-0 lg:border-l lg:pl-8 border-gray-100">
                <button 
                  onClick={() => handleStatusChange(app.id, 'accepted')}
                  title="Accepter"
                  className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all"
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleStatusChange(app.id, 'rejected')}
                  title="Refuser"
                  className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                >
                  <XCircle className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(app.id)}
                  title="Supprimer"
                  className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-900 hover:text-white transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredApps.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <Search className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">Aucun résultat</h3>
            <p className="text-gray-500">Essayez de modifier vos filtres ou votre recherche.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedApp(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-10 md:p-12">
                <div className="flex justify-between items-start mb-10">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-medical-light rounded-2xl flex items-center justify-center text-medical-blue">
                      <User className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-display font-bold text-gray-900">{selectedApp.fullName}</h3>
                      <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-1">
                        Candidature du {selectedApp.createdAt?.toDate ? selectedApp.createdAt.toDate().toLocaleDateString() : "Date inconnue"}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedApp(null)}
                    className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-100 transition-all"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Email</p>
                      <div className="flex items-center gap-3 text-gray-900 font-medium">
                        <Mail className="w-5 h-5 text-medical-blue" />
                        {selectedApp.email}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Téléphone</p>
                      <div className="flex items-center gap-3 text-gray-900 font-medium">
                        <Phone className="w-5 h-5 text-medical-blue" />
                        {selectedApp.phone}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Formation</p>
                      <div className="flex items-center gap-3 text-gray-900 font-medium">
                        <GraduationCap className="w-5 h-5 text-medical-blue" />
                        {selectedApp.formation}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Statut Actuel</p>
                      <span className={`inline-block px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-widest ${
                        selectedApp.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                        selectedApp.status === 'accepted' ? 'bg-green-100 text-green-600' :
                        selectedApp.status === 'rejected' ? 'bg-red-100 text-red-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {selectedApp.status === 'pending' ? 'En attente' :
                         selectedApp.status === 'accepted' ? 'Accepté' :
                         selectedApp.status === 'rejected' ? 'Refusé' : 'Examiné'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Motivation / Message</p>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedApp.motivation || "Aucun message d'accompagnement fourni."}
                  </p>
                </div>

                <div className="mt-12 flex gap-4">
                  <button 
                    onClick={() => {
                      handleStatusChange(selectedApp.id, 'accepted');
                      setSelectedApp(null);
                    }}
                    className="flex-grow py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/20"
                  >
                    Accepter le dossier
                  </button>
                  <button 
                    onClick={() => {
                      handleStatusChange(selectedApp.id, 'rejected');
                      setSelectedApp(null);
                    }}
                    className="flex-grow py-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all"
                  >
                    Refuser
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
