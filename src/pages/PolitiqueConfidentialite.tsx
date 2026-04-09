import { motion } from 'motion/react';

export default function PolitiqueConfidentialite() {
  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="section-padding max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-gray-100"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-10">Politique de Confidentialité</h1>
          
          <div className="prose prose-blue max-w-none space-y-8 text-gray-600">
            <section>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">1. Collecte des données</h2>
              <p>
                Nous collectons les informations que vous nous communiquez via nos formulaires de contact et de candidature, notamment :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Projet de formation</li>
                <li>Documents académiques (CV, diplômes)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">2. Utilisation des données</h2>
              <p>
                Les données collectées sont utilisées exclusivement pour :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Traiter vos demandes d'information</li>
                <li>Gérer votre dossier de candidature</li>
                <li>Vous contacter dans le cadre de votre projet d'études</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">3. Conservation des données</h2>
              <p>
                IPFOSS École de Santé conserve vos données pour la durée nécessaire à la gestion de votre dossier ou de votre demande, conformément aux obligations légales en vigueur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">4. Vos droits</h2>
              <p>
                Conformément à la législation sur la protection des données, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. Vous pouvez exercer ces droits en nous contactant à l'adresse : <span className="text-medical-blue font-medium">ipfossante@gmail.com</span>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">5. Sécurité</h2>
              <p>
                Nous mettons en œuvre toutes les mesures techniques et organisationnelles nécessaires pour assurer la sécurité et la confidentialité de vos données personnelles.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
