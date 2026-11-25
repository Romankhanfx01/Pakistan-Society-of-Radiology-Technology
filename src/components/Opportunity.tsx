import { useEffect, useState } from 'react'
import { ArrowRight, Check, Clock, FileText } from 'lucide-react'
import type { SiteConfig } from '../types'
import { Reveal } from '../lib/motion'
import { useLightbox } from '../lib/LightboxContext'

const eligibility = [
  'Qualified Radiology Technologist — BS / MS / PhD in Radiology or Medical Imaging Technology',
  'Good professional reputation and leadership qualities',
  'Preference for academic, social or organizational experience',
]
const documents = ['Updated CV', 'Copy of CNIC', 'Copy of Degree', 'One passport-size photograph', 'Name of District / Division applied for']

export default function Opportunity({ config }: { config: SiteConfig }) {
  const n = config.notice
  const [time, setTime] = useState(['--', '--', '--', '--'])
  const openLightbox = useLightbox()

  useEffect(() => {
    const target = new Date(n.deadline).getTime()
    const tick = () => {
      const diff = target - Date.now()
      const values = diff <= 0 ? [0, 0, 0, 0] : [
        Math.floor(diff / 86400000), Math.floor((diff % 86400000) / 3600000),
        Math.floor((diff % 3600000) / 60000), Math.floor((diff % 60000) / 1000),
      ]
      setTime(values.map(v => String(v).padStart(2, '0')))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [n.deadline])

  return (
    <section id="opportunity" className="section-pad section-divider relative">
      <div className="container-x">
        <Reveal className="mb-12 max-w-3xl">
          <p className="eyebrow mb-5">Current opening</p>
          <h2 className="section-title">Coordinator applications</h2>
          <p className="section-lead">Join the society’s grassroots network as a divisional or district coordinator.</p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
          <Reveal>
            <article className="glass relative overflow-hidden rounded-lg p-6 sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-5">
                <span className="mono text-[10px] font-semibold uppercase tracking-[.16em] text-[var(--gold)]">Notification · {n.ref}</span>
                <span className="mono text-[10px] uppercase tracking-[.14em] muted">Issued {n.issued}</span>
              </div>

              <h3 className="mt-7 text-3xl font-bold sm:text-4xl">{n.title}</h3>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed muted sm:text-base">PSRT invites applications from qualified radiology technologists to serve as official representatives across Khyber Pakhtunkhwa and, in the second phase, across all provinces of Pakistan.</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed muted">Coordinators lead membership, coordination, academic activity and welfare work in their districts and divisions.</p>

              <div className="mt-9 grid gap-8 sm:grid-cols-2">
                <div>
                  <h4 className="eyebrow !text-[10px]">Eligibility</h4>
                  <ul className="mt-5 space-y-3">
                    {eligibility.map(item => (
                      <li key={item} className="flex gap-3 text-[13px] leading-relaxed muted"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]"><Check className="h-3 w-3" /></span>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="eyebrow !text-[10px]">Submit one merged PDF</h4>
                  <ol className="mt-5 space-y-2.5">
                    {documents.map((doc, i) => <li key={doc} className="flex items-center gap-3 text-[13px] muted"><span className="mono grid h-6 w-6 shrink-0 place-items-center rounded-md border border-[var(--border)] text-[11px] text-[var(--gold)]">{String(i + 1).padStart(2, '0')}</span>{doc}</li>)}
                  </ol>
                </div>
              </div>

              <div className="mt-9 flex flex-wrap gap-3 border-t border-[var(--border)] pt-6">
                <button type="button" className="btn btn-primary" data-wizard-open>Open application wizard <ArrowRight /></button>
                <button type="button" className="btn btn-ghost" onClick={() => openLightbox([{ src: '/assets/notification.jpg', caption: 'Official PSRT notification — 24 November 2026' }], 0)}><FileText className="h-4 w-4" /> Read original notice</button>
              </div>
              <p className="mt-5 text-[11px] leading-relaxed muted">Shortlisting and final selection are carried out by the Executive Governance Committee; its decision is final.</p>
            </article>
          </Reveal>

          <Reveal>
            <aside className="glass-strong rounded-lg p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <span className="portal-pill"><Clock className="h-3.5 w-3.5" /> Live countdown</span>
                <span className="mono text-[10px] font-semibold uppercase tracking-[.14em] faint">{n.ref}</span>
              </div>

              {/* Central PSRT seal — the visual anchor of the timer. */}
              <div className="mt-8 flex flex-col items-center text-center">
                <div className="grid h-28 w-28 place-items-center rounded-full border border-[var(--border-gold)] bg-[var(--bg-deep)]">
                  <img src="/assets/logo.png" alt="PSRT official seal" className="h-20 w-20 rounded-full object-contain" />
                </div>
                <p className="meta mt-5 text-[var(--accent)]">Applications close</p>
                <p className="mt-2 font-display text-2xl font-bold leading-tight sm:text-3xl">{n.deadlineLabel}</p>
              </div>

              <div className="mt-7 grid grid-cols-4 gap-2" role="timer" aria-label="Time remaining to apply">
                {['Days', 'Hrs', 'Min', 'Sec'].map((label, i) => (
                  <div key={label} className="countdown-cell">
                    <b>{time[i]}</b><small>{label}</small>
                  </div>
                ))}
              </div>

              <div className="divider my-7" />
              <div>
                <p className="meta muted">Applications email</p>
                <a href={`mailto:${n.email}`} className="mt-2 block min-h-[44px] break-all text-sm font-semibold hover:text-[var(--accent)]">{n.email}</a>
              </div>
              <p className="mt-6 text-xs italic leading-relaxed muted">“We look forward to working with dedicated technologists to strengthen PSRT at the grassroots level.”</p>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
