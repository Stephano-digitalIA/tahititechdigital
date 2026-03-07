'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useNavbarScroll } from '@/hooks/useNavbarScroll'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function Navbar() {
  const isScrolled = useNavbarScroll()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const closeMenu = () => setIsMobileOpen(false)

  return (
    <nav className={`navbar${isScrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="container">
        <Link href="/" className="nav-logo">
          <img
            src="/logo-ttd.png"
            alt="TahitiTechDigital"
            className="nav-logo-img"
            width={84}
            height={84}
          />
          <span>TAHITITECH</span>DIGITAL
        </Link>

        <ul className={`nav-links${isMobileOpen ? ' open' : ''}`} id="navLinks">
          <li><Link href="/#services" onClick={closeMenu}>Services</Link></li>
          <li><Link href="/#solutions" onClick={closeMenu}>Solutions</Link></li>
          <li><Link href="/#about" onClick={closeMenu}>À propos</Link></li>
          <li><Link href="/#faq" onClick={closeMenu}>FAQ</Link></li>
          <li><Link href="/#contact" onClick={closeMenu}>Contact</Link></li>
        </ul>

        <Link href="/#contact" className="nav-cta">Démarrer un projet</Link>

        <ThemeToggle />

        <button
          className="nav-mobile-toggle"
          id="mobileToggle"
          aria-label="Menu"
          onClick={() => setIsMobileOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}
