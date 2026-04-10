

import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, onSnapshot, orderBy, limit, where, Timestamp, deleteDoc, doc, writeBatch, getDocs } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { History, Search, Filter, Clock, User, Activity, FileText, Calendar, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { format, subDays, startOfDay, endOfDay, isBefore } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAuth } from '../../hooks/useAuth';
import { logAction } from '../../lib/audit';

interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  resource: string;
  details: string;
  timestamp: any;
}

export default function AuditLogs() {
  const { isSuperAdmin } = useAuth();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('all'); // all, 7d, 30d, custom
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    let q = query(
      collection(db, 'audit_logs'),
      orderBy('timestamp', 'desc'),
      limit(500)
    );

    // Apply time filtering
    if (filterPeriod === '7d') {
      const sevenDaysAgo = subDays(new Date(), 7);
      q = query(q, where('timestamp', '>=', Timestamp.fromDate(sevenDaysAgo)));
    } else if (filterPeriod === '30d') {
      const thirtyDaysAgo = subDays(new Date(), 30);
      q = query(q, where('timestamp', '>=', Timestamp.fromDate(thirtyDaysAgo)));
    } else if (filterPeriod === 'custom' && customStartDate) {
      const start = startOfDay(new Date(customStartDate));
      q = query(q, where('timestamp', '>=', Timestamp.fromDate(start)));
      if (customEndDate) {
        const end = endOfDay(new Date(customEndDate));
        q = query(q, where('timestamp', '<=', Timestamp.fromDate(end)));
      }
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const logsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as AuditLog[];
      setLogs(logsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching logs:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [filterPeriod, customStartDate, customEndDate]);

  const handleDeleteOldLogs = async () => {
    if (!isSuperAdmin) return;
    
    const sevenDaysAgo = subDays(new Date(), 7);
    const logsToDelete = logs.filter(log => {
      if (!log.timestamp?.toDate) return false;
      return isBefore(log.timestamp.toDate(), sevenDaysAgo);
    });

    if (logsToDelete.length === 0) {
      setStatusMessage({ type: 'error', text: "Aucun log de plus de 7 jours n'a été trouvé." });
      return;
    }

    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer ${logsToDelete.length} logs datant de plus de 7 jours ? Cette action est irréversible.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const batch = writeBatch(db);
      logsToDelete.forEach(log => {
        batch.delete(doc(db, 'audit_logs', log.id));
      });
      await batch.commit();
      
      await logAction('DELETE', 'LOGS', `Deleted ${logsToDelete.length} old audit logs`);
      setStatusMessage({ type: 'success', text: `${logsToDelete.length} logs anciens ont été supprimés avec succès.` });
    } catch (error) {
      console.error("Error deleting logs:", error);
      setStatusMessage({ type: 'error', text: "Erreur lors de la suppression des logs." });
    } finally {
      setIsDeleting(false);
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterAction === 'all' || log.action === filterAction;
    
    return matchesSearch && matchesFilter;
  });

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE': return 'bg-green-100 text-green-700';
      case 'UPDATE': return 'bg-blue-100 text-blue-700';
      case 'DELETE': return 'bg-red-100 text-red-700';
      case 'LOGIN': return 'bg-purple-100 text-purple-700';
      case 'DOWNLOAD': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Journal d'Audit</h1>
          <p className="text-gray-500">Historique complet des actions effectuées sur la plateforme.</p>
        </div>
        {isSuperAdmin && (
          <button
            onClick={handleDeleteOldLogs}
            disabled={isDeleting}
            className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-xl border border-red-100 font-bold hover:bg-red-600 hover:text-white transition-all disabled:opacity-50"
          >
            {isDeleting ? (
              <div className="w-5 h-5 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
            ) : (
              <Trash2 className="w-5 h-5" />
            )}
            Nettoyer les logs (+7j)
          </button>
        )}
      </div>

      {statusMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl flex items-center gap-3 font-medium ${
            statusMessage.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
          }`}
        >
          {statusMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {statusMessage.text}
        </motion.div>
      )}

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par email, action ou ressource..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-100 focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all"
              />
            </div>
            <div className="relative min-w-[200px]">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-100 focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all appearance-none font-medium"
              >
                <option value="all">Toutes les actions</option>
                <option value="CREATE">Créations</option>
                <option value="UPDATE">Modifications</option>
                <option value="DELETE">Suppressions</option>
                <option value="LOGIN">Connexions</option>
                <option value="DOWNLOAD">Téléchargements</option>
              </select>
            </div>
            <div className="relative min-w-[200px]">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-100 focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all appearance-none font-medium"
              >
                <option value="all">Toute la période</option>
                <option value="7d">7 derniers jours</option>
                <option value="30d">30 derniers jours</option>
                <option value="custom">Période personnalisée</option>
              </select>
            </div>
          </div>

          {filterPeriod === 'custom' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Du</span>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-100 focus:border-medical-blue outline-none text-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Au</span>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-100 focus:border-medical-blue outline-none text-sm"
                />
              </div>
            </motion.div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-50/50">
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date & Heure</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Utilisateur</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Action</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Détails</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center">
                    <div className="w-8 h-8 border-4 border-medical-blue/20 border-t-medical-blue rounded-full animate-spin mx-auto"></div>
                  </td>
                </tr>
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-gray-500 font-medium">
                    Aucun log trouvé.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Clock className="w-4 h-4" />
                        {log.timestamp?.toDate ? format(log.timestamp.toDate(), 'dd MMM yyyy HH:mm', { locale: fr }) : 'En cours...'}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{log.userEmail}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getActionColor(log.action)}`}>
                        <Activity className="w-3 h-3" />
                        {log.action}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                        <span className="text-sm text-gray-600 line-clamp-1" title={log.details}>
                          <span className="font-bold text-gray-900 mr-2">[{log.resource}]</span>
                          {log.details}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
