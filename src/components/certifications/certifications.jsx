import { FaAws } from 'react-icons/fa'
import './certifications.css'

const CERTIFICATIONS = [
  {
    title: 'AWS Certified Generative AI Developer - Professional',
    issuer: 'Amazon Web Services (AWS)',
    issued: 'Issued Jan 2026',
    Icon: FaAws,
    brand: 'aws',
  },
  {
    title: 'Amazon Bedrock powered Agents with MCP Servers using the Strands Agents SDK',
    issuer: 'Amazon Web Services (AWS)',
    issued: 'Issued Jan 2026',
    Icon: FaAws,
    brand: 'aws',
  },
  {
    title: 'Data Science | 6 Months Industry Live Training',
    issuer: 'Console Flare',
    issued: 'Issued Jan 2024',
    initials: 'CF',
  },
]

function Certifications() {
  return (
    <section className="certifications-section">
      <div className="certifications-container">
        <p className="section-eyebrow">CREDENTIALS</p>
        <h2 className="section-title">Licenses &amp; Certifications</h2>

        <div className="cert-list">
          {CERTIFICATIONS.map((cert) => (
            <div className="cert-entry" key={cert.title}>
              <div className={`cert-icon${cert.brand === 'aws' ? ' cert-icon-aws' : ''}`}>
                {cert.Icon ? <cert.Icon aria-hidden="true" /> : cert.initials}
              </div>

              <div className="cert-body">
                <h4>{cert.title}</h4>
                <p className="cert-meta">{cert.issuer}</p>
                <p className="cert-meta">{cert.issued}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
