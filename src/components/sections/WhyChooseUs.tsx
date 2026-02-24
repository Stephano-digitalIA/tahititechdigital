import { WHY_CARDS_DATA } from '@/lib/data'

export default function WhyChooseUs() {
  return (
    <section id="why">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">Nos atouts</div>
          <h2 className="section-title">
            Pourquoi choisir <span className="gradient-text">TAHITITECHDIGITAL</span> ?
          </h2>
          <p className="section-subtitle">
            Pour économiser du temps et de l&#39;argent grâce à l&#39;automatisation intelligente.
          </p>
        </div>

        <div className="why-grid">
          {WHY_CARDS_DATA.map((card) => (
            <div key={card.id} className="why-card reveal">
              <div className="why-icon">{card.icon}</div>
              <h4>{card.title}</h4>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
