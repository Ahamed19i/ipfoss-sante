import { motion } from 'motion/react';
import SectionHeading from '../components/SectionHeading';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const news = [
  {
    title: 'Conférence sur les innovations en santé numérique',
    date: '15 Mars 2026',
    author: 'Dr. Cheikh saadbou Diop',
    category: 'Événement',
    description: 'Une journée dédiée aux nouvelles technologies au service du diagnostic de santé.',
    image: '/images/photo2.jpg',
  },
  {
    title: 'Nouveau partenariat avec l\'Hôpital Principal de Dakar',
    date: '10 Mars 2026',
    author: 'Direction IPFOSS',
    category: 'Partenariat',
    description: 'Une collaboration renforcée pour offrir de meilleurs stages cliniques à nos étudiants.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2053',
  },
  {
    title: 'Cérémonie de remise des diplômes 2025',
    date: '05 Mars 2026',
    author: 'Scolarité',
    category: 'Vie de l\'école',
    description: 'Félicitations à nos nouveaux diplômés qui rejoignent le monde professionnel.',
    image: '/images/photo4.jpg',
  },
];

export default function Actualites() {
  return (
    <div className="pt-10">
      <section className="bg-medical-blue py-16 md:py-24 relative overflow-hidden">
        <div className="section-padding relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-6xl font-display font-bold text-white mb-6">Actualités & Événements</h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">Suivez la vie de l'établissement, nos conférences et nos réussites.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {news.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-medical-blue text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {item.author}
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold text-gray-900 mb-4 group-hover:text-medical-blue transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3">
                  {item.description}
                </p>
                <button className="text-medical-blue text-sm font-bold flex items-center gap-2 group/link">
                  Lire la suite <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
