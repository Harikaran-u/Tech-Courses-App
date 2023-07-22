import {Link} from 'react-router-dom'

import './index.css'

const Header = () => {
  const header = (
    <Link to="/" className="link-style">
      <nav className="nav-header">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
          className="logo"
        />
      </nav>
    </Link>
  )

  return header
}

export default Header
