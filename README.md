# إيوان | IWAN Restaurant

A modern, responsive Arabic restaurant landing page with 3D animations, RTL support, and a fully functional menu system.

## Features

- ✨ **3D Animations**: Floating dish cards, parallax effects, and smooth transitions
- 🎨 **Beautiful Design**: Modern UI with a sophisticated dark theme
- 🛒 **Cart System**: Add items to cart with quantity management
- 📱 **Fully Responsive**: Works seamlessly on all devices
- 🌐 **RTL Support**: Full Arabic language support with right-to-left layout
- ⚡ **Performance**: Optimized with Vite and React 18
- 🎯 **Smooth Navigation**: Scroll animations and scroll-reveal effects

## Tech Stack

- **Frontend**: React 18 with Hooks
- **Build Tool**: Vite
- **Styling**: Pure CSS3 with animations
- **Icons**: Inline SVG
- **Fonts**: Google Fonts (Cairo & Reem Kufi)

## Project Structure

```
iwan-restaurant/
├── src/
│   ├── components/
│   │   ├── App.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Menu.jsx
│   │   ├── Reservation.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── CartSidebar.jsx
│   │   └── ScrollReveal.jsx
│   ├── styles/
│   │   ├── global.css
│   │   ├── header.css
│   │   ├── hero.css
│   │   ├── menu.css
│   │   ├── reservation.css
│   │   ├── contact.css
│   │   ├── footer.css
│   │   └── cart.css
│   ├── main.jsx
│   └── App.jsx
├── public/
│   └── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   The site will open at `http://localhost:3000`

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## Features Breakdown

### Header
- Fixed navigation with logo and menu links
- Cart button with item count badge
- Smooth scroll to sections
- Scroll-aware styling

### Hero Section
- Full-screen parallax background
- 4 animated floating dish cards
- Restaurant name with 3D rotation effect
- CTA buttons for menu and booking

### Menu Section
- Two-level navigation system
- Category cards with flip animation
- Menu items grid with hover effects
- Add to cart functionality
- Dynamic added state feedback

### Reservation Section
- Table illustration with pulsing rings
- Booking modal with form validation
- Success message animation
- Auto-closing on successful submission

### Contact Section
- 3D tilt effect on cards
- Contact information display
- Social media integration
- Links to WhatsApp, Facebook, Instagram

### Footer
- Brand information
- Quick links
- Contact details
- Social media links

## Customization

### Colors
Edit the CSS custom properties in `src/styles/global.css`:

```css
:root {
  --primary: #C41E2E;
  --primary-dark: #9A1523;
  --primary-light: #E8283B;
  /* ... other colors */
}
```

### Menu Items
Edit the menu data in `src/components/Menu.jsx`:

```javascript
const menuItems = {
  friday: [
    { id: 'f1', name: 'Dish Name', price: 65, category: 'friday' },
    // ... more items
  ],
  // ... other categories
}
```

### Contact Information
Update contact details in `src/components/Contact.jsx` and `src/components/Footer.jsx`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance Tips

- Images are optimized with inline SVG
- CSS animations use `transform` and `opacity` for 60fps
- Scroll events are throttled via `useEffect`
- Lazy loading for non-critical components

## License

All rights reserved © 2025 IWAN Restaurant

## Contact

For inquiries: info@restaurant.iwan  
Phone: +970 593 386 060  
WhatsApp: [wa.me/970593386060](https://wa.me/970593386060)

---

Made with ❤️ for IWAN Restaurant
