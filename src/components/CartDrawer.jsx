import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { api } from '../utils/api'
import { formatPrice, SHIPPING_THRESHOLD, SHIPPING_FEE } from '../data/products'

export default function CartDrawer() {
  const { open, closeCart, items, subtotal, increase, decrease, remove, clear, showToast } = useCart()
  const { user, openAuth } = useAuth()
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeCart()
    if (open) {
      window.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, closeCart])

  const remaining = Math.max(SHIPPING_THRESHOLD - subtotal, 0)
  const progress = Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100)
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE

  const checkout = async () => {
    if (!user) {
      closeCart()
      openAuth()
      showToast('Please log in to check out')
      return
    }
    setBusy(true)
    try {
      const { order } = await api('/orders', {
        method: 'POST',
        body: {
          items: items.map((i) => ({ productId: i.id, color: i.color, size: i.size, qty: i.qty })),
        },
      })
      clear()
      closeCart()
      showToast(`Order #${order.id} placed — total ${formatPrice(order.total)}`)
    } catch (e) {
      showToast(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <div className={`overlay ${open ? 'show' : ''}`} onClick={closeCart} />
      <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open} aria-label="Shopping cart">
        <div className="drawer-head">
          <h2>Your Cart</h2>
          <button className="icon-btn" onClick={closeCart} aria-label="Close cart">✕</button>
        </div>

        {items.length === 0 ? (
          <div className="drawer-empty">
            <p>Your cart is empty.</p>
            <button className="btn-outline dark" onClick={closeCart}>Continue shopping</button>
          </div>
        ) : (
          <>
            <div className="ship-bar">
              <p>
                {remaining > 0
                  ? <>Add <b>{formatPrice(remaining)}</b> more for free shipping</>
                  : <>You’ve unlocked <b>free shipping</b>!</>}
              </p>
              <div className="track"><div style={{ width: `${progress}%` }} /></div>
            </div>

            <ul className="drawer-items">
              {items.map((i) => (
                <li key={i.key}>
                  <img src={i.img} alt={i.name} />
                  <div className="info">
                    <h4>{i.name}</h4>
                    <p>{i.color} · Size {i.size}</p>
                    <div className="qty">
                      <button onClick={() => decrease(i.key)} aria-label="Decrease quantity">−</button>
                      <span>{i.qty}</span>
                      <button onClick={() => increase(i.key)} aria-label="Increase quantity">+</button>
                    </div>
                  </div>
                  <div className="right">
                    <strong>{formatPrice(i.price * i.qty)}</strong>
                    <button className="link-btn" onClick={() => remove(i.key)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="drawer-foot">
              <div className="row small"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="row small"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
              <div className="row"><span>Total</span><strong>{formatPrice(subtotal + shipping)}</strong></div>
              <button className="btn-solid" onClick={checkout} disabled={busy}>
                {busy ? 'Placing order…' : user ? 'Checkout' : 'Log in to check out'}
              </button>
              <button className="link-btn center" onClick={clear}>Clear cart</button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
