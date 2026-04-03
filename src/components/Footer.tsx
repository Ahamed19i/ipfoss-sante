import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';

const footerLinks = [
  {
    title: 'L\'École',
    links: [
      { name: 'À Propos', path: '/a-propos' },
      { name: 'Vision & Mission', path: '/a-propos#vision' },
      { name: 'Mot du Directeur', path: '/a-propos#directeur' },
      { name: 'Partenariats', path: '/recherche#partenaires' },
    ],
  },
  {
    title: 'Formations',
    links: [
      { name: 'Soins Infirmiers', path: '/formations#infirmiers' },
      { name: 'Santé Publique', path: '/formations#sante-publique' },
      { name: 'Biomédecine', path: '/formations#biomedecine' },
    ],
  },
  {
    title: 'Admissions',
    links: [
      { name: 'Procédure', path: '/admissions' },
      { name: 'Frais de Scolarité', path: '/admissions#frais' },
      { name: 'Candidature en ligne', path: '/admissions#formulaire' },
      { name: 'FAQ', path: '/contact#faq' },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="bg-medical-blue p-2 rounded-lg">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-2xl leading-none text-white">
                IPFOSS
              </span>
              <span className="text-[10px] font-medium tracking-widest uppercase text-gray-400">
                École de Santé
              </span>
            </div>
          </Link>
          <p className="text-gray-400 mb-8 max-w-sm leading-relaxed">
            L'excellence académique au service de la santé. Former les leaders de demain pour un système de santé performant et humain au Sénégal et en Afrique.
          </p>
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-medical-blue transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {footerLinks.map((section) => (
          <div key={section.title}>
            <h4 className="font-display font-bold text-lg mb-6">{section.title}</h4>
            <ul className="space-y-4">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-gray-800 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-medical-blue/10 flex items-center justify-center text-medical-blue">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Adresse</p>
              <p className="text-sm text-gray-300">Dakar, Sénégal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-medical-blue/10 flex items-center justify-center text-medical-blue">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Téléphone</p>
              <p className="text-sm text-gray-300">+221 33 848 41 33</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-medical-blue/10 flex items-center justify-center text-medical-blue">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Email</p>
              <p className="text-sm text-gray-300">ipfossante@gmail.com</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} IPFOSS École de Santé. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Plan du Site</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
