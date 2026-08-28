import { FaLinkedinIn, FaGithub, FaMedium } from 'react-icons/fa'
import './home.css'

const CLUSTER_MINI_A = [[18, 26], [32, 40], [14, 48], [36, 16]]
const CLUSTER_MINI_B = [[86, 20], [100, 38], [76, 50], [104, 14]]

function Home() {
return ( <main className="home"> <section className="home-container"> <div className="home-content"> 

      <h1 className="home-title">
        Hi, I'm <span>Sarthak Srivastava</span>
      </h1>

      <h2 className="home-role">
        I work with data and AI.
      </h2>

      <p className="home-description">
        Most of my work involves looking at data, trying different models,
        and figuring out what actually works. I work across Machine
        Learning, NLP, Deep Learning, and AI.
      </p>

      <p className="home-description">
        I also spend a good amount of time learning on my own and going back
        to the fundamentals.
      </p>


      <div className="home-actions">

        <a
          className="home-button secondary-button linkedin-button"
          href="https://www.linkedin.com/in/sarthak-srrrrivastava/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedinIn className="button-icon" aria-hidden="true" />
          LinkedIn
        </a>

        <a
          className="home-button secondary-button github-button"
          href="https://github.com/sarthakSrrrri"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className="button-icon" aria-hidden="true" />
          GitHub
        </a>

        <a
          className="home-button secondary-button medium-button"
          href="https://medium.com/@sarthaksrrrrivastava"
          target="_blank"
          rel="noreferrer"
        >
          <FaMedium className="button-icon" aria-hidden="true" />
          Medium
        </a>
      </div>

      <div className="home-tech">
        <span>Machine Learning</span>
        <span>Artificial Intelligence</span>
        <span>Deep Learning</span>
        <span>NLP</span>
        <span>Data Science</span>
        <span>AWS</span>
      </div>
    </div>

    <div className="home-visual">
      <div className="visual-glow"></div>

      <div className="mini-grid">
        <div className="mini-card card-cluster">
          <p className="mini-label">CLUSTER ANALYSIS</p>
          <svg className="mini-chart" viewBox="0 0 120 70" aria-hidden="true">
            <circle className="cluster-halo halo-a" cx="25" cy="32" r="26" />
            <circle className="cluster-halo halo-b" cx="93" cy="28" r="26" />
            {CLUSTER_MINI_A.map(([x, y], i) => (
              <circle key={`a-${i}`} cx={x} cy={y} r="3.5" className="dot dot-a" style={{ animationDelay: `${i * 0.25}s` }} />
            ))}
            {CLUSTER_MINI_B.map(([x, y], i) => (
              <circle key={`b-${i}`} cx={x} cy={y} r="3.5" className="dot dot-b" style={{ animationDelay: `${i * 0.25}s` }} />
            ))}
          </svg>
        </div>

        <div className="mini-card card-timeseries">
          <p className="mini-label">TIME SERIES</p>
          <svg className="mini-chart" viewBox="0 0 120 70" aria-hidden="true">
            <path className="ts-line" d="M8,55 L28,42 L48,48 L68,24 L88,32 L110,14" />
            <circle className="dot dot-c pulse-dot" cx="110" cy="14" r="4" />
          </svg>
        </div>

        <div className="mini-card card-analytics">
          <div className="mini-card-head">
            <p className="mini-label">ANALYTICS</p>
            <span className="mini-trend">▲ 32%</span>
          </div>
          <svg className="mini-chart" viewBox="0 0 120 70" aria-hidden="true">
            <rect className="analytics-bar bar-a" x="10" y="35" width="18" height="30" rx="3" style={{ animationDelay: '0s' }} />
            <rect className="analytics-bar bar-b" x="40" y="20" width="18" height="45" rx="3" style={{ animationDelay: '0.1s' }} />
            <rect className="analytics-bar bar-c" x="70" y="28" width="18" height="37" rx="3" style={{ animationDelay: '0.2s' }} />
            <rect className="analytics-bar bar-d" x="100" y="10" width="18" height="55" rx="3" style={{ animationDelay: '0.3s' }} />
          </svg>
        </div>

        <div className="mini-card card-agentic">
          <p className="mini-label">AGENTIC AI</p>
          <svg className="mini-chart" viewBox="0 0 70 70" aria-hidden="true">
            <circle className="agent-loop" cx="35" cy="35" r="24" />
            <circle className="agent-node dot-a pulse-dot" cx="35" cy="11" r="4" style={{ animationDelay: '0s' }} />
            <circle className="agent-node dot-b pulse-dot" cx="59" cy="35" r="4" style={{ animationDelay: '0.4s' }} />
            <circle className="agent-node dot-c pulse-dot" cx="35" cy="59" r="4" style={{ animationDelay: '0.8s' }} />
            <circle className="agent-node dot-a pulse-dot" cx="11" cy="35" r="4" style={{ animationDelay: '1.2s' }} />
          </svg>
        </div>
      </div>
    </div>
  </section>
</main>


);
}

export default Home;
