// import Nav from './Nav.tsx'

// function Home() {
//   return (
//     <div className="home-container">
//       <Nav />
//       <div className="hero-section">
//         <div className="hero-titles">
//           <h1>System</h1>
//           <h1>Scale</h1>
//           <h1>Implementation</h1>
//         </div>
//         <div className="hero-description">
//           <p>
//             Don doesn't do IT - he designs, governs and delivers systems at a
//             national scale
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Home

import Nav from './Nav.tsx'

function Home() {
  return (
    <div className="home-container">
      <Nav />
      <div className="hero-section">
        <div className="hero-titles">
          <h1>System</h1>
          <h1>Scale</h1>
          <h1>Implementation</h1>
        </div>
        <div className="hero-description">
          <p>
            Don doesn't do IT - he designs, governs and delivers systems at a
            national scale
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
  )
}

export default Home
