import './wipBadge.css'

function WipBadge() {
  return (
    <div className="wip-badge" role="status" aria-label="Work in progress">
      <span className="wip-dot"></span>
      <span className="wip-text">🚧 Work in progress</span>
    </div>
  )
}

export default WipBadge
