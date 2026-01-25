import NavHome from './NavHome.tsx'
import CareerExperience from './CareerExperience.tsx'
//import Timeline from './Timeline.tsx'

function Home() {
  return (
    <>
      <div className="home-container">
        <NavHome />
        <div className="hero-section">
          <div className="hero-titles">
            <h1>System</h1>
            <h1>Scale</h1>
            <h1>Implementation</h1>
          </div>
          <div className="hero-description">
            <p>
              Don doesn't just do IT; Don designs, governs and delivers systems
              at a national and multi-national scale.
            </p>
          </div>
          <div className="scroll-indicator">
            <p className="scroll-text">Scroll Down</p>
            <div className="arrows">
              <div className="arrow"></div>
              <div className="arrow"></div>
              <div className="arrow"></div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <CareerExperience />
      </div>
      {/* <div>
        <Timeline />
      </div> */}
    </>
  )
}

export default Home
