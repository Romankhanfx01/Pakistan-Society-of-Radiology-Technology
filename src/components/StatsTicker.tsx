import type { SiteConfig } from '../types'

export default function StatsTicker({ config }: { config: SiteConfig }) {
  return (
    <div className="relative z-10 border-y border-[var(--border)] bg-[var(--bg-soft)]">
      <div className="container-x grid grid-cols-2 gap-x-5 gap-y-1 py-4 sm:flex sm:h-14 sm:items-center sm:justify-between sm:gap-3 sm:overflow-hidden sm:py-0">
        <span className="mono hidden shrink-0 text-[10px] font-semibold uppercase tracking-[.16em] text-[var(--gold-bright)] sm:block">
          At a glance
        </span>
        <div className="col-span-2 flex flex-wrap gap-x-5 gap-y-1 sm:flex sm:min-w-0 sm:items-center sm:overflow-hidden sm:gap-0">
          {config.stats.map((s, i) => (
            <div key={s.label} className="flex min-h-[44px] items-center gap-2.5 sm:shrink-0 sm:gap-3 sm:px-5">
              <span className="mono text-xs font-semibold text-[var(--accent)]">{s.value}{s.suffix}</span>
              <span className="mono text-[10px] uppercase leading-tight tracking-[.1em] muted">{s.label}</span>
              {i < config.stats.length - 1 && <span className="hidden h-1 w-1 rounded-full bg-[var(--gold)]/60 sm:block" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
