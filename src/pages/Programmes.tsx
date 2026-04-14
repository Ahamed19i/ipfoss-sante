import { motion } from 'motion/react';
import { GraduationCap, Award, BookOpen, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';

const programs = [
  {
    id: '3-ans',
    title: 'Formations de 3 ans',
    subtitle: 'Diplômes d’État (Licence)',
    description: 'Programmes d’excellence accrédités par le Ministère de la Santé, préparant aux carrières de cadres de santé.',
    duration: '36 mois',
    icon: Award,
    color: 'bg-medical-blue',
    formations: [
      'Sage-femme d’État',
      'Infirmier d’État'
    ],
    features: [
      'Accréditation nationale complète',
      'Accès aux concours de la fonction publique',
      'Reconnaissance internationale (CEDEAO)',
      'Stages cliniques intensifs en CHU'
    ]
  },
  {
    id: '2-ans',
    title: 'Formations de 2 ans',
    subtitle: 'Diplômes Professionnels',
    description: 'Formations techniques axées sur la pratique pour une insertion rapide dans les structures de santé.',
    duration: '24 mois',
    icon: GraduationCap,
    color: 'bg-health-green',
    formations: [
      'Assistant infirmier',
      'Aide-soignant'
    ],
    features: [
      'Curriculum 80% pratique',
      'Intervenants professionnels du secteur',
      'Partenariats avec des cliniques privées',
      'Accompagnement à l\'insertion immédiate'
    ]
  },
  {
    id: 'moins-1-an',
    title: 'Moins d\'un an',
    subtitle: 'Certifications Courtes',
    description: 'Spécialisations rapides pour répondre aux besoins urgents du secteur pharmaceutique et médical.',
    duration: '10 mois',
    icon: Clock,
    color: 'bg-academic-gold',
    formations: [
      'Délégué médical',
      'Vendeur en pharmacie'
    ],
    features: [
      'Format intensif et immersif',
      'Idéal pour une insertion rapide',
      'Certificat de fin de formation IPFOSS',
      'Réseau de pharmacies partenaires'
    ]
  }
];

export default function Programmes() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-medical-blue py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-health-green rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Nos Programmes & Diplômes
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Une organisation claire par durée d'études pour vous aider à choisir le parcours qui correspond à vos ambitions professionnelles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section-padding bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {programs.map((program, i) => (
            <motion.div
              key={program.id}
              id={program.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100 flex flex-col h-full hover:shadow-xl transition-all group scroll-mt-32"
            >
              <div className={`w-16 h-16 ${program.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                <program.icon className="w-8 h-8" />
              </div>
              
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-1">{program.title}</h2>
              <p className="text-medical-blue font-bold text-sm mb-4 uppercase tracking-widest">{program.subtitle}</p>
              
              <div className="flex items-center gap-2 text-gray-400 font-bold text-xs mb-6 uppercase tracking-widest">
                <Clock className="w-4 h-4" /> Durée : {program.duration}
              </div>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                {program.description}
              </p>

              <div className="mb-8 p-6 bg-white rounded-2xl border border-gray-100">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Formations incluses :</h4>
                <ul className="space-y-3">
                  {program.formations.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-900 font-bold">
                      <div className="w-1.5 h-1.5 rounded-full bg-medical-blue" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4 mb-10 flex-grow">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Points clés :</h4>
                {program.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-health-green shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Link 
                to="/admissions#formulaire" 
                className={`w-full py-4 rounded-2xl font-bold text-center transition-all flex items-center justify-center gap-2 ${
                  program.id === '3-ans' ? 'bg-medical-blue text-white hover:bg-blue-900' : 'bg-white border-2 border-gray-200 text-gray-900 hover:border-medical-blue hover:text-medical-blue'
                }`}
              >
                S'inscrire <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            centered
            title="Choisir son parcours"
            subtitle="Comparez nos différents types de diplômes pour trouver celui qui correspond le mieux à vos objectifs professionnels."
          />
          
          <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="px-8 py-6 font-display font-bold">Critères</th>
                    <th className="px-8 py-6 font-display font-bold">Diplôme d'État</th>
                    <th className="px-8 py-6 font-display font-bold">Diplôme d'École</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-8 py-6 font-bold text-gray-900 bg-gray-50/50">Reconnaissance</td>
                    <td className="px-8 py-6 text-sm text-gray-600">Nationale & Ministérielle</td>
                    <td className="px-8 py-6 text-sm text-gray-600">Institutionnelle (IPFOSS)</td>
                  </tr>
                  <tr>
                    <td className="px-8 py-6 font-bold text-gray-900 bg-gray-50/50">Secteur d'activité</td>
                    <td className="px-8 py-6 text-sm text-gray-600">Public & Privé</td>
                    <td className="px-8 py-6 text-sm text-gray-600">Privé & Entrepreneuriat</td>
                  </tr>
                  <tr>
                    <td className="px-8 py-6 font-bold text-gray-900 bg-gray-50/50">Durée moyenne</td>
                    <td className="px-8 py-6 text-sm text-gray-600">3 ans (Licence)</td>
                    <td className="px-8 py-6 text-sm text-gray-600">2 ans (BTS/DTS)</td>
                  </tr>
                  <tr>
                    <td className="px-8 py-6 font-bold text-gray-900 bg-gray-50/50">Admission</td>
                    <td className="px-8 py-6 text-sm text-gray-600">Baccalauréat requis</td>
                    <td className="px-8 py-6 text-sm text-gray-600">Bac ou Niveau Bac</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="bg-health-green rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-health-green/20">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8">
              Besoin d'une orientation personnalisée ?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Nos conseillers académiques sont à votre disposition pour vous aider à choisir le programme le plus adapté à votre profil.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-3 bg-white text-health-dark px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all">
              Contacter un conseiller <BookOpen className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
