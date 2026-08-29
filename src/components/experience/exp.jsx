import { FaExternalLinkAlt } from 'react-icons/fa'
import ambakLogo from '../../assets/ambak.jpeg'
import timesLogo from '../../assets/times.jpeg'
import './experience.css'

const EXPERIENCE = [
  {
    company: 'Ambak',
    logo: ambakLogo,
    website: 'https://ambak.com',
    roles: [
      {
        title: 'Senior AI/ML Engineer',
        type: 'Full-time',
        period: 'May 2026 - Present',
        duration: '4 mos',
        location: 'Gurugram, Haryana, India',
        mode: 'On-site',
      },
    ],
  },
  {
    company: 'Times Internet',
    logo: timesLogo,
    website: 'https://timesinternet.in/',
    totalDuration: '3 yrs 4 mos',
    mode: 'On-site',
    roles: [
      {
        title: 'Machine Learning Engineer',
        type: 'Full-time',
        period: 'Feb 2024 - May 2026',
        duration: '2 yrs 4 mos',
        location: 'Noida',
      },
      {
        title: 'Consultant',
        period: 'Aug 2023 - Jan 2024',
        duration: '6 mos',
        location: 'Noida, Uttar Pradesh, India',
      },
      {
        title: 'Intern',
        period: 'Feb 2023 - Jul 2023',
        duration: '6 mos',
        location: 'Noida',
      },
    ],
  },
]

function Experience() {
  return (
    <section className="experience-section">
      <div className="experience-container">
        <p className="section-eyebrow">EXPERIENCE</p>
        <h2 className="section-title">Where I've worked</h2>

        <div className="experience-list">
          {EXPERIENCE.map((entry) => {
            const grouped = entry.roles.length > 1

            return (
              <div className="experience-entry" key={entry.company}>
                <a
                  className="experience-logo"
                  href={entry.website}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${entry.company} website`}
                >
                  <img src={entry.logo} alt={`${entry.company} logo`} />
                </a>

                <div className="experience-body">
                  <div className="experience-company-header">
                    <a
                      className="experience-company-link"
                      href={entry.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {entry.company}
                      <FaExternalLinkAlt className="external-icon" aria-hidden="true" />
                    </a>
                    {grouped && (
                      <p className="experience-meta">
                        {entry.totalDuration} · {entry.mode}
                      </p>
                    )}
                  </div>

                  <div className={grouped ? 'experience-roles' : 'experience-roles single'}>
                    {entry.roles.map((role) => (
                      <div className="experience-role" key={role.title}>
                        <h4>{role.title}</h4>
                        {role.type && <p className="experience-meta">{role.type}</p>}
                        <p className="experience-meta">
                          {role.period} · {role.duration}
                        </p>
                        <p className="experience-meta">
                          {role.location}
                          {role.mode ? ` · ${role.mode}` : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Experience
