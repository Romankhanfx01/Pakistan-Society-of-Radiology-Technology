import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '../lib/ThemeContext'
import GlobalSearch from './GlobalSearch'

const links = [
  { href: '#about', label: 'About' },
  { href: '#leadership', label: 'Leadership' },
  { href: '#news', label: 'News' },
  { href: '#opportunity', label: 'Opportunity' },
  { href: '#registry', label: 'Registry' },
  { href: '#resources', label: 'Resources' },
  { href: '#gallery', label: 'Archive' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const { theme, toggle } = useTheme()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(`#${entry.target.id}`)
      })
    }, { rootMargin: '-40% 0px -55% 0px' })
    document.querySelectorAll('main section[id]').forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    menuRef.current?.querySelector<HTMLElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a[href]') ?? [])
      if (!items.length) return
      const first = items[0]!, last = items[items.length - 1]!
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]">
      <div className="container-x flex h-[68px] items-center gap-3 sm:gap-5">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label="PSRT home" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--border-gold)] bg-[var(--surface)]">
            <img src="/assets/logo.png" alt="PSRT official seal" className="h-8 w-8 rounded-full object-contain" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-extrabold tracking-[.1em] text-[var(--text)]">
              PSRT<span className="text-[var(--accent)]">.</span>
            </span>
            <span className="hidden text-[9px] font-bold uppercase tracking-[.16em] text-[var(--text-muted)] sm:block">
              Radiology Technology
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-0.5 xl:flex">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? 'page' : undefined}
              className={`nav-link px-3 text-[11px] font-semibold uppercase tracking-[.14em] ${active === l.href ? 'is-active' : ''}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-4">
          <GlobalSearch />
          <button
            type="button"
            onClick={toggle}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a href="#opportunity" className="btn btn-gold btn-sm hidden md:inline-flex">
            Apply Now <ArrowUpRight className="h-4 w-4" />
          </a>

          <button
            ref={toggleRef}
            type="button"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] xl:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(o => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-navigation" ref={menuRef} aria-label="Mobile" className="border-t border-[var(--border)] bg-[var(--bg)] px-6 pb-8 pt-3 xl:hidden">
          <p className="meta mb-2 muted">Navigate</p>
          <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={active === l.href ? 'page' : undefined}
                className={`flex min-h-[44px] items-center border-b border-[var(--border)] py-2 text-sm font-semibold ${active === l.href ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}
              >
                {l.label}
              </a>
            ))}
          </div>
          <a href="#opportunity" onClick={() => setOpen(false)} className="btn btn-gold btn-block mt-6">
            Apply Now <ArrowUpRight className="h-4 w-4" />
          </a>
        </nav>
      )}
    </header>
  )
}
