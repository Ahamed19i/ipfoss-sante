import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import SectionHeading from '../components/SectionHeading';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, HelpCircle } from 'lucide-react';

const contactInfo = [
  {
    title: 'Téléphone',
    value: '+221 33 848 41 33',
    icon: Phone,
    color: 'bg-blue-500',
  },
  {
    title: 'Email',
    value: 'ipfossante@gmail.com',
    icon: Mail,
    color: 'bg-green-500',
  },
  {
    title: 'Adresse',
    value: 'Dakar, Sénégal',
    icon: MapPin,
    color: 'bg-purple-500',
  },
  {
    title: 'Horaires',
    value: 'Lun - Ven: 08h - 18h',
    icon: Clock,
    color: 'bg-orange-500',
  },
];

const faqs = [
  {
    question: 'Quels sont les diplômes requis pour s\'inscrire ?',
    answer: 'Un Baccalauréat Scientifique (S1 ou S2) ou toutes séries selon la formation choisie est requis. Les dossiers sont examinés par notre commission pédagogique.',
  },
  {
    question: 'L\'école propose-t-elle des stages ?',
    answer: 'Oui, l\'IPFOSS garantit des stages cliniques dans ses hôpitaux et cliniques partenaires dès la deuxième ou troisième année selon le cursus choisi.',
  },
  {
    question: 'Les diplômes sont-ils reconnus par l\'État ?',
    answer: 'Oui, tous nos diplômes sont homologués par l\'État sénégalais et accrédités par le Ministère de l\'Enseignement Supérieur et de la Recherche.',
  },
  {
    question: 'Peut-on payer la scolarité par mensualités ?',
    answer: 'Oui, nous proposons des facilités de paiement échelonnées sur 10 mois pour accompagner les familles.',
  },
];

export default function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    alert('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
  };

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
            <h1 className="text-3xl md:text-6xl font-display font-bold text-white mb-6">Contactez-nous</h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Une question ? Un projet de formation ? Notre équipe est à votre écoute pour vous guider vers l'excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center group hover:scale-105 transition-all"
              >
                <div className={`w-14 h-14 ${info.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gray-200`}>
                  <info.icon className="w-7 h-7" />
                </div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{info.title}</h3>
                <p className="text-lg font-display font-bold text-gray-900">{info.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-[2rem] shadow-2xl border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-medical-blue/10 flex items-center justify-center text-medical-blue">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-display font-bold text-gray-900">Envoyez un message</h2>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nom Complet</label>
                  <input
                    {...register('fullName', { required: true })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all"
                    placeholder="Ex: Moussa Diop"
                  />
                  {errors.fullName && <span className="text-red-500 text-xs mt-1">Ce champ est requis</span>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Téléphone</label>
                  <input
                    {...register('phone', { required: true })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all"
                    placeholder="+221 ..."
                  />
                  {errors.phone && <span className="text-red-500 text-xs mt-1">Ce champ est requis</span>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <input
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all"
                  placeholder="votre@email.com"
                />
                {errors.email && <span className="text-red-500 text-xs mt-1">Email invalide</span>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Sujet</label>
                <select
                  {...register('subject', { required: true })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all bg-white"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="admission">Admission & Inscription</option>
                  <option value="formation">Information sur les formations</option>
                  <option value="partenariat">Partenariat</option>
                  <option value="autre">Autre demande</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea
                  {...register('message', { required: true })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all"
                  placeholder="Comment pouvons-nous vous aider ?"
                />
                {errors.message && <span className="text-red-500 text-xs mt-1">Ce champ est requis</span>}
              </div>

              <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-lg">
                Envoyer le message <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>

          <div className="space-y-12">
            <div>
              <SectionHeading
                title="Notre Emplacement"
                subtitle="Retrouvez-nous au cœur de Dakar pour une visite de nos installations."
              />
              <div className="aspect-video rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white relative bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.113456789!2d-17.4569532!3d14.6836976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec1725ff4b4b673%3A0x15422dc01527bae1!2sIpfoss+Ecole+De+Sante!5e0!3m2!1sfr!2ssn!4v1712130000000!5m2!1sfr!2ssn"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                  title="Localisation IPFOSS"
                ></iframe>
              </div>
            </div>

            <div className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-health-green/10 flex items-center justify-center text-health-green">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-display font-bold text-gray-900">FAQ Rapide</h2>
              </div>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <h4 className="font-display font-bold text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
