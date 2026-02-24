'use client'

import { useCounter } from '@/hooks/useCounter'
import { METRICS_DATA } from '@/lib/data'

function MetricCard({ icon, target, suffix, label }: { icon: string; target: number; suffix: string; label: string }) {
  const { displayValue, ref } = useCounter(target, suffix)

  return (
    <div className="metric-card reveal">
      <span className="metric-icon">{icon}</span>
      <div className="metric-value" ref={ref}>
        {displayValue}
      </div>
      <div className="metric-label">{label}</div>
    </div>
  )
}

export default function Metrics() {
  return (
    <div className="metrics-section">
      <div className="container">
        <div className="metrics-grid">
          {METRICS_DATA.map((m) => (
            <MetricCard
              key={m.id}
              icon={m.icon}
              target={m.target}
              suffix={m.suffix}
              label={m.label}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
