import { CONTACT_CARDS_DATA } from '@/lib/data'
import ContactForm from '@/components/ui/ContactForm'

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">Contact</div>
          <h2 className="section-title">
            <span className="gradient-text">Contactez</span>-nous
          </h2>
          <p className="section-subtitle">
            Prêt à transformer votre entreprise ? Discutons de vos besoins et découvrons ensemble
            comment TAHITITECHDIGITAL peut accélérer votre croissance.
          </p>
        </div>

        <div className="contact-grid">
          <ContactForm />

          <div className="contact-info reveal">
            <h3>Parlons de votre projet</h3>
            <p>
              Notre équipe est à votre disposition pour analyser vos besoins et vous proposer les
              meilleures solutions.
            </p>

            {CONTACT_CARDS_DATA.map((card) => (
              <div key={card.id} className="contact-card">
                <div className="contact-card-icon">{card.icon}</div>
                <div className="contact-card-text">
                  <h4>{card.title}</h4>
                  <p>
                    {card.lines.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < card.lines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
