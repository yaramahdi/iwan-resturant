import React, { useState, useEffect, useRef } from 'react'
import '../styles/reservation.css'

const WHATSAPP_NUMBER = '970566707278'

const buildReservationMessage = ({ name, phone, time, notes }) => {
  const lines = [
    'طلب حجز جديد من إيوان',
    `الاسم: ${name}`,
    `الجوال: ${phone}`,
    `وقت الحضور: ${time}`,
    `الملاحظات: ${notes?.trim() || 'لا توجد ملاحظات'}`
  ]
  return encodeURIComponent(lines.join('\n'))
}

const Reservation = () => {
  const [showModal, setShowModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    time: '',
    notes: ''
  })
  const timerRef = useRef(null)

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const name  = formData.name.trim()
    const phone = formData.phone.trim()
    const time  = formData.time.trim()
    if (!name || !phone || !time) return
    const msg = buildReservationMessage({ ...formData, name, phone, time })
    const win = window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
    if (!win) {
      alert('يرجى السماح بالنوافذ المنبثقة في متصفحك لإرسال الحجز عبر واتساب')
      return
    }
    setShowSuccess(true)
    timerRef.current = setTimeout(() => {
      setShowModal(false)
      setShowSuccess(false)
      setFormData({ name: '', phone: '', time: '', notes: '' })
    }, 2500)
  }

  return (
    <section id="contact" className="reservation">
      <div className="reservation-content">
        <div className="reservation-visual">
          <svg className="table-svg" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
            <circle cx="70" cy="50" r="28" fill="none" strokeWidth="2"/>
            <rect x="55" y="25" width="30" height="50" rx="4" fill="none" strokeWidth="2"/>
            <circle cx="45" cy="35" r="8" fill="none" strokeWidth="2"/>
            <circle cx="95" cy="35" r="8" fill="none" strokeWidth="2"/>
            <circle cx="45" cy="65" r="8" fill="none" strokeWidth="2"/>
            <circle cx="95" cy="65" r="8" fill="none" strokeWidth="2"/>
            <circle cx="70" cy="25" r="4" fill="currentColor"/>
          </svg>
          <div className="pulse-ring"></div>
          <div className="pulse-ring"></div>
          <div className="pulse-ring"></div>
        </div>

        <div className="reservation-text">
          <p className="reservation-tag">احجز مكانك</p>
          <h2 className="reservation-title">احجز طاولتك في إيوان</h2>
          <p className="reservation-subtitle">
            استمتع بتجربة طعام لا تُنسى مع أصدقائك وعائلتك<br/>
            احجز طاولتك الآن وضمن مكانك المميز
          </p>
        </div>

        <button className="reservation-cta" onClick={() => setShowModal(true)}>
          احجز الآن
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <rect x="4" y="5" width="16" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
            <line x1="4" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>

            {!showSuccess ? (
              <>
                <h3 className="modal-title">احجز طاولتك</h3>
                <p className="modal-subtitle">
                  أدخل بيانات الحجز الخاصة بك ليستعمل فريقنا معك
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">الاسم</label>
                      <input
                        type="text"
                        className="form-input"
                        name="name"
                        placeholder="اسمك الكريم"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">رقم الهاتف</label>
                      <input
                        type="tel"
                        className="form-input"
                        name="phone"
                        placeholder="05xxxxxxxx"
                        value={formData.phone}
                        onChange={handleInputChange}
                        dir="ltr"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">وقت الحضور</label>
                    <input
                      type="time"
                      className="form-input"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">ملاحظات إضافية</label>
                    <textarea
                      className="form-textarea"
                      name="notes"
                      placeholder="عدد الأشخاص، مناسبة خاصة...الخ"
                      value={formData.notes}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <div className="form-divider"></div>

                  <button type="submit" className="form-submit">
                    تأكيد الحجز
                  </button>
                </form>
              </>
            ) : (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3 className="success-title">تم الحجز بنجاح!</h3>
                <p className="success-subtitle">
                  شكراً لاختيارك إيوان، سننتظر قدومك
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default Reservation
