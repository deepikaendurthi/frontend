import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class RegisterForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onRegisterForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const data = {username, password}
    const {showSubmitError} = this.state
    if (!showSubmitError) {
      await localStorage.setItem('myData', JSON.stringify(data))
      this.setState({
        username: '',
        password: '',
        showSubmitError: true,
        errorMsg: 'Registered successfully ',
      })
    }
  }

  renderUserNameField = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="input-label">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={this.onChangeUserName}
          placeholder="Username"
          className="username-input-field"
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
          className="password-input-field"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state

    return (
      <div>
        <div>
          <ul className="register-container">
            <Link to="/login">
              <img
                src="https://d18gf9zcxp8qg0.cloudfront.net/newWebsite/Financepeer_new_logo.png"
                alt="finance"
                className="finance-peer-image"
              />
            </Link>

            <li className="register-item">
              <Link to="/register">Register</Link>
            </li>
            <li className="register-item">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
        <div className="login-form-container">
          <h1 className="register-heading">Register</h1>
          <form className="form-container" onSubmit={this.onRegisterForm}>
            <div className="input-container">{this.renderUserNameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <button type="submit" className="register-button">
              Register
            </button>
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default RegisterForm
