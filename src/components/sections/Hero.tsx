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
          <div className="hero-graphic">
            <div className="hero-orbit hero-orbit-1"></div>
            <div className="hero-orbit hero-orbit-2"></div>
            <div className="hero-orbit hero-orbit-3"></div>
            <div className="hero-center-logo">
              <img src="/logo-ttd.png" alt="TahitiTechDigital" className="hero-center-logo-img" />
            </div>
            <div className="orbit-node orbit-node-1">🤖</div>
            <div className="orbit-node orbit-node-2">🛒</div>
            <div className="orbit-node orbit-node-3">📊</div>
            <div className="orbit-node orbit-node-4">⚡</div>
            <div className="orbit-node orbit-node-5">🌐</div>
            <div className="orbit-node orbit-node-6">🔧</div>
          </div>
        </div>
      </div>
    </section>
  )
}
