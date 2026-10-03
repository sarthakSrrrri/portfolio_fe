import { useEffect } from 'react'
import { FaGithub, FaArrowRight } from 'react-icons/fa'
import ProjectCard from '../../components/project/pro'
import './Projects.css'

const PROJECTS = [
  {
    title: 'Statistical Pattern Analysis with Isolation Forest',
    // label: 'ML ANOMALY INVESTIGATION',
    description:
      'An interactive enviorment where you investigate NYC taxi trips and decide whether each one is normal, suspicious, or a data error.',
    href: '/projects/Statistical Pattern Analysis & Anomaly Detection on 10.9M NYC Taxi Trips',
    tags: ['Machine Learning', 'Anomaly Detection', 'React'],
  },
  {
    title: 'Agentic AI with Reinforcement Learning Robotics Platform',
    // label: 'ROBOTICS · REINFORCEMENT LEARNING',
    description:
      'An interactive 3D humanoid robot simulator where an AI agent understands natural language goals and plans robotic skills.',
    href: '/projects/reinforcement-ai',
    tags: ['Reinforcement Learning', 'Robotics'],
  },
  {
    title: 'Similarity Search Playground',
    // label: 'VECTOR SEARCH · EMBEDDINGS',
    description:
      'Upload a PDF or CSV, pick an embedding model, chunking strategy, and vector database, then run the ingestion pipeline.',
    href: '/projects/similarity-search',
    tags: ['Vector Databases', 'Embeddings', 'RAG'],
  },
  {
    title: 'Why Neural Networks Need Activation Functions',
    // label: 'DEEP LEARNING · FUNDAMENTALS',
    description:
      'An interactive 3D lab comparing Sigmoid, ReLU, Tanh, and Softmax, showing how each transforms a neuron\'s raw output and why non-linearity is what lets networks learn curved patterns.',
    href: '/projects/activation-functions',
    tags: ['Neural Networks', 'Deep Learning'],
  },
]

const STATS = [
  { value: '8+', label: 'Technologies & Frameworks' },
  { value: '20+', label: 'Personal Projects Built' },
  { value: '∞', label: 'Things Still Left to Learn' },
]

function Projects() {
  useEffect(() => {
    document.title = "What I'm Building — Sarthak Srivastava"
  }, [])

  return (
    <main className="projects-page">
      <div className="projects-container">
        {/* <p className="projects-eyebrow">SELECTED WORK</p> */}
        <h1 className="projects-title">What I'm working on</h1>

        <p className="projects-intro">
         Over 20+ hands on projects across Machine Learning, Deep Learning, Data Science, Analytics, and AI. 
         
         From Anomaly detection and Statistical analysis to Neural Networks, Natural Language Processing, Vector search, and Machine Learning, I build projects to understand how things actually work. Each project focuses on a practical problem, with interactive experiences where possible so you can explore the idea instead of just reading about it.
        </p>

        <div className="projects-stats">
          {STATS.map(({ value, label }, index) => (
            <div className="projects-stat" key={label}>
              <span className="projects-stat-value">{value}</span>
              <span className="projects-stat-label">{label}</span>
              {index < STATS.length - 1 && <span className="projects-stat-divider" aria-hidden="true" />}
            </div>
          ))}
        </div>

        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        <div className="projects-more">
          <div className="projects-more-text">
            <h2>Currently in the lab</h2>
            <p>
              I'm actively working on more projects in Data Science, Machine Learning, and Deep
              Learning — check back soon, or follow along on GitHub for work-in-progress and
              experiments that haven't made it here yet.
            </p>
          </div>

          <a
            className="projects-github-cta"
            href="https://github.com/sarthakSrrrri"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub aria-hidden="true" />
            See more on GitHub
            <FaArrowRight aria-hidden="true" className="projects-github-cta-arrow" />
          </a>
        </div>
      </div>
    </main>
  )
}

export default Projects
