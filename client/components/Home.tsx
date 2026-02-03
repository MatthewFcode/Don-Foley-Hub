import NavHome from './NavHome.tsx'
import CareerExperience from './CareerExperience.tsx'
import Contact from './Contact.tsx'
//import Timeline from './Timeline.tsx'

function Home() {
  return (
    <>
      <div className="home-container">
        <NavHome />
        <div className="hero-section">
          <div className="hero-titles">
            <h1>JPMM Consulting</h1>
            <h1>ERP & HRIS </h1>
            <h1>System Implementation</h1>
          </div>
          <div className="hero-description">
            <p>Large Scale Technology Programme Management.</p>
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
      <div>
        <Contact />
      </div>
    </>
  )
}

export default Home
