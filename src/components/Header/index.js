import './index.css'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar-header">
      <h1 className="main-heading">Financepeer Assignment</h1>
      <Link to="/records" className="link-item">
        <p>Records</p>
      </Link>
      <button type="button" className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
