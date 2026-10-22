import { useEffect, useState } from 'react'

const launchDate = new Date('2027-01-23T00:00:00+05:30').getTime()

function ShairoMark() {
  return (
    <svg className="shairo-mark" viewBox="0 0 180 220" role="img" aria-label="Shairo logo">
      <path d="M151 8C155 6 159 9 159 14V43C159 60 150 73 135 81L94 103C85 108 76 107 66 102L54 96C38 88 39 71 54 59C59 55 66 51 73 47L151 8Z" fill="currentColor" />
      <path d="M72 49C59 59 53 70 59 81C62 87 68 91 77 96L132 126C148 135 153 147 147 161C142 173 130 184 112 193C126 180 130 169 121 161C118 158 113 155 106 151L49 121C28 110 22 92 29 74C34 62 47 51 72 49Z" fill="currentColor" />
      <path d="M105 151C96 146 86 146 76 151C58 160 48 175 48 193V211C48 216 52 218 57 215L114 183C127 176 128 166 116 158L105 151Z" fill="currentColor" />
    </svg>
  )
}

function Countdown() {
  const [remaining, setRemaining] = useState(() => Math.max(0, launchDate - Date.now()))

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(Math.max(0, launchDate - Date.now())), 1000)
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
        <div className="tagline"><span /><p>AI REIMAGINED</p><span /></div>
        <Countdown />
      </section>
    </main>
  )
}
