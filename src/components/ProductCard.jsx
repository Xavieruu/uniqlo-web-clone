import { useState } from 'react'
import { COLORS, formatPrice } from '../data/products'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [color, setColor] = useState(product.colors[0])
  const [size, setSize] = useState(product.sizes[Math.floor(product.sizes.length / 2)])
  const [liked, setLiked] = useState(false)

  return (
    <article className="product-card">
      <div className="product-img">
        <img src={product.img} alt={product.name} loading="lazy" />
        <button
          className={`heart ${liked ? 'on' : ''}`}
          onClick={() => setLiked((l) => !l)}
          aria-pressed={liked}
          aria-label="Add to wishlist"
        >
          {liked ? '♥' : '♡'}
        </button>
      </div>

      <div className="product-body">
        <h3>{product.name}</h3>
        <p className="price">{formatPrice(product.price)}</p>

        <div className="swatches" role="radiogroup" aria-label="Color">
          {product.colors.map((c) => (
            <button
              key={c}
              role="radio"
              aria-checked={color === c}
              aria-label={c}
              title={c}
              className={color === c ? 'active' : ''}
              style={{ background: COLORS[c] }}
              onClick={() => setColor(c)}
            />
          ))}
          <span className="swatch-name">{color}</span>
        </div>

        <div className="sizes" role="radiogroup" aria-label="Size">
          {product.sizes.map((s) => (
            <button
              key={s}
              role="radio"
              aria-checked={size === s}
              className={size === s ? 'active' : ''}
              onClick={() => setSize(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <button className="btn-solid small" onClick={() => addItem(product, color, size)}>
          Add to cart
        </button>
      </div>
    </article>
  )
}
