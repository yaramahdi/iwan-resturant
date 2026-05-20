import React from 'react'
import '../styles/contact.css'

const Contact = () => {
  const contactCards = [
    {
      id: 'address',
      label: 'العنوان',
      value: 'غزة - شارع الوحدة مقابل معهد الأمل للأيتام',
      icon: 'map-pin'
    },
    {
      id: 'phone',
      label: 'الهاتف',
      value: '0593 386 060',
      icon: 'phone'
    },
    {
      id: 'hours',
      label: 'ساعات العمل',
      value: 'يوميًا: 9ص — 12م',
      icon: 'clock'
    }
  ]

  const socialMedia = [
    {
      name: 'واتساب',
      icon: 'whatsapp',
      href: 'https://wa.me/970593386060',
      className: 'whatsapp'
    },
    {
      name: 'فيسبوك',
      icon: 'facebook',
      href: 'https://www.facebook.com/restaurant.iwan',
      className: 'facebook'
    },
    {
      name: 'إنستغرام',
      icon: 'instagram',
      href: 'https://www.instagram.com/restaurant.iwan',
      className: 'instagram'
    }
  ]

  const IconComponent = ({ icon }) => {
    const iconProps = {
      viewBox: '0 0 24 24',
      xmlns: 'http://www.w3.org/2000/svg',
      width: '24',
      height: '24'
    }

    if (icon === 'map-pin') {
      return (
        <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2C7 2 3 6 3 11c0 5 9 11 9 11s9-6 9-11c0-5-4-9-9-9z"/>
          <circle cx="12" cy="11" r="2"/>
        </svg>
      )
    }
    if (icon === 'phone') {
      return (
        <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l4-4h2l2 4v8l-2 2h-2l-4-4V9z"/>
          <line x1="8" y1="6" x2="8" y2="18"/>
        </svg>
      )
    }
    if (icon === 'clock') {
      return (
        <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      )
    }
    if (icon === 'whatsapp') {
      return (
        <svg {...iconProps} fill="currentColor">
          <path d="M17.6 6.3C16.1 4.7 14 3.8 11.8 3.8c-5.8 0-10.5 4.7-10.5 10.5 0 1.9.5 3.7 1.4 5.3L2 21.8l5.5-1.4c1.5.8 3.2 1.3 5 1.3h.1c5.8 0 10.5-4.7 10.5-10.5 0-2.8-1.1-5.4-3-7.4zm-5.8 16h-.1c-1.6 0-3.1-.4-4.5-1.3l-.3-.2-3.1.8.8-3.1-.2-.3C3.2 15.3 2.8 13.6 2.8 11.8c0-4.8 3.9-8.7 8.7-8.7 2.3 0 4.5.9 6.1 2.5 1.6 1.6 2.5 3.8 2.5 6.1 0 4.8-3.9 8.7-8.7 8.7zm4.8-6.5c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2s-.8 1-1 1.2c-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.8-1.6-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.1-.5 0-.2-.1-.5-.2-.7-.1-.2-.5-.5-.7-.5-.2 0-.3 0-.5 0s-.4 0-.6.1c-.2.1-.8.3-.8 1s.2 1.2.2 1.3c0 .1.1.2.2.3.1.1 1 1.5 2.4 2.1 1.4.6 2.5.5 3.3.3.3-.1.9-.4 1.1-.7s.3-.7.3-.7.1-.2.2-.3c.1 0 .3 0 .4.1z"/>
        </svg>
      )
    }
    if (icon === 'facebook') {
      return (
        <svg {...iconProps} fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    }
    if (icon === 'instagram') {
      return (
        <svg {...iconProps} fill="currentColor">
          <rect x="2.98" y="2.98" width="18.04" height="18.04" rx="4.882" ry="4.882" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 8.146c-2.137 0-3.854 1.717-3.854 3.854 0 2.137 1.717 3.854 3.854 3.854s3.854-1.717 3.854-3.854c0-2.137-1.717-3.854-3.854-3.854z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="18.406" cy="5.594" r="0.906"/>
        </svg>
      )
    }
  }

  return (
    <section id="contact-info" className="contact-info">
      <div className="contact-header">
        <p className="contact-tag">تواصل معنا</p>
        <h2 className="contact-title">نحن هنا لخدمتكم</h2>
        <div className="contact-divider"></div>
      </div>

      <div className="contact-cards">
        {contactCards.map((card, index) => (
          <div key={card.id} className="contact-card" style={{
            animation: `scrollReveal 0.7s ease ${0.2 + index * 0.1}s backwards`
          }}>
            <div className="contact-icon">
              <IconComponent icon={card.icon} />
            </div>
            <p className="contact-label">{card.label}</p>
            <p className="contact-value" dir={card.id === 'phone' ? 'ltr' : 'rtl'}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="social-section">
        <h3 className="social-title">تابعنا على منصات التواصل الاجتماعي</h3>
        <div className="social-buttons">
          {socialMedia.map((social, index) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-btn ${social.className}`}
              style={{
                animation: `scrollReveal 0.7s ease ${0.3 + index * 0.1}s backwards`
              }}
            >
              <IconComponent icon={social.icon} />
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact
