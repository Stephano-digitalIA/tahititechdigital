/* eslint-disable react/no-unescaped-entities */
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Conditions de vente — TahitiTechDigital',
}

export default function ConditionsVente() {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        <div className="container">
          <div className="legal-content">
            <h1>Conditions générales de vente</h1>
            <p className="legal-date">Dernière mise à jour : mars 2026</p>

            <section>
              <h2>1. Objet</h2>
              <p>
                Les présentes conditions générales de vente (CGV) s'appliquent à toutes les prestations de services fournies par <strong>TahitiTechDigital</strong> (ci-après « le Prestataire ») à ses clients professionnels et particuliers (ci-après « le Client »). Toute commande implique l'acceptation pleine et entière des présentes CGV.
              </p>
            </section>

            <section>
              <h2>2. Prestations proposées</h2>
              <p>TahitiTechDigital propose les services suivants :</p>
              <ul>
                <li>Automatisation et intégration de solutions IA (agents IA, chatbots, workflows automatisés).</li>
                <li>Développement de sites web et d'applications web sur mesure.</li>
                <li>Création et gestion de boutiques e-commerce.</li>
                <li>Consulting digital et accompagnement à la transformation numérique.</li>
              </ul>
            </section>

            <section>
              <h2>3. Devis et commande</h2>
              <p>
                Toute prestation fait l'objet d'un devis personnalisé, établi gratuitement après analyse du besoin du Client. Le devis est valable <strong>30 jours</strong> à compter de sa date d'émission. La commande est confirmée à réception du devis signé et du règlement de l'acompte prévu.
              </p>
            </section>

            <section>
              <h2>4. Tarifs</h2>
              <p>
                Les tarifs sont indiqués en francs pacifiques (XPF) ou en euros (EUR) selon accord, hors taxes applicables le cas échéant. TahitiTechDigital se réserve le droit de modifier ses tarifs à tout moment. Les prestations sont facturées selon les tarifs en vigueur au moment de la validation de la commande.
              </p>
            </section>

            <section>
              <h2>5. Modalités de paiement</h2>
              <p>Les modalités de règlement sont les suivantes :</p>
              <ul>
                <li><strong>Acompte de 40 %</strong> à la signature du devis, avant démarrage de la prestation.</li>
                <li><strong>Solde de 60 %</strong> à la livraison du projet ou selon l'échéancier défini dans le devis.</li>
              </ul>
              <p>
                Les paiements s'effectuent par virement bancaire ou tout autre moyen convenu par écrit. Tout retard de paiement entraîne l'application de pénalités de retard au taux légal en vigueur.
              </p>
            </section>

            <section>
              <h2>6. Délais de réalisation</h2>
              <p>
                Les délais de livraison sont définis dans le devis et courent à compter de la réception de l'acompte et de l'ensemble des éléments nécessaires fournis par le Client. TahitiTechDigital ne saurait être tenu responsable de tout retard imputable au Client (retard dans la fourniture de contenus, de retours ou de validations).
              </p>
            </section>

            <section>
              <h2>7. Propriété intellectuelle</h2>
              <p>
                Les créations réalisées par TahitiTechDigital restent sa propriété jusqu'au paiement intégral de la prestation. À réception du solde, les droits d'utilisation sont cédés au Client pour les usages définis dans le devis. TahitiTechDigital se réserve le droit de mentionner la réalisation dans son portfolio, sauf accord contraire express du Client.
              </p>
            </section>

            <section>
              <h2>8. Droit de rétractation</h2>
              <p>
                Conformément à la réglementation applicable, les clients particuliers disposent d'un délai de rétractation de <strong>14 jours</strong> à compter de la signature du devis, à condition que la prestation n'ait pas encore débuté. La rétractation doit être notifiée par écrit à l'adresse{' '}
                <a href="mailto:contact@tahititechdigital.com?subject=Contact%20TahitiTechDigital">contact@tahititechdigital.com</a>.
                Ce droit ne s'applique pas aux prestations déjà exécutées avec l'accord exprès du Client.
              </p>
            </section>

            <section>
              <h2>9. Responsabilité</h2>
              <p>
                TahitiTechDigital s'engage à apporter tout le soin nécessaire à l'exécution de ses prestations. Sa responsabilité ne saurait être engagée pour les dommages indirects ou imprévus. En tout état de cause, la responsabilité du Prestataire est limitée au montant de la prestation concernée.
              </p>
            </section>

            <section>
              <h2>10. Résiliation</h2>
              <p>
                En cas de manquement de l'une des parties à ses obligations, l'autre partie peut résilier le contrat après mise en demeure restée sans effet pendant <strong>15 jours</strong>. L'acompte versé reste acquis au Prestataire en compensation des travaux déjà réalisés.
              </p>
            </section>

            <section>
              <h2>11. Droit applicable et litiges</h2>
              <p>
                Les présentes CGV sont soumises au droit applicable en Polynésie française. En cas de litige, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire. À défaut, le litige sera porté devant les juridictions compétentes de <strong>Papeete</strong>.
              </p>
            </section>

            <section>
              <h2>12. Contact</h2>
              <p>
                Pour toute question relative aux présentes CGV :{' '}
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
