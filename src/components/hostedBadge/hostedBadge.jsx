import { SiCloudflare, SiReact } from 'react-icons/si'
import './hostedBadge.css'

function HostedBadge() {
  return (
    <div className="hosted-badge">
      <span className="hosted-item">
        <SiCloudflare className="hosted-icon hosted-icon-cf" aria-hidden="true" />
        Hosted by Cloudflare
      </span>
      <span className="hosted-divider"></span>
      <span className="hosted-item">
        <SiReact className="hosted-icon hosted-icon-react" aria-hidden="true" />
        Made with React
      </span>
    </div>
  )
}

export default HostedBadge
