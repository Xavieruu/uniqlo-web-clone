import { useMemo, useRef, useState } from 'react'
import images from '../data/images'
import { GENDERS, CATEGORIES, PRODUCTS } from '../data/products'
import ProductCard from '../components/ProductCard'

const SORTS = {
  featured: 'Featured',
  low: 'Price: Low to High',
  high: 'Price: High to Low',
  name: 'Name: A–Z',
}

export default function Products() {
  const [gender, setGender] = useState('Women')
  const [category, setCategory] = useState(null)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')
  const resultsRef = useRef(null)

  const results = useMemo(() => {
    let list = PRODUCTS.filter(
      (p) =>
        p.genders.includes(gender) &&
        (!category || p.category === category) &&
        p.name.toLowerCase().includes(query.trim().toLowerCase())
    )
    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [gender, category, query, sort])

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
            <span>{results.length} item{results.length !== 1 && 's'}</span>
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

        {results.length === 0 ? (
          <p className="no-results">No products match your filters. Try another category.</p>
        ) : (
          <div className="product-grid">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
