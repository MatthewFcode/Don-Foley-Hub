import { Link } from 'react-router'

function Nav() {
  return (
    <div className="nav-container">
      <div className="nav-content">
        <div className="nav-brand">
          {' '}
          <a
            href="https://www.linkedin.com/in/donoughfoley/"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/don-golf.JPG" alt="Don Foley" />
          </a>
          <p>Don Foley</p>
        </div>
        <div className="nav-links">
          <a href="#career-experience">
            <p>Work Experience</p>
          </a>
          <Link to="">
            <p>Career Timeline</p>
          </Link>
          <Link to="/chat">
            <p>Frank AI</p>
          </Link>
          <Link to="">
            <p>Contact</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Nav
