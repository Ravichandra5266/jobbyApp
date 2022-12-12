/* eslint-disable prettier/prettier */
import {Link, withRouter} from 'react-router-dom'

import {BsFillBriefcaseFill} from 'react-icons/bs'
import {RiLogoutCircleRFill} from 'react-icons/ri'
import {AiFillHome} from 'react-icons/ai'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
    console.log(11)
  }
  return (
    <nav className="header-route">
      <ul className="nav-container-list">
        <li className="lg-header-list-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-logo"
          />
          <div className="links-container">
            <Link to="/" className="route-link">
              <p className="nav-links">Home</p>
            </Link>
            <Link to="/jobs" className="route-link">
              <p className="nav-links">Jobs</p>
            </Link>
          </div>
          <button type="button" className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </li>
        <li className="sm-header-list-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-logo"
          />
          <div className="links-container">
            <Link to="/" className="route-link">
              <AiFillHome className="icon" />
            </Link>
            <Link to="/jobs" className="route-link">
              <BsFillBriefcaseFill className="icon" />
            </Link>
          </div>
          <button type="button" className="logout-icon" onClick={onLogout}>
            <RiLogoutCircleRFill className="icon" />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
