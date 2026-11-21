import { Router } from 'express'
import db from '../db.js'
import { requireAuth } from '../auth.js'

const router = Router()
router.use(requireAuth)

const ids = (userId) =>
  db.prepare('SELECT product_id FROM wishlist WHERE user_id = ?').all(userId).map((r) => r.product_id)

router.get('/', (req, res) => res.json({ ids: ids(req.userId) }))

// Toggle: adds if missing, removes if present
router.post('/:productId', (req, res) => {
  const productId = Number(req.params.productId)
  if (!db.prepare('SELECT 1 FROM products WHERE id = ?').get(productId)) {
    return res.status(404).json({ error: 'Product not found.' })
  }
  const existing = db.prepare('SELECT 1 FROM wishlist WHERE user_id = ? AND product_id = ?').get(req.userId, productId)
  if (existing) {
    db.prepare('DELETE FROM wishlist WHERE user_id = ? AND product_id = ?').run(req.userId, productId)
  } else {
    db.prepare('INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)').run(req.userId, productId)
  }
  res.json({ liked: !existing, ids: ids(req.userId) })
})

export default router
