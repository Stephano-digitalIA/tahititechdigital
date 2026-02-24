'use client'

import { useState } from 'react'
import { SOLUTIONS_DATA } from '@/lib/data'

export default function Solutions() {
  const [activeTab, setActiveTab] = useState('airbnb')

  return (
    <section id="solutions">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">Cas d&#39;usage</div>
          <h2 className="section-title">
            Solutions <span className="gradient-text">adaptées</span> à vos besoins
          </h2>
          <p className="section-subtitle">
            Découvrez comment nos clients transforment leurs opérations avec des résultats mesurables.
          </p>
        </div>

        <div className="solutions-tabs reveal">
          {SOLUTIONS_DATA.map((sol) => (
            <button
              key={sol.id}
              className={`sol-tab${activeTab === sol.id ? ' active' : ''}`}
              onClick={() => setActiveTab(sol.id)}
            >
              {sol.tabLabel}
            </button>
          ))}
        </div>

        {SOLUTIONS_DATA.map((sol) => (
          <div
            key={sol.id}
            className={`solution-panel${activeTab === sol.id ? ' active' : ''}`}
            id={`panel-${sol.id}`}
          >
            <div className="solution-info">
              <h3>{sol.title}</h3>
              <p>{sol.description}</p>
              <div className="solution-stats">
                {sol.stats.map((stat, i) => (
                  <div key={i} className="solution-stat">
                    <div className="solution-stat-value">{stat.value}</div>
                    <div className="solution-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
              <a href="#contact" className="btn-primary">
                {sol.ctaText}
              </a>
            </div>
            <div className="solution-visual">
              <div className="solution-mockup">
                <div className="mockup-header">
                  <div className="mockup-dot"></div>
                  <div className="mockup-dot"></div>
                  <div className="mockup-dot"></div>
                </div>
                <div
                  className="mockup-content"
                  dangerouslySetInnerHTML={{ __html: sol.mockupHtml }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
