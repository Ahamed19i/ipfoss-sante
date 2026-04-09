import { motion } from 'motion/react';
import SectionHeading from '../components/SectionHeading';
import Hero from '../components/Hero';
import { Stethoscope, HeartPulse, Microscope, Activity, ShieldCheck, Users, ArrowRight, Clock, GraduationCap, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'infirmiers', name: 'Soins Infirmiers', icon: HeartPulse },
  { id: 'biomedecine', name: 'Sciences Biomédicales', icon: Microscope },
  { id: 'sante-publique', name: 'Santé Publique', icon: Activity },
];

const programs = [
  {
    category: 'infirmiers',
    title: 'Licence en Soins Infirmiers',
    duration: '3 ans',
    degree: 'Licence d\'État',
    description: 'Maîtrisez les gestes techniques et la relation d\'aide pour une prise en charge globale et humaine du patient.',
    outcomes: ['Infirmier d\'État', 'Cadre de santé', 'Infirmier spécialisé'],
    requirements: 'Baccalauréat toutes séries (S de préférence).',
  },
  {
    category: 'biomedecine',
    title: 'Technicien Supérieur de Laboratoire',
    duration: '3 ans',
    degree: 'Licence Professionnelle',
    description: 'Formez-vous aux techniques d\'analyse biologique, biochimique et microbiologique pour le diagnostic médical.',
    outcomes: ['Technicien de laboratoire', 'Responsable qualité', 'Recherche biologique'],
    requirements: 'Baccalauréat Scientifique.',
  },
  {
    category: 'sante-publique',
    title: 'Master en Santé Publique',
    duration: '2 ans',
    degree: 'Master de Recherche / Professionnel',
    description: 'Apprenez à concevoir, gérer et évaluer des programmes de santé à l\'échelle des populations.',
    outcomes: ['Gestionnaire de programmes', 'Épidémiologiste', 'Consultant santé'],
    requirements: 'Licence en santé ou sciences sociales.',
  },
];

export default function Formations() {
  return (
    <div className="pt-10">
      <Hero 
        title="Nos Formations"
        subtitle="Des programmes d'excellence conçus pour former les futurs leaders du système de santé."
        image="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2070"
        badge="Excellence Académique"
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
          {categories.map((cat) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-48">
              <SectionHeading
                title={cat.name}
                subtitle={`Découvrez nos programmes spécialisés en ${cat.name.toLowerCase()}.`}
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {programs
                  .filter((p) => p.category === cat.id)
                  .map((program, i) => (
                    <motion.div
                      key={program.title}
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
                              {program.outcomes.map((outcome, idx) => (
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
                        
                        <div className="flex flex-wrap gap-4 pt-10 border-t border-gray-50">
                          <Link to="/admissions" className="btn-primary flex-1 min-w-[200px]">
                            Candidater <ArrowRight className="w-5 h-5" />
                          </Link>
                          <Link to="/contact" className="btn-secondary flex-1 min-w-[200px]">
                            Plus d'informations
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

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
