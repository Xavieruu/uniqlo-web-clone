import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import images from '../data/images'
import { PRODUCTS, COLLECTION_IDS, collectionImgs, formatPrice } from '../data/products'
import { useCart } from '../context/CartContext'
import useReveal from '../hooks/useReveal'

export default function Home() {
  const { addItem } = useCart()
  const [scrollY, setScrollY] = useState(0)
  const [ref, visible] = useReveal()

  // Subtle parallax on the hero image
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const collection = COLLECTION_IDS.map((id) => PRODUCTS.find((p) => p.id === id))

  return (
    <>
      <section className="hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage: `url(${images.hero})`,
            transform: `translateY(${scrollY * 0.25}px) scale(1.05)`,
          }}
        />
        <div className="hero-content">
          <h1>Made for All</h1>
          <Link to="/products" className="btn-outline">SHOP NOW</Link>
        </div>
      </section>

      <section className={`collections reveal ${visible ? 'in' : ''}`} ref={ref}>
        <div className="collections-left">
          <h2>New Collections</h2>
          <p>
            Simple, classic items are one of this year’s key trends. Take the
            guesswork out of finding the perfect outfit with our dresses, &amp;
            on-trend jumpsuits.
          </p>

          <div className="collection-cards">
            {collection.map((p, i) => (
              <button
                key={p.id}
                className="collection-card"
                onClick={() => addItem(p, p.colors[0], p.sizes[2])}
                aria-label={`Add ${p.name} to cart`}
              >
                <img src={collectionImgs[i]} alt={p.name} />
                <span className="card-overlay">
                  <strong>{p.name}</strong>
                  <em>{formatPrice(p.price)}</em>
                  <u>+ Quick add</u>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="collections-right">
          <img src={images.collectionSide} alt="Models wearing the new collection" />
        </div>
      </section>
    </>
  )
}
