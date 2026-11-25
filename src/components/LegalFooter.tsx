import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { X } from 'lucide-react'
import { legalPages, type LegalPage } from '../data/legal'

export default function LegalFooter() {
  const [active, setActive] = useState<LegalPage | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!active) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActive(null)
        triggerRef.current?.focus()
      }
      if (e.key === 'Tab') {
        const items = Array.from(document.querySelectorAll<HTMLElement>('.legal-dialog button, .legal-dialog a[href]'))
        if (!items.length) return
        const first = items[0]!, last = items[items.length - 1]!
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [active])

  const open = (page: LegalPage, event: MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = event.currentTarget
    setActive(page)
  }

  const close = () => {
    setActive(null)
    triggerRef.current?.focus()
  }

  return (
    <>
      <nav aria-label="Legal and policies" className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {legalPages.map(page => (
          <button
            key={page.id}
            type="button"
            onClick={e => open(page, e)}
            className="flex min-h-[44px] min-w-[44px] items-center text-xs muted transition hover:text-[var(--accent)]"
          >
            {page.title}
          </button>
        ))}
      </nav>

      {active && (
        <div className="modal-scrim z-[230]" onMouseDown={e => { if (e.target === e.currentTarget) close() }} role="dialog" aria-modal="true" aria-labelledby="legal-title">
          <div className="modal-panel legal-dialog max-w-xl p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <h2 id="legal-title" className="font-display text-2xl font-bold">{active.title}</h2>
              <button ref={closeRef} type="button" onClick={close} className="lb-btn" aria-label="Close"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-6 space-y-4">
              {active.paragraphs.map(p => <p key={p} className="text-sm leading-relaxed muted">{p}</p>)}
            </div>
            {active.links?.length ? (
              <div className="mt-6 flex flex-wrap gap-3 border-t border-[var(--border)] pt-5">
                {active.links.map(link => (
                  <a key={link.href} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="btn btn-ghost btn-sm">
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  )
}
