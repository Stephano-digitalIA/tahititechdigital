/* eslint-disable react/no-unescaped-entities */
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Politique de confidentialité — TahitiTechDigital',
}

export default function PolitiqueConfidentialite() {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        <div className="container">
          <div className="legal-content">
            <h1>Politique de confidentialité</h1>
            <p className="legal-date">Dernière mise à jour : mars 2026</p>

            <section>
              <h2>1. Responsable du traitement</h2>
              <p>
                Le responsable du traitement des données personnelles collectées sur ce site est :<br />
                <strong>TahitiTechDigital</strong><br />
                Polynésie française<br />
                Email : <a href="mailto:contact@tahititechdigital.com?subject=Contact%20TahitiTechDigital">contact@tahititechdigital.com</a>
              </p>
            </section>

            <section>
              <h2>2. Données collectées</h2>
              <p>Nous collectons les données suivantes :</p>
              <ul>
                <li><strong>Via le formulaire de contact</strong> : nom, prénom, adresse email, numéro de téléphone (optionnel), nom de l'entreprise, description du projet, enregistrements audio (optionnel).</li>
                <li><strong>Via la navigation</strong> : données techniques (adresse IP, type de navigateur, pages visitées) collectées à des fins statistiques anonymes.</li>
              </ul>
            </section>

            <section>
              <h2>3. Finalités du traitement</h2>
              <p>Vos données sont utilisées pour :</p>
              <ul>
                <li>Répondre à vos demandes de contact et de devis.</li>
                <li>Vous envoyer des informations relatives à nos services si vous en faites la demande.</li>
                <li>Améliorer notre site et nos services (données de navigation anonymisées).</li>
                <li>Respecter nos obligations légales.</li>
              </ul>
            </section>

            <section>
              <h2>4. Durée de conservation</h2>
              <p>
                Les données issues du formulaire de contact sont conservées pendant une durée maximale de <strong>3 ans</strong> à compter de votre dernier contact avec nous. Les enregistrements audio sont supprimés après traitement de votre demande (délai maximum de 30 jours).
              </p>
            </section>

            <section>
              <h2>5. Destinataires des données</h2>
              <p>
                Vos données ne sont ni vendues, ni cédées à des tiers. Elles peuvent être transmises à nos prestataires techniques dans le seul but d'assurer le bon fonctionnement de nos services (hébergement, envoi d'emails). Ces prestataires agissent exclusivement en qualité de sous-traitants et sont soumis à des obligations de confidentialité.
              </p>
            </section>

            <section>
              <h2>6. Vos droits</h2>
              <p>Conformément à la réglementation applicable, vous disposez des droits suivants :</p>
              <ul>
                <li><strong>Droit d'accès</strong> : obtenir une copie de vos données personnelles.</li>
                <li><strong>Droit de rectification</strong> : corriger des données inexactes ou incomplètes.</li>
                <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données.</li>
                <li><strong>Droit à la limitation</strong> : limiter le traitement de vos données.</li>
                <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données.</li>
              </ul>
              <p>
                Pour exercer ces droits, contactez-nous à :{' '}
                <a href="mailto:contact@tahititechdigital.com?subject=Contact%20TahitiTechDigital">contact@tahititechdigital.com</a>
              </p>
            </section>

            <section>
              <h2>7. Cookies</h2>
              <p>
                Notre site utilise uniquement des cookies techniques strictement nécessaires au fonctionnement du site (préférence de thème clair/sombre). Aucun cookie publicitaire ou de tracking tiers n'est utilisé.
              </p>
            </section>

            <section>
              <h2>8. Sécurité</h2>
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou divulgation (chiffrement HTTPS, accès restreints).
              </p>
            </section>

            <section>
              <h2>9. Contact</h2>
              <p>
                Pour toute question relative à cette politique ou à vos données personnelles :<br />
                <a href="mailto:contact@tahititechdigital.com?subject=Contact%20TahitiTechDigital">contact@tahititechdigital.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
