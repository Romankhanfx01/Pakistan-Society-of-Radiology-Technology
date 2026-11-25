import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import siteData from './data/site.json'
import type { SiteConfig } from './types'
import { useGlobalMotion, useMagneticButtons } from './lib/motion'
import { prefersReducedMotion } from './lib/prefs'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsTicker from './components/StatsTicker'
import About from './components/About'
import Leadership from './components/Leadership'
import News from './components/News'
import Opportunity from './components/Opportunity'
import Registry from './components/Registry'
import Resources from './components/Resources'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ApplicationWizard from './components/ApplicationWizard'

const config = siteData as SiteConfig

function ToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button type="button" className={`to-top ${show ? 'show' : ''}`} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })}>
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}

export default function App() {
  useGlobalMotion()
  useMagneticButtons()

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>

      {/* Decorative backdrop — colours come entirely from theme tokens. */}
      <div className="site-backdrop" aria-hidden="true">
        <div className="site-backdrop-veil" />
        <img src="/assets/site-bg.jpg" alt="" className="site-backdrop-media" />
        <div className="site-backdrop-filter" />
        <div className="site-backdrop-machine" />
      </div>

      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero config={config} />
        <StatsTicker config={config} />
        <About config={config} />
        <Leadership />
        <News />
        <Opportunity config={config} />
        <Registry />
        <Resources />
        <Gallery />
        <Contact config={config} />
      </main>
      <Footer config={config} />
      <ApplicationWizard />
      <ToTop />
    </>
  )
}
