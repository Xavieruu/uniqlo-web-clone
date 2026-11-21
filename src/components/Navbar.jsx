import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import images from '../data/images'

function Logo() {
  return (
    <Link to="/" className="logo" aria-label="UNIQLO home">
      <img src={images.logo} alt="UNIQLO" />
    </Link>
  )
}

export default function Navbar() {
  const { count, openCart } = useCart()
  const { user, openAuth, logout } = useAuth()
  const [menu, setMenu] = useState(false)

  const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/about', label: 'About' },
    { to: '/products', label: 'Products' },
    ...(user ? [{ to: '/orders', label: 'Orders' }] : []),
  ]

  return (
    <header className="navbar">
      <button
        className="hamburger"
        aria-label="Toggle menu"
        aria-expanded={menu}
        onClick={() => setMenu((m) => !m)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`nav-links ${menu ? 'open' : ''}`}>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            onClick={() => setMenu(false)}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="nav-right">
        {user ? (
          <span className="account">
            <span className="hello">Hi, {user.name.split(' ')[0]}</span>
            <button className="account-btn" onClick={logout}>Log out</button>
          </span>
        ) : (
          <button className="account-btn" onClick={openAuth}>Log in</button>
        )}

        <button className="cart-btn" onClick={openCart} aria-label={`Open cart, ${count} items`}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
            <path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM1 2v2h2l3.6 7.6-1.4 2.4A2 2 0 0 0 7 17h12v-2H7.4l1.1-2h7.5a2 2 0 0 0 1.7-1l3.6-6.5A1 1 0 0 0 20.4 4H5.2l-.9-2H1Z" />
          </svg>
          <span>Cart</span>
          {count > 0 && <b key={count} className="badge">{count}</b>}
        </button>
        <Logo />
      </div>
    </header>
  )
}
