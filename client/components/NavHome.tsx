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
          <Link to="/">
            <p>Home</p>
          </Link>
          <a href="#career-experience">
            <p>Experience</p>
          </a>
          <Link to="/timeline">
            <p>Career Timeline</p>
          </Link>

          <Link to="/chat">
            <p>Frank AI</p>
          </Link>
          <a href="">
            <p>Contact</p>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Nav
