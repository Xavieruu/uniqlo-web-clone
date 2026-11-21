import { Router } from 'express'
import db, { parseProduct } from '../db.js'

const router = Router()

// GET /api/products?gender=Women&category=down&q=jacket&sort=low|high|name
router.get('/', (req, res) => {
  const { gender, category, q, sort } = req.query
  let list = db.prepare('SELECT * FROM products ORDER BY id').all().map(parseProduct)

  if (gender) list = list.filter((p) => p.genders.includes(String(gender)))
  if (category) list = list.filter((p) => p.category === String(category))
  if (q) {
    const needle = String(q).trim().toLowerCase()
    list = list.filter((p) => p.name.toLowerCase().includes(needle))
  }

  if (sort === 'low') list.sort((a, b) => a.price - b.price)
  else if (sort === 'high') list.sort((a, b) => b.price - a.price)
  else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))

  res.json({ products: list })
})

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(Number(req.params.id))
  if (!row) return res.status(404).json({ error: 'Product not found.' })
  res.json({ product: parseProduct(row) })
})

export default router
