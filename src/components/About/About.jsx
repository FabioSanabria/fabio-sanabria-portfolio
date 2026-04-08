import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import fabioImg from '../../assets/fabio.png'
import './About.css'

const STATS = [
  { label: 'NAME',     value: 'Fabio Sanabria' },
  { label: 'CLASS',    value: 'Software Developer' },
  { label: 'LOCATION', value: 'Cartago, Costa Rica' },
  { label: 'XP',       value: '1+ Year' },
  { label: 'LANG',     value: 'EN / ES' },
]

const INTERESTS = [
  { icon: '⚔️', label: 'RPG Games' },
  { icon: '🧩', label: 'Problem Solving' },
  { icon: '☁️', label: 'Cloud Tech' },
  { icon: '📚', label: 'Learning' },
  { icon: '🎮', label: 'Game Dev' },
  { icon: '🎵', label: 'Music' },
]

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section className="about section" id="about" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="about__header"
        >
          <p className="section-label">// PLAYER.INFO</p>
          <h2 className="section-heading">About Me</h2>
          <p className="section-sub">
            A look at the character behind the keyboard.
          </p>
        </motion.div>

        <div className="about__grid">
          {/* Character Sheet */}
          <motion.div
            className="about__sheet pixel-border"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="about__sheet-header">
              <span className="about__sheet-title">CHARACTER SHEET</span>
              <span className="badge badge--emerald">● ONLINE</span>
            </div>

            <div className="about__sheet-avatar">
              <div className="about__avatar-grid">
                <img
                  src={fabioImg}
                  alt="Fabio — pixel art character"
                  className="about__avatar-img"
                />
              </div>
              <div className="about__hp-bar-group">
                <div className="about__bar-row">
                  <span>HP</span>
                  <div className="about__mini-bar">
                    <div className="about__mini-fill" style={{ width: '92%', background: 'var(--emerald)' }} />
                  </div>
                  <span>92/100</span>
                </div>
                <div className="about__bar-row">
                  <span>MP</span>
                  <div className="about__mini-bar">
                    <div className="about__mini-fill" style={{ width: '78%', background: 'var(--sapphire)' }} />
                  </div>
                  <span>78/100</span>
                </div>
              </div>
            </div>

            <table className="about__stats-table">
              <tbody>
                {STATS.map(({ label, value }) => (
                  <tr key={label}>
                    <td className="about__stat-label">{label}</td>
                    <td className="about__stat-value">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Bio */}
          <motion.div
            className="about__bio-block"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="about__bio-title">My Story</h3>
            <p className="about__bio-text">
              I&apos;m a Software Engineer based in Cartago, Costa Rica. I recently
              graduated from the Universidad de Costa Rica with a Bachelor&apos;s in
              Computer Science — Software Engineering emphasis — earning a 9.2/10 GPA.
              Currently working as a Junior Software Developer at Flecha Roja
              Technologies, where I build and maintain enterprise-grade platforms.
            </p>
            <p className="about__bio-text">
              My toolkit spans the full stack: Java and C++ for systems work,
              TypeScript and React for modern web apps, Angular and .NET Core for
              enterprise software, and AWS &amp; Oracle Cloud for scalable infrastructure.
              I earned three OCI certifications in 2025 and keep levelling up daily.
            </p>
            <p className="about__bio-text">
              When I&apos;m not shipping code you&apos;ll find me exploring open-world RPGs,
              studying game mechanics, or picking up a new framework. I believe
              great software — like great games — is built with intention and care
              for those who use it.
            </p>

            <div className="about__interests">
              <p className="about__interests-label section-label">INTERESTS</p>
              <div className="about__interests-grid">
                {INTERESTS.map(({ icon, label }) => (
                  <div key={label} className="about__interest-chip">
                    <span>{icon}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
