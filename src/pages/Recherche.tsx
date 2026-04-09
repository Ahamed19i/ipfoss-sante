import { motion } from 'motion/react';
import SectionHeading from '../components/SectionHeading';
import Hero from '../components/Hero';
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
      <Hero 
        title="Recherche & Innovation"
        subtitle="Contribuer à l'avancement des sciences de la santé par la rigueur scientifique et l'innovation technologique."
        image="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=2070"
        badge="Science & Progrès"
      />

      <section className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4 space-y-10">
            <SectionHeading title="Notre Vision Scientifique" subtitle="L'IPFOSS s'engage dans une recherche appliquée répondant aux besoins réels de santé des populations africaines." />
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-medical-light rounded-2xl flex items-center justify-center text-medical-blue mb-6">
                <Globe className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-display font-bold text-gray-900 mb-4">Impact Global</h4>
              <p className="text-gray-600 leading-relaxed">Nos travaux sont publiés dans des revues internationales et contribuent aux bases de données mondiales de santé.</p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-medical-light rounded-2xl flex items-center justify-center text-medical-blue mb-6">
                <Users className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-display font-bold text-gray-900 mb-4">Collaboration</h4>
              <p className="text-gray-600 leading-relaxed">Nous collaborons avec l'Institut Pasteur, l'UCAD et plusieurs universités européennes de renom.</p>
            </div>
          </div>
          
          <div className="lg:col-span-8 space-y-10">
            <h3 className="text-3xl font-display font-bold text-gray-900 mb-10 border-b border-gray-100 pb-6">Projets Phares</h3>
            <div className="space-y-8">
              {projects.map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all group"
                >
                  <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                    <span className={`px-5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest ${project.status === 'En cours' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                      {project.status}
                    </span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{project.team}</span>
                  </div>
                  <h4 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4 group-hover:text-medical-blue transition-colors leading-tight">{project.title}</h4>
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">{project.description}</p>
                  <button className="inline-flex items-center gap-3 text-medical-blue font-bold group/link hover:gap-4 transition-all">
                    Voir les détails 
                    <div className="w-8 h-8 rounded-full bg-medical-light flex items-center justify-center group-hover/link:bg-medical-blue group-hover/link:text-white transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
