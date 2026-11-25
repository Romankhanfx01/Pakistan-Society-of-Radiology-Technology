import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, Search, X } from 'lucide-react'
import rosterData from '../data/roster.json'
import newsData from '../data/news.json'
import type { Member, NewsItem, SearchHit } from '../types'
import { scrollToSection } from '../lib/prefs'

const roster = rosterData as Member[]
const news = newsData as NewsItem[]

/** Static, honest index of everything this site actually publishes. */
const index: SearchHit[] = [
  { id: 'about', title: 'About the society', excerpt: 'Mission, history and the three pillars: educate, empower, advance.', group: 'Pages', href: '#about', keywords: 'mission pillars Pakistan society' },
  { id: 'leadership', title: 'Elected leadership', excerpt: 'Office bearers published by PSRT in 2026.', group: 'Pages', href: '#leadership', keywords: 'council president vice president office bearers' },
  { id: 'news', title: 'News & updates', excerpt: 'Dated announcements published by the society.', group: 'Pages', href: '#news', keywords: 'updates announcements news' },
  { id: 'opportunity', title: 'Coordinator opportunity', excerpt: 'Call for divisional and district coordinators with application wizard.', group: 'Pages', href: '#opportunity', keywords: 'apply application coordinator deadline' },
  { id: 'registry', title: 'Leadership directory', excerpt: 'Search published office bearers by name, role or wing.', group: 'Pages', href: '#registry', keywords: 'directory lookup verify name' },
  { id: 'resources', title: 'Published documents', excerpt: 'Official PSRT documents available for download.', group: 'Pages', href: '#resources', keywords: 'pdf documents download notification' },
  { id: 'gallery', title: 'Notice archive', excerpt: 'Published notice images.', group: 'Pages', href: '#gallery', keywords: 'archive media images posters' },
  { id: 'contact', title: 'Contact PSRT', excerpt: 'Email, location and the online contact form.', group: 'Pages', href: '#contact', keywords: 'email message enquiry secretariat Peshawar' },
  ...news.map(n => ({ id: `news-${n.id}`, title: n.title, excerpt: n.summary, group: 'Announcements', href: '#news', keywords: `${n.category} ${n.ref} ${n.dateLabel}` })),
  ...roster.map(m => ({ id: `member-${m.id}`, title: m.name, excerpt: `${m.role} · ${m.wing}`, group: 'People', href: '#leadership', keywords: `${m.role} ${m.wing} ${m.group}` })),
  { id: 'notice-pdf', title: 'PSRT/2026/01 notification PDF', excerpt: 'Official coordinator call — downloadable PDF.', group: 'Documents', href: '#news', keywords: 'pdf notice psrt 2026 01 download' },
]

export default function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!open) return
    setQuery('')
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); triggerRef.current?.focus() }
      if (e.key === 'Tab') {
        const items = Array.from(panelRef.current?.querySelectorAll<HTMLElement>('input, button, a[href]') ?? [])
        if (!items.length) return
        const first = items[0]!, last = items[items.length - 1]!
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return index.slice(0, 6)
    return index.filter(h => `${h.title} ${h.excerpt} ${h.keywords ?? ''}`.toLowerCase().includes(q)).slice(0, 12)
  }, [query])

  const choose = (href: string) => {
    setOpen(false)
    scrollToSection(href)
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
        aria-label="Search this website"
        aria-expanded={open}
        aria-controls="site-search-dialog"
      >
        <Search className="h-4 w-4" />
      </button>

      {open && (
        <div className="modal-scrim z-[220] items-start pt-[10vh]" onMouseDown={e => { if (e.target === e.currentTarget) setOpen(false) }} role="dialog" aria-modal="true" aria-label="Search PSRT website" id="site-search-dialog">
          <div ref={panelRef} className="modal-panel max-w-2xl p-0">
            <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-4">
              <Search className="h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="min-h-[44px] w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-faint)]"
                placeholder="Search people, notices, resources…"
                aria-label="Search query"
                aria-controls="search-results"
              />
              <button type="button" className="lb-btn !h-9 !w-9" onClick={() => setOpen(false)} aria-label="Close search"><X className="h-4 w-4" /></button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-4" id="search-results" aria-live="polite">
              <p className="mono mb-3 px-2 text-[10px] font-bold uppercase tracking-[.16em] muted">
                {query.trim() ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Suggested pages'}
              </p>
              {results.length ? (
                <ul className="space-y-1">
                  {results.map(hit => (
                    <li key={hit.id}>
                      <button type="button" onClick={() => choose(hit.href)} className="group flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left transition hover:bg-[var(--surface)]">
                        <span className="icon-tile !h-9 !w-9"><Search className="h-4 w-4" /></span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold">{hit.title}</span>
                          <span className="mt-0.5 block truncate text-xs muted">{hit.excerpt}</span>
                        </span>
                        <span className="mono shrink-0 text-[9px] uppercase tracking-[.12em] text-[var(--gold-bright)]">{hit.group}</span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-[var(--accent)] transition group-hover:translate-x-1" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-2 py-8 text-center text-sm muted">No matches. Try “President”, “AJK” or “notice”.</p>
              )}
            </div>
            <div className="border-t border-[var(--border)] px-5 py-3 mono text-[10px] muted">Press Esc to close · Ctrl / ⌘ + K to open</div>
          </div>
        </div>
      )}
    </>
  )
}
