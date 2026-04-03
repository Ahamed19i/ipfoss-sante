import { motion } from 'motion/react';
import SectionHeading from '../components/SectionHeading';
import { Target, Eye, ShieldCheck, GraduationCap, Quote } from 'lucide-react';

const values = [
  {
    title: 'Excellence',
    description: 'Nous visons les plus hauts standards académiques et cliniques dans toutes nos formations.',
    icon: GraduationCap,
  },
  {
    title: 'Éthique',
    description: 'Le respect de la vie humaine et l\'intégrité professionnelle sont au cœur de notre enseignement.',
    icon: ShieldCheck,
  },
  {
    title: 'Innovation',
    description: 'Nous intégrons les dernières technologies médicales et pédagogiques pour une formation moderne.',
    icon: Target,
  },
  {
    title: 'Engagement',
    description: 'Former des professionnels dévoués au bien-être des populations et au développement sanitaire.',
    icon: Eye,
  },
];

export default function About() {
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
            <h1 className="text-3xl md:text-6xl font-display font-bold text-white mb-6">À Propos de l'IPFOSS</h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Une institution dédiée à l'excellence médicale, ancrée dans les réalités du Sénégal et ouverte sur le monde.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <SectionHeading
              title="Notre Mission & Vision"
              subtitle="Depuis notre création, nous nous efforçons de redéfinir les standards de la formation en santé en Afrique de l'Ouest."
            />
            <div className="space-y-8">
              <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-medical-blue">
                <h3 className="text-xl font-display font-bold mb-3 text-medical-blue">Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  Former des professionnels de santé compétents, éthiques et innovants, capables de relever les défis complexes des systèmes de santé modernes et d'améliorer la qualité des soins prodigués aux populations.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-health-green">
                <h3 className="text-xl font-display font-bold mb-3 text-health-green">Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  Devenir le pôle d'excellence de référence en Afrique pour l'enseignement supérieur en santé, homologué par l'État sénégalais pour la qualité de ses diplômés et son impact sur la recherche.
                </p>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2070"
              alt="Medical Team"
              className="rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-gray-100">
              <div className="flex items-center gap-2 text-academic-gold mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-sm font-medium text-gray-800 italic">"Une formation qui change la donne pour le système de santé sénégalais."</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            centered
            title="Nos Valeurs Fondamentales"
            subtitle="Ces principes guident chaque décision et chaque interaction au sein de notre établissement."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all text-center group"
              >
                <div className="w-16 h-16 bg-medical-light rounded-full flex items-center justify-center text-medical-blue mx-auto mb-6 group-hover:bg-medical-blue group-hover:text-white transition-colors">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-bold mb-4 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Director's Message */}
      <section className="section-padding">
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl p-12 md:p-20 relative overflow-hidden">
          <Quote className="absolute top-10 left-10 w-24 h-24 text-gray-50 -z-0" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center relative z-10">
            <div className="lg:col-span-1">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border-8 border-white">
                <img
                  src="/images/dr1.jpg"
                  alt="Director"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-display font-bold mb-8 text-gray-900">Le Mot du Directeur</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg italic">
                <p>
                  "Bienvenue à l'IPFOSS École de Santé. Notre mission est de former non seulement des techniciens de la santé, mais des praticiens dotés d'une conscience éthique profonde et d'une capacité d'adaptation face aux évolutions constantes de la médecine."
                </p>
                <p>
                  "Nous croyons que l'excellence académique doit s'accompagner d'une immersion clinique précoce. C'est pourquoi nous avons tissé des liens étroits avec les plus grandes institutions hospitalières du pays."
                </p>
                <p>
                  "Rejoindre l'IPFOSS, c'est choisir l'excellence pour servir la vie."
                </p>
              </div>
              <div className="mt-10">
                <p className="font-display font-bold text-xl text-gray-900">Dr. Cheikh saadbou Diop</p>
                <p className="text-medical-blue font-medium">Directeur Général, IPFOSS École de Santé</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
