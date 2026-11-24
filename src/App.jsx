import { useEffect, useRef, useState } from 'react'
import './App.css'

const stars = [
  [7, 12, 2, 0], [15, 27, 1, 1.5], [22, 8, 2, 2],
  [29, 18, 1, 3], [34, 7, 2, 1], [41, 26, 1, 2.7],
  [48, 12, 2, 4], [56, 21, 1, 1.2], [63, 8, 2, 3.3],
  [71, 17, 1, 0.8], [78, 7, 2, 2.4], [86, 25, 1, 3.8],
  [93, 12, 2, 1.8], [11, 48, 1, 4], [19, 62, 2, 2.1],
  [27, 43, 1, 0.4], [35, 58, 2, 3.1], [44, 47, 1, 1.7],
  [53, 66, 2, 2.9], [61, 48, 1, 0.9], [69, 59, 2, 3.7],
  [77, 45, 1, 1.3], [84, 63, 2, 2.6], [92, 50, 1, 4.4],
  [5, 81, 2, 2.3], [14, 72, 1, 3.4], [24, 88, 2, 1.1],
  [33, 75, 1, 4], [42, 92, 2, 2], [51, 80, 1, 0.7],
  [59, 89, 2, 3.5], [68, 76, 1, 1.9], [74, 94, 2, 4.2],
  [83, 82, 1, 2.8], [90, 91, 2, 1.6], [97, 73, 1, 3.1],
]

const skillPlanets = [
  { name: 'Python', x: '18%', y: '30%', size: 'medium' },
  { name: 'DSA', x: '42%', y: '18%', size: 'small' },
  { name: 'ML', x: '66%', y: '29%', size: 'large' },
  { name: 'GenAI', x: '80%', y: '49%', size: 'medium' },
  { name: 'React', x: '55%', y: '67%', size: 'small' },
  { name: 'n8n', x: '29%', y: '72%', size: 'medium' },
]

const fallingStarData = [
  [4, 0.4, 1.9], [10, 0.8, 2.2], [17, 0.2, 1.6],
  [24, 1.1, 2.1], [31, 0.5, 1.8], [38, 1.3, 2.4],
  [45, 0.1, 1.7], [52, 0.9, 2.2], [59, 0.3, 1.9],
  [66, 1.2, 2.5], [73, 0.6, 1.8], [80, 1, 2.1],
  [87, 0.2, 2.3], [94, 0.7, 1.7], [98, 1.4, 2.4],
  [13, 1.5, 2], [28, 0.9, 2.3], [47, 1.6, 1.8],
  [69, 1.1, 2], [91, 1.5, 2.2],
]

function App() {
  const appRef = useRef(null)
  const showerTimerRef = useRef(null)

  const [question, setQuestion] = useState('')
  const [moonPhase, setMoonPhase] = useState(0)
  const [starShower, setStarShower] = useState(false)

  const [answer, setAnswer] = useState(
    'Welcome to the midnight lab. Ask me about projects, skills, or my journey.'
  )

  useEffect(() => {
    return () => {
      if (showerTimerRef.current) {
        clearTimeout(showerTimerRef.current)
      }
    }
  }, [])

  function handleMouseMove(event) {
    if (!appRef.current) return

    const x = (event.clientX / window.innerWidth) * 100
    const y = (event.clientY / window.innerHeight) * 100

    appRef.current.style.setProperty('--mouse-x', `${x}%`)
    appRef.current.style.setProperty('--mouse-y', `${y}%`)
  }

  function handleMoonClick() {
    setMoonPhase((phase) => (phase + 1) % 5)
    setStarShower(true)

    if (showerTimerRef.current) {
      clearTimeout(showerTimerRef.current)
    }

    showerTimerRef.current = setTimeout(() => {
      setStarShower(false)
    }, 4000)
  }

  function handleQuestion(event) {
    event.preventDefault()

    const text = question.toLowerCase()

    if (text.includes('project')) {
      setAnswer(
        'My projects include a Smart Solar Tracking System using ESP32, LDR sensors and a servo motor, and n8n automation workflows including a chatbot and quiz workflow.'
      )
    } else if (text.includes('skill')) {
      setAnswer(
        'I am focusing on Python, DSA, Machine Learning, Generative AI and software development. I also explore React, n8n, Power BI and design tools.'
      )
    } else if (text.includes('journey') || text.includes('about')) {
      setAnswer(
        'I am a B.Tech AI & ML student who learns by building, experimenting, participating in technical activities and steadily improving my skills.'
      )
    } else if (text.includes('ai') || text.includes('machine')) {
      setAnswer(
        'My interests include Machine Learning, Generative AI and building practical intelligent systems.'
      )
    } else if (text.includes('contact') || text.includes('email')) {
      setAnswer(
        'You can reach me through email or LinkedIn. Both links are available in the contact section.'
      )
    } else {
      setAnswer(
        'Try asking: What projects have you built? What are your skills? What are you learning?'
      )
    }

    setQuestion('')
  }

  return (
    <div ref={appRef} className="app" onMouseMove={handleMouseMove}>
      <div className="cursor-glow"></div>

      {/* Background stars */}
      <div className="stars">
        {stars.map(([left, top, size, delay], index) => (
          <span
            key={index}
            className="star"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
            }}
          />
        ))}
      </div>

      {/* Falling stars */}
      {starShower && (
        <div className="star-shower">
          {fallingStarData.map(([left, delay, duration], index) => (
            <span
              key={index}
              className="falling-star"
              style={{
                left: `${left}%`,
                '--delay': `${delay}s`,
                '--duration': `${duration}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* NAVBAR */}
      <header className="navbar">
        <a href="#home" className="brand">
          HIMA<span>SWETHA</span>
        </a>

        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#constellation">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#journey">Journey</a>
          <a href="#profiles">Profiles</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="hero">
          <div className="hero-copy">
            <div className="location-chip">
              <span className="pulse-dot"></span>
              SOMEWHERE BETWEEN LEARNING & BUILDING
            </div>

            <p className="eyebrow">B.TECH AI & ML · CLASS OF 2028</p>

            <h1 className="hero-name">
              Hima Swetha
              <span>Yadav Singapati.</span>
            </h1>

            <div className="hero-tagline">
              <span className="code-symbol">&lt;/&gt;</span>
              <span className="tagline-first">curiosity,</span>
              <span className="tagline-accent">coded.</span>
            </div>

            <p className="hero-text">
              Exploring intelligent systems, building practical projects,
              and turning questions into experiments.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="moon-button">
                Explore my missions <span>↗</span>
              </a>

              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="outline-button">
                View Resume ↗
              </a>

              <a href="#contact" className="outline-button">
                Say hello
              </a>
            </div>

            <div className="mini-facts">
              <div>
                <strong>9.2</strong>
                <span>CGPA</span>
              </div>

              <div>
                <strong>2+</strong>
                <span>COMPETITION WINS</span>
              </div>

              <div>
                <strong>2028</strong>
                <span>GRADUATION</span>
              </div>
            </div>
          </div>

          {/* MOON */}
          <div className="sky-stage">
            <button
              className={`moon-button-trigger phase-${moonPhase}`}
              onClick={handleMoonClick}
              aria-label="Click to change the moon phase and make stars fall"
              type="button"
            >
              <div className="moon">
                <div className="moon-crater crater-one"></div>
                <div className="moon-crater crater-two"></div>
                <div className="moon-crater crater-three"></div>
                <div className="moon-shadow"></div>
              </div>
            </button>

            <div className="moon-click-hint">
              <span>✦</span> CLICK THE MOON
            </div>

            <div className="moon-label">
              <span>01</span>
              <p>THE BEGINNING</p>
            </div>

            <div className="shooting-star"></div>
          </div>
        </section>

        <div className="cosmic-divider">
          <span>LEARN</span><i>✦</i><span>BUILD</span><i>✦</i>
          <span>EXPERIMENT</span><i>✦</i><span>IMPROVE</span><i>✦</i>
          <span>REPEAT</span>
        </div>

        {/* ABOUT */}
        <section id="about" className="section">
          <div className="section-label">01 — ABOUT</div>

          <div className="two-column">
            <div>
              <h2>
                Not an expert.
                <span>Not pretending to be.</span>
              </h2>
            </div>

            <div className="section-text">
              <p>
                I’m a B.Tech Artificial Intelligence & Machine Learning
                student from Nellore, Andhra Pradesh, building my foundations
                across AI, software development and problem solving.
              </p>

              <p>
                I enjoy learning something new, getting stuck somewhere,
                figuring it out, and turning what I learn into something
                practical.
              </p>

              <p className="highlight-line">
                Currently asking:
                <strong> “What can I build with this?”</strong>
              </p>
            </div>
          </div>
        </section>

        {/* SKILLS CONSTELLATION */}
        <section id="constellation" className="section">
          <div className="section-label">02 — MY CONSTELLATION</div>

          <div className="section-heading">
            <h2>
              The things
              <span>I’m figuring out.</span>
            </h2>
            <p>Think of these as stars I’m connecting one by one.</p>
          </div>

          <div className="constellation-map">
            <svg
              className="constellation-lines"
              viewBox="0 0 1000 600"
              preserveAspectRatio="none"
            >
              <line x1="180" y1="180" x2="420" y2="110" />
              <line x1="420" y1="110" x2="660" y2="170" />
              <line x1="660" y1="170" x2="800" y2="290" />
              <line x1="800" y1="290" x2="550" y2="400" />
              <line x1="550" y1="400" x2="290" y2="430" />
              <line x1="290" y1="430" x2="180" y2="180" />
            </svg>

            {skillPlanets.map((planet) => (
              <div
                key={planet.name}
                className={`skill-planet ${planet.size}`}
                style={{ left: planet.x, top: planet.y }}
              >
                <span></span>
                <strong>{planet.name}</strong>
              </div>
            ))}

            <div className="constellation-center">
              <small>CURRENT FOCUS</small>
              <strong>AI / ML</strong>
              <span>connecting the dots...</span>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section">
          <div className="section-label">03 — MISSION LOG</div>

          <div className="section-heading">
            <h2>
              Things I’ve
              <span>actually built.</span>
            </h2>
            <p>Small projects still count. Every build teaches something.</p>
          </div>

          <div className="mission-grid">
            <article className="mission-card major">
              <div className="mission-top">
                <span>MISSION 01</span><span>HARDWARE</span>
              </div>
              <div className="mission-icon">☼</div>
              <h3>Smart Solar Tracking System</h3>
              <p>
                Built using ESP32, LDR sensors and a servo motor to
                automatically orient a solar panel toward maximum light.
              </p>
              <div className="mission-tags">
                <span>ESP32</span><span>LDR</span><span>Servo</span>
                <span>Arduino IDE</span>
              </div>
              <a href="https://github.com/himaswetha439" target="_blank" rel="noreferrer">
                VIEW ON GITHUB ↗
              </a>
            </article>

            <article className="mission-card">
              <div className="mission-top">
                <span>MISSION 02</span><span>AUTOMATION</span>
              </div>
              <div className="mission-icon">⌁</div>
              <h3>n8n Automation Workflows</h3>
              <p>
                Created workflow-based applications including a chatbot
                and a quiz automation workflow.
              </p>
              <div className="mission-tags">
                <span>n8n</span><span>Chatbot</span><span>Automation</span>
              </div>
            </article>

            <article className="mission-card future">
              <div className="mission-top">
                <span>MISSION 03</span><span>LOADING</span>
              </div>
              <div className="mission-icon">☾</div>
              <h3>Something new is brewing.</h3>
              <p>
                More AI, ML and software projects will appear here as
                the constellation grows.
              </p>
              <div className="loading-bar"><span></span></div>
            </article>
          </div>
        </section>

        {/* JOURNEY */}
        <section id="journey" className="section">
          <div className="section-label">04 — JOURNEY</div>

          <div className="two-column journey-layout">
            <div>
              <h2>
                One step.
                <span>Then another.</span>
              </h2>
            </div>

            <div className="journey-list">
              <div className="journey-item">
                <span>NOW</span>
                <div>
                  <h3>Deepening AI & software skills</h3>
                  <p>
                    Python, DSA, Machine Learning, Generative AI and
                    practical development.
                  </p>
                </div>
              </div>

              <div className="journey-item">
                <span>2026</span>
                <div>
                  <h3>Projects + hackathons + technical activities</h3>
                  <p>
                    Building projects, participating in workshops,
                    experimenting with automation and creating technical
                    content.
                  </p>
                </div>
              </div>

              <div className="journey-item">
                <span>FOUNDATION</span>
                <div>
                  <h3>Learning by doing</h3>
                  <p>
                    Programming, web development, AI/ML, design and
                    problem solving.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="section">
          <div className="section-label">05 — LITTLE WINS</div>

          <div className="wins-grid">
            <div className="win-card">
              <strong>9.2</strong>
              <span>CGPA</span>
              <p>B.Tech AI & ML</p>
            </div>

            <div className="win-card">
              <strong>Winner</strong>
              <span>SCIENCE QUIZ</span>
              <p>Competition achievement</p>
            </div>

            <div className="win-card">
              <strong>Winner</strong>
              <span>CAFE CODING</span>
              <p>Coding competition</p>
            </div>

            <div className="win-card">
              <strong>577/600</strong>
              <span>CLASS 10</span>
              <p>96.17%</p>
            </div>

            <div className="win-card">
              <strong>93%</strong>
              <span>INTERMEDIATE</span>
              <p>Academic milestone</p>
            </div>
          </div>
        </section>

        {/* MIDNIGHT TERMINAL */}
        <section className="section">
          <div className="section-label">06 — MIDNIGHT TERMINAL</div>

          <div className="terminal">
            <div className="terminal-bar">
              <div className="terminal-buttons">
                <span></span><span></span><span></span>
              </div>
              <p>hima@midnight-lab</p>
            </div>

            <div className="terminal-content">
              <p className="terminal-line"><span>$</span> ask-hima</p>
              <p className="terminal-answer">{answer}</p>

              <form onSubmit={handleQuestion} className="terminal-form">
                <span>&gt;</span>
                <input
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder="Ask about my projects, skills or journey..."
                  aria-label="Ask about Hima"
                />
                <button type="submit">ENTER</button>
              </form>
            </div>
          </div>
        </section>

        {/* PROFILES */}
        <section id="profiles" className="section profiles-section">
          <div className="section-label">07 — FIND ME AROUND THE INTERNET</div>

          <div className="section-heading">
            <h2>
              A little more
              <span>about my work.</span>
            </h2>
            <p>Explore my code, problem-solving practice and professional profile.</p>
          </div>

          <div className="profile-grid">
            <a
              className="profile-card"
              href="https://github.com/himaswetha439"
              target="_blank"
              rel="noreferrer"
            >
              <span className="profile-number">01 / CODE</span>
              <strong>GitHub <span>↗</span></strong>
              <p>Projects, experiments and things I’m building.</p>
              <small>EXPLORE REPOSITORIES</small>
            </a>

            <a
              className="profile-card"
              href="https://leetcode.com/u/himaswetha22/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="profile-number">02 / PRACTICE</span>
              <strong>LeetCode <span>↗</span></strong>
              <p>My problem-solving and coding practice.</p>
              <small>VIEW CODING PROFILE</small>
            </a>

            <a
              className="profile-card"
              href="https://linkedin.com/in/himaswethasingapati"
              target="_blank"
              rel="noreferrer"
            >
              <span className="profile-number">03 / CONNECT</span>
              <strong>LinkedIn <span>↗</span></strong>
              <p>My learning updates, activities and professional journey.</p>
              <small>LET’S CONNECT</small>
            </a>

            <a
              className="profile-card resume-profile"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <span className="profile-number">04 / DOCUMENT</span>
              <strong>Resume <span>↗</span></strong>
              <p>A quick overview of my education, skills and experience.</p>
              <small>VIEW MY RESUME</small>
            </a>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact-section">
          <div className="contact-orbit"></div>

          <p className="eyebrow">LAST STOP</p>
          <h2>
            Let’s make
            <span>something worth remembering.</span>
          </h2>

          <p>
            I’m always interested in learning, collaborating and building
            useful things with people who are curious too.
          </p>

          <a href="mailto:himaswetha439@gmail.com" className="email-button">
            himaswetha439@gmail.com ↗
          </a>

          <div className="social-links">
            <a href="https://linkedin.com/in/himaswethasingapati" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/himaswetha439" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://leetcode.com/u/himaswetha22/" target="_blank" rel="noreferrer">
              LeetCode
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer">
              Resume
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER + ROCKET */}
      <footer className="footer">
        <span>HIMA SWETHA YADAV SINGAPATI</span>
        <span>AI & ML · 2028</span>
        <a href="#home" className="rocket-top">
          <span>🚀</span>
          <small>BACK TO TOP</small>
        </a>
        <span>BUILT WITH REACT ✦</span>
      </footer>
    </div>
  )
}

export default App