import { Link } from 'react-router'

function Nav() {
  return (
    <div className="nav-container">
      <div className="nav-content">
        <div className="nav-brand">
          {' '}
          {/* <a
            href="https://www.linkedin.com/in/donoughfoley/"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/don-golf.JPG" alt="Don Foley" />
          </a> */}
          <a
            href="https://www.linkedin.com/in/donoughfoley/"
            target="_blank"
            rel="noreferrer"
            className="no-underline-don"
          >
            {' '}
            <p>Don Foley</p>
          </a>
        </div>
        <div className="nav-links">
          <Link to="/">
            <p>Home</p>
          </Link>
          {/* <a href="#career-experience">
            <p>Experience</p>
          </a> */}
          <Link to="/timeline">
            <p>Career Timeline & References</p>
          </Link>

          <Link to="/chat">
            <p>Franky AI</p>
          </Link>
          <a href="#contact">
            <p>Contact</p>
          </a>
          <a href="/Don-Foley-CV.pdf" target="_blank">
            Download my CV
          </a>
        </div>
      </div>
    </div>
  )
}

export default Nav
