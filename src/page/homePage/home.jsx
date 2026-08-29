import { FaLinkedinIn, FaGithub, FaMedium, FaAws } from 'react-icons/fa'
import {
  SiCloudflare,
  SiReact,
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiJupyter,
  SiApachespark,
  SiDocker,
  SiPostgresql,
  SiHuggingface,
} from 'react-icons/si'
import './home.css'

const CLUSTER_MINI_A = [[18, 26], [32, 40], [14, 48], [36, 16]]
const CLUSTER_MINI_B = [[86, 20], [100, 38], [76, 50], [104, 14]]

const TECH_STACK = [
  { name: 'Python', Icon: SiPython, color: '#4B8BBE' },
  { name: 'TensorFlow', Icon: SiTensorflow, color: '#FF6F00' },
  { name: 'PyTorch', Icon: SiPytorch, color: '#EE4C2C' },
  { name: 'Scikit-learn', Icon: SiScikitlearn, color: '#F89939' },
  { name: 'Pandas', Icon: SiPandas, color: '#8C7AE6' },
  { name: 'NumPy', Icon: SiNumpy, color: '#4DABF7' },
  { name: 'Jupyter', Icon: SiJupyter, color: '#F37626' },
  { name: 'Apache Spark', Icon: SiApachespark, color: '#E25A1C' },
  { name: 'AWS', Icon: FaAws, color: '#FF9900' },
  { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
  { name: 'Hugging Face', Icon: SiHuggingface, color: '#FFD21E' },
]

function Home() {
return ( <> <main className="home"> <section className="home-container"> <div className="home-content">

      <h1 className="home-title">
      I'm <span>Sarthak Srivastava</span>
      </h1>

      <div className="status-line">
        <span className="status-dot"></span>
        <span className="status-cycle">
        <span>learning something I probably should have known earlier</span>

        <span>looking through the data</span>
        <span>trying to understand why this isn't working</span>
        <span>going back to the basics</span>
        <span>trying a different approach</span>
        <span>reading the docs</span>
        <span>testing things and seeing what happens</span>
        </span>
      </div>

      <h2 className="home-role">
        I work with Data and AI.
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

      {/* <div className="home-tech">
        <span>Machine Learning</span>
        <span>Artificial Intelligence</span>
        <span>Deep Learning</span>
        <span>NLP</span>
        <span>Data Science</span>
        <span>AWS</span>
      </div> */}
    </div>

    <div className="home-visual">
      <div className="visual-glow"></div>

      <span className="floating-icon" aria-hidden="true">🧠</span>

      <div className="mini-grid">
        <div className="mini-card card-cluster">
          <p className="mini-label">CLUSTERING</p>
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

        <div className="mini-card card-classification">
          <p className="mini-label">CLASSIFICATION</p>
          <svg className="mini-chart" viewBox="0 0 120 70" aria-hidden="true">
            <line className="classify-line" x1="6" y1="62" x2="114" y2="8" />
            <circle className="dot dot-a" cx="30" cy="20" r="3.5" style={{ animationDelay: '0s' }} />
            <circle className="dot dot-a" cx="48" cy="12" r="3.5" style={{ animationDelay: '0.2s' }} />
            <circle className="dot dot-a" cx="40" cy="34" r="3.5" style={{ animationDelay: '0.4s' }} />
            <circle className="dot dot-c" cx="75" cy="58" r="3.5" style={{ animationDelay: '0.1s' }} />
            <circle className="dot dot-c" cx="92" cy="46" r="3.5" style={{ animationDelay: '0.3s' }} />
            <circle className="dot dot-c" cx="100" cy="60" r="3.5" style={{ animationDelay: '0.5s' }} />
          </svg>
        </div>

        <div className="mini-card card-regression">
          <p className="mini-label">REGRESSION</p>
          <svg className="mini-chart" viewBox="0 0 120 70" aria-hidden="true">
            <line className="regression-line" x1="8" y1="58" x2="112" y2="14" />
            <circle className="dot dot-a" cx="20" cy="50" r="3" style={{ animationDelay: '0s' }} />
            <circle className="dot dot-b" cx="35" cy="46" r="3" style={{ animationDelay: '0.15s' }} />
            <circle className="dot dot-a" cx="50" cy="36" r="3" style={{ animationDelay: '0.3s' }} />
            <circle className="dot dot-b" cx="65" cy="34" r="3" style={{ animationDelay: '0.45s' }} />
            <circle className="dot dot-a" cx="80" cy="24" r="3" style={{ animationDelay: '0.6s' }} />
            <circle className="dot dot-b" cx="95" cy="20" r="3" style={{ animationDelay: '0.75s' }} />
          </svg>
        </div>

        <div className="mini-card card-reinforcement">
          <p className="mini-label">REINFORCEMENT</p>
          <svg className="mini-chart" viewBox="0 0 100 70" aria-hidden="true">
            <path className="reinforce-path" d="M40,25 C55,14 65,14 78,24" />
            <path className="reinforce-path" d="M78,46 C65,57 55,57 40,46" />
            <circle className="agent-node dot-a pulse-dot" cx="25" cy="35" r="12" style={{ animationDelay: '0s' }} />
            <circle className="agent-node dot-b pulse-dot" cx="75" cy="35" r="12" style={{ animationDelay: '0.5s' }} />
          </svg>
        </div>

        <div className="mini-card card-rag">
          <p className="mini-label">RAG</p>
          <svg className="mini-chart" viewBox="0 0 120 70" aria-hidden="true">
            <circle className="rag-node dot-a" cx="12" cy="35" r="7" />
            <rect className="rag-chunk pulse-dot dot-b" x="48" y="12" width="24" height="12" rx="3" style={{ animationDelay: '0s' }} />
            <rect className="rag-chunk pulse-dot dot-b" x="48" y="29" width="24" height="12" rx="3" style={{ animationDelay: '0.3s' }} />
            <rect className="rag-chunk pulse-dot dot-b" x="48" y="46" width="24" height="12" rx="3" style={{ animationDelay: '0.6s' }} />
            <circle className="rag-node dot-c" cx="108" cy="35" r="7" />
            <line className="rag-line" x1="19" y1="35" x2="48" y2="18" />
            <line className="rag-line" x1="19" y1="35" x2="48" y2="35" />
            <line className="rag-line" x1="19" y1="35" x2="48" y2="52" />
            <line className="rag-line" x1="72" y1="18" x2="101" y2="35" />
            <line className="rag-line" x1="72" y1="35" x2="101" y2="35" />
            <line className="rag-line" x1="72" y1="52" x2="101" y2="35" />
          </svg>
        </div>
      </div>
    </div>
  </section>

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
</main>

<section className="tech-marquee">
  <div className="tech-track">
    {[...TECH_STACK, ...TECH_STACK].map(({ name, Icon, color }, i) => (
      <div className="tech-item" key={`${name}-${i}`}>
        <Icon className="tech-icon" style={{ color }} aria-hidden="true" />
        <span>{name}</span>
      </div>
    ))}
  </div>
</section>
</>
);
}

export default Home;
