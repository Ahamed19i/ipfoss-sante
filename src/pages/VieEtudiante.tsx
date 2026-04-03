import { motion } from 'motion/react';
import SectionHeading from '../components/SectionHeading';
import { Users, Heart, Coffee, BookOpen, MapPin, Star, Quote } from 'lucide-react';

const activities = [
  { title: 'Associations Étudiantes', description: 'Rejoignez le Bureau des Étudiants (BDE) et participez à la vie de l\'école.', icon: Users },
  { title: 'Clubs de Santé', description: 'Sensibilisation, caravanes médicales et actions humanitaires.', icon: Heart },
  { title: 'Espaces de Vie', description: 'Cafétéria, salles de repos et bibliothèque moderne.', icon: Coffee },
  { title: 'Stages & Réseau', description: 'Immersion clinique et rencontres avec des professionnels.', icon: BookOpen },
];

const testimonials = [
  { name: 'Fatou Ndiaye', role: 'Étudiante en Soins Infirmiers (L3)', text: 'L\'IPFOSS m\'a offert un cadre d\'apprentissage exceptionnel. Les professeurs sont accessibles et passionnés.' },
  { name: 'Ibrahima Fall', role: 'Diplômé en Soins Infirmiers', text: 'Grâce aux stages garantis, j\'ai pu intégrer l\'Hôpital Principal dès l\'obtention de mon diplôme.' },
  { name: 'Awa Diop', role: 'Étudiante en Santé Publique (M1)', text: 'Une école qui allie rigueur académique et épanouissement personnel. Je recommande vivement.' },
];

export default function VieEtudiante() {
  return (
    <div className="pt-10">
      <section className="bg-medical-blue py-16 md:py-24 relative overflow-hidden">
        <div className="section-padding relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-6xl font-display font-bold text-white mb-6">Vie Étudiante</h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">Un environnement stimulant pour votre épanouissement personnel et professionnel.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <SectionHeading centered title="S'épanouir à l'IPFOSS" subtitle="Au-delà des cours, nous offrons une expérience riche et diversifiée." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.map((activity, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center group hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-medical-light text-medical-blue rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-medical-blue group-hover:text-white transition-colors">
                <activity.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-display font-bold mb-4 text-gray-900">{activity.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{activity.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading centered title="Témoignages" subtitle="Ce que nos étudiants et diplômés disent de leur expérience." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 relative">
                <Quote className="w-10 h-10 text-medical-blue/10 absolute top-6 left-6" />
                <p className="text-gray-600 italic mb-8 relative z-10 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-medical-blue/10 flex items-center justify-center text-medical-blue font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-gray-900">{t.name}</h4>
                    <p className="text-xs text-medical-blue font-medium">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
