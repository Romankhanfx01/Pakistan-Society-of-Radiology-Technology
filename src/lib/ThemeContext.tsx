import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Theme = 'dark' | 'light'
type ThemeCtx = { theme: Theme; toggle: () => void }

const Ctx = createContext<ThemeCtx>({ theme: 'dark', toggle: () => {} })

const applyTheme = (value: Theme) => {
  document.documentElement.dataset.theme = value
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // PSRT always opens in its official dark theme; the toggle is per-session.
  const [theme, setTheme] = useState<Theme>(() => {
    applyTheme('dark')
    return 'dark'
  })

  useEffect(() => {
    applyTheme(theme)
    // Clear any preference saved by an older version so the next visit is dark again.
    localStorage.removeItem('psrt-theme')
  }, [theme])

  const value = useMemo(() => ({ theme, toggle: () => setTheme(t => (t === 'dark' ? 'light' : 'dark')) }), [theme])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useTheme = () => useContext(Ctx)
