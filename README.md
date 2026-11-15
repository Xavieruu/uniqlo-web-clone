# UNIQLO Web App (Front-End Prototype)

A responsive, interactive React clone/redesign of the UNIQLO storefront, built as an academic project. It includes a Home page, an About page, and a Products page with filtering, a working cart drawer, and several UI animations.

> **Academic project:** This is a student project and is **not affiliated with, endorsed by, or connected to UNIQLO Co., Ltd. or Fast Retailing**. Brand names, logos, and trademarks belong to their respective owners and are used here for educational purposes only.

---

## ⚠️ Important Notices

- **Static front-end only.** There is **no backend, database, or API** yet. All product data is hard-coded in `src/data/products.js`.
- **Checkout is a demo.** Clicking *Checkout* simply clears the cart and shows a confirmation message. No order, payment, or account is processed.
- **Some features are non-functional or not yet implemented:**
  - No user login / registration
  - No real payments or order history
  - No product detail pages
  - Wishlist hearts are visual only (not saved)
  - Footer, contact, and store locator are not included
- **Placeholder content.** Product names, prices (₱), sizes, and company timeline details are sample data and may not be accurate. Images may be placeholders until replaced.
- **Cart persistence** uses the browser's `localStorage`, so the cart is saved only in your own browser.

---

## 👤 Project Information

| | |
|---|---|
| **Developer** | Ashton Xavier E. Maitim |
| **School** | National University Manila (NU Manila) |
| **Program** | Bachelor of Science in Information Technology |
| **Block / Section** | INF241 |
| **Course / Subject** | CTINASSL - Information Assurance and Security |
| **Instructor** | Mr. Joseph Martin G. Gojo |
| **Academic Year / Term** | AY 2026–2027, Term 2 |

---

## ✨ Features

**Global**
- Sticky navigation bar with active-link highlighting and a mobile hamburger menu
- Slide-in cart drawer with live item count badge
- Toast notifications and smooth page transitions
- Fully responsive layout (desktop, tablet, mobile)

**Home**
- Full-screen hero with parallax scroll effect
- "New Collections" section with scroll-reveal animation
- Hover "Quick add" on collection cards

**About**
- Company story section and CEO quote
- Animated count-up statistics
- Interactive clickable timeline

**Products**
- Gender tabs: Women, Men, Kids, Baby
- Category filter cards (8 categories)
- Search and sort (price low/high, name A–Z)
- Color swatches and size selection on every product
- Add to cart with quantity controls, remove, and clear cart
- Free-shipping progress bar in the cart (₱3,000 threshold)

---

## 🛠️ Tech Stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router v6](https://reactrouter.com/)
- Plain CSS (no UI framework)
- Context API + `useReducer` for cart state

---

## 📁 Project Structure

```
uniqlo-app/
├── public/
├── src/
│   ├── assets/            # hero.png, logo.png, images/
│   ├── components/        # Navbar, CartDrawer, ProductCard, Toast, Layout
│   ├── context/           # CartContext.jsx
│   ├── data/              # images.js, products.js
│   ├── hooks/             # useReveal.js, useCountUp.js
│   ├── pages/             # Home.jsx, About.jsx, Products.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git

# 2. Go into the project folder
cd <repo-name>

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).

### Other Scripts

```bash
npm run build     # create a production build in /dist
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

---

## 🖼️ Replacing Images

All images are registered in `src/data/images.js`. To use your own photos, replace the file in `src/assets/` **keeping the same file name**, or update the import path in that file.

| File | Used for |
|---|---|
| `logo.png` | Navbar logo |
| `hero.png` | Home hero background |
| `images/collection-1.jpg` – `collection-3.jpg` | Home collection cards |
| `images/collection-side.jpg` | Home side image |
| `images/about-store.jpg` | About page image |
| `images/products-banner.jpg` | Products page banner |
| `images/cat-*.jpg` | Category cards and product thumbnails |

---

## 🗺️ Roadmap

- [ ] Backend and database (e.g., Node/Express or Supabase)
- [ ] Real product data via API
- [ ] User authentication
- [ ] Product detail pages
- [ ] Persistent wishlist
- [ ] Real checkout and order history
- [ ] Footer, contact, and store locator

---

## 📄 License

This project is for educational purposes only. All brand assets remain the property of their respective owners.