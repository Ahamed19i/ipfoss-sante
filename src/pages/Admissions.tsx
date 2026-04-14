
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import SectionHeading from '../components/SectionHeading';
import Hero from '../components/Hero';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { FileText, Calendar, CreditCard, CheckCircle2, Info, Send, GraduationCap, Mail } from 'lucide-react';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const steps = [
  {
    title: 'Candidature en ligne',
    description: 'Remplissez le formulaire de pré-inscription avec vos informations personnelles et académiques.',
    icon: FileText,
  },
  {
    title: 'Étude du dossier',
    description: 'Notre commission pédagogique examine votre dossier (relevés de notes, diplômes, motivation).',
    icon: Info,
  },
  {
    title: 'Entretien de motivation',
    description: 'Un échange avec un membre de la direction pour évaluer votre projet professionnel.',
    icon: Calendar,
  },
  {
    title: 'Admission & Inscription',
    description: 'Une fois admis, vous recevez votre lettre d\'admission et procédez au règlement des frais.',
    icon: CreditCard,
  },
];

export default function Admissions() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const onSubmit = async (data: any) => {
    const path = 'applications';
    try {
      // Save to Firestore
      await addDoc(collection(db, path), {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        formation: data.program,
        motivation: data.message || '',
        status: 'pending',
        createdAt: serverTimestamp()
      });

      setIsSubmitted(true);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  };

  return (
    <div className="pt-10">
      <Hero 
        title="Admissions : Intégrez notre École de Santé"
        subtitle="Rejoignez l'élite des professionnels de santé au Sénégal. Découvrez notre processus de sélection rigoureux et transparent."
        image="/images/photo2.jpg"
        badge="Inscriptions Ouvertes"
      />

      {/* Steps Section */}
      <section className="section-padding">
        <SectionHeading
          centered
          title="Le Processus d'Admission"
          subtitle="Quatre étapes simples pour intégrer l'IPFOSS École de Santé."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-50 -z-0" />
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all text-center relative z-10 border border-gray-100 group"
            >
              <div className="w-20 h-20 bg-medical-blue text-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-medical-blue/20 group-hover:rotate-6 transition-transform">
                <step.icon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-gray-900">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section id="formulaire" className="section-padding bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <SectionHeading
              title="Candidature en Ligne"
              subtitle="Remplissez ce formulaire pour initier votre dossier de candidature. Nos conseillers vous accompagneront tout au long du processus."
            />
            <div className="space-y-8">
              <div className="flex items-start gap-6 p-8 bg-white rounded-[2rem] shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-2xl bg-health-green/10 flex items-center justify-center text-health-green shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-display font-bold text-gray-900 mb-2">Documents requis</h4>
                  <p className="text-gray-600 leading-relaxed">Copie du Baccalauréat, relevés de notes des 3 dernières années, pièce d'identité.</p>
                </div>
              </div>
              <div className="flex items-start gap-6 p-8 bg-white rounded-[2rem] shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-2xl bg-health-green/10 flex items-center justify-center text-health-green shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-display font-bold text-gray-900 mb-2">Délai de réponse</h4>
                  <p className="text-gray-600 leading-relaxed">Nous traitons les dossiers sous 7 à 10 jours ouvrés.</p>
                </div>
              </div>
              <div className="flex items-start gap-6 p-8 bg-white rounded-[2rem] shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-2xl bg-health-green/10 flex items-center justify-center text-health-green shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-display font-bold text-gray-900 mb-2">Aide à l'inscription</h4>
                  <p className="text-gray-600 leading-relaxed">Besoin d'aide ? Contactez notre service admission au +221 33 848 41 33.</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Nom Complet</label>
                      <input
                        {...register('fullName', { required: "Nom complet requis" })}
                        className="w-full px-5 py-3.5 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all font-medium text-sm"
                        placeholder="Ex: Moussa Diop"
                      />
                      {errors.fullName && <span className="text-red-500 text-[10px] mt-1 font-bold">{errors.fullName.message as string}</span>}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Email</label>
                        <input
                          {...register('email', { 
                            required: "Email requis", 
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Email invalide"
                            }
                          })}
                          className="w-full px-5 py-3.5 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all font-medium text-sm"
                          placeholder="votre@email.com"
                        />
                        {errors.email && <span className="text-red-500 text-[10px] mt-1 font-bold">{errors.email.message as string}</span>}
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Téléphone</label>
                        <input
                          {...register('phone', { 
                            required: "Téléphone requis",
                            pattern: {
                              value: /^[0-9+\s]{8,20}$/,
                              message: "Numéro invalide"
                            }
                          })}
                          className="w-full px-5 py-3.5 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all font-medium text-sm"
                          placeholder="+221 ..."
                        />
                        {errors.phone && <span className="text-red-500 text-[10px] mt-1 font-bold">{errors.phone.message as string}</span>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Formation souhaitée</label>
                      <select
                        {...register('program', { required: "Veuillez choisir un programme" })}
                        className="w-full px-5 py-3.5 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all font-medium text-sm appearance-none"
                      >
                        <option value="">Sélectionnez un programme</option>
                        <option value="infirmiers">Soins Infirmiers</option>
                        <option value="biomedecine">Sciences Biomédicales</option>
                        <option value="sante-publique">Santé Publique</option>
                      </select>
                      {errors.program && <span className="text-red-500 text-[10px] mt-1 font-bold">{errors.program.message as string}</span>}
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Message / Motivation</label>
                      <textarea
                        {...register('message')}
                        rows={3}
                        className="w-full px-5 py-3.5 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all font-medium text-sm"
                        placeholder="Dites-nous pourquoi vous souhaitez nous rejoindre..."
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-primary w-full py-4 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Envoyer ma candidature <Send className="w-5 h-5" /></>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-health-green/10 text-health-green rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3 shadow-lg shadow-health-green/10">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-4xl font-display font-bold text-gray-900 mb-6">Candidature Envoyée !</h3>
                  <p className="text-xl text-gray-600 mb-10 max-w-sm mx-auto leading-relaxed">
                    Merci pour votre intérêt. Notre équipe pédagogique examinera votre dossier et vous contactera sous 7 à 10 jours ouvrés.
                  </p>
                  <div className="p-8 bg-gray-50 rounded-[2rem] mb-10 border border-gray-100">
                    <p className="text-sm text-gray-500 mb-4 font-bold uppercase tracking-widest">Besoin d'aide ?</p>
                    <a href="mailto:ipfossante@gmail.com" className="text-medical-blue font-bold text-lg flex items-center justify-center gap-3 hover:underline">
                      <Mail className="w-6 h-6" /> ipfossante@gmail.com
                    </a>
                  </div>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-medical-blue font-bold hover:underline text-lg"
                  >
                    Envoyer une autre candidature
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Tuition Fees Info */}
      <section id="frais" className="section-padding">
        <div className="bg-gray-900 rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-white/5 -skew-x-12 -translate-x-1/2" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-10 leading-tight text-white">Frais de Scolarité & Bourses</h2>
              <p className="text-xl text-white/90 mb-12 leading-relaxed">
                Nous croyons que le talent ne doit pas être freiné par des barrières financières. L'IPFOSS propose des facilités de paiement et des bourses d'excellence pour les meilleurs dossiers.
              </p>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-health-green shadow-xl">
                    <CreditCard className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-white">Paiement échelonné</p>
                    <p className="text-white/70">Possibilité de régler en 10 mensualités.</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-health-green shadow-xl">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-white">Bourses d'Excellence</p>
                    <p className="text-white/70">Réduction jusqu'à 50% pour les mentions Très Bien.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 md:p-16 shadow-2xl">
              <h3 className="text-3xl font-display font-bold mb-10 text-center text-white">Grille Tarifaire</h3>
              <div className="space-y-8">
                {[
                  { name: 'Soins Infirmiers', price: '850 000 FCFA / an' },
                  { name: 'Sciences Biomédicales', price: '950 000 FCFA / an' },
                  { name: 'Santé Publique', price: '1 200 000 FCFA / an' },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between items-center border-b border-white/10 pb-6">
                    <span className="text-white/80 text-lg font-medium">{item.name}</span>
                    <span className="font-bold text-health-green text-xl">{item.price}</span>
                  </div>
                ))}
              </div>
              <p className="mt-10 text-sm text-center text-white/40 italic">
                * Les tarifs sont donnés à titre indicatif et peuvent varier selon le niveau d'études.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
