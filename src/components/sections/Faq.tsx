'use client'

import { useState } from 'react'
import { FAQS_DATA } from '@/lib/data'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">FAQ</div>
          <h2 className="section-title">
            Questions <span className="gradient-text">Fréquentes</span>
          </h2>
          <p className="section-subtitle">
            Découvrez les réponses aux questions les plus courantes sur nos services.
          </p>
        </div>

        <div className="faq-list reveal">
          {FAQS_DATA.map((item, index) => (
            <div key={item.id} className={`faq-item${openIndex === index ? ' open' : ''}`}>
              <div className="faq-question" onClick={() => toggle(index)}>
                {item.question}
                <span className="faq-chevron">▼</span>
              </div>
              <div className="faq-answer">
                <div className="faq-answer-inner">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
