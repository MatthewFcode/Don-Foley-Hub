import { Link } from 'react-router'

function NavHome() {
  return (
    <div className="nav-container">
      <div className="nav-content">
        <div className="nav-brand">
          {' '}
          <a
            href="https://www.linkedin.com/in/donoughfoley/"
            target="_blank"
            rel="noreferrer"
            className="no-underline-don"
          >
            <p>Don Foley</p>
          </a>
        </div>
        <div className="nav-links">
          <Link to="/">
            <p>Home</p>
          </Link>

          <Link to="/timeline">
            <p>Career Timeline & References</p>
          </Link>

          <Link to="/chat">
            <p>Franky AI</p>
          </Link>
          <a href="/Don-Foley-CV.pdf" target="_blank">
            Download my CV
          </a>
        </div>
      </div>
    </div>
  )
}

export default NavHome
