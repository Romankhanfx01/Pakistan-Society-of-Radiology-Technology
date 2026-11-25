import { ArrowUpRight, Maximize2 } from 'lucide-react'
import galleryData from '../data/gallery.json'
import type { GalleryItem } from '../types'
import { Reveal } from '../lib/motion'
import { useLightbox } from '../lib/LightboxContext'

const items = galleryData as GalleryItem[]

export default function Gallery() {
  const openLightbox = useLightbox()

  return (
    <section id="gallery" className="section-pad section-divider relative bg-[var(--bg-soft)]/40">
      <div className="container-x">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-5">Media &amp; events</p>
            <h2 className="section-title">Official notices</h2>
            <p className="section-lead">Official notices published by the society.</p>
          </div>
          <a href="https://www.facebook.com/profile.php?id=61596658681301" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">Visit Facebook <ArrowUpRight className="h-4 w-4" /></a>
        </Reveal>

        <div className="mb-6 flex items-center gap-3">
          <span className="tag">Notices</span>
          <span className="mono text-[11px] muted">{items.length} published</span>
        </div>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {items.map(item => (
            <button key={item.id} type="button" className="group mb-5 block w-full break-inside-avoid text-left" onClick={() => openLightbox(items.map(i => ({ src: i.src, caption: i.caption })), items.indexOf(item))}>
              <span className="relative block overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-soft)]">
                <img src={item.src} alt="" width={item.width} height={item.height} loading="lazy" style={{ aspectRatio: `${item.width} / ${item.height}` }} className="w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
                <span className="image-veil absolute inset-0 opacity-60" />
                <span className="tag absolute left-3 top-3">{item.tag}</span>
                <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] bg-[var(--bg-deep)]/70"><Maximize2 className="h-4 w-4" aria-hidden="true" /></span>
                <span className="sr-only">View image</span>
              </span>
              <span className="mt-3 block text-xs font-semibold leading-snug">{item.caption}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
