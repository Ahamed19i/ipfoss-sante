
import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Pencil, Trash2, X, Save, GraduationCap, Clock, FileText, List, DollarSign, BookOpen } from 'lucide-react';
import { logAction } from '../../lib/audit';

interface Formation {
  id: string;
  title: string;
  category: string;
  description: string;
  detailedProgram: string;
  modules: string;
  fees: string;
  duration: string;
  degree: string;
  outcomes: string[];
  requirements: string;
  brochureUrl: string;
}

export default function FormationsManager() {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '3-ans',
    description: '',
    detailedProgram: '',
    modules: '',
    fees: '',
    duration: '',
    degree: '',
    outcomes: '',
    requirements: '',
    brochureUrl: ''
  });

  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
    try {
      const q = query(collection(db, 'formations'), orderBy('title', 'asc'));
      const snap = await getDocs(q);
      setFormations(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Formation)));
    } catch (err) {
      console.error("Error fetching formations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (formation?: Formation) => {
    if (formation) {
      setEditingId(formation.id);
      setFormData({
        title: formation.title,
        category: formation.category,
        description: formation.description,
        detailedProgram: formation.detailedProgram || '',
        modules: formation.modules || '',
        fees: formation.fees || '',
        duration: formation.duration,
        degree: formation.degree,
        outcomes: formation.outcomes?.join(', ') || '',
        requirements: formation.requirements || '',
        brochureUrl: formation.brochureUrl || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        category: '3-ans',
        description: '',
        detailedProgram: '',
        modules: '',
        fees: '',
        duration: '',
        degree: '',
        outcomes: '',
        requirements: '',
        brochureUrl: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        outcomes: formData.outcomes.split(',').map(s => s.trim()).filter(s => s !== '')
      };

      if (editingId) {
        await updateDoc(doc(db, 'formations', editingId), data);
        await logAction('UPDATE', 'FORMATION', `Updated formation: ${data.title}`);
      } else {
        await addDoc(collection(db, 'formations'), data);
        await logAction('CREATE', 'FORMATION', `Created formation: ${data.title}`);
      }
      
      setIsModalOpen(false);
      fetchFormations();
    } catch (err) {
      console.error("Error saving formation:", err);
      alert("Erreur lors de l'enregistrement.");
    }
  };

  const handleDelete = async (id: string) => {
    const formation = formations.find(f => f.id === id);
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette formation ?")) {
      try {
        await deleteDoc(doc(db, 'formations', id));
        await logAction('DELETE', 'FORMATION', `Deleted formation: ${formation?.title || id}`);
        fetchFormations();
      } catch (err) {
        console.error("Error deleting formation:", err);
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]">Chargement...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Gestion des Formations</h1>
          <p className="text-gray-500 mt-2">Ajoutez, modifiez ou supprimez les programmes de formation.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Nouvelle Formation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {formations.map((formation) => (
          <motion.div
            key={formation.id}
            layout
            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-medical-light text-medical-blue rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleOpenModal(formation)}
                  className="p-2 text-gray-400 hover:text-medical-blue hover:bg-medical-light rounded-lg transition-all"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(formation.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <span className="text-[10px] font-bold text-medical-blue uppercase tracking-widest mb-2 block">
              {formation.category}
            </span>
            <h3 className="text-xl font-display font-bold text-gray-900 mb-4 group-hover:text-medical-blue transition-colors">
              {formation.title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2 mb-6">
              {formation.description}
            </p>
            
            <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <Clock className="w-4 h-4 text-medical-blue" />
              {formation.duration}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
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
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl relative z-10 p-10 md:p-14"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-display font-bold text-gray-900">
                  {editingId ? 'Modifier la formation' : 'Nouvelle formation'}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900 uppercase tracking-widest">Titre</label>
                    <input
                      required
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue outline-none transition-all"
                      placeholder="Ex: Licence en Soins Infirmiers"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900 uppercase tracking-widest">Catégorie</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue outline-none transition-all"
                    >
                      <option value="3-ans">Formations de 3 ans</option>
                      <option value="2-ans">Formations de 2 ans</option>
                      <option value="moins-1-an">Moins d'un an</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-900 uppercase tracking-widest">Description Courte</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue outline-none transition-all"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Durée
                    </label>
                    <input
                      required
                      value={formData.duration}
                      onChange={e => setFormData({...formData, duration: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue outline-none transition-all"
                      placeholder="Ex: 3 ans"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" /> Diplôme
                    </label>
                    <input
                      required
                      value={formData.degree}
                      onChange={e => setFormData({...formData, degree: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue outline-none transition-all"
                      placeholder="Ex: Licence d'État"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> Programme Détaillé (Markdown)
                  </label>
                  <textarea
                    value={formData.detailedProgram}
                    onChange={e => setFormData({...formData, detailedProgram: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue outline-none transition-all"
                    rows={4}
                    placeholder="Détails du cursus..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                    <List className="w-4 h-4" /> Modules / Spécialités (Markdown)
                  </label>
                  <textarea
                    value={formData.modules}
                    onChange={e => setFormData({...formData, modules: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue outline-none transition-all"
                    rows={4}
                    placeholder="Liste des modules..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                      <DollarSign className="w-4 h-4" /> Frais de Scolarité
                    </label>
                    <input
                      value={formData.fees}
                      onChange={e => setFormData({...formData, fees: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue outline-none transition-all"
                      placeholder="Ex: 850 000 FCFA / an"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                      <FileText className="w-4 h-4" /> URL Brochure (PDF)
                    </label>
                    <input
                      value={formData.brochureUrl}
                      onChange={e => setFormData({...formData, brochureUrl: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue outline-none transition-all"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-900 uppercase tracking-widest">Débouchés (séparés par des virgules)</label>
                  <input
                    value={formData.outcomes}
                    onChange={e => setFormData({...formData, outcomes: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue outline-none transition-all"
                    placeholder="Infirmier, Cadre de santé, ..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-900 uppercase tracking-widest">Conditions d'admission</label>
                  <textarea
                    value={formData.requirements}
                    onChange={e => setFormData({...formData, requirements: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue outline-none transition-all"
                    rows={2}
                  />
                </div>

                <div className="pt-6">
                  <button type="submit" className="btn-primary w-full py-5 flex items-center justify-center gap-3 text-lg">
                    <Save className="w-6 h-6" /> Enregistrer la formation
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
