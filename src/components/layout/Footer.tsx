export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#">
              <img
                src="/logo-ttd-full.png"
                alt="TahitiTechDigital"
                className="footer-logo-img"
              />
            </a>
            <p>
              Automatisation IA et transformation digitale pour les entreprises polynésiennes.
              Libérez votre temps, boostez votre performance.
            </p>
            <div className="footer-location">📍 Polynésie française</div>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Automatisation IA</a></li>
              <li><a href="#services">Développement Web</a></li>
              <li><a href="#services">E-commerce</a></li>
              <li><a href="#services">Consulting Digital</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Entreprise</h4>
            <ul>
              <li><a href="#about">À propos</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#contact">Demander un devis</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:contact@tahititechdigital.com">contact@tahititechdigital.com</a></li>
              <li><a href="#contact">Consultation en ligne</a></li>
              <li>24h/72 avec notre Agent IA</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 TAHITITECHDIGITAL. Tous droits réservés.</p>
          <div className="footer-legal">
            <a href="#">Politique de confidentialité</a>
            <a href="#">Conditions d&#39;utilisation</a>
            <a href="#">Conditions de vente</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
