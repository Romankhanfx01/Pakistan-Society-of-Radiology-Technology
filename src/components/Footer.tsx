import type { SiteConfig } from '../types'
import LegalFooter from './LegalFooter'
import SocialLinks from './SocialLinks'

const links = [
  { href: '#about', label: 'About' },
  { href: '#leadership', label: 'Leadership' },
  { href: '#opportunity', label: 'Opportunity' },
  { href: '#registry', label: 'Registry' },
  { href: '#resources', label: 'Resources' },
  { href: '#gallery', label: 'Archive' },
]

export default function Footer({ config }: { config: SiteConfig }) {
  return (
    <footer className="section-divider relative bg-[var(--bg-soft)] pt-16">
      <div className="container-x grid gap-12 pb-14 md:grid-cols-[1.5fr_.7fr_.8fr]">
        <div className="flex flex-col items-start gap-5 sm:flex-row">
          <span className="grid h-20 w-20 shrink-0 place-items-center rounded-lg border border-[var(--border-gold)] bg-[var(--surface)]">
            <img src="/assets/logo.png" alt="PSRT official seal" className="h-16 w-16 rounded-full object-contain" />
          </span>
          <div>
            <h2 className="font-display text-xl font-extrabold">{config.name}</h2>
            <p className="mono mt-2 text-[10px] font-bold uppercase tracking-[.16em] text-[var(--gold-bright)]">{config.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed muted">
              A national professional society for radiology technologists, working to educate, empower and advance the profession across Pakistan.
            </p>
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <h3 className="mono mb-1 text-[10px] font-bold uppercase tracking-[.18em] text-[var(--gold-bright)]">Explore</h3>
          {links.map(l => <a key={l.href} href={l.href} className="flex min-h-[44px] items-center text-sm muted transition hover:text-[var(--accent)]">{l.label}</a>)}
        </nav>

        <div className="flex flex-col gap-3">
          <h3 className="mono mb-1 text-[10px] font-bold uppercase tracking-[.18em] text-[var(--gold-bright)]">Connect</h3>
          <SocialLinks facebook={config.facebook} />
        </div>
      </div>

      <div className="container-x border-t border-[var(--border)] py-6 pr-16">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] muted">
          <span>© {new Date().getFullYear()} {config.name}. All rights reserved.</span>
          <span>Together – Advancing Radiology Technology in Pakistan</span>
        </div>
        <div className="mt-4 border-t border-[var(--border)] pt-3">
          <LegalFooter />
        </div>
      </div>
    </footer>
  )
}
