import { useMemo, useState } from 'react'
import { BadgeCheck, Search, ShieldAlert } from 'lucide-react'
import rosterData from '../data/roster.json'
import type { Member } from '../types'
import { Reveal } from '../lib/motion'

const roster = rosterData as Member[]

export default function Registry() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return roster.filter(m => `${m.name} ${m.role} ${m.wing} ${m.group}`.toLowerCase().includes(q))
  }, [query])

  return (
    <section id="registry" className="section-pad section-divider relative">
      <div className="container-x">
        <Reveal className="mb-12 max-w-3xl">
          <p className="eyebrow mb-5">Public directory</p>
          <h2 className="section-title">Find an office bearer</h2>
          <p className="section-lead">
            Search the office bearers published on the society&apos;s official page by name, role or wing.
          </p>
        </Reveal>

        <Reveal className="glass rounded-lg p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-5">
            <div>
              <p className="mono text-xs font-bold uppercase tracking-[.16em] text-[var(--gold-bright)]">Published leadership list</p>
              <p className="mt-1 text-xs muted">{roster.length} published office bearers · 2026</p>
            </div>
            <span className="mono text-[10px] uppercase tracking-[.14em] muted">Public information</span>
          </div>

          <label htmlFor="registrySearch" className="mono mb-3 mt-6 block text-[11px] font-bold uppercase tracking-[.16em] muted">
            Search directory
          </label>
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--accent)]" aria-hidden="true" />
            <input id="registrySearch" value={query} onChange={e => setQuery(e.target.value)} className="field-input pl-12" placeholder="Try “President”, “AJK” or a name" />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="mono mr-1 text-[10px] uppercase faint">Quick queries:</span>
            {['President', 'Vice President', 'AJK'].map(s => (
              <button key={s} type="button" className="filter-pill !text-[11px]" onClick={() => setQuery(s)}>{s}</button>
            ))}
          </div>

          {query.trim() && (
            <div className="mt-8 border-t border-[var(--border)] pt-6" aria-live="polite">
              {results.length ? (
                <>
                  <p className="mono mb-4 text-[11px] font-bold uppercase tracking-[.16em] text-[var(--accent)]">
                    {results.length} match{results.length === 1 ? '' : 'es'} in the published leadership list
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {results.map(m => (
                      <div key={m.id} className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                        <img src={`/assets/leadership/${m.id}.jpg`} alt="" width={400} height={500} className="portrait h-12 w-12 shrink-0 rounded-full object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold">{m.name}</p>
                          <p className="truncate text-xs text-[var(--accent)]">{m.role} · {m.wing}</p>
                        </div>
                        <span className="flex shrink-0 items-center gap-1 rounded-full border border-[var(--border-strong)] bg-[var(--accent-soft)] px-2.5 py-1 mono text-[9px] font-bold uppercase text-[var(--accent)]">
                          <BadgeCheck className="h-3 w-3" /> Listed
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 text-center">
                  <p className="flex items-center justify-center gap-2 text-sm font-medium text-[var(--gold-bright)]">
                    <ShieldAlert className="h-4 w-4" /> No published record matches “{query}”.
                  </p>
                  <p className="mt-2 text-xs muted">Check the spelling or try a role, wing or province.</p>
                </div>
              )}
            </div>
          )}

          <p className="mt-8 border-t border-[var(--border)] pt-5 text-xs leading-relaxed muted">
            This directory contains only the office bearers published by PSRT. It is not a licence-verification or registration-status service; authoritative credentials are not available on this website.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
