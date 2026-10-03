import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'
import { SiGmail, SiCloudflare } from 'react-icons/si'
import './topicsNav.css'

const TOPICS = [
  { label: 'Home', href: '/' },
  { label: "What I'm Building", href: '/projects' },
  { label: 'Statistics & Probability' },
  { label: 'Machine Learning & Analytics' },
  { label: 'Artifical Intelligence' },
]

function TopicsNav() {
  const [topicsOpen, setTopicsOpen] = useState(false)

  return (
    <>
      <nav className={`home-topics-nav${topicsOpen ? ' is-open' : ''}`} aria-label="Topics">
        <button
          type="button"
          className={`home-topics-toggle${topicsOpen ? '' : ' is-pulsing'}`}
          onClick={() => setTopicsOpen((open) => !open)}
          aria-expanded={topicsOpen}
          aria-label="Toggle topics menu"
        >
          {topicsOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="home-topics-list">
          <section className="home-topics-section home-topics-section-status">
            <p className="home-topics-mini-heading">
              <span className="wip-dot"></span>
              Work in progress
            </p>

            <div className="home-topics-cloudflare">
              <SiCloudflare className="home-topics-cloudflare-icon" aria-hidden="true" />
              <div className="home-topics-cloudflare-text">
                <span className="home-topics-cloudflare-title">Hosted on Cloudflare</span>
                <span className="home-topics-cloudflare-sub">Fast, secure global edge network</span>
              </div>
            </div>
          </section>

          <section className="home-topics-section home-topics-section-menu">
            <p className="home-topics-heading">Topics</p>
            {TOPICS.map(({ label, href }, index) => (
              href ? (
                <Link
                  key={label}
                  to={href}
                  className="home-topics-item home-topics-link"
                  style={{ transitionDelay: `${index * 60}ms` }}
                  onClick={() => setTopicsOpen(false)}
                >
                  <span className="home-topics-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="home-topics-label">{label}</span>
                </Link>
              ) : (
                <span
                  key={label}
                  className="home-topics-item"
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <span className="home-topics-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="home-topics-label">{label}</span>
                </span>
              )
            ))}
          </section>

          <section className="home-topics-section home-topics-section-contact">
            <p className="home-topics-heading">Get in touch</p>

            <a
              href="mailto:sarthaksrrrrivastava@gmail.com"
              className="home-topics-contact-card contact-gmail"
              aria-label="Email Sarthak"
            >
              <span className="home-topics-contact-icon"><SiGmail /></span>
              <span className="home-topics-contact-text">
                <span className="home-topics-contact-title">Email</span>
                <span className="home-topics-contact-sub">Send me a Email</span>
              </span>
              <span className="home-topics-contact-arrow">→</span>
            </a>

            <a
              href="tel:+918960033689"
              className="home-topics-contact-card contact-phone"
              aria-label="Call Sarthak"
            >
              <span className="home-topics-contact-icon"><FaPhoneAlt /></span>
              <span className="home-topics-contact-text">
                <span className="home-topics-contact-title">Call</span>
                <span className="home-topics-contact-sub">Connect over a call</span>
              </span>
              <span className="home-topics-contact-arrow">→</span>
            </a>

            <a
              href="https://wa.me/918960033689"
              target="_blank"
              rel="noreferrer"
              className="home-topics-contact-card contact-whatsapp"
              aria-label="WhatsApp Sarthak"
            >
              <span className="home-topics-contact-icon"><FaWhatsapp /></span>
              <span className="home-topics-contact-text">
                <span className="home-topics-contact-title">WhatsApp</span>
                <span className="home-topics-contact-sub">Chat with me</span>
              </span>
              <span className="home-topics-contact-arrow">→</span>
            </a>
          </section>
        </div>
      </nav>

      <div
        className={`home-topics-backdrop${topicsOpen ? ' is-open' : ''}`}
        onClick={() => setTopicsOpen(false)}
        aria-hidden="true"
      />
    </>
  )
}

export default TopicsNav
