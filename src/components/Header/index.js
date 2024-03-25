import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {FaSuitcase} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const handleLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>
      <div className="icon-contianer">
        <Link to="/">
          <AiFillHome className="header-icons" />
        </Link>
        <Link to="/jobs">
          <FaSuitcase className="header-icons" />
        </Link>
        <FiLogOut className="header-icons" />
      </div>
      <div className="text-container">
        <p className="list-text">Home</p>
        <p className="list-text">Jobs</p>
        <div>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
export default withRouter(Header)
