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
  {
    title: 'Agentic AI-RL Robotics Platform',
    label: 'ROBOTICS · REINFORCEMENT LEARNING',
    description:
      'An interactive 3D humanoid robot simulator where an AI agent understands natural-language goals and plans robotic skills.',
    href: '/projects/reinforcement-ai',
    tags: ['Reinforcement Learning', 'Robotics', 'Three.js'],
  },
  {
    title: 'Similarity Search Playground',
    label: 'VECTOR SEARCH · EMBEDDINGS',
    description:
      'Upload a PDF or CSV, pick an embedding model, chunking strategy, and vector database, then run the ingestion pipeline.',
    href: '/projects/similarity-search',
    tags: ['Vector Databases', 'Embeddings', 'RAG'],
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
