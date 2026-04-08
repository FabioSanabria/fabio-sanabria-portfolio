import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'ABOUT',      href: '#about',      icon: '📜' },
  { label: 'EXPERIENCE', href: '#experience', icon: '⚔️'  },
  { label: 'SKILLS',     href: '#skills',     icon: '⭐'  },
  { label: 'PROJECTS',   href: '#projects',   icon: '🗺️'  },
  { label: 'CONTACT',    href: '#contact',    icon: '✉️'  },
]

function getTimeOfDay() {
  const h = new Date().getHours()
  if (h >= 5  && h < 8)  return { emoji: '🌅', label: 'MORNING'   }
  if (h >= 8  && h < 12) return { emoji: '☀️', label: 'DAY'       }
  if (h >= 12 && h < 17) return { emoji: '🌤️', label: 'AFTERNOON' }
  if (h >= 17 && h < 20) return { emoji: '🌇', label: 'EVENING'   }
  return                         { emoji: '🌙', label: 'NIGHT'     }
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [active,    setActive]    = useState('')
  const [hovered,   setHovered]   = useState(null)
  const [sparkling, setSparkling] = useState(null)
  const [time,      setTime]      = useState(getTimeOfDay)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeOfDay()), 60_000)
    return () => clearInterval(id)
  }, [])

  const handleNavClick = (href, label) => {
    setActive(href)
    setMenuOpen(false)
    setSparkling(label)
    setTimeout(() => setSparkling(null), 700)
  }

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner">

        <a href="#" className="navbar__logo" onClick={() => setActive('')}>
          <span className="navbar__logo-bracket">⟨</span>
          FABIO
          <span className="navbar__logo-bracket">/⟩</span>
        </a>

        <div className="navbar__time-badge">
          <span>{time.emoji}</span>
          <span className="navbar__time-label">{time.label}</span>
        </div>

        <ul className="navbar__links">
          {NAV_LINKS.map(({ label, href, icon }) => {
            const isActive    = active === href
            const isHovered   = hovered === label
            const isSparkling = sparkling === label

            return (
              <li key={href} className="navbar__item">
                <a
                  href={href}
                  className={`navbar__link${isActive ? ' navbar__link--active' : ''}`}
                  onMouseEnter={() => setHovered(label)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleNavClick(href, label)}
                >
                  <span
                    className={`navbar__link-icon${isHovered || isActive ? ' navbar__link-icon--show' : ''}`}
                    aria-hidden="true"
                  >
                    {icon}
                  </span>
                  {label}
                  {isSparkling && (
                    <span className="navbar__sparkle" aria-hidden="true">✦</span>
                  )}
                </a>
                {isHovered && (
                  <div className="navbar__tooltip" role="tooltip">
                    {icon} {label}
                  </div>
                )}
              </li>
            )
          })}
        </ul>

        <button
          className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile overlay */}
      <div className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`}>
        <div className="navbar__mobile-header">
          <span className="navbar__mobile-title">MENU</span>
          <button className="navbar__mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close">✕</button>
        </div>
        <ul>
          {NAV_LINKS.map(({ label, href, icon }) => (
            <li key={href}>
              <a
                href={href}
                className={`navbar__mobile-link${active === href ? ' navbar__mobile-link--active' : ''}`}
                onClick={() => handleNavClick(href, label)}
              >
                <span className="navbar__mobile-icon">{icon}</span>
                <span>{label}</span>
                <span className="navbar__mobile-arrow">▶</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="navbar__mobile-footer">
          <span>{time.emoji}</span>
          <span className="navbar__time-label">GOOD {time.label}</span>
        </div>
      </div>
    </nav>
  )
}
