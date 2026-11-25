/** Shared user-preference checks, used by motion code and scroll behaviour. */
export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const scrollToSection = (hash: string): void => {
  const target = document.querySelector(hash)
  target?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
