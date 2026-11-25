import { ArrowUpRight, Download } from 'lucide-react'
import newsData from '../data/news.json'
import type { NewsItem } from '../types'
import { Reveal } from '../lib/motion'
import { useLightbox } from '../lib/LightboxContext'

const items = newsData as NewsItem[]

export default function News() {
  const openLightbox = useLightbox()

  return (
    <section id="news" className="section-pad section-divider relative">
      <div className="container-x">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="eyebrow mb-5">Latest from PSRT</p>
            <h2 className="section-title">News and updates</h2>
            <p className="section-lead">Dated announcements released by the society.</p>
          </div>
          <span className="mono text-[11px] uppercase tracking-[.14em] muted">{items.length} published update</span>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-2">
          {items.map(item => (
            <Reveal key={item.id}>
              <article className="glass flex h-full flex-col rounded-lg p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="tag">{item.category}</span>
                  <time dateTime={item.date} className="mono text-[11px] muted">{item.dateLabel}</time>
                  <span className="mono text-[10px] faint">Ref: {item.ref}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold sm:text-2xl">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed muted">{item.summary}</p>
                <div className="mt-6 flex flex-wrap gap-3 border-t border-[var(--border)] pt-5">
                  <button type="button" className="btn btn-primary btn-sm" onClick={() => openLightbox([{ src: item.image, caption: `${item.title} — ${item.dateLabel}` }], 0)}>
                    Read notice <ArrowUpRight />
                  </button>
                  <a href={item.pdf} download className="btn btn-ghost btn-sm"><Download /> Download PDF</a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mono mt-6 text-[11px] muted">Further updates will be added here after society approval. Nothing is published before it is released officially.</p>
      </div>
    </section>
  )
}
