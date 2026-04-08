import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Projects.css'

const PROJECTS = [
  {
    title: 'EVEX PRO',
    status: 'complete',
    description:
      'Enhanced a cloud-based electronic invoicing platform to comply with Costa Rica\'s Hacienda 4.4 standard. Updated the Angular frontend with new regulation attributes; backend runs on AWS Lambda and DynamoDB with Docker for deployment.',
    tech: ['Angular', 'TypeScript', 'AWS Lambda', 'DynamoDB', 'Docker'],
    demo: null,
    code: null,
    highlight: 'var(--emerald)',
  },
  {
    title: 'SignumOne',
    status: 'complete',
    description:
      'Contributed to the refactoring and modernization of an enterprise digital signature platform. Updated HSM integration to the latest AWS CloudHSM SDK, refactored modules for WAR/JAR packaging, and handled WebLogic deployment.',
    tech: ['Java', 'AWS CloudHSM', 'WebLogic', 'Maven'],
    demo: null,
    code: null,
    highlight: 'var(--amethyst)',
  },
  {
    title: 'ABC Señas',
    status: 'complete',
    description:
      'Mobile application for Spanish literacy learning for deaf children. Features interactive learning games and a structured video library for alphabet-based lessons.',
    tech: ['React', 'TypeScript', 'HTML/CSS', 'SQL Server'],
    demo: null,
    code: null,
    highlight: 'var(--sapphire)',
  },
  {
    title: 'VR Campus UCR',
    status: 'complete',
    description:
      'Virtual reality campus using Unity as frontend and .NET Core as backend. Implemented a REST API consumed by a Blazor web app for CRUD operations on virtual assets, backed by a relational SQL database.',
    tech: ['Unity', 'C#', '.NET Core', 'Blazor', 'SQL'],
    demo: null,
    code: null,
    highlight: 'var(--topaz)',
  },
  {
    title: 'Concurrent Web Server',
    status: 'complete',
    description:
      'Transformed a legacy serial web server into a multi-threaded architecture whose clients perform Goldbach operations via HTTP. Built with the producer–consumer pattern in a Linux environment.',
    tech: ['C++', 'Pthreads', 'HTTP', 'Linux', 'Make'],
    demo: null,
    code: null,
    highlight: 'var(--ruby)',
  },
  {
    title: 'Goldbach-C Tool',
    status: 'complete',
    description:
      'C-based program that processes arbitrary integers and computes all valid Goldbach decompositions. Evolved from a serial implementation through Pthreads and OpenMP to a fully distributed MPI version.',
    tech: ['C', 'Pthreads', 'OpenMP', 'MPI', 'Linux'],
    demo: null,
    code: null,
    highlight: 'var(--emerald)',
  },
]

const STATUS_META = {
  complete:    { label: 'COMPLETE',     cls: 'badge--emerald'  },
  'in-progress': { label: 'IN PROGRESS', cls: 'badge--topaz'   },
  'side-quest':  { label: 'SIDE QUEST',  cls: 'badge--sapphire' },
}

function ProjectCard({ project, delay }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const meta = STATUS_META[project.status]

  return (
    <motion.div
      ref={ref}
      className="project-card pixel-border"
      style={{ '--card-highlight': project.highlight }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay }}
    >
      <div className="project-card__top">
        <span className={`badge ${meta.cls}`}>{meta.label}</span>
      </div>

      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__desc">{project.description}</p>

      <div className="project-card__chips">
        {project.tech.map(t => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>

      {(project.demo || project.code) && (
        <div className="project-card__actions">
          {project.demo && (
            <a href={project.demo} className="btn btn--primary" target="_blank" rel="noreferrer">
              ▶ DEMO
            </a>
          )}
          {project.code && (
            <a href={project.code} className="btn btn--outline" target="_blank" rel="noreferrer">
              {'{ '} CODE {' }'}
            </a>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="projects section" id="projects">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="projects__header"
        >
          <p className="section-label">// QUEST.LOG</p>
          <h2 className="section-heading">Projects</h2>
          <p className="section-sub">
            A selection of quests completed, in progress, and still on the horizon.
          </p>
        </motion.div>

        <div className="projects__grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={0.05 * (i % 3)} />
          ))}
        </div>
      </div>
    </section>
  )
}
