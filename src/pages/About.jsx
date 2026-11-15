import { useState } from 'react'
import { Link } from 'react-router-dom'
import images from '../data/images'
import useReveal from '../hooks/useReveal'
import useCountUp from '../hooks/useCountUp'

const TIMELINE = [
  { year: 1949, title: 'Founded in Yamaguchi', text: 'The company begins in Yamaguchi, Japan as a textiles manufacturer.' },
  { year: 1984, title: 'First UNIQLO store', text: 'The first UNIQLO store opens in Hiroshima, Japan.' },
  { year: 2012, title: 'Arrival in the Philippines', text: 'UNIQLO opens its first store in Manila, bringing LifeWear to the Philippines.' },
  { year: 2026, title: 'Over 1000 stores', text: 'A global brand with more than 1000 stores worldwide, still focused on quality and textiles.' },
]

function Stat({ value, suffix, label, start }) {
  const n = useCountUp(value, start)
  return (
    <div className="stat">
      <strong>{n.toLocaleString()}{suffix}</strong>
      <span>{label}</span>
    </div>
  )
}

export default function About() {
  const [active, setActive] = useState(0)
  const [statsRef, statsVisible] = useReveal(0.3)
  const [tlRef, tlVisible] = useReveal(0.2)

  return (
    <>
      <section className="about-split">
        <div className="about-img">
          <img src={images.aboutStore} alt="UNIQLO flagship store" />
        </div>
        <div className="about-text">
          <h1>ABOUT</h1>
          <h3>U N I Q L O</h3>
          <hr />
          <p>
            UNIQLO is a clothing apparel company, which was originally founded in
            Yamaguchi, Japan in 1949 as a textiles manufacturer. Now it is a
            global brand with over 1000 stores around the world. Redefining
            clothing, with a focus on quality and textiles which has been
            unwavered since the company’s origins in 1949.
          </p>
          <Link to="/products" className="btn-outline dark">Explore products</Link>
        </div>
      </section>

      <section className="quote">
        <h2>Simple made better.</h2>
        <p>O S A M U&nbsp; I K E Z O E ,&nbsp; C E O</p>
        <hr />
      </section>

      <section className={`stats reveal ${statsVisible ? 'in' : ''}`} ref={statsRef}>
        <Stat value={1949} suffix="" label="Year founded" start={statsVisible} />
        <Stat value={1000} suffix="+" label="Stores worldwide" start={statsVisible} />
        <Stat value={8} suffix="" label="Product categories" start={statsVisible} />
      </section>

      <section className={`timeline reveal ${tlVisible ? 'in' : ''}`} ref={tlRef}>
        <h2>Our journey</h2>
        <div className="tl-years" role="tablist">
          {TIMELINE.map((t, i) => (
            <button
              key={t.year}
              role="tab"
              aria-selected={active === i}
              className={active === i ? 'active' : ''}
              onClick={() => setActive(i)}
            >
              {t.year}
            </button>
          ))}
        </div>
        <div className="tl-card" key={active}>
          <h3>{TIMELINE[active].title}</h3>
          <p>{TIMELINE[active].text}</p>
        </div>
      </section>
    </>
  )
}
