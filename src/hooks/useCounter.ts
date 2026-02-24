'use client'

import { useState, useEffect, useRef } from 'react'

export function useCounter(target: number, suffix: string, duration = 2000) {
  const [displayValue, setDisplayValue] = useState(`0${suffix}`)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            observer.unobserve(el)

            const start = performance.now()

            function update(now: number) {
              const elapsed = now - start
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              const current = Math.round(target * eased)
              setDisplayValue(`${current}${suffix}`)
              if (progress < 1) {
                requestAnimationFrame(update)
              }
            }

            requestAnimationFrame(update)
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix, duration])

  return { displayValue, ref }
}
