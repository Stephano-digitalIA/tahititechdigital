'use client'

import { useState } from 'react'
import { useNavbarScroll } from '@/hooks/useNavbarScroll'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function Navbar() {
  const isScrolled = useNavbarScroll()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const closeMenu = () => setIsMobileOpen(false)

  return (
    <nav className={`navbar${isScrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="container">
        <a href="#" className="nav-logo">
          <div className="nav-logo-icon">T</div>
          <span>TAHITITECH</span>DIGITAL
        </a>

        <ul className={`nav-links${isMobileOpen ? ' open' : ''}`} id="navLinks">
          <li><a href="#services" onClick={closeMenu}>Services</a></li>
          <li><a href="#solutions" onClick={closeMenu}>Solutions</a></li>
          <li><a href="#about" onClick={closeMenu}>À propos</a></li>
          <li><a href="#faq" onClick={closeMenu}>FAQ</a></li>
          <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
        </ul>

        <a href="#contact" className="nav-cta">Démarrer un projet</a>

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
