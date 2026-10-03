import { SiCloudflare, SiReact } from 'react-icons/si'
import './hostedBadge.css'

function HostedBadge() {
  return (
    <div className="hosted-badge">
      <span className="hosted-item">
        <SiCloudflare className="hosted-icon hosted-icon-cf" aria-hidden="true" />
        Hosted in Cloudflare
      </span>
      <span className="hosted-divider"></span>
    </div>
  )
}

export default HostedBadge
