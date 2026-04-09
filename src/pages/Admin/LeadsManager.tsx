
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { motion } from 'motion/react';
import { UserCheck, Mail, Phone, Calendar, GraduationCap, Search, Download } from 'lucide-react';

interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  formationId: string;
  formationTitle: string;
  createdAt: any;
}

export default function LeadsManager() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setLeads(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead)));
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.formationTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportLeads = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Nom,Email,Telephone,Formation,Date\n"
      + filteredLeads.map(l => `${l.fullName},${l.email},${l.phone},${l.formationTitle},${l.createdAt?.toDate?.().toLocaleString() || l.createdAt}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leads_ipfoss.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]">Chargement...</div>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Suivi des Leads</h1>
          <p className="text-gray-500 mt-2">Liste des prospects ayant téléchargé une documentation.</p>
        </div>
        <button 
          onClick={exportLeads}
          className="btn-secondary flex items-center gap-2"
        >
          <Download className="w-5 h-5" /> Exporter CSV
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher un lead (nom, email, formation)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-16 pr-6 py-4 rounded-2xl border border-gray-100 bg-white shadow-sm focus:ring-4 focus:ring-medical-blue/10 focus:border-medical-blue outline-none transition-all font-medium"
        />
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Prospect</th>
                <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Contact</th>
                <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Formation</th>
                <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredLeads.map((lead) => (
                <motion.tr 
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-medical-light text-medical-blue rounded-xl flex items-center justify-center">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-gray-900">{lead.fullName}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-medical-blue transition-colors">
                        <Mail className="w-4 h-4" /> {lead.email}
                      </a>
                      <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-medical-blue transition-colors">
                        <Phone className="w-4 h-4" /> {lead.phone}
                      </a>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-sm font-bold text-medical-blue">
                      <GraduationCap className="w-4 h-4" />
                      {lead.formationTitle}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {lead.createdAt?.toDate?.().toLocaleDateString() || 'N/A'}
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-gray-500 italic">
                    Aucun lead trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
