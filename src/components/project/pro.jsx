import { FaExternalLinkAlt } from 'react-icons/fa'
import './pro.css'

function ProjectCard({ title, label, description, href, tags = [] }) {
  return (
    <a className="project-card" href={href} target="_blank" rel="noopener noreferrer">
      <p className="project-label">{label}</p>
      <h3 className="project-title">{title}</h3>
      <p className="project-description">{description}</p>

      {tags.length > 0 && (
        <div className="project-tags">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      )}

      <span className="project-link-hint">
        Open project
        <FaExternalLinkAlt aria-hidden="true" />
      </span>
    </a>
  )
}

export default ProjectCard
