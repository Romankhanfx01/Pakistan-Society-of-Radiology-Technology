import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const coarse = () => window.matchMedia('(pointer: coarse)').matches

/** One global motion controller: Lenis smooth scroll + delegated micro-physics. */
export function useGlobalMotion(deps: unknown[] = []): void {
  useEffect(() => {
    if (reduced()) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(raf); lenis.destroy() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (reduced()) return
    const hero = gsap.utils.toArray<HTMLElement>('.hero-reveal')
    if (hero.length) gsap.fromTo(hero, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: .8, stagger: .08, ease: 'power3.out', delay: .1 })
    const counters = document.querySelectorAll<HTMLElement>('[data-count]')
    counters.forEach(node => {
      const target = Number(node.dataset.count) || 0
      node.textContent = '0'
      const state = { v: 0 }
      const io = new IntersectionObserver(entries => {
        if (!entries[0]?.isIntersecting) return
        gsap.to(state, { v: target, duration: 1.4, ease: 'power2.out', onUpdate: () => { node.textContent = String(Math.round(state.v)) } })
        io.disconnect()
      }, { threshold: .4 })
      io.observe(node)
    })
    return () => { /* observers are disconnected after firing */ }
  }, deps)
}

/** Magnetic pull for buttons, delegated so it works with re-renders. */
export function useMagneticButtons(): void {
  useEffect(() => {
    if (reduced() || coarse()) return
    const onMove = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-magnetic]')
      if (!el) return
      const r = el.getBoundingClientRect()
      gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * .14, y: (e.clientY - r.top - r.height / 2) * .2, duration: .35, ease: 'power3.out' })
    }
    const onLeave = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-magnetic]')
      if (el) gsap.to(el, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,.5)' })
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseout', onLeave)
    return () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseout', onLeave) }
  }, [])
}

/** Scroll-triggered entrance for a single element. */
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduced() || !ref.current) return
    const anim = gsap.fromTo(ref.current, { autoAlpha: 0, y: 24 }, {
      autoAlpha: 1, y: 0, duration: .7, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
    })
    return () => { anim.scrollTrigger?.kill(); anim.kill() }
  }, [])
  return <div ref={ref} className={className}>{children}</div>
}

export { gsap, ScrollTrigger }
