import { createContext, useContext, useState, useEffect } from 'react'

const THEMES = ['morning', 'afternoon', 'evening', 'night']

export const THEME_INFO = {
  morning:   { emoji: '🌅', label: 'MORNING'   },
  afternoon: { emoji: '☀️',  label: 'AFTERNOON' },
  evening:   { emoji: '🌇', label: 'EVENING'   },
  night:     { emoji: '🌙', label: 'NIGHT'     },
}

function detectTheme() {
  const h = new Date().getHours()
  if (h >= 5  && h < 8)  return 'morning'
  if (h >= 8  && h < 17) return 'afternoon'
  if (h >= 17 && h < 20) return 'evening'
  return 'night'
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(detectTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const cycleTheme = () =>
    setTheme(t => THEMES[(THEMES.indexOf(t) + 1) % THEMES.length])

  return (
    <ThemeContext.Provider value={{ theme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
