import { motion } from 'motion/react';
import SectionHeading from '../components/SectionHeading';
import Hero from '../components/Hero';
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
      <Hero 
        title="Vie Étudiante"
        subtitle="Un environnement stimulant pour votre épanouissement personnel et professionnel."
        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070"
        badge="Épanouissement & Communauté"
      />

      <section className="section-padding">
        <SectionHeading centered title="S'épanouir à l'IPFOSS" subtitle="Au-delà des cours, nous offrons une expérience riche et diversifiée." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {activities.map((activity, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }} 
              className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 text-center group hover:shadow-xl transition-all"
            >
              <div className="w-20 h-20 bg-medical-light text-medical-blue rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-medical-blue group-hover:text-white transition-all transform group-hover:rotate-6">
                <activity.icon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-gray-900">{activity.title}</h3>
              <p className="text-gray-600 leading-relaxed">{activity.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading centered title="Témoignages" subtitle="Ce que nos étudiants et diplômés disent de leur expérience." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }} 
                className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100 relative group hover:shadow-2xl transition-all"
              >
                <Quote className="w-16 h-16 text-medical-blue/5 absolute top-10 left-10" />
                <p className="text-gray-600 italic mb-10 relative z-10 leading-relaxed text-lg">"{t.text}"</p>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-medical-blue text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-medical-blue/20">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-gray-900 text-lg">{t.name}</h4>
                    <p className="text-sm text-medical-blue font-bold uppercase tracking-widest mt-0.5">{t.role}</p>
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
