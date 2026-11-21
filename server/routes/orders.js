import { Router } from 'express'
import db, { parseProduct, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from '../db.js'
import { requireAuth } from '../auth.js'

const router = Router()
router.use(requireAuth)

// Prices are always read from the database — never trusted from the client.
router.post('/', (req, res) => {
  const items = req.body?.items
  if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
    return res.status(400).json({ error: 'Your cart is empty.' })
  }

  const getProduct = db.prepare('SELECT * FROM products WHERE id = ?')
  const lines = []
  for (const it of items) {
    const row = getProduct.get(Number(it?.productId))
    if (!row) return res.status(400).json({ error: 'A product in your cart no longer exists.' })
    const product = parseProduct(row)
    const qty = Number(it.qty)
    if (!Number.isInteger(qty) || qty < 1 || qty > 20) {
      return res.status(400).json({ error: `Invalid quantity for ${product.name}.` })
    }
    if (!product.colors.includes(it.color) || !product.sizes.includes(it.size)) {
      return res.status(400).json({ error: `Invalid color or size for ${product.name}.` })
    }
    lines.push({ product, color: it.color, size: it.size, qty })
  }

  const subtotal = lines.reduce((n, l) => n + l.product.price * l.qty, 0)
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const total = subtotal + shipping

  const place = db.transaction(() => {
    const info = db
      .prepare('INSERT INTO orders (user_id, subtotal, shipping, total) VALUES (?, ?, ?, ?)')
      .run(req.userId, subtotal, shipping, total)
    const insertItem = db.prepare(
      'INSERT INTO order_items (order_id, product_id, name, category, color, size, price, qty) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    )
    for (const l of lines) {
      insertItem.run(info.lastInsertRowid, l.product.id, l.product.name, l.product.category, l.color, l.size, l.product.price, l.qty)
    }
    return info.lastInsertRowid
  })

  const orderId = place()
  res.status(201).json({ order: { id: orderId, subtotal, shipping, total } })
})

router.get('/', (req, res) => {
  const orders = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC').all(req.userId)
  const getItems = db.prepare('SELECT * FROM order_items WHERE order_id = ?')
  res.json({ orders: orders.map((o) => ({ ...o, items: getItems.all(o.id) })) })
})

export default router
