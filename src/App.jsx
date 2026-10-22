import { useEffect, useState } from 'react'

const launchDate = new Date('2027-01-23T00:00:00+05:30').getTime()
const linkedinUrl = 'https://www.linkedin.com/in/himanshu-96a864414/'

function ShairoMark() {
  return <img className="shairo-mark" src="/shairo-logo.svg" alt="Shairo" />
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
  return <div className="countdown" aria-label="Countdown to Shairo launch">
    {units.map(({ label, value }) => <div className="countdown-unit" key={label}>
      <span className="countdown-number">{label === 'DAYS' ? value : String(value).padStart(2, '0')}</span>
      <span className="countdown-label">{label}</span>
    </div>)}
  </div>
}

export default function App() {
  return <main className="coming-soon">
    <section className="brand-block" aria-label="Shairo AI coming soon">
      <ShairoMark />
      <h1>Shairo</h1>
      <div className="tagline"><span /><p>AI REIMAGINED</p><span /></div>
      <Countdown />
      <a className="contact-link" href={linkedinUrl} target="_blank" rel="noreferrer">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V8.99h3.56v11.46ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"/></svg>
        <span>Connect on LinkedIn</span><span className="contact-arrow">↗</span>
      </a>
    </section>
  </main>
}
