import { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

const FREE_SHIPPING = 3000

export default function CartDrawer() {
  const { open, closeCart, items, subtotal, increase, decrease, remove, clear, showToast } = useCart()

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

  const remaining = Math.max(FREE_SHIPPING - subtotal, 0)
  const progress = Math.min((subtotal / FREE_SHIPPING) * 100, 100)

  const checkout = () => {
    clear()
    closeCart()
    showToast('Order has been placed successfully!')
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
              <div className="row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <button className="btn-solid" onClick={checkout}>Checkout</button>
              <button className="link-btn center" onClick={clear}>Clear cart</button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
