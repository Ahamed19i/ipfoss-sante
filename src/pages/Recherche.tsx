import { motion } from 'motion/react';
import SectionHeading from '../components/SectionHeading';
import { Microscope, FlaskConical, Globe, BookOpen, Users, ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'Épidémiologie des maladies tropicales',
    description: 'Étude approfondie sur la propagation et la prévention des maladies endémiques en Afrique de l\'Ouest.',
    status: 'En cours',
    team: 'Pôle Santé Publique',
  },
  {
    title: 'Innovation en soins infirmiers',
    description: 'Développement de nouveaux protocoles de soins pour améliorer le confort des patients chroniques.',
    status: 'Publié',
    team: 'Département Soins',
  },
  {
    title: 'Biotechnologies & Diagnostic',
    description: 'Recherche sur de nouveaux marqueurs biologiques pour un diagnostic précoce des pathologies cardiovasculaires.',
    status: 'En cours',
    team: 'Laboratoire Biomédical',
  },
];

export default function Recherche() {
  return (
    <div className="pt-10">
      <section className="bg-medical-blue py-16 md:py-24 relative overflow-hidden">
        <div className="section-padding relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-6xl font-display font-bold text-white mb-6">Recherche & Innovation</h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">Contribuer à l'avancement des sciences de la santé par la rigueur scientifique.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <SectionHeading title="Notre Vision Scientifique" subtitle="L'IPFOSS s'engage dans une recherche appliquée répondant aux besoins réels de santé des populations africaines." />
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <h4 className="font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-medical-blue" />
                Impact Global
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">Nos travaux sont publiés dans des revues internationales et contribuent aux bases de données mondiales de santé.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <h4 className="font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-medical-blue" />
                Collaboration
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">Nous collaborons avec l'Institut Pasteur, l'UCAD et plusieurs universités européennes.</p>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-8">Projets Phares</h3>
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${project.status === 'En cours' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                    {project.status}
                  </span>
                  <span className="text-xs font-medium text-gray-400">{project.team}</span>
                </div>
                <h4 className="text-xl font-display font-bold text-gray-900 mb-3 group-hover:text-medical-blue transition-colors">{project.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{project.description}</p>
                <button className="text-medical-blue text-sm font-bold flex items-center gap-2">
                  Voir les détails <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
