import Image from 'next/image'
import { PILLAR_CARDS_DATA, TECH_STACK } from '@/lib/data'

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">À propos</div>
          <h2 className="section-title">
            À propos de <span className="gradient-text">TAHITITECHDIGITAL</span>
          </h2>
          <p className="section-subtitle">
            Spécialiste en automatisation IA et développement digital pour les entreprises polynésiennes.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-text reveal">
            <h3>Notre Mission</h3>
            <p>
              TAHITITECHDIGITAL est née de la conviction que chaque entreprise polynésienne mérite
              d&#39;accéder aux technologies les plus avancées, adaptées à son contexte unique.
            </p>
            <p>
              Avec plus de 35 ans d&#39;expérience dans le monde des affaires en Polynésie française
              et une expertise technique de pointe, nous développons des solutions robustes et
              évolutives qui transforment vos défis quotidiens en avantages concurrentiels durables.
            </p>
            <p>
              De la facturation automatisée aux réponses IA pour vos clients, nous mettons la
              technologie au service de votre croissance.
            </p>

            <div className="tech-stack">
              {TECH_STACK.map((tag) => (
                <span key={tag} className="tech-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="about-pillars reveal">
            {PILLAR_CARDS_DATA.map((pillar) => (
              <div key={pillar.id} className="pillar-card">
                <span className="pillar-icon">{pillar.icon}</span>
                <h4>{pillar.title}</h4>
                <p>{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="founder-card reveal">
          <div className="founder-photo">
            <Image
              src="/ceo-stephano.png"
              alt="Stephano Belleme-Atuahiva, CEO et fondateur de TAHITITECHDIGITAL"
              width={1000}
              height={1000}
              sizes="(max-width: 968px) 200px, 260px"
            />
          </div>

          <div className="founder-content">
            <div className="founder-role">CEO &amp; Fondateur</div>
            <h3 className="founder-name">Stephano Belleme-Atuahiva</h3>
            <p className="founder-quote">
              &laquo; La technologie n&#39;a de valeur que si elle règle un vrai problème.
              Mon rôle, c&#39;est de traduire 35 ans de terrain polynésien en outils
              qui font gagner du temps à vos équipes, dès le premier jour. &raquo;
            </p>
            <p className="founder-bio">
              Basé à Punaauia, j&#39;accompagne les entreprises de Polynésie française dans
              leur automatisation et leur transformation digitale, du premier audit
              jusqu&#39;à la mise en production.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
