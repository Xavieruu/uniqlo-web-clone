# UNIQLO Web App (Full-Stack Prototype)

A responsive, interactive React storefront inspired by UNIQLO, now with a Node.js/Express backend and SQLite database. It includes Home, About, Products and Orders pages, user accounts, a server-side wishlist, and a cart that checks out into real saved orders.

> **Academic project:** This is a student project and is **not affiliated with, endorsed by, or connected to UNIQLO Co., Ltd. or Fast Retailing**. Brand names, logos, and trademarks belong to their respective owners and are used here for educational purposes only.

---

## ⚠️ Important Notices

- **Demo-grade backend.** It is meant for learning and local use, not for production traffic.
- **No real payments.** Checkout only records an order in the database. No payment, delivery, or email is processed.
- **Local database.** Data is stored in a SQLite file (`server/data/uniqlo.db`) created on first run. It is git-ignored and will not be in the repo, so each machine starts with a fresh catalog and no accounts.
- **Change the JWT secret.** Without a `.env` file the server falls back to an insecure development secret (and warns you). Always set `JWT_SECRET` when deploying anywhere.
- **Sample content.** Product names, prices (₱), sizes, and the company timeline are sample data and may not be accurate. Images may be placeholders until replaced.
- **Features not yet implemented:** product detail pages, password reset / email verification, order cancellation, an admin panel, footer / contact / store locator.
- The cart itself is still stored in the browser (`localStorage`) until checkout.

---

## 👤 Project Information

| | |
|---|---|
| **Developer** | Ashton Xavier E. Maitim |
| **School** | National University Manila |
| **Program** | Bachelor of Science in Information Technology |
| **Block / Section** | INF241 |
| **Course / Subject** | CTINASSL |
| **Instructor** | Mr. Joseph Martin G. Gojo |
| **Academic Year / Term** | AY 2026–2027, Term 2 |

---

## ✨ Features

**Storefront**
- Sticky navbar with active-link highlighting, mobile hamburger menu, and live cart badge
- Home hero with parallax, scroll-reveal sections, and "Quick add" collection cards
- About page with animated count-up stats and an interactive timeline
- Products page with gender tabs, 8 category filters, search, sort, color swatches, and size selection
- Slide-in cart drawer with quantity controls, free-shipping progress bar, and toast notifications

**Backend-powered**
- Register / log in with hashed passwords (bcrypt) and 7-day JWT sessions
- Products, search, and filters served from the database
- Wishlist saved per account, with a "Saved only" filter
- Checkout creates an order; **prices and totals are recalculated on the server**
- Orders page showing your order history
- Shipping: free over ₱3,000, otherwise ₱150

---

## 🛠️ Tech Stack

| Layer | Tools |
|---|---|
| Frontend | React 18, Vite, React Router v6, plain CSS, Context API |
| Backend | Node.js, Express 5 |
| Database | SQLite via `better-sqlite3` |
| Security | `bcryptjs`, `jsonwebtoken`, `express-rate-limit` |

---

## 📁 Project Structure

```
uniqlo-app/
├── server/
│   ├── index.js           # Express app entry point
│   ├── db.js              # SQLite schema + first-run seeding
│   ├── auth.js            # JWT helpers + requireAuth middleware
│   ├── seedData.js        # Sample product catalog
│   └── routes/            # auth, products, wishlist, orders
├── src/
│   ├── assets/            # hero.png, logo.png, images/
│   ├── components/        # Navbar, CartDrawer, AuthModal, ProductCard, Toast, Layout
│   ├── context/           # CartContext, AuthContext
│   ├── data/              # images.js, products.js
│   ├── hooks/             # useReveal, useCountUp
│   ├── pages/             # Home, About, Products, Orders
│   ├── utils/api.js       # fetch wrapper with auth token
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── index.html
├── package.json
└── vite.config.js         # proxies /api to the backend in development
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
# then edit .env and set JWT_SECRET to a long random string

# 4. Run the frontend and backend together
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). The API runs on `http://localhost:4000`, and Vite forwards `/api` requests to it automatically.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts Vite and the API together (API auto-restarts on changes) |
| `npm run dev:web` | Starts only the frontend |
| `npm run server` | Starts only the API |
| `npm run build` | Builds the frontend into `/dist` |
| `npm start` | Builds, then serves the app **and** API from `http://localhost:4000` |

### Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `4000` | API port |
| `JWT_SECRET` | dev fallback | Secret used to sign login tokens (required when `NODE_ENV=production`) |
| `DB_PATH` | `server/data/uniqlo.db` | SQLite file location |

> If `better-sqlite3` fails to install, make sure you are on a current Node LTS. On some Linux setups you may need build tools (`sudo dnf install gcc-c++ make python3` on Fedora).

---

## 🔌 API Reference

All bodies are JSON. 🔒 = requires `Authorization: Bearer <token>`.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/auth/register` | Create account `{ name, email, password }` |
| POST | `/api/auth/login` | Log in `{ email, password }` |
| GET | `/api/auth/me` 🔒 | Current user |
| GET | `/api/products` | List products. Query: `gender`, `category`, `q`, `sort` (`low`, `high`, `name`) |
| GET | `/api/products/:id` | Single product |
| GET | `/api/wishlist` 🔒 | Saved product ids |
| POST | `/api/wishlist/:productId` 🔒 | Toggle a saved product |
| POST | `/api/orders` 🔒 | Place order `{ items: [{ productId, color, size, qty }] }` |
| GET | `/api/orders` 🔒 | Your order history |

### Database tables
`users`, `products`, `wishlist`, `orders`, `order_items`

---

## 🖼️ Replacing Images

All images are registered in `src/data/images.js`. Replace the file in `src/assets/` **keeping the same file name**, or update the import path there.

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

- [x] Backend and database
- [x] User authentication
- [x] Persistent wishlist
- [x] Order history
- [ ] Product detail pages
- [ ] Real payment integration
- [ ] Admin dashboard for products and orders
- [ ] Footer, contact, and store locator

---

## 📄 License

This project is for educational purposes only. All brand assets remain the property of their respective owners.
