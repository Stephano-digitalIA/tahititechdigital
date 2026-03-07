export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Agence digitale basée en Polynésie française
          </div>
          <h1>
            <span className="gradient-text">Transformez</span> votre entreprise,<br />
            <span className="gradient-text">accélérez</span> votre croissance
          </h1>
          <p className="hero-description">
            Automatisation IA, développement web &amp; marketplace, e-commerce et consulting digital.
            Nous propulsons les entreprises polynésiennes vers l&#39;excellence numérique.
          </p>
          <div className="hero-ctas">
            <a href="#contact" className="btn-primary">
              Démarrer un projet →
            </a>
            <a href="#services" className="btn-secondary">
              Découvrir nos services
            </a>
          </div>
          <div className="hero-badges">
            <div className="hero-trust-badge">
              <span className="dot dot-violet"></span> Automatisation IA
            </div>
            <div className="hero-trust-badge">
              <span className="dot dot-cyan"></span> Support local
            </div>
            <div className="hero-trust-badge">
              <span className="dot dot-pink"></span> ROI mesurable
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-spline-container">
            <iframe
              src="https://my.spline.design/genkubgreetingrobot-Cn9LkG2IKJdCanCcPNNxlxMS/"
              frameBorder="0"
              width="100%"
              height="100%"
              title="TahitiTechDigital 3D"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
