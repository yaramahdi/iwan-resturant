import React from 'react'
import '../styles/hero.css'
import grillImg from '../../images/Grills.png'
import shawermaImg from '../../images/shawerma.png'
import mealsImg from '../../images/meals.png'
import sandweshesImg from '../../images/sandweshes.png'
import appetizersImg from '../../images/appetizers.png'
import barImg from '../../images/bar.png'
import restaurantBg from '../../images/resturantPhoto.png'

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const cards = [
    { img: shawermaImg,  label: 'شاورما دبل',     pos: 'card--top-right',    delay: '0s'    },
    { img: grillImg,     label: 'مشاوي الفحم',    pos: 'card--bottom-right', delay: '1.2s'  },
    { img: mealsImg,     label: 'وجبات إيوان',    pos: 'card--top-left',     delay: '0.6s'  },
    { img: sandweshesImg,label: 'ساندويشات',      pos: 'card--bottom-left',  delay: '1.8s'  },
    { img: appetizersImg,label: 'مقبلات',          pos: 'card--mid-right',    delay: '0.3s'  },
    { img: barImg,       label: 'حلويات البار',   pos: 'card--mid-left',     delay: '1.5s'  },
  ]

  return (
    <section className="hero" style={{ backgroundImage: `linear-gradient(rgba(17, 17, 17, 0.7), rgba(17, 17, 17, 0.7)), url(${restaurantBg})` }}>
      <div className="hero-glow"></div>

      {cards.map((card, i) => (
        <div key={i} className={`float-card ${card.pos}`} style={{ animationDelay: card.delay }}>
          <div className="float-card__img-wrap">
            <img src={card.img} alt={card.label} />
          </div>
        </div>
      ))}

      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-name">إيوان</h1>
          <div className="hero-divider"></div>
          <p className="hero-tagline">إيوان | طعم يحكى وتجربة تروى</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => scrollToSection('menu')}>
              استعرض المنيو
            </button>
            <button className="btn-outline" onClick={() => scrollToSection('contact')}>
              احجز طاولتك
            </button>
          </div>
          <div className="hero-mobile-strip">
            {cards.map((card, i) => (
              <div key={i} className="hero-strip-item">
                <img src={card.img} alt={card.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
