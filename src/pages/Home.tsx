
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Users, Award, Building2, Stethoscope, HeartPulse, Microscope, Activity, GraduationCap, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';

const stats = [
  { label: 'Taux de réussite', value: '98%', icon: Award },
  { label: 'Étudiants formés', value: '2500+', icon: Users },
  { label: 'Partenaires hospitaliers', value: '45+', icon: Building2 },
  { label: 'Années d\'excellence', value: '15+', icon: Activity },
];

const programs = [
  {
    title: 'Soins Infirmiers',
    description: 'Développez les compétences techniques et humaines indispensables pour une prise en charge optimale des patients.',
    icon: HeartPulse,
    color: 'bg-green-500',
  },
  {
    title: 'Sciences Biomédicales',
    description: 'Explorez les fondements biologiques de la santé et participez aux innovations diagnostiques de demain.',
    icon: Microscope,
    color: 'bg-purple-500',
  },
  {
    title: 'Santé Publique',
    description: 'Apprenez à concevoir, gérer et évaluer des programmes de santé à l\'échelle des populations.',
    icon: Activity,
    color: 'bg-orange-500',
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero1.jpg"
            alt="Medical Education"
            className="w-full h-full object-cover brightness-[0.3]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-blue/80 to-transparent" />
        </div>

        <div className="section-padding relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-bold tracking-widest uppercase mb-6">
                L'Excellence en Santé à Dakar
              </span>
              <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-8 leading-[1.1]">
                IPFOSS École de Santé : L'excellence en <span className="text-health-green">études infirmières</span> au Sénégal
              </h1>
              <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-2xl">
                IPFOSS École de Santé est l'institution de référence au Sénégal pour une formation en santé de standard international. Rigueur, éthique et innovation au service de la vie.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/admissions#formulaire" className="btn-primary flex items-center gap-2 px-8 py-4">
                  Candidater maintenant <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/contact" className="px-8 py-4 rounded-2xl font-bold text-white border-2 border-white/30 hover:bg-white hover:text-medical-blue transition-all backdrop-blur-sm">
                  Prendre rendez-vous
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 md:py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <stat.icon className="w-6 h-6 text-medical-blue" />
                  <span className="text-3xl md:text-4xl font-display font-bold text-gray-900">{stat.value}</span>
                </div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links / Features */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Link to="/admissions#formulaire" className="group p-8 rounded-3xl bg-medical-blue text-white hover:scale-[1.02] transition-all shadow-xl shadow-medical-blue/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                <GraduationCap className="w-24 h-24" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 relative z-10">Inscriptions 2026</h3>
              <p className="text-white/80 mb-6 relative z-10">Les inscriptions pour la rentrée prochaine sont ouvertes. Déposez votre dossier dès maintenant.</p>
              <span className="inline-flex items-center gap-2 font-bold relative z-10">
                Postuler <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
            <Link to="/formations" className="group p-8 rounded-3xl bg-health-green text-white hover:scale-[1.02] transition-all shadow-xl shadow-health-green/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                <Stethoscope className="w-24 h-24" />
              </div>
              <p className="text-2xl font-display font-bold mb-4 relative z-10">Nos Formations</p>
              <p className="text-white/80 mb-6 relative z-10">Découvrez nos pôles d'excellence en soins infirmiers, santé publique et sciences biomédicales.</p>
              <span className="inline-flex items-center gap-2 font-bold relative z-10">
                Explorer <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
            <Link to="/contact" className="group p-8 rounded-3xl bg-gray-900 text-white hover:scale-[1.02] transition-all shadow-xl shadow-gray-900/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                <Calendar className="w-24 h-24" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 relative z-10">Rendez-vous</h3>
              <p className="text-white/80 mb-6 relative z-10">Besoin d'un conseil ? Prenez rendez-vous avec nos conseillers d'orientation.</p>
              <span className="inline-flex items-center gap-2 font-bold relative z-10">
                Réserver <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="section-padding bg-gray-50">
        <SectionHeading
          centered
          title="Nos Pôles de Formation Médicale"
          subtitle="Des programmes de soins infirmiers et de santé publique conçus pour répondre aux défis sanitaires du Sénégal."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, i) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all group border border-gray-100"
            >
              <div className={`w-14 h-14 ${program.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                <program.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-gray-900">{program.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {program.description}
              </p>
              <Link to="/formations" className="text-medical-blue font-bold flex items-center gap-2 group/link">
                En savoir plus <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/dr1.jpg"
                alt="Students in Lab"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-medical-blue p-8 rounded-2xl text-white shadow-xl hidden md:block max-w-xs">
              <p className="text-lg font-display font-bold mb-2">"L'éthique au cœur de l'apprentissage"</p>
              <p className="text-sm text-white/70">— Dr. Cheikh saadbou Diop, Directeur de l'IPFOSS</p>
            </div>
          </motion.div>

          <div>
            <SectionHeading
              title="Une Institution d'Excellence"
              subtitle="Fondée sur des valeurs de rigueur et d'humanisme, notre école prépare les futurs cadres de santé aux réalités du terrain."
            />
            <ul className="space-y-6 mb-10">
              {[
                "Corps professoral international de haut niveau",
                "Laboratoires de simulation médicale de pointe",
                "Stages garantis dans les meilleurs hôpitaux",
                "Diplômes homologués par l'État sénégalais"
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <CheckCircle2 className="w-6 h-6 text-health-green shrink-0 mt-1" />
                  <span className="text-lg text-gray-700">{item}</span>
                </motion.li>
              ))}
            </ul>
            <Link to="/a-propos" className="btn-primary inline-block">
              Découvrir notre vision
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-gray-400 font-bold uppercase tracking-widest text-xs mb-12">Nos Partenaires Hospitaliers & Académiques</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            {/* Placeholder logos */}
            <div className="text-2xl font-display font-black text-gray-400">HÔPITAL PRINCIPAL</div>
            <div className="text-2xl font-display font-black text-gray-400">CHANNES</div>
            <div className="text-2xl font-display font-black text-gray-400">INSTITUT PASTEUR</div>
            <div className="text-2xl font-display font-black text-gray-400">UCAD</div>
            <div className="text-2xl font-display font-black text-gray-400">MINISTÈRE SANTÉ</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-medical-blue rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-health-green rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8">
              Prêt à commencer votre carrière en santé ?
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Rejoignez une communauté d'étudiants passionnés et bénéficiez d'un encadrement d'exception pour réussir votre parcours professionnel.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/admissions#formulaire" className="bg-white text-medical-blue hover:bg-gray-100 px-10 py-5 rounded-2xl font-bold text-lg shadow-xl transition-all hover:-translate-y-1">
                Déposer ma candidature
              </Link>
              <Link to="/contact" className="bg-medical-blue/20 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1">
                Nous contacter
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
