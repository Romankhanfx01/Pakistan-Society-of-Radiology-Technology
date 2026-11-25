import { useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight, FileText, X } from 'lucide-react'
import { FaFacebookF } from 'react-icons/fa6'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import rosterData from '../data/roster.json'
import type { Member } from '../types'
import { Reveal } from '../lib/motion'
import { useLightbox } from '../lib/LightboxContext'
import { prefersReducedMotion } from '../lib/prefs'
import VerifiedSeal from './VerifiedSeal'

gsap.registerPlugin(Flip)

const roster = rosterData as Member[]
type Filter = 'all' | 'president' | 'vice-president'

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'president', label: 'President' },
  { id: 'vice-president', label: 'Vice presidents' },
]

const matches = (member: Member, filter: Filter): boolean =>
  filter === 'all' || (filter === 'president' ? member.role === 'President' : member.role.includes('Vice President'))

function Profile({ member, onClose }: { member: Member; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const openLightbox = useLightbox()

  useLayoutEffect(() => {
    const trigger = document.activeElement as HTMLElement | null
    if (!prefersReducedMotion()) {
      gsap.fromTo(panel.current, { scale: .94, opacity: 0, y: 24 }, { scale: 1, opacity: 1, y: 0, duration: .4, ease: 'back.out(1.4)' })
    }
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return
      const items = Array.from(panel.current?.querySelectorAll<HTMLElement>('button, a[href]') ?? [])
      if (!items.length) return
      const first = items[0]!, last = items[items.length - 1]!
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); trigger?.focus() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="modal-scrim" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }} role="dialog" aria-modal="true" aria-label={`Profile of ${member.name}`}>
      <div ref={panel} className="modal-panel grid gap-0 md:grid-cols-[320px_1fr]">
        <div className="portrait-wrap relative min-h-[260px] overflow-hidden p-3 md:min-h-[420px]">
          <div className="framed-portrait h-full min-h-[236px] overflow-hidden md:min-h-[396px]">
            <img src={`/assets/leadership/${member.id}.jpg`} alt="" width={400} height={500} className="portrait h-full w-full object-cover object-top" />
            <span className="portrait-veil absolute inset-0" />
            <img src="/assets/logo.png" alt="" className="portrait-seal portrait-seal-top" />
          </div>
        </div>

        <div className="relative p-7 sm:p-9">
          <button ref={closeRef} type="button" onClick={onClose} className="lb-btn absolute right-5 top-5" aria-label="Close profile"><X /></button>
          <p className="meta text-[var(--gold-bright)]">Elected office bearer</p>
          <div className="mt-5 flex items-center gap-2">
            <h3 className="font-display text-3xl font-extrabold sm:text-4xl">{member.name}</h3>
            <VerifiedSeal className="h-6 w-6 shrink-0" />
          </div>
          <p className="mt-2 text-base font-semibold text-[var(--accent)]">{member.role}</p>

          <dl className="mono mt-7 grid grid-cols-2 gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <div>
              <dt className="text-[10px] uppercase tracking-[.14em] text-[var(--gold-bright)]">Wing / region</dt>
              <dd className="mt-1 text-sm font-semibold">{member.wing}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[.14em] text-[var(--accent)]">Category</dt>
              <dd className="mt-1 text-sm font-semibold capitalize">{member.group}</dd>
            </div>
          </dl>

          <p className="mt-6 text-sm leading-relaxed muted">
            An elected office bearer of the Pakistan Society of Radiology Technology, listed in the society&apos;s published 2026 announcement.
          </p>
          {member.unnamed && <p className="mt-3 text-xs text-[var(--gold-bright)]">The official announcement listed this designated office.</p>}

          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" className="btn btn-primary btn-sm" onClick={() => { onClose(); openLightbox([{ src: `/assets/posters/${member.id}.jpg`, caption: `${member.name} — ${member.role}` }], 0) }}>
              <FileText className="h-4 w-4" /> View announcement poster
            </button>
            <a href="https://www.facebook.com/profile.php?id=61596658681301" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
              <FaFacebookF className="h-4 w-4 brand-facebook" aria-hidden="true" /> Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Leadership() {
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<Member | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null)

  const changeFilter = (next: Filter) => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('.member-card')
    if (cards?.length) flipState.current = Flip.getState(cards)
    setFilter(next)
  }

  useLayoutEffect(() => {
    if (!flipState.current) return
    if (!prefersReducedMotion()) {
      Flip.from(flipState.current, { duration: .55, ease: 'power2.inOut', absolute: true, scale: true, stagger: .015, onEnter: els => gsap.fromTo(els, { opacity: 0, scale: .92 }, { opacity: 1, scale: 1, duration: .35 }) })
    }
    flipState.current = null
  }, [filter])

  const count = roster.filter(m => matches(m, filter)).length

  return (
    <section id="leadership" className="section-pad section-divider relative">
      <div className="container-x">
        <Reveal className="mb-12 max-w-3xl">
          <p className="eyebrow mb-5">Governing council</p>
          <h2 className="section-title">Office bearers</h2>
          <p className="section-lead">
            Three elected office bearers leading the society at national and AJK levels.
          </p>
        </Reveal>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)]">
          <div className="flex flex-wrap gap-6" role="group" aria-label="Filter office bearers">
            {filters.map(f => (
              <button key={f.id} type="button" className={`tab-link ${filter === f.id ? 'is-active' : ''}`} aria-pressed={filter === f.id} onClick={() => changeFilter(f.id)}>
                {f.label}
              </button>
            ))}
          </div>
          <span className="mono text-xs uppercase tracking-[.14em] muted" aria-live="polite">
            {count} shown
          </span>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {roster.map(member => {
            const visible = matches(member, filter)
            return (
              <button key={member.id} type="button" hidden={!visible} onClick={() => setSelected(member)} className="member-card flex items-center gap-4 p-3 text-left">
                <span className="card-media framed-portrait portrait-compact block">
                  <img src={`/assets/leadership/${member.id}.jpg`} alt="" width={400} height={500} loading="lazy" className="portrait h-full w-full object-cover object-top" />
                  <img src="/assets/logo.png" alt="" className="portrait-seal portrait-seal-compact" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="tag mb-2 inline-flex">{member.wing}</span>
                  <span className="block font-display text-[15px] font-bold leading-snug">{member.name}</span>
                  <span className="mt-1 block text-xs leading-snug text-[var(--accent)]">{member.role}</span>
                  <span className="meta mt-2 block faint">PSRT · 2026</span>
                </span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--border)] text-[var(--text-muted)]">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="sr-only">Open profile</span>
              </button>
            )
          })}
        </div>
      </div>
      {selected && <Profile member={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
