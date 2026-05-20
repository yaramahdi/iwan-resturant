import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Reservation from './components/Reservation'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import ScrollReveal from './components/ScrollReveal'

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id)
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prevItems, { ...item, qty: 1 }]
    })
  }

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(i => i.id !== itemId))
  }

  const updateQuantity = (itemId, qty) => {
    if (qty <= 0) {
      removeFromCart(itemId)
    } else {
      setCartItems(prevItems =>
        prevItems.map(i =>
          i.id === itemId ? { ...i, qty } : i
        )
      )
    }
  }

  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0)

  return (
    <div className="app">
      <Header />
      {totalQty > 0 && (
        <button className="floating-cart-btn" onClick={() => setCartOpen(!cartOpen)}>
          <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4,8 16,8 30,54 72,54"/>
            <rect x="20" y="16" width="52" height="38" rx="3"/>
            <line x1="33" y1="16" x2="33" y2="54"/>
            <line x1="46" y1="16" x2="46" y2="54"/>
            <line x1="59" y1="16" x2="59" y2="54"/>
            <line x1="20" y1="28" x2="72" y2="28"/>
            <line x1="20" y1="41" x2="72" y2="41"/>
            <circle cx="34" cy="67" r="7"/>
            <circle cx="62" cy="67" r="7"/>
          </svg>
          <span className="floating-cart-badge">{totalQty}</span>
        </button>
      )}
      <CartSidebar
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
      <Hero onAddToCart={addToCart} />
      <Menu onAddToCart={addToCart} />
      <Reservation />
      <Contact />
      <Footer />
      <ScrollReveal />
    </div>
  )
}

export default App
