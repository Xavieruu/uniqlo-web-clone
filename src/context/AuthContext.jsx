import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { api, getToken, setToken } from '../utils/api'
import { useCart } from './CartContext'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const { showToast } = useCart()
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)
  const [wishlist, setWishlist] = useState([])
  const [authOpen, setAuthOpen] = useState(false)

  const loadWishlist = useCallback(async () => {
    try {
      const { ids } = await api('/wishlist')
      setWishlist(ids)
    } catch {
      setWishlist([])
    }
  }, [])

  // Restore the session on first load
  useEffect(() => {
    if (!getToken()) {
      setReady(true)
      return
    }
    api('/auth/me')
      .then(({ user }) => {
        setUser(user)
        return loadWishlist()
      })
      .catch(() => setToken(null))
      .finally(() => setReady(true))
  }, [loadWishlist])

  const finish = async ({ token, user }) => {
    setToken(token)
    setUser(user)
    await loadWishlist()
    setAuthOpen(false)
    showToast(`Welcome, ${user.name}!`)
  }

  const login = async (email, password) =>
    finish(await api('/auth/login', { method: 'POST', body: { email, password } }))

  const register = async (name, email, password) =>
    finish(await api('/auth/register', { method: 'POST', body: { name, email, password } }))

  const logout = () => {
    setToken(null)
    setUser(null)
    setWishlist([])
    showToast('Logged out')
  }

  const toggleWishlist = async (productId) => {
    if (!user) {
      setAuthOpen(true)
      showToast('Log in to save items')
      return
    }
    try {
      const { ids } = await api(`/wishlist/${productId}`, { method: 'POST' })
      setWishlist(ids)
    } catch (e) {
      showToast(e.message)
    }
  }

  const value = {
    user,
    ready,
    wishlist,
    authOpen,
    openAuth: () => setAuthOpen(true),
    closeAuth: () => setAuthOpen(false),
    login,
    register,
    logout,
    toggleWishlist,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
