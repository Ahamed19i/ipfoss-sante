import { motion } from 'motion/react';

export default function MentionsLegales() {
  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="section-padding max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-gray-100"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-10">Mentions Légales</h1>
          
          <div className="prose prose-blue max-w-none space-y-8 text-gray-600">
            <section>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">1. Édition du site</h2>
              <p>
                Le présent site, accessible à l'URL <span className="text-medical-blue font-medium">www.ipfossante.sn</span>, est édité par :
              </p>
              <p className="font-medium text-gray-900">
                IPFOSS École de Santé<br />
                Dakar, Sénégal<br />
                Téléphone : +221 33 848 41 33<br />
                Email : ipfossante@gmail.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">2. Hébergement</h2>
              <p>
                Le Site est hébergé par Google Cloud Platform, dont le siège social est situé à 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">3. Propriété intellectuelle</h2>
              <p>
                L'ensemble de ce site relève de la législation sénégalaise et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de IPFOSS École de Santé.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">4. Responsabilité</h2>
              <p>
                IPFOSS École de Santé s'efforce d'assurer au mieux de ses possibilités, l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, IPFOSS École de Santé ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à la disposition sur ce site.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
