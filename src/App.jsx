import { useEffect, useState } from 'react'

const launchDate = new Date('2027-01-23T00:00:00+05:30').getTime()

function ShairoMark() {
  return (
    <svg className="shairo-mark" viewBox="0 0 180 220" role="img" aria-label="Shairo logo mark">
      <path d="M148 8 66 52C38 67 39 91 68 108l55 32c17 10 16 24-1 34l-77 43v-50c0-18 7-30 24-40l9-5-14-8C40 102 37 70 66 54l82-46Z" fill="currentColor" />
    </svg>
  )
}

function Countdown() {
  const [remaining, setRemaining] = useState(() => Math.max(0, launchDate - Date.now()))

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(Math.max(0, launchDate - Date.now()))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [])

  const units = [
    { label: 'DAYS', value: Math.floor(remaining / 86400000) },
    { label: 'HOURS', value: Math.floor(remaining / 3600000) % 24 },
    { label: 'MINUTES', value: Math.floor(remaining / 60000) % 60 },
    { label: 'SECONDS', value: Math.floor(remaining / 1000) % 60 },
  ]

  return (
    <div className="countdown" aria-label="Countdown to Shairo launch">
      {units.map(({ label, value }) => (
        <div className="countdown-unit" key={label}>
          <span className="countdown-number">{label === 'DAYS' ? value : String(value).padStart(2, '0')}</span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  )
}

export default function App() {
  return (
    <main className="coming-soon">
      <section className="brand-block" aria-label="Shairo AI coming soon">
        <ShairoMark />
        <h1>Shairo</h1>
        <div className="tagline"><span /> <p>AI REIMAGINED</p> <span /></div>
        <Countdown />
      </section>
    </main>
  )
}
