
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionHeading from '../components/SectionHeading';
import Hero from '../components/Hero';
import { db } from '../lib/firebase';
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { HeartPulse, Microscope, Activity, ShieldCheck, ArrowRight, Clock, GraduationCap, Briefcase, Download, X, Send, Mail, Phone, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

interface Formation {
  id: string;
  title: string;
  category: string;
  description: string;
  detailedProgram?: string;
  modules?: string;
  fees?: string;
  duration: string;
  degree: string;
  outcomes?: string[];
  requirements?: string;
  brochureUrl?: string;
}

const categories = [
  { id: 'infirmiers', name: 'Soins Infirmiers', icon: HeartPulse },
  { id: 'biomedecine', name: 'Sciences Biomédicales', icon: Microscope },
  { id: 'sante-publique', name: 'Santé Publique', icon: Activity },
];

export default function Formations() {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadFormData, setLeadFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [formErrors, setFormErrors] = useState({ fullName: '', email: '', phone: '' });

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const q = query(collection(db, 'formations'), orderBy('title', 'asc'));
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Formation));
        setFormations(data);
      } catch (err) {
        console.error("Error fetching formations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFormations();
  }, []);

  const validateForm = () => {
    const errors = { fullName: '', email: '', phone: '' };
    let isValid = true;

    if (!leadFormData.fullName.trim()) {
      errors.fullName = "Nom complet requis";
      isValid = false;
    }

    if (!leadFormData.email.trim()) {
      errors.email = "Email requis";
      isValid = false;
    } else if (!/^\S+@\S+$/i.test(leadFormData.email)) {
      errors.email = "Email invalide";
      isValid = false;
    }

    if (!leadFormData.phone.trim()) {
      errors.phone = "Téléphone requis";
      isValid = false;
    } else if (!/^[0-9+\s]{8,20}$/.test(leadFormData.phone)) {
      errors.phone = "Numéro invalide";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleDownloadClick = (formation: Formation) => {
    setSelectedFormation(formation);
    setIsLeadModalOpen(true);
    setFormErrors({ fullName: '', email: '', phone: '' });
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFormation) return;
    if (!validateForm()) return;

    setIsSubmittingLead(true);
    try {
      const { logAction } = await import('../lib/audit');
      
      await addDoc(collection(db, 'leads'), {
        ...leadFormData,
        formationId: selectedFormation.id,
        formationTitle: selectedFormation.title,
        createdAt: serverTimestamp()
      });

      await logAction('DOWNLOAD', 'BROCHURE', `Lead ${leadFormData.email} downloaded brochure for ${selectedFormation.title}`);

      // Trigger download
      if (selectedFormation.brochureUrl) {
        window.open(selectedFormation.brochureUrl, '_blank');
      } else {
        alert("La brochure n'est pas encore disponible pour cette formation.");
      }
      
      setIsLeadModalOpen(false);
      setLeadFormData({ fullName: '', email: '', phone: '' });
    } catch (err) {
      console.error("Error saving lead:", err);
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmittingLead(false);
    }
  };

  return (
    <div className="pt-10">
      <Hero 
        title="Formations en Soins Infirmiers et Santé"
        subtitle="Découvrez nos programmes d'excellence homologués par l'État du Sénégal pour devenir un professionnel de santé qualifié."
        image="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2070"
        badge="Formations Médicales au Sénégal"
      />

      {/* Categories Navigation */}
      <section className="py-6 bg-white/90 backdrop-blur-xl border-b border-gray-100 sticky top-[72px] z-40 shadow-sm transition-all overflow-x-auto">
        <div className="max-w-7xl mx-auto px-6 flex justify-center gap-4 md:gap-8 min-w-max">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gray-50 hover:bg-medical-blue hover:text-white transition-all text-sm font-bold border border-gray-100 hover:border-medical-blue/30 group"
            >
              <cat.icon className="w-5 h-5 text-medical-blue group-hover:text-white transition-colors" />
              {cat.name}
            </a>
          ))}
        </div>
      </section>

      {/* Programs List */}
      <section className="section-padding bg-gray-50">
        <div className="space-y-32">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-medical-blue/20 border-t-medical-blue rounded-full animate-spin"></div>
            </div>
          ) : (
            categories.map((cat) => {
              const catFormations = formations.filter(f => f.category === cat.id);
              if (catFormations.length === 0) return null;

              return (
                <div key={cat.id} id={cat.id} className="scroll-mt-48">
                  <SectionHeading
                    title={cat.name}
                    subtitle={`Découvrez nos programmes spécialisés en ${cat.name.toLowerCase()}.`}
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {catFormations.map((program, i) => (
                      <motion.div
                        key={program.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 group"
                      >
                        <div className="p-10 md:p-14">
                          <div className="flex flex-wrap items-center gap-4 mb-8">
                            <span className="px-5 py-1.5 bg-medical-light text-medical-blue rounded-xl text-[10px] font-bold uppercase tracking-widest">
                              {program.degree}
                            </span>
                            <span className="px-5 py-1.5 bg-health-green/10 text-health-green rounded-xl text-[10px] font-bold uppercase tracking-widest">
                              Homologué par l'État
                            </span>
                            <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                              <Clock className="w-4 h-4 text-medical-blue" />
                              {program.duration}
                            </div>
                          </div>
                          <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 text-gray-900 group-hover:text-medical-blue transition-colors leading-tight">
                            {program.title}
                          </h3>
                          <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                            {program.description}
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                            <div>
                              <h4 className="flex items-center gap-3 font-display font-bold text-gray-900 mb-6 text-xl">
                                <Briefcase className="w-6 h-6 text-medical-blue" />
                                Débouchés
                              </h4>
                              <ul className="space-y-4">
                                {program.outcomes?.map((outcome, idx) => (
                                  <li key={idx} className="flex items-center gap-3 text-gray-600 font-medium">
                                    <div className="w-2 h-2 rounded-full bg-health-green" />
                                    {outcome}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="flex items-center gap-3 font-display font-bold text-gray-900 mb-6 text-xl">
                                <GraduationCap className="w-6 h-6 text-medical-blue" />
                                Conditions
                              </h4>
                              <p className="text-gray-600 leading-relaxed font-medium">
                                {program.requirements}
                              </p>
                            </div>
                          </div>

                          {/* Fees & Detailed Info */}
                          {(program.fees || program.modules) && (
                            <div className="mb-12 p-8 bg-gray-50 rounded-3xl border border-gray-100">
                              {program.fees && (
                                <div className="mb-6">
                                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Frais de scolarité</h4>
                                  <p className="text-xl font-display font-bold text-medical-blue">{program.fees}</p>
                                </div>
                              )}
                              {program.modules && (
                                <div>
                                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Modules clés</h4>
                                  <div className="prose prose-sm max-w-none text-gray-600">
                                    <ReactMarkdown>{program.modules}</ReactMarkdown>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                          
                          <div className="flex flex-wrap gap-4 pt-10 border-t border-gray-50">
                            <Link to="/admissions#formulaire" className="btn-primary flex-1 min-w-[200px]">
                              Candidater <ArrowRight className="w-5 h-5" />
                            </Link>
                            <button 
                              onClick={() => handleDownloadClick(program)}
                              className="btn-secondary flex-1 min-w-[200px] flex items-center justify-center gap-2"
                            >
                              <Download className="w-5 h-5" /> Brochure PDF
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Lead Capture Modal */}
      <AnimatePresence>
        {isLeadModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLeadModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl relative z-10 p-10 md:p-12"
            >
              <button 
                onClick={() => setIsLeadModalOpen(false)}
                className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-medical-light text-medical-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Download className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">Télécharger la brochure</h3>
                <p className="text-gray-500 text-sm">
                  Veuillez remplir ce court formulaire pour accéder au document complet de la formation <strong>{selectedFormation?.title}</strong>.
                </p>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <User className="w-4 h-4" /> Nom Complet
                  </label>
                  <input
                    type="text"
                    value={leadFormData.fullName}
                    onChange={e => setLeadFormData({...leadFormData, fullName: e.target.value})}
                    className={`w-full px-6 py-4 rounded-2xl border ${formErrors.fullName ? 'border-red-500' : 'border-gray-100'} bg-gray-50 focus:bg-white focus:border-medical-blue outline-none transition-all font-medium`}
                    placeholder="Ex: Moussa Diop"
                  />
                  {formErrors.fullName && <p className="text-red-500 text-[10px] font-bold mt-1">{formErrors.fullName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email
                  </label>
                  <input
                    type="email"
                    value={leadFormData.email}
                    onChange={e => setLeadFormData({...leadFormData, email: e.target.value})}
                    className={`w-full px-6 py-4 rounded-2xl border ${formErrors.email ? 'border-red-500' : 'border-gray-100'} bg-gray-50 focus:bg-white focus:border-medical-blue outline-none transition-all font-medium`}
                    placeholder="votre@email.com"
                  />
                  {formErrors.email && <p className="text-red-500 text-[10px] font-bold mt-1">{formErrors.email}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Téléphone
                  </label>
                  <input
                    type="tel"
                    value={leadFormData.phone}
                    onChange={e => setLeadFormData({...leadFormData, phone: e.target.value})}
                    className={`w-full px-6 py-4 rounded-2xl border ${formErrors.phone ? 'border-red-500' : 'border-gray-100'} bg-gray-50 focus:bg-white focus:border-medical-blue outline-none transition-all font-medium`}
                    placeholder="+221 ..."
                  />
                  {formErrors.phone && <p className="text-red-500 text-[10px] font-bold mt-1">{formErrors.phone}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmittingLead}
                  className="btn-primary w-full py-5 flex items-center justify-center gap-3 text-lg disabled:opacity-50"
                >
                  {isSubmittingLead ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Accéder au téléchargement <Send className="w-5 h-5" /></>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Career Support */}
      <section className="section-padding">
        <div className="bg-medical-blue rounded-[4rem] p-12 md:p-24 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/2" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">Accompagnement de Carrière</h2>
              <p className="text-xl text-white/80 mb-12 leading-relaxed">
                À l'IPFOSS, nous ne nous contentons pas de vous former. Nous vous accompagnons vers votre premier emploi grâce à notre réseau de partenaires et nos ateliers de préparation professionnelle.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  "Aide à la recherche de stage",
                  "Ateliers CV & Entretien",
                  "Réseau d'Alumni actif",
                  "Partenariats hôpitaux-écoles"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-white">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-health-green" />
                    </div>
                    <span className="font-bold text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-white/10 rotate-2">
                <img
                  src="/images/photo2.jpg"
                  alt="Career Support"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
