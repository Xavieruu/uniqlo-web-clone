import { createContext, useContext, useEffect, useReducer, useState, useCallback } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'uniqlo-cart-v1'

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { item } = action
      const existing = state.find((i) => i.key === item.key)
      if (existing) {
        return state.map((i) => (i.key === item.key ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...state, { ...item, qty: 1 }]
    }
    case 'INC':
      return state.map((i) => (i.key === action.key ? { ...i, qty: i.qty + 1 } : i))
    case 'DEC':
      return state
        .map((i) => (i.key === action.key ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    case 'REMOVE':
      return state.filter((i) => i.key !== action.key)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

function init() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [], init)
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable */
    }
  }, [items])

  const showToast = useCallback((message) => {
    setToast({ message, id: Date.now() })
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(t)
  }, [toast])

  const addItem = (product, color, size) => {
    const key = `${product.id}-${color}-${size}`
    dispatch({
      type: 'ADD',
      item: {
        key,
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img,
        color,
        size,
      },
    })
    showToast(`${product.name} added to cart`)
  }

  const count = items.reduce((n, i) => n + i.qty, 0)
  const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0)

  const value = {
    items,
    count,
    subtotal,
    open,
    toast,
    openCart: () => setOpen(true),
    closeCart: () => setOpen(false),
    addItem,
    increase: (key) => dispatch({ type: 'INC', key }),
    decrease: (key) => dispatch({ type: 'DEC', key }),
    remove: (key) => dispatch({ type: 'REMOVE', key }),
    clear: () => dispatch({ type: 'CLEAR' }),
    showToast,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
