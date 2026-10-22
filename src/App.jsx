import { useEffect, useState } from 'react'

const launchDate = new Date('2027-01-23T00:00:00+05:30').getTime()

function ShairoLogo({ large = false }) {
  return <div className={large ? 'logo-lockup logo-large' : 'logo-lockup'}>
    <svg className="logo-symbol" viewBox="0 0 220 220" aria-hidden="true">
      <path d="M176 13 79 65C48 82 47 111 80 130l69 39c19 11 19 27-1 39l-92 51v-59c0-21 9-36 28-47l11-6-17-9C43 120 40 82 79 60l97-47Z" transform="translate(0 -25)" fill="currentColor" />
    </svg>
    <span>Shairo</span>
  </div>
}

function Countdown() {
  const [left, setLeft] = useState(() => Math.max(0, launchDate - Date.now()))
  useEffect(() => {
    const timer = window.setInterval(() => setLeft(Math.max(0, launchDate - Date.now())), 1000)
    return () => window.clearInterval(timer)
  }, [])
  const units = [
    [Math.floor(left / 86400000), 'DAYS'],
    [Math.floor(left / 3600000) % 24, 'HOURS'],
    [Math.floor(left / 60000) % 60, 'MINUTES'],
    [Math.floor(left / 1000) % 60, 'SECONDS'],
  ]
  if (!left) return <p className="launch-message">We’re live.</p>
  return <div className="countdown" aria-label="Time until launch">
    {units.map(([value, label]) => <div className="time" key={label}><strong>{label === 'DAYS' ? value : String(value).padStart(2, '0')}</strong><span>{label}</span></div>)}
  </div>
}

export default function App() {
  return <main className="page">
    <header className="header"><a href="#home" aria-label="Shairo home"><ShairoLogo /></a><span className="header-note">AI, REIMAGINED.</span></header>
    <section className="hero" id="home">
      <div className="hero-orbit orbit-a" /><div className="hero-orbit orbit-b" /><div className="hero-orbit orbit-c" />
      <div className="hero-content">
        <div className="eyebrow"><span className="dot" /> A NEW WAY TO BUILD</div>
        <h1>Think beyond.<br/><em>Build with AI.</em></h1>
        <p className="intro">Your ideas, without limits.</p>
        <div className="launch"><span className="launch-label">COMING SOON</span><span className="launch-date">23 JANUARY 2027</span></div>
        <Countdown />
      </div>
      <div className="hero-watermark"><ShairoLogo large /></div>
      <div className="hero-bottom"><span>SHAIRO AI</span><span>THE FUTURE IS YOURS TO BUILD.</span></div>
    </section>
    <footer className="footer"><span>SHAIRO AI</span><span>© {new Date().getFullYear()}</span></footer>
  </main>
}
