import React, { useState, useEffect } from 'react'
import '../styles/header.css'
import logoImage from '../../images/logo.png'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-logo">
        <div className="header-logo-img">
          <img src={logoImage} alt="إيوان IWAN Restaurant Logo" />
        </div>
        <div className="header-logo-text">
          <h1>إيوان</h1>
          <p>IWAN</p>
        </div>
      </div>

      <button className="header-order-btn" onClick={() => scrollToSection('menu')}>
        اطلب الآن
      </button>
    </header>
  )
}

export default Header
