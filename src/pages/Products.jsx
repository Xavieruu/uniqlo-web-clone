import { useEffect, useRef, useState } from 'react'
import images from '../data/images'
import { GENDERS, CATEGORIES, withImage } from '../data/products'
import { api } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import ProductCard from '../components/ProductCard'

const SORTS = {
  featured: 'Featured',
  low: 'Price: Low to High',
  high: 'Price: High to Low',
  name: 'Name: A–Z',
}

export default function Products() {
  const { user, wishlist } = useAuth()
  const [gender, setGender] = useState('Women')
  const [category, setCategory] = useState(null)
  const [query, setQuery] = useState('')
  const [debounced, setDebounced] = useState('')
  const [sort, setSort] = useState('featured')
  const [savedOnly, setSavedOnly] = useState(false)

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)
  const resultsRef = useRef(null)

  // Wait briefly after typing before hitting the API
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 250)
    return () => clearTimeout(t)
  }, [query])

  // Fetch from the backend whenever a filter changes
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    const params = new URLSearchParams({ gender, sort })
    if (category) params.set('category', category)
    if (debounced.trim()) params.set('q', debounced.trim())

    api(`/products?${params}`)
      .then((d) => !cancelled && setProducts(d.products.map(withImage)))
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false))

    return () => {
      cancelled = true
    }
  }, [gender, category, debounced, sort, reloadKey])

  const results = savedOnly && user ? products.filter((p) => wishlist.includes(p.id)) : products

  const pickCategory = (id) => {
    setCategory((c) => (c === id ? null : id))
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  const activeLabel = CATEGORIES.find((c) => c.id === category)?.label

  return (
    <>
      <section
        className="products-banner"
        style={{ backgroundImage: `url(${images.productsBanner})` }}
      >
        <div className="gender-tabs" role="tablist">
          {GENDERS.map((g) => (
            <button
              key={g}
              role="tab"
              aria-selected={gender === g}
              className={gender === g ? 'active' : ''}
              onClick={() => setGender(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </section>

      <section className="category-section">
        <h2>Search by category</h2>
        <div className="category-grid">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={`category ${category === c.id ? 'active' : ''}`}
              onClick={() => pickCategory(c.id)}
              aria-pressed={category === c.id}
            >
              <img src={c.img} alt="" />
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="results" ref={resultsRef}>
        <div className="toolbar">
          <div className="results-title">
            <h2>
              {gender}
              {activeLabel ? ` · ${activeLabel}` : ''}
            </h2>
            <span>
              {loading ? 'Loading…' : `${results.length} item${results.length !== 1 ? 's' : ''}`}
            </span>
          </div>

          <div className="controls">
            <input
              type="search"
              placeholder="Search products…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search products"
            />
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
              {Object.entries(SORTS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
            {user && (
              <label className="check">
                <input type="checkbox" checked={savedOnly} onChange={(e) => setSavedOnly(e.target.checked)} />
                Saved only
              </label>
            )}
            {(category || query) && (
              <button
                className="link-btn"
                onClick={() => {
                  setCategory(null)
                  setQuery('')
                }}
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {error ? (
          <div className="no-results">
            <p>{error}</p>
            <button className="btn-outline dark" onClick={() => setReloadKey((k) => k + 1)}>Try again</button>
          </div>
        ) : !loading && results.length === 0 ? (
          <p className="no-results">
            {savedOnly ? 'You haven’t saved any items here yet.' : 'No products match your filters. Try another category.'}
          </p>
        ) : (
          <div className={`product-grid ${loading ? 'is-loading' : ''}`}>
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
