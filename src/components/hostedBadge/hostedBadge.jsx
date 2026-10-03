import { SiCloudflare } from 'react-icons/si'
import './hostedBadge.css'

function HostedBadge() {
  return (
    <div className="hosted-badge" role="status" aria-label="Hosted on Cloudflare">
      <span className="hosted-item">
        <SiCloudflare className="hosted-icon hosted-icon-cf" aria-hidden="true" />
        <span className="hosted-text">Hosted in Cloudflare</span>
      </span>
    </div>
  )
}

export default HostedBadge
