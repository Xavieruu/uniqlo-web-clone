import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import CartDrawer from './CartDrawer'
import Toast from './Toast'

export default function Layout() {
  const { pathname } = useLocation()

  // Scroll to top whenever the page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <>
      <Navbar />
      <main className="page" key={pathname}>
        <Outlet />
      </main>
      <CartDrawer />
      <Toast />
    </>
  )
}
