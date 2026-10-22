import { useEffect, useState } from 'react'
const launchDate = new Date('2027-01-23T00:00:00+05:30').getTime()
function Countdown() {
 const [left,setLeft]=useState(()=>Math.max(0,launchDate-Date.now()))
 useEffect(()=>{const timer=window.setInterval(()=>setLeft(Math.max(0,launchDate-Date.now())),1000);return()=>window.clearInterval(timer)},[])
 const units=[[Math.floor(left/86400000),'DAYS'],[Math.floor(left/3600000)%24,'HOURS'],[Math.floor(left/60000)%60,'MINUTES'],[Math.floor(left/1000)%60,'SECONDS']]
 return <div className="countdown" aria-label="Time until launch">{units.map(([v,l])=><div className="time" key={l}><strong>{l==='DAYS'?v:String(v).padStart(2,'0')}</strong><span>{l}</span></div>)}</div>
}
function BrandMark(){return <svg className="brand-symbol" viewBox="0 0 100 100" role="img" aria-label="Shairo symbol"><path d="M77 8 39 28c-8 4-10 13-2 19l30 16c8 4 8 12 0 17L25 94V67c0-8 3-14 10-18l6-4-8-4c-14-8-15-24 0-33L77 8Z" fill="currentColor" transform="translate(0 -2)"/></svg>}
export default function App(){return <main className="page"><header className="header"><a className="wordmark" href="#home" aria-label="Shairo AI home"><BrandMark/><span>Shairo</span></a><span className="header-note">AI, REIMAGINED.</span></header><section className="hero" id="home"><div className="eyebrow"><span className="dot"/> SOMETHING NEW IS TAKING SHAPE</div><h1>Think beyond.<br/><em>Build with AI.</em></h1><p className="intro">A new way to turn ideas into reality.</p><div className="launch"><span className="launch-label">COMING SOON</span><span className="launch-date">23 JANUARY 2027</span></div><Countdown/><div className="hero-bottom"><span>SHAIRO AI</span><span>THE FUTURE IS YOURS TO BUILD.</span></div></section><footer className="footer"><a className="footer-brand" href="#home"><BrandMark/><span>Shairo</span></a><span>© {new Date().getFullYear()} SHAIRO AI</span></footer></main>}
