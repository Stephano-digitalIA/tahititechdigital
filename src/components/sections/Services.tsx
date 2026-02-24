import { SERVICES_DATA } from '@/lib/data'

export default function Services() {
  return (
    <section id="services">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">Nos services</div>
          <h2 className="section-title">
            Services d&#39;automatisation <span className="gradient-text">premium</span>
          </h2>
          <p className="section-subtitle">
            Des solutions sur mesure pour automatiser vos tâches, développer votre présence en ligne
            et libérer votre potentiel entrepreneurial.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES_DATA.map((service) => (
            <div key={service.id} className="service-card reveal">
              <div className={`service-icon ${service.colorVariant}`}>{service.icon}</div>
              <h3>{service.title}</h3>
              <div className="service-tag">{service.tag}</div>
              <p>{service.description}</p>
              <div className="service-features">
                {service.features.map((feature, i) => (
                  <div key={i} className="service-feature">
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
