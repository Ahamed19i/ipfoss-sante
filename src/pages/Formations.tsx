import { motion } from 'motion/react';
import SectionHeading from '../components/SectionHeading';
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
      {/* Hero Section */}
      <section className="bg-gray-900 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2070"
            alt="Medical Lab"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="section-padding relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-6xl font-display font-bold text-white mb-6">Nos Formations</h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Des programmes d'excellence conçus pour former les futurs leaders du système de santé.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="py-4 bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-[72px] z-40 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-3 md:gap-6">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-medical-light text-gray-600 hover:text-medical-blue transition-all text-sm font-medium border border-gray-100 hover:border-medical-blue/30"
            >
              <cat.icon className="w-4 h-4" />
              {cat.name}
            </a>
          ))}
        </div>
      </section>

      {/* Programs List */}
      <section className="section-padding bg-gray-50">
        <div className="space-y-24">
          {categories.map((cat) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-48">
              <SectionHeading
                title={cat.name}
                subtitle={`Découvrez nos programmes spécialisés en ${cat.name.toLowerCase()}.`}
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {programs
                  .filter((p) => p.category === cat.id)
                  .map((program, i) => (
                    <motion.div
                      key={program.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
                    >
                      <div className="p-8 md:p-10">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                          <span className="px-4 py-1 bg-medical-light text-medical-blue rounded-full text-xs font-bold uppercase tracking-wider">
                            {program.degree}
                          </span>
                          <span className="px-4 py-1 bg-health-green/10 text-health-green rounded-full text-[10px] font-bold uppercase tracking-wider">
                            Homologué par l'État
                          </span>
                          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                            <Clock className="w-4 h-4" />
                            {program.duration}
                          </div>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 text-gray-900 group-hover:text-medical-blue transition-colors">
                          {program.title}
                        </h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                          {program.description}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                          <div>
                            <h4 className="flex items-center gap-2 font-display font-bold text-gray-900 mb-4">
                              <Briefcase className="w-4 h-4 text-medical-blue" />
                              Débouchés
                            </h4>
                            <ul className="space-y-2">
                              {program.outcomes.map((outcome, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 rounded-full bg-health-green" />
                                  {outcome}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="flex items-center gap-2 font-display font-bold text-gray-900 mb-4">
                              <GraduationCap className="w-4 h-4 text-medical-blue" />
                              Conditions d'accès
                            </h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {program.requirements}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-50">
                          <Link to="/admissions" className="btn-primary py-3 px-8 text-sm">
                            Candidater
                          </Link>
                          <Link to="/contact" className="btn-secondary py-3 px-8 text-sm">
                            Plus d'infos
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
        <div className="bg-medical-blue rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">Accompagnement de Carrière</h2>
              <p className="text-lg text-white/80 mb-10 leading-relaxed">
                À l'IPFOSS, nous ne nous contentons pas de vous former. Nous vous accompagnons vers votre premier emploi grâce à notre réseau de partenaires et nos ateliers de préparation professionnelle.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Aide à la recherche de stage",
                  "Ateliers CV & Entretien",
                  "Réseau d'Alumni actif",
                  "Partenariats hôpitaux-écoles"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white">
                    <ShieldCheck className="w-5 h-5 text-health-green" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
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
