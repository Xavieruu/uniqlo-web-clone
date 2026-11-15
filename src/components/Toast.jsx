import { useCart } from '../context/CartContext'

export default function Toast() {
  const { toast } = useCart()
  return (
    <div className="toast-wrap" aria-live="polite">
      {toast && <div key={toast.id} className="toast">{toast.message}</div>}
    </div>
  )
}
