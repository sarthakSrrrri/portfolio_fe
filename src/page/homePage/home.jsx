import './home.css'

function Home() {
return ( <main className="home"> <section className="home-container"> <div className="home-content"> <p className="home-eyebrow">
MACHINE LEARNING ENGINEER </p>


      <h1 className="home-title">
        Hi, I'm <span>Sarthak Srivastava</span>
      </h1>

      <h2 className="home-role">
        Building intelligent solutions with Data and AI.
      </h2>

      <p className="home-description">
        I work across Machine Learning, Deep Learning, Natural Language
        Processing, Artificial Intelligence, Data Science, and Analytics to
        transform data into practical and intelligent solutions.
      </p>

      <div className="home-actions">
        <a className="home-button primary-button" href="#projects">
          View My Projects
        </a>

        <a
          className="home-button secondary-button"
          href="https://www.linkedin.com/in/sarthak-srrrrivastava/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>

        <a
          className="home-button secondary-button"
          href="https://github.com/sarthakSrrrri"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
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

      <div className="visual-card">
        <p className="visual-label">FOCUS AREAS</p>

        <div className="visual-item">
          <span>01</span>
          <p>Machine Learning</p>
        </div>

        <div className="visual-item">
          <span>02</span>
          <p>Artificial Intelligence</p>
        </div>

        <div className="visual-item">
          <span>03</span>
          <p>Natural Language Processing</p>
        </div>

        <div className="visual-item">
          <span>04</span>
          <p>Data Science & Analytics</p>
        </div>
      </div>
    </div>
  </section>
</main>


);
}

export default Home;
