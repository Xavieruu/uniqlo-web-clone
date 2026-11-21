import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import { formatPrice } from '../data/products'

export default function Orders() {
  const { user, ready, openAuth } = useAuth()
  const [orders, setOrders] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    api('/orders')
      .then((d) => setOrders(d.orders))
      .catch((e) => setError(e.message))
  }, [user])

  if (!ready) return <section className="orders"><p className="no-results">Loading…</p></section>

  if (!user) {
    return (
      <section className="orders">
        <h1>My Orders</h1>
        <p className="no-results">Please log in to see your orders.</p>
        <button className="btn-outline dark" onClick={openAuth}>Log in</button>
      </section>
    )
  }

  return (
    <section className="orders">
      <h1>My Orders</h1>
      {error && <p className="form-error">{error}</p>}
      {orders === null && !error && <p className="no-results">Loading…</p>}
      {orders?.length === 0 && (
        <p className="no-results">
          No orders yet. <Link to="/products" className="inline-link">Start shopping</Link>
        </p>
      )}
      <div className="order-list">
        {orders?.map((o) => (
          <article className="order" key={o.id}>
            <header>
              <div>
                <h3>Order #{o.id}</h3>
                <span>{new Date(o.created_at.replace(' ', 'T') + 'Z').toLocaleString('en-PH')}</span>
              </div>
              <b className="status">{o.status}</b>
            </header>
            <ul>
              {o.items.map((i) => (
                <li key={i.id}>
                  <span>{i.qty} × {i.name} <em>({i.color}, {i.size})</em></span>
                  <span>{formatPrice(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <footer>
              <span>Shipping: {o.shipping === 0 ? 'Free' : formatPrice(o.shipping)}</span>
              <strong>Total {formatPrice(o.total)}</strong>
            </footer>
          </article>
        ))}
      </div>
    </section>
  )
}
