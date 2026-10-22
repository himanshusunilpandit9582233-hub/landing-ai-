import { useEffect, useMemo, useState } from 'react'
import { ArrowDownRight, ArrowRight, Check, Code2, Github, Layers3, Menu, Sparkles, Terminal, X } from 'lucide-react'

const LAUNCH_AT = new Date('2027-01-23T00:00:00+05:30').getTime()

function getTimeLeft() {
  const distance = Math.max(0, LAUNCH_AT - Date.now())
  return {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance % 86400000) / 3600000),
    minutes: Math.floor((distance % 3600000) / 60000),
    seconds: Math.floor((distance % 60000) / 1000),
    launched: distance === 0,
  }
}
const pad = (n) => String(n).padStart(2, '0')

function Countdown() {
  const [time, setTime] = useState(getTimeLeft)
  useEffect(() => {
    const timer = window.setInterval(() => setTime(getTimeLeft()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  const units = [
    ['days', 'Days'], ['hours', 'Hours'], ['minutes', 'Minutes'], ['seconds', 'Seconds']
  ]
  return <div className="countdown-grid" aria-label={time.launched ? 'Shairo AI launch date has arrived' : 'Countdown to Shairo AI launch'}>
    {time.launched ? <div className="launch-arrived">The wait is over. Shairo AI is here.</div> : units.map(([key, label]) =>
      <div className="time-unit" key={key}>
        <span className="time-number" aria-live={key === 'seconds' ? 'off' : undefined}>{key === 'days' ? time[key] : pad(time[key])}</span>
        <span className="time-label">{label}</span>
      </div>
    )}
  </div>
}

function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setStatus('idle')
    setMessage('')
    setBusy(true)
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'landing-page' }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || 'Could not join the waitlist. Please try again.')
      setStatus('success')
      setMessage(data.message || 'You’re on the list. We’ll be in touch.')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMessage(err.message || 'Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return <div className="waitlist-wrap" id="waitlist">
    <form className="waitlist-form" onSubmit={submit}>
      <label className="sr-only" htmlFor="email">Email address</label>
      <input id="email" name="email" type="email" autoComplete="email" required maxLength={254}
        placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} />
      <button className="join-button" type="submit" disabled={busy}>
        {busy ? 'Joining…' : <>Join waitlist <ArrowRight size={16} /></>}
      </button>
    </form>
    <p className={`form-message ${status}`} role="status" aria-live="polite">
      {message || 'Be first to know when Shairo AI launches. No spam, ever.'}
    </p>
  </div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const year = useMemo(() => new Date().getFullYear(), [])
  const closeMenu = () => setMenuOpen(false)

  return <div className="site-shell">
    <div className="topline"><span className="status-dot" /> <span>EARLY ACCESS IS COMING</span><span className="topline-sep">/</span><span>JAN 23, 2027</span></div>
    <header className="site-header">
      <a href="#top" className="brand" aria-label="Shairo AI home" onClick={closeMenu}>
        <span className="brand-mark"><Sparkles size={19} strokeWidth={1.8} /></span><span>shairo<span className="brand-ai">.ai</span></span>
      </a>
      <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
        <a href="#vision" onClick={closeMenu}>Our vision</a>
        <a href="#countdown" onClick={closeMenu}>Launch date</a>
        <a href="#waitlist" onClick={closeMenu}>Waitlist</a>
      </nav>
      <a href="#waitlist" className="header-cta">Get early access <ArrowRight size={15}/></a>
      <button className="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={21}/> : <Menu size={21}/>}
      </button>
    </header>

    <main id="top">
      <section className="hero section-pad">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> A NEW CHAPTER IN BUILDING SOFTWARE</div>
          <h1>Your ideas.<br/>Meet <span className="serif-italic">intelligence.</span></h1>
          <p className="hero-description">We’re building a new kind of AI for the people who build what’s next. Less friction between the idea in your head and the software in your hands.</p>
          <div className="hero-actions">
            <a className="button-primary" href="#waitlist">Get on the list <ArrowRight size={17}/></a>
            <a className="text-link" href="#vision">Discover Shairo <ArrowDownRight size={16}/></a>
          </div>
          <div className="hero-footnote"><span className="mini-avatars"><i>H</i><i>S</i><i>+</i></span><span>Made for builders, by builders.</span></div>
        </div>
        <div className="hero-art" aria-label="Abstract monochrome visualization of connected AI layers">
          <div className="art-grid"></div>
          <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="orbit orbit-three"></div>
          <div className="core-glow"></div>
          <div className="core-mark"><Sparkles size={37} strokeWidth={1.1}/></div>
          <div className="float-card card-code"><div className="card-top"><Code2 size={13}/><span>INTELLIGENCE / 001</span><span className="live-dot"/></div><div className="code-lines"><i/><i/><i/><i/></div><div className="code-caption">Ideas into interfaces.</div></div>
          <div className="float-card card-terminal"><div className="terminal-dots"><i/><i/><i/></div><div className="terminal-text"><span>›</span> build something new<span className="cursor">_</span></div></div>
          <div className="art-index">FIG 01 <span>—</span> THE BUILDING BLOCKS</div>
        </div>
        <div className="hero-bottom"><span>INDEPENDENT THINKING. INTELLIGENT BUILDING.</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className="manifesto section-pad" id="vision">
        <div className="section-kicker"><span>01</span> / THE VISION</div>
        <div className="manifesto-content">
          <h2>Software should move<br/>at the speed of <span className="serif-italic">thought.</span></h2>
          <div className="manifesto-side"><p>Shairo AI is being built to help developers think clearly, solve harder problems, and bring ambitious ideas to life. We’re starting with software engineering—and building toward what comes next.</p><a href="#waitlist" className="round-link" aria-label="Join the waitlist"><ArrowRight size={20}/></a></div>
        </div>
        <div className="principles">
          <article className="principle"><span className="principle-icon"><Code2 size={19}/></span><span className="principle-number">01 / BUILD</span><h3>Made for real work.</h3><p>Designed around the craft of writing, understanding, and improving code.</p></article>
          <article className="principle"><span className="principle-icon"><Layers3 size={19}/></span><span className="principle-number">02 / THINK</span><h3>Clarity over noise.</h3><p>Less busywork. More focus on the problems worth solving.</p></article>
          <article className="principle"><span className="principle-icon"><Terminal size={19}/></span><span className="principle-number">03 / EVOLVE</span><h3>Built for what’s next.</h3><p>A thoughtful new approach to how people and AI create together.</p></article>
        </div>
      </section>

      <section className="launch-section section-pad" id="countdown">
        <div className="launch-topline"><span className="section-kicker"><span>02</span> / THE COUNTDOWN</span><span className="launch-status"><span className="status-dot"/> IN DEVELOPMENT</span></div>
        <div className="launch-layout">
          <div><h2>Something new<br/>is <span className="serif-italic">taking shape.</span></h2><p className="launch-copy">The next chapter starts soon. Get a front-row seat to the launch of Shairo AI.</p></div>
          <div className="countdown-panel">
            <div className="countdown-heading"><span>TIME UNTIL LAUNCH</span><span className="calendar-date">23 JANUARY 2027</span></div>
            <Countdown/>
            <div className="countdown-rule"><span/><span className="rule-spark">✳</span><span/></div>
            <p className="timezone-note">Countdown uses India Standard Time (IST, UTC+05:30).</p>
          </div>
        </div>
      </section>

      <section className="waitlist-section section-pad">
        <div className="waitlist-orb" aria-hidden="true"><div/><div/><div/></div>
        <div className="section-kicker"><span>03</span> / EARLY ACCESS</div>
        <h2>Be there from<br/><span className="serif-italic">the beginning.</span></h2>
        <p className="waitlist-copy">Join the early access list. We’ll let you know when Shairo AI is ready to meet the world.</p>
        <WaitlistForm/>
        <p className="privacy-note"><Check size={13}/> Your email stays yours. Unsubscribe whenever you want.</p>
      </section>
    </main>

    <footer className="site-footer">
      <a href="#top" className="brand footer-brand"><span className="brand-mark"><Sparkles size={17}/></span><span>shairo<span className="brand-ai">.ai</span></span></a>
      <span className="footer-note">BUILD WHAT YOU IMAGINE.</span>
      <span className="copyright">© {year} Shairo AI</span>
    </footer>
  </div>
}

export default App
