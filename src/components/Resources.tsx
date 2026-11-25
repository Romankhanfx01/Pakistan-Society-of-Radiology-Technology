import { Download, FileText } from 'lucide-react'
import { Reveal } from '../lib/motion'

export default function Resources() {
  return (
    <section id="resources" className="section-pad section-divider relative">
      <div className="container-x">
        <Reveal className="mb-10 max-w-3xl">
          <p className="eyebrow mb-5">Documents</p>
          <h2 className="section-title">Published documents</h2>
          <p className="section-lead">Official notices released by the society.</p>
        </Reveal>

        <Reveal>
          <a
            href="/resources/psrt-coordinator-notification.pdf"
            download
            className="glass flex items-start gap-5 rounded-lg p-6 transition hover:border-[var(--border-strong)]"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
              <FileText className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="mono text-[10px] uppercase tracking-[.14em] text-[var(--gold-bright)]">Official notification · PSRT/2026/01</span>
              <span className="mt-2 block text-base font-semibold leading-snug">Call for Applications — Divisional &amp; District Coordinators</span>
              <span className="mono mt-2 block text-[11px] muted">PDF · Released 24 November 2026</span>
            </span>
            <Download className="h-5 w-5 shrink-0 text-[var(--accent)]" />
          </a>
          <p className="mono mt-4 text-[11px] leading-relaxed muted">
            1 document published. Further documents appear here only after society review.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
