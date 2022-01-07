import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <button type="button" className="logout-btn" onClick={onClickLogout}>
        Logout
      </button>
    </>
  )
}
export default withRouter(Header)
