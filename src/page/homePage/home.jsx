import { FaLinkedinIn, FaGithub, FaMedium, FaAws } from 'react-icons/fa'
import {
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

const NEURAL_BG_NODES = [
  [60, 80], [180, 140], [90, 230], [220, 260], [340, 120], [380, 300],
  [500, 60], [520, 220], [620, 340], [700, 140], [760, 280], [840, 90],
  [900, 220], [980, 340], [1040, 120], [1100, 260], [150, 420], [300, 480],
  [450, 420], [600, 500], [750, 440], [900, 500], [1050, 460], [1150, 400],
]

const NEURAL_BG_EDGES = [
  [0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [4, 6], [6, 7], [5, 7], [7, 8],
  [7, 9], [9, 10], [9, 11], [11, 12], [10, 12], [12, 13], [13, 14], [13, 15],
  [2, 16], [3, 16], [16, 17], [17, 18], [5, 18], [18, 19], [8, 19], [19, 20],
  [10, 20], [20, 21], [12, 21], [21, 22], [13, 22], [22, 23], [15, 23],
]

const NEURAL_BG_ACTIVE_EDGES = new Set([2, 7, 14, 20, 26])

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

const NAV_TOPICS = ['Python', 'Neural Network', 'Probability & Statistics', 'Machine Learning', 'Analytics', 'AI']

function Home() {
return ( <>
<nav className="home-navbar" aria-label="Topics">
  <ul className="home-navbar-list">
    {NAV_TOPICS.map((topic) => (
      <li key={topic}>{topic}</li>
    ))}
  </ul>
</nav>
<main className="home">
  <div className="neural-bg" aria-hidden="true">
    <svg className="neural-bg-svg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
      {NEURAL_BG_EDGES.map(([a, b], i) => {
        const [x1, y1] = NEURAL_BG_NODES[a]
        const [x2, y2] = NEURAL_BG_NODES[b]
        return (
          <line
            key={`edge-${i}`}
            className={`neural-bg-edge${NEURAL_BG_ACTIVE_EDGES.has(i) ? ' is-active' : ''}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            style={{ animationDelay: `${(i % 6) * 0.4}s` }}
          />
        )
      })}
      {NEURAL_BG_NODES.map(([x, y], i) => (
        <circle
          key={`node-${i}`}
          className="neural-bg-node"
          cx={x} cy={y} r={i % 3 === 0 ? 4.5 : 3}
          style={{ animationDelay: `${(i % 8) * 0.3}s` }}
        />
      ))}
    </svg>
  </div>
  <section className="home-container"> <div className="home-content">

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
  </section>
</main>

<section className="tech-section">
  <div className="tech-grid">
    {TECH_STACK.map(({ name, Icon, color }) => (
      <div className="tech-tile" key={name}>
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
