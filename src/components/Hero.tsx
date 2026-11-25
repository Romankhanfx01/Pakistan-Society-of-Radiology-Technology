import { ArrowRight, ArrowUpRight, ChevronDown, GraduationCap, MapPin, ShieldCheck } from 'lucide-react'
import type { SiteConfig } from '../types'

export default function Hero({ config }: { config: SiteConfig }) {
  return (
    <section id="top" className="relative isolate flex min-h-[88vh] w-full items-center pt-20 pb-14 lg:min-h-screen">
      <div className="container-x relative z-10 w-full">
        <div className="hero-panel max-w-4xl p-5 sm:p-8">
          <div className="hero-reveal flex flex-wrap items-center gap-3">
            <span className="portal-pill-gold">Official national body</span>
            <span className="mono text-[10px] font-semibold uppercase tracking-[.18em] faint">{config.tagline}</span>
          </div>

          <h1 className="hero-reveal mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3rem]">
            Advancing <span className="text-accent">medical imaging</span> &amp; radiology in Pakistan
          </h1>

          <p className="hero-reveal mt-4 max-w-2xl border-l-2 border-[var(--gold)] pl-4 text-sm font-medium italic leading-relaxed muted sm:text-base">
            “Together for a skilled, safe and advanced radiology profession”
          </p>

          <p className="hero-reveal section-lead mt-4 max-w-2xl">{config.mission}</p>

          <div className="hero-reveal mt-6 flex flex-wrap items-center gap-3">
            <a href="#opportunity" data-magnetic className="btn btn-gold">
              Apply for Coordinator <ArrowRight />
            </a>
            <a href="#leadership" data-magnetic className="btn btn-ghost">
              Meet the Council <ArrowUpRight />
            </a>
          </div>

          <div className="hero-reveal mt-7 flex max-w-2xl flex-wrap items-center gap-x-6 gap-y-2 border-t border-[var(--border)] pt-5">
            <span className="flex min-h-[44px] items-center gap-2 text-xs muted">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--accent)]" /> National professional society
            </span>
            <span className="flex min-h-[44px] items-center gap-2 text-xs muted">
              <GraduationCap className="h-4 w-4 shrink-0 text-[var(--accent)]" /> Education &amp; academic activity
            </span>
            <span className="flex min-h-[44px] items-center gap-2 text-xs muted">
              <MapPin className="h-4 w-4 shrink-0 brand-location" /> {config.location}
            </span>
          </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-4 left-1/2 hidden min-h-[44px] -translate-x-1/2 flex-col items-center justify-center gap-1 py-2 mono text-[10px] uppercase tracking-[.2em] muted hover:text-[var(--accent)] lg:flex" aria-label="Scroll to about">
        Scroll <ChevronDown className="h-4 w-4" />
      </a>
    </section>
  )
}
