import ProjectCard from '../../components/project/pro'
import './Projects.css'

const PROJECTS = [
  {
    title: 'TripTrace',
    label: 'ML ANOMALY INVESTIGATION',
    description:
      'An interactive game where you investigate NYC taxi trips and decide whether each one is normal, suspicious, or a data error.',
    href: '/projects/triptrace',
    tags: ['Machine Learning', 'Anomaly Detection', 'React'],
  },
]

function Projects() {
  return (
    <main className="projects-page">
      <div className="projects-container">
        <p className="projects-eyebrow">PROJECTS</p>
        <h1 className="projects-title">Things I've built</h1>

        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default Projects
