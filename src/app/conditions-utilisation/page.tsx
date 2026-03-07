/* eslint-disable react/no-unescaped-entities */
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: "Conditions d'utilisation — TahitiTechDigital",
}

export default function ConditionsUtilisation() {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        <div className="container">
          <div className="legal-content">
            <h1>{"Conditions d'utilisation"}</h1>
            <p className="legal-date">Dernière mise à jour : mars 2026</p>

            <section>
              <h2>1. Objet</h2>
              <p>
                Les présentes conditions d'utilisation régissent l'accès et l'utilisation du site internet <strong>tahititechdigital.com</strong> (ci-après « le Site »), édité par TahitiTechDigital, agence digitale et IA basée en Polynésie française. En accédant au Site, vous acceptez sans réserve les présentes conditions.
              </p>
            </section>

            <section>
              <h2>2. Accès au site</h2>
              <p>
                L'accès au Site est gratuit et ne nécessite pas de création de compte. TahitiTechDigital se réserve le droit de modifier, suspendre ou interrompre l'accès au Site à tout moment, sans préavis, notamment pour des raisons de maintenance ou d'évolution technique.
              </p>
            </section>

            <section>
              <h2>3. Propriété intellectuelle</h2>
              <p>
                L'ensemble des contenus présents sur le Site (textes, images, logos, graphismes, animations, code source) est la propriété exclusive de TahitiTechDigital ou de ses partenaires et est protégé par le droit de la propriété intellectuelle applicable en Polynésie française et en France.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des contenus, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de TahitiTechDigital.
              </p>
            </section>

            <section>
              <h2>4. Utilisation autorisée</h2>
              <p>Le Site est mis à disposition à des fins d'information et de prise de contact commercial. Il est interdit :</p>
              <ul>
                <li>D'utiliser le Site à des fins illicites ou frauduleuses.</li>
                <li>De tenter d'accéder de manière non autorisée aux systèmes informatiques du Site.</li>
                <li>De transmettre des contenus nuisibles, diffamatoires ou illégaux via le formulaire de contact.</li>
                <li>D'utiliser des robots, scripts ou outils automatisés pour scraper ou surcharger le Site.</li>
              </ul>
            </section>

            <section>
              <h2>5. Limitation de responsabilité</h2>
              <p>
                TahitiTechDigital s'efforce de maintenir les informations du Site à jour et exactes, mais ne garantit pas l'exactitude, l'exhaustivité ou l'actualité des informations publiées. TahitiTechDigital ne saurait être tenu responsable de tout dommage direct ou indirect résultant de l'utilisation du Site ou de l'impossibilité d'y accéder.
              </p>
            </section>

            <section>
              <h2>6. Liens hypertextes</h2>
              <p>
                Le Site peut contenir des liens vers des sites tiers. TahitiTechDigital n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leur politique de confidentialité.
              </p>
            </section>

            <section>
              <h2>7. Droit applicable</h2>
              <p>
                Les présentes conditions d'utilisation sont soumises au droit applicable en Polynésie française. Tout litige relatif à l'utilisation du Site sera soumis à la compétence des juridictions compétentes de Papeete.
              </p>
            </section>

            <section>
              <h2>8. Contact</h2>
              <p>
                Pour toute question relative aux présentes conditions :{' '}
                <a href="mailto:contact@tahititechdigital.com">contact@tahititechdigital.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
