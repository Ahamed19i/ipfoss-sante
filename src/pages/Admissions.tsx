import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import SectionHeading from '../components/SectionHeading';
import { FileText, Calendar, CreditCard, CheckCircle2, Info, Send, GraduationCap } from 'lucide-react';

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
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    alert('Votre candidature a été envoyée avec succès ! Nous vous contacterons prochainement.');
  };

  return (
    <div className="pt-10">
      {/* Hero Section */}
      <section className="bg-medical-blue py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-health-green rounded-full blur-3xl" />
        </div>
        <div className="section-padding relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-6xl font-display font-bold text-white mb-6">Admissions</h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Rejoignez l'élite des professionnels de santé. Découvrez notre processus de sélection rigoureux et transparent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="section-padding">
        <SectionHeading
          centered
          title="Le Processus d'Admission"
          subtitle="Quatre étapes simples pour intégrer l'IPFOSS École de Santé."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-0" />
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-all text-center relative z-10 border border-gray-100"
            >
              <div className="w-16 h-16 bg-medical-blue text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-medical-blue/20">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-display font-bold mb-4 text-gray-900">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section id="formulaire" className="section-padding bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <SectionHeading
              title="Candidature en Ligne"
              subtitle="Remplissez ce formulaire pour initier votre dossier de candidature. Nos conseillers vous accompagneront tout au long du processus."
            />
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-health-green/10 flex items-center justify-center text-health-green shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-gray-900 mb-1">Documents requis</h4>
                  <p className="text-sm text-gray-600">Copie du Baccalauréat, relevés de notes des 3 dernières années, pièce d'identité.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-health-green/10 flex items-center justify-center text-health-green shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-gray-900 mb-1">Délai de réponse</h4>
                  <p className="text-sm text-gray-600">Nous traitons les dossiers sous 7 à 10 jours ouvrés.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-health-green/10 flex items-center justify-center text-health-green shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-gray-900 mb-1">Aide à l'inscription</h4>
                  <p className="text-sm text-gray-600">Besoin d'aide ? Contactez notre service admission au +221 33 848 41 33.</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-[2rem] shadow-xl border border-gray-100"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Prénom</label>
                  <input
                    {...register('firstName', { required: true })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all"
                    placeholder="Ex: Moussa"
                  />
                  {errors.firstName && <span className="text-red-500 text-xs mt-1">Ce champ est requis</span>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nom</label>
                  <input
                    {...register('lastName', { required: true })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all"
                    placeholder="Ex: Diop"
                  />
                  {errors.lastName && <span className="text-red-500 text-xs mt-1">Ce champ est requis</span>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <input
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all"
                  placeholder="votre@email.com"
                />
                {errors.email && <span className="text-red-500 text-xs mt-1">Email invalide</span>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Formation souhaitée</label>
                <select
                  {...register('program', { required: true })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all bg-white"
                >
                  <option value="">Sélectionnez un programme</option>
                  <option value="infirmiers">Soins Infirmiers</option>
                  <option value="biomedecine">Sciences Biomédicales</option>
                  <option value="sante-publique">Santé Publique</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Dernier diplôme obtenu</label>
                <input
                  {...register('lastDegree', { required: true })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all"
                  placeholder="Ex: Baccalauréat S2"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message / Motivation</label>
                <textarea
                  {...register('message')}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all"
                  placeholder="Dites-nous pourquoi vous souhaitez nous rejoindre..."
                />
              </div>

              <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-2">
                Envoyer ma candidature <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Tuition Fees Info */}
      <section id="frais" className="section-padding">
        <div className="bg-gray-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">Frais de Scolarité & Bourses</h2>
              <p className="text-lg text-white/70 mb-10 leading-relaxed">
                Nous croyons que le talent ne doit pas être freiné par des barrières financières. L'IPFOSS propose des facilités de paiement et des bourses d'excellence pour les meilleurs dossiers.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-health-green">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold">Paiement échelonné</p>
                    <p className="text-sm text-white/50">Possibilité de régler en 10 mensualités.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-health-green">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold">Bourses d'Excellence</p>
                    <p className="text-sm text-white/50">Réduction jusqu'à 50% pour les mentions Très Bien.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12">
              <h3 className="text-2xl font-display font-bold mb-8 text-center">Grille Tarifaire Indicative</h3>
              <div className="space-y-6">
                {[
                  { name: 'Soins Infirmiers', price: '850 000 FCFA / an' },
                  { name: 'Sciences Biomédicales', price: '950 000 FCFA / an' },
                  { name: 'Santé Publique', price: '1 200 000 FCFA / an' },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/80">{item.name}</span>
                    <span className="font-bold text-health-green">{item.price}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-xs text-center text-white/40 italic">
                * Les tarifs sont donnés à titre indicatif et peuvent varier selon le niveau d'études.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
