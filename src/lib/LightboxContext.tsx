import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { prefersReducedMotion } from './prefs'

export interface LightboxItem { src: string; caption: string }
type OpenFn = (items: LightboxItem[], index?: number) => void

const Ctx = createContext<OpenFn>(() => {})

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ items: LightboxItem[]; index: number } | null>(null)
  const [zoom, setZoom] = useState(false)
  const lastFocused = useRef<HTMLElement | null>(null)
  const figureRef = useRef<HTMLElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)

  const close = useCallback(() => {
    setState(null)
    setZoom(false)
    document.body.style.overflow = ''
    lastFocused.current?.focus()
  }, [])

  const step = useCallback((dir: number) => {
    setState(s => s ? { ...s, index: (s.index + dir + s.items.length) % s.items.length } : s)
    setZoom(false)
  }, [])

  const open: OpenFn = useCallback((items, index = 0) => {
    if (!items.length) return
    lastFocused.current = document.activeElement as HTMLElement
    setState({ items, index })
    document.body.style.overflow = 'hidden'
  }, [])

  useEffect(() => {
    if (!state || !figureRef.current) return
    if (!prefersReducedMotion()) {
      gsap.fromTo(figureRef.current, { scale: .9, opacity: 0, y: 16 }, { scale: 1, opacity: 1, y: 0, duration: .45, ease: 'back.out(1.5)' })
    }
    closeRef.current?.focus()
  }, [state?.index, state?.items])

  useEffect(() => {
    if (!state) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') step(-1)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'Tab') {
        const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('.lightbox button'))
        if (!buttons.length) return
        const first = buttons[0]!, last = buttons[buttons.length - 1]!
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [state, close, step])

  const item = state?.items[state.index]

  return (
    <Ctx.Provider value={open}>
      {children}
      {state && item && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" onMouseDown={e => { if (e.target === e.currentTarget) close() }}>
          <button ref={closeRef} className="lb-btn absolute right-6 top-6" type="button" aria-label="Close viewer" onClick={close}><X /></button>
          <button className="lb-btn" type="button" aria-label="Previous image" onClick={() => step(-1)}><ChevronLeft /></button>
          <figure ref={figureRef} className="flex max-w-full flex-col items-center">
            <button
              type="button"
              aria-pressed={zoom}
              aria-label={zoom ? 'Zoom out' : 'Zoom in'}
              onClick={() => setZoom(z => !z)}
              className="overflow-hidden rounded-[10px]"
            >
              <img
                src={item.src} alt={item.caption}
                className={zoom ? 'max-h-[78vh] max-w-full cursor-zoom-out select-none' : 'max-h-[78vh] max-w-full cursor-zoom-in select-none'}
                style={{ transform: zoom ? 'scale(1.7)' : undefined }}
                onMouseMove={e => {
                  if (!zoom) return
                  const r = e.currentTarget.getBoundingClientRect()
                  e.currentTarget.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`
                }}
              />
            </button>
            <figcaption className="mt-4 rounded-md bg-[var(--bg-soft)] px-3 py-1 text-center text-sm text-[var(--text)]">{item.caption}</figcaption>
          </figure>
          <button className="lb-btn" type="button" aria-label="Next image" onClick={() => step(1)}><ChevronRight /></button>
        </div>
      )}
    </Ctx.Provider>
  )
}

export const useLightbox = () => useContext(Ctx)
