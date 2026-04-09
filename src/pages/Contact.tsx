import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import SectionHeading from '../components/SectionHeading';
import Hero from '../components/Hero';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, HelpCircle, CheckCircle2 } from 'lucide-react';

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    console.log("Données de contact envoyées à ipfossante@gmail.com:", data);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitted(true);
  };

  return (
    <div className="pt-10">
      <Hero 
        title="Contactez-nous"
        subtitle="Une question ? Un projet de formation ? Notre équipe est à votre écoute pour vous guider vers l'excellence."
        image="/images/photo4.jpg"
        badge="À Votre Écoute"
      />

      {/* Contact Info Cards */}
      <section className="py-12 -mt-24 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 text-center group hover:scale-105 transition-all"
              >
                <div className={`w-16 h-16 ${info.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-gray-200 group-hover:rotate-6 transition-all`}>
                  <info.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{info.title}</h3>
                <p className="text-xl font-display font-bold text-gray-900">{info.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center gap-5 mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-medical-light flex items-center justify-center text-medical-blue">
                      <MessageSquare className="w-7 h-7" />
                    </div>
                    <h2 className="text-4xl font-display font-bold text-gray-900 leading-tight">Envoyez-nous un message</h2>
                  </div>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">Nom Complet</label>
                        <input
                          {...register('fullName', { required: "Nom requis" })}
                          className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all text-lg"
                          placeholder="Ex: Moussa Diop"
                        />
                        {errors.fullName && <span className="text-red-500 text-xs font-bold ml-1">{errors.fullName.message as string}</span>}
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">Téléphone</label>
                        <input
                          {...register('phone', { required: "Téléphone requis" })}
                          className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all text-lg"
                          placeholder="+221 ..."
                        />
                        {errors.phone && <span className="text-red-500 text-xs font-bold ml-1">{errors.phone.message as string}</span>}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">Email Professionnel</label>
                      <input
                        {...register('email', { 
                          required: "Email requis", 
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Email invalide"
                          }
                        })}
                        className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all text-lg"
                        placeholder="votre@email.com"
                      />
                      {errors.email && <span className="text-red-500 text-xs font-bold ml-1">{errors.email.message as string}</span>}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">Sujet de la demande</label>
                      <select
                        {...register('subject', { required: "Sujet requis" })}
                        className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all text-lg appearance-none"
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="admission">Admission & Inscription</option>
                        <option value="formation">Information sur les formations</option>
                        <option value="partenariat">Partenariat</option>
                        <option value="autre">Autre demande</option>
                      </select>
                      {errors.subject && <span className="text-red-500 text-xs font-bold ml-1">{errors.subject.message as string}</span>}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">Votre Message</label>
                      <textarea
                        {...register('message', { required: "Message requis" })}
                        rows={6}
                        className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all text-lg resize-none"
                        placeholder="Comment pouvons-nous vous aider ?"
                      />
                      {errors.message && <span className="text-red-500 text-xs font-bold ml-1">{errors.message.message as string}</span>}
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="btn-primary w-full py-5 flex items-center justify-center gap-3 text-xl disabled:opacity-50 group"
                    >
                      {isSubmitting ? (
                        <div className="w-7 h-7 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Envoyer le message 
                          <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-health-green/10 text-health-green rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-health-green/5">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-4xl font-display font-bold text-gray-900 mb-6 leading-tight">Message Envoyé !</h3>
                  <p className="text-gray-600 mb-10 max-w-sm mx-auto text-lg leading-relaxed">
                    Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais sur votre adresse email.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-medical-blue font-bold hover:underline text-lg"
                  >
                    Envoyer un autre message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="lg:col-span-5 space-y-12">
            <div>
              <SectionHeading
                title="Notre Emplacement"
                subtitle="Retrouvez-nous au cœur de Dakar pour une visite de nos installations."
              />
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white relative bg-gray-100 group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.113456789!2d-17.4569532!3d14.6836976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec1725ff4b4b673%3A0x15422dc01527bae1!2sIpfoss+Ecole+De+Sante!5e0!3m2!1sfr!2ssn!4v1712130000000!5m2!1sfr!2ssn"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                  title="Localisation IPFOSS"
                ></iframe>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-xl">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-health-green/10 flex items-center justify-center text-health-green">
                  <HelpCircle className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-display font-bold text-gray-900 leading-tight">FAQ Rapide</h2>
              </div>
              <div className="space-y-8">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-gray-50 pb-8 last:border-0 last:pb-0 group">
                    <h4 className="font-display font-bold text-gray-900 mb-3 text-lg group-hover:text-medical-blue transition-colors">{faq.question}</h4>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
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
