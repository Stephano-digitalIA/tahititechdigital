'use client'

import { useEffect } from 'react'

export default function ScrollRevealInit() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')

    // Fallback : force tout en visible après 2s si l'observer n'a pas tout déclenché
    const fallback = setTimeout(() => {
      reveals.forEach((el) => el.classList.add('visible'))
    }, 2000)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px 0px 0px' }
    )

    reveals.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
      clearTimeout(fallback)
    }
  }, [])

  return null
}
