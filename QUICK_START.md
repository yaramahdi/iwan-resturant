# Quick Start Guide - IWAN Restaurant

## ✅ Project Ready to Run!

Your complete React restaurant website is now ready. Here's how to get started:

### 1️⃣ Install Dependencies

Open a terminal in the project folder and run:

```bash
npm install
```

This will install React, Vite, and all other dependencies.

### 2️⃣ Start Development Server

```bash
npm run dev
```

The website will automatically open at **http://localhost:3000** in your browser.

### 3️⃣ See It in Action

You should see:
- ✨ Beautiful header with navigation and cart
- 🎨 Stunning hero section with floating 3D cards
- 🍽️ Interactive menu with categories and items
- 📅 Booking form modal
- 📞 Contact information with social media
- 🔗 Footer with links

## 🎯 What's Included

✅ **Fully Responsive** - Works on all devices  
✅ **3D Animations** - Parallax, floating cards, smooth transitions  
✅ **RTL Arabic Support** - Full right-to-left layout  
✅ **Shopping Cart** - Add/remove items, update quantities  
✅ **Booking Form** - Modal with validation and success message  
✅ **Social Media Links** - WhatsApp, Facebook, Instagram  
✅ **Optimized Performance** - Built with Vite for fast loading  

## 📂 File Structure

```
iwan-restaurant/
├── src/
│   ├── components/          # React components
│   ├── styles/              # CSS files
│   ├── main.jsx             # Entry point
│   └── App.jsx              # Main app component
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
└── README.md                # Documentation
```

## 🛠️ Available Commands

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Customize the Site

### Change Colors
Edit `src/styles/global.css` - update the CSS variables in `:root`

### Update Menu Items
Edit `src/components/Menu.jsx` - modify the `menuItems` object

### Change Contact Info
Edit `src/components/Contact.jsx` and `src/components/Footer.jsx`

### Update Logo & Brand
Edit the SVG in `src/components/Header.jsx`

## 🚀 Ready to Deploy?

Once you're happy with your site:

```bash
npm run build
```

This creates a `dist` folder with optimized production files ready to deploy to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## 📝 Important Notes

- All text is in **Arabic** with full **RTL support**
- Prices are in **ش.ج (Israeli Shekel)**
- Phone number: **00970593386060**
- Social links are placeholders - update them with real URLs
- Images use placeholder SVG - replace with real food photos

## 🐛 Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- --port 3001
```

**Module not found errors?**
```bash
rm -rf node_modules
npm install
```

**Styles not loading?**
- Make sure you're running from the project root directory
- Clear browser cache (Ctrl+Shift+Del)

## 💡 Next Steps

1. Add real food images to replace placeholders
2. Update social media links with actual profiles
3. Add email notification system for bookings
4. Connect to a backend for order management
5. Add payment gateway integration

## 📞 Support

If you need help with:
- React concepts
- CSS animations
- Vite setup
- Arabic RTL implementation

Check out the comments in the code - they explain everything!

---

**Enjoy your new restaurant website!** 🍽️✨
