import Database from 'better-sqlite3'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { PRODUCTS } from './seedData.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = process.env.DB_PATH || path.join(__dirname, 'data', 'uniqlo.db')
if (dbPath !== ':memory:') fs.mkdirSync(path.dirname(dbPath), { recursive: true })

const db = new Database(dbPath)
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS products (
  id       INTEGER PRIMARY KEY,
  name     TEXT NOT NULL,
  category TEXT NOT NULL,
  price    INTEGER NOT NULL,
  genders  TEXT NOT NULL,   -- JSON array
  colors   TEXT NOT NULL,   -- JSON array
  sizes    TEXT NOT NULL    -- JSON array
);

CREATE TABLE IF NOT EXISTS wishlist (
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, product_id)
);

CREATE TABLE IF NOT EXISTS orders (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subtotal   INTEGER NOT NULL,
  shipping   INTEGER NOT NULL,
  total      INTEGER NOT NULL,
  status     TEXT NOT NULL DEFAULT 'placed',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS order_items (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id   INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL,
  name       TEXT NOT NULL,
  category   TEXT NOT NULL,
  color      TEXT NOT NULL,
  size       TEXT NOT NULL,
  price      INTEGER NOT NULL,
  qty        INTEGER NOT NULL
);
`)

// Seed the catalog if empty
const { n } = db.prepare('SELECT COUNT(*) AS n FROM products').get()
if (n === 0) {
  const insert = db.prepare(
    'INSERT INTO products (id, name, category, price, genders, colors, sizes) VALUES (?, ?, ?, ?, ?, ?, ?)'
  )
  const seed = db.transaction(() => {
    for (const p of PRODUCTS) {
      insert.run(p.id, p.name, p.category, p.price, JSON.stringify(p.genders), JSON.stringify(p.colors), JSON.stringify(p.sizes))
    }
  })
  seed()
}

export const FREE_SHIPPING_THRESHOLD = 3000
export const SHIPPING_FEE = 150

export const parseProduct = (row) => ({
  id: row.id,
  name: row.name,
  category: row.category,
  price: row.price,
  genders: JSON.parse(row.genders),
  colors: JSON.parse(row.colors),
  sizes: JSON.parse(row.sizes),
})

export default db
