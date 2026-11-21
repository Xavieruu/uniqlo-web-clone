import jwt from 'jsonwebtoken'

const isProd = process.env.NODE_ENV === 'production'
let SECRET = process.env.JWT_SECRET
if (!SECRET) {
  if (isProd) throw new Error('JWT_SECRET must be set in production')
  SECRET = 'dev-only-secret-change-me'
  console.warn('[auth] JWT_SECRET not set — using an insecure development secret.')
}

export const signToken = (user) =>
  jwt.sign({ sub: user.id }, SECRET, { expiresIn: '7d' })

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Please log in first.' })
  try {
    const payload = jwt.verify(token, SECRET)
    req.userId = payload.sub
    next()
  } catch {
    res.status(401).json({ error: 'Session expired. Please log in again.' })
  }
}
