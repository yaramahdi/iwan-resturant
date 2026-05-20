import React, { useState } from 'react'
import '../styles/cart.css'
import logoImage    from '../../images/logo.png'
import bankLogo    from '../../images/bankLogo.png'
import mahfazaLogo from '../../images/mahfazaLogo.png'

const WHATSAPP_NUMBER = '970566707278'

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
)

const DELIVERY_AREAS = [
  { name: 'النصر',           fee: 5  },
  { name: 'الشاطئ',          fee: 5  },
  { name: 'الميناء',         fee: 5  },
  { name: 'الساحة',          fee: 10 },
  { name: 'الشجاعية',        fee: 10 },
  { name: 'الدرج',           fee: 10 },
  { name: 'دوار 17',         fee: 10 },
  { name: 'التلة',           fee: 10 },
  { name: 'الشيخ رضوان',     fee: 10 },
  { name: 'الكرامة',         fee: 10 },
  { name: 'الرمال الجنوبي',  fee: 10 },
  { name: 'تل الهوا',        fee: 10 },
  { name: 'اليرموك',         fee: 10 },
  { name: 'التفاح',          fee: 10 },
  { name: 'شارع يافا',       fee: 15 },
  { name: 'الصبرة',          fee: 15 },
  { name: 'الزيتون',         fee: 15 },
  { name: 'الصنطاوي',        fee: 15 },
  { name: 'دوار أبو درج',    fee: 15 },
]

const isRestaurantOpen = () => new Date().getHours() >= 10

const buildWhatsAppMessage = (items, totalPrice, deliveryData, deliveryFee) => {
  const lines = []
  lines.push('✅ *إشعار دفع — مطعم إيوان*')
  lines.push('━━━━━━━━━━━━━━━━━━━━━━')
  lines.push(`👤 *${deliveryData.name}*`)
  lines.push(`📱 ${deliveryData.phone}`)
  lines.push(`📍 ${deliveryData.area} — ${deliveryData.address}`)
  if (deliveryData.notes) lines.push(`📝 ${deliveryData.notes}`)
  lines.push('━━━━━━━━━━━━━━━━━━━━━━')
  items.forEach(item => {
    const subtotal = (item.price || 0) * item.qty
    lines.push(`• ${item.name}  ×${item.qty}  =  ${subtotal}₪`)
  })
  lines.push('──────────────────────')
  lines.push(`🚗 التوصيل: ${deliveryFee}₪`)
  lines.push(`💰 *الإجمالي: ${totalPrice + deliveryFee}₪*`)
  lines.push('━━━━━━━━━━━━━━━━━━━━━━')
  return encodeURIComponent(lines.join('\n'))
}

const CartSidebar = ({ isOpen, items, onClose, onUpdateQuantity, onRemove }) => {
  const [closedMsg, setClosedMsg]             = useState(false)
  const [orderStage, setOrderStage]           = useState('cart')
  const [validationError, setValidationError] = useState('')
  const [deliveryFee, setDeliveryFee]         = useState(0)
  const [deliveryData, setDeliveryData]       = useState({
    name: '', phone: '', area: '', address: '', notes: ''
  })
  const [copiedKey, setCopiedKey] = useState(null)

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 2000)
    })
  }

  const totalPrice        = items.reduce((sum, item) => sum + ((item.price || 0) * item.qty), 0)
  const totalWithDelivery = totalPrice + deliveryFee

  const resetAll = () => {
    setDeliveryFee(0)
    setDeliveryData({ name: '', phone: '', area: '', address: '', notes: '' })
    setValidationError('')
    setClosedMsg(false)
  }

  const handleClose = () => { onClose(); setOrderStage('cart'); resetAll() }

  const handleConfirm = () => {
    if (!isRestaurantOpen()) { setClosedMsg(true); return }
    setClosedMsg(false)
    setOrderStage('details')
  }

  const handleDeliveryChange = (e) => {
    const { name, value } = e.target
    setDeliveryData(prev => ({ ...prev, [name]: value }))
    if (name === 'area') {
      const found = DELIVERY_AREAS.find(a => a.name === value)
      setDeliveryFee(found ? found.fee : 0)
    }
  }

  const handleDetailsSubmit = (e) => {
    if (e?.preventDefault) e.preventDefault()
    const { name, phone, area, address } = deliveryData
    if (!name || !phone || !area || !address) {
      setValidationError('يرجى إدخال جميع الحقول المطلوبة')
      return
    }
    setValidationError('')
    setOrderStage('invoice')
  }

  const handleSendOrder = () => {
    const msg = buildWhatsAppMessage(items, totalPrice, deliveryData, deliveryFee)
    const win = window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
    if (!win) {
      alert('يرجى السماح بالنوافذ المنبثقة في متصفحك لإرسال الطلب عبر واتساب')
      return
    }
    setOrderStage('cart')
    resetAll()
  }

  return (
    <>
      {/* ── Cart Overlay & Sidebar ── */}
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={handleClose} />

      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2 className="cart-title">سلة الطلبات</h2>
          <button className="cart-close" onClick={handleClose}>×</button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6h14l-1 14H7L6 6zm3 0v-2a2 2 0 012-2h4a2 2 0 012 2v2"
                  strokeWidth="2" fill="none" stroke="currentColor"/>
                <line x1="9" y1="11" x2="9" y2="17" strokeWidth="2" stroke="currentColor"/>
                <line x1="15" y1="11" x2="15" y2="17" strokeWidth="2" stroke="currentColor"/>
              </svg>
              <div className="cart-empty-text">السلة فارغة</div>
              <p style={{ fontSize: '12px', marginTop: '4px' }}>أضف وجبات لإكمال طلبك</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">{item.price} ش.ج</p>
                </div>
                <div className="cart-item-qty">
                  <button className="qty-btn" onClick={() => onUpdateQuantity(item.id, item.qty - 1)}>−</button>
                  <div className="qty-display">{item.qty}</div>
                  <button className="qty-btn" onClick={() => onUpdateQuantity(item.id, item.qty + 1)}>+</button>
                </div>
                <button className="cart-remove" onClick={() => onRemove(item.id)}>حذف</button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span className="cart-total-label">الإجمالي:</span>
              <span className="cart-total-price">{totalPrice} ش.ج</span>
            </div>
            {closedMsg && (
              <p className="cart-closed-msg">
                عذراً، المطعم مغلق حالياً. أوقات العمل من 10:00 صباحاً حتى 12:00 ليلاً.
              </p>
            )}
            <button className="cart-confirm-btn" onClick={handleConfirm} disabled={closedMsg}>
              تأكيد الطلب
            </button>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════
          FORM MODAL  —  dark luxury centered
      ══════════════════════════════════════════ */}
      {orderStage === 'details' && isOpen && (
        <div className="frm-overlay">
          <div className="frm-modal">

            {/* Header */}
            <div className="frm-modal-header">
              <button className="frm-close-btn" onClick={() => setOrderStage('cart')}>×</button>
              <div className="frm-title-block">
                <div className="frm-logo-row">
                  <img src={logoImage} alt="إيوان" className="frm-logo" />
                  <span className="frm-logo-name">إيوان</span>
                </div>
                <p className="frm-subtitle">خطوة أخيرة</p>
                <h2>بيانات التوصيل</h2>
              </div>
            </div>

            {/* Form grid */}
            <form className="frm-form" onSubmit={handleDetailsSubmit}>

              <div className="frm-group">
                <label>الاسم الكامل</label>
                <input type="text" name="name" value={deliveryData.name}
                  onChange={handleDeliveryChange} placeholder="يارا محمود" required />
              </div>

              <div className="frm-group">
                <label>رقم الهاتف</label>
                <input type="tel" name="phone" value={deliveryData.phone}
                  onChange={handleDeliveryChange} placeholder="059XXXXXXX" dir="ltr" required />
              </div>

              <div className="frm-group frm-full">
                <label>منطقة التوصيل</label>
                <select name="area" value={deliveryData.area}
                  onChange={handleDeliveryChange} required>
                  <option value="">— اختر منطقتك —</option>
                  {DELIVERY_AREAS.map(area => (
                    <option key={area.name} value={area.name}>
                      {area.name} — {area.fee} ₪
                    </option>
                  ))}
                </select>
              </div>

              <div className="frm-group frm-full">
                <label>العنوان بالتفصيل</label>
                <textarea name="address" value={deliveryData.address}
                  onChange={handleDeliveryChange}
                  placeholder="مثال: شارع النصر، بجانب مسجد الرحمة..." required />
              </div>

              <div className="frm-group frm-full">
                <label>ملاحظات <span className="frm-optional">— اختياري</span></label>
                <input type="text" name="notes" value={deliveryData.notes}
                  onChange={handleDeliveryChange}
                  placeholder="مثال: بدون بصل، طابق ثاني..." />
              </div>

            </form>

            {/* Footer */}
            <div className="frm-footer">
              {validationError && <p className="frm-error">⚠ {validationError}</p>}
              <div className="frm-footer-row">
                {deliveryFee > 0 ? (
                  <div className="frm-total-badge">
                    <span className="frm-total-label">الإجمالي</span>
                    <span className="frm-total-amount">
                      {totalWithDelivery} <span className="frm-currency">ش.ج</span>
                    </span>
                  </div>
                ) : <div />}
                <button className="frm-submit-btn" onClick={handleDetailsSubmit}>
                  عرض الفاتورة ←
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          INVOICE MODAL  —  dark ticket style
      ══════════════════════════════════════════ */}
      {orderStage === 'invoice' && isOpen && (
        <div className="tkt-overlay">
          <div className="tkt-wrapper">

            {/* Top bar */}
            <div className="tkt-topbar">
              <button className="tkt-back-btn" onClick={() => setOrderStage('details')}>
                ← تعديل
              </button>
              <span className="tkt-topbar-label">فاتورة الطلب</span>
            </div>

            {/* Ticket card */}
            <div className="tkt-card">

              {/* Colored left stripe */}
              {/* <div className="tkt-stripe">
                <span>إيوان</span>
              </div> */}

              {/* Main ticket body */}
              <div className="tkt-body">

                {/* Restaurant header */}
                <div className="tkt-res-header">
                  <div className="tkt-res-info">
                    <h3>IWAN Restaurant</h3>
                    <p>إيوان — طلب توصيل</p>
                  </div>
                  <div className="tkt-logo">
                    <img src={logoImage} alt="إيوان" />
                  </div>
                </div>

                <div className="tkt-dash" />

                {/* Customer */}
                <div className="tkt-customer">
                  <div className="tkt-cust-row">
                    <span className="tkt-cust-key">الاسم:</span>
                    <span className="tkt-cust-val">{deliveryData.name}</span>
                  </div>
                  <div className="tkt-cust-row">
                    <span className="tkt-cust-key">الهاتف:</span>
                    <span className="tkt-cust-val" dir="ltr">{deliveryData.phone}</span>
                  </div>
                  <div className="tkt-cust-row">
                    <span className="tkt-cust-key">العنوان:</span>
                    <span className="tkt-cust-val">{deliveryData.area} — {deliveryData.address}</span>
                  </div>
                </div>

                <div className="tkt-dash" />

                {/* Items table */}
                <div className="tkt-items">
                  <div className="tkt-table-head">
                    <span>الصنف</span>
                    <span>الكمية</span>
                    <span>السعر</span>
                    <span>المجموع</span>
                  </div>

                  {items.map(item => (
                    <div key={item.id} className="tkt-table-row">
                      <span>{item.name}</span>
                      <span>{item.qty}</span>
                      <span>{item.price} ₪</span>
                      <span>{(item.price || 0) * item.qty} ₪</span>
                    </div>
                  ))}

                  <div className="tkt-table-row tkt-delivery-tr">
                    <span className="tkt-delivery-name">رسوم التوصيل</span>
                    <span>{deliveryData.area}</span>
                    <span>—</span>
                    <span>{deliveryFee} ₪</span>
                  </div>
                </div>

                <div className="tkt-dash" />

                {/* Total */}
                <div className="tkt-total-row">
                  <div className="tkt-total-left">
                    <span className="tkt-total-num">{totalWithDelivery}</span>
                    <span className="tkt-total-curr">ش.ج</span>
                  </div>
                  <span className="tkt-total-label">الإجمالي الكلي</span>
                </div>

              </div>
            </div>

            {/* Actions */}
            <div className="tkt-actions">
              <button className="tkt-send-btn" onClick={() => setOrderStage('payment')}>
                المتابعة للدفع ←
              </button>
            </div>

          </div>
        </div>
      )}
      {/* ══════════════════════════════════════════
          PAYMENT MODAL
      ══════════════════════════════════════════ */}
      {orderStage === 'payment' && isOpen && (
        <div className="pay-overlay">
          <div className="pay-wrapper">

            {/* Top bar */}
            <div className="pay-topbar">
              <button className="tkt-back-btn" onClick={() => setOrderStage('invoice')}>
                ← الفاتورة
              </button>
              <span className="tkt-topbar-label">طرق الدفع</span>
            </div>

            {/* Card */}
            <div className="pay-card">

              {/* Notice */}
              <div className="pay-notice">
                <span className="pay-notice-icon">💳</span>
                <p>
                  لتأكيد طلبك يرجى التحويل أولاً، ثم إرسال إشعار الدفع عبر واتساب
                </p>
              </div>

              {/* Total */}
              <div className="pay-total-bar">
                <span className="pay-total-bar-label">المبلغ المطلوب</span>
                <span className="pay-total-bar-num">
                  {totalWithDelivery}
                  <span className="pay-total-bar-curr"> ش.ج</span>
                </span>
              </div>

              {/* Bank Palestine */}
              <div className="pay-method">
                <div className="pay-method-title">
                  <img src={bankLogo} alt="بنك فلسطين" className="pay-method-logo" />
                  بنك فلسطين
                </div>
                <div className="pay-info-row">
                  <span className="pay-info-key">الاسم:</span>
                  <span className="pay-info-val">أحمد محمد العلي</span>
                </div>
                <div className="pay-info-row">
                  <span className="pay-info-key">رقم الحساب:</span>
                  <span className="pay-info-val" dir="ltr">123456789012</span>
                  <button className="pay-copy-btn" onClick={() => copyToClipboard('1234-5678-9012', 'bank-acc')}>
                    {copiedKey === 'bank-acc' ? <span className="pay-copied">✓</span> : <CopyIcon />}
                  </button>
                </div>
                <div className="pay-info-row">
                  <span className="pay-info-key">IBAN:</span>
                  <span className="pay-info-val pay-iban" dir="ltr">PS92PALS000000001234567890</span>
                  <button className="pay-copy-btn" onClick={() => copyToClipboard('PS92PALS000000001234567890', 'bank-iban')}>
                    {copiedKey === 'bank-iban' ? <span className="pay-copied">✓</span> : <CopyIcon />}
                  </button>
                </div>
              </div>

              {/* Wallet */}
              <div className="pay-method">
                <div className="pay-method-title">
                  <img src={mahfazaLogo} alt="المحفظة" className="pay-method-logo" />
                  المحفظة الإلكترونية
                </div>
                <div className="pay-info-row">
                  <span className="pay-info-key">الاسم:</span>
                  <span className="pay-info-val">أحمد محمد العلي</span>
                </div>
                <div className="pay-info-row">
                  <span className="pay-info-key">الرقم:</span>
                  <span className="pay-info-val" dir="ltr">0591234567</span>
                  <button className="pay-copy-btn" onClick={() => copyToClipboard('0591234567', 'wallet-num')}>
                    {copiedKey === 'wallet-num' ? <span className="pay-copied">✓</span> : <CopyIcon />}
                  </button>
                </div>
              </div>

            </div>

            {/* Send button */}
            <div className="tkt-actions">
              <button className="tkt-send-btn" onClick={handleSendOrder}>
                أرسل إشعار الدفع عبر واتساب وأكد طلبك
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default CartSidebar
