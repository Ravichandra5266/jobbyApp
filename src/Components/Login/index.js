/* eslint-disable prettier/prettier */
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    isProgress: false,
    errorMsg: '',
    initialUsername: '',
    initialPassword: '',
  }

  onChangeUsername = event => {
    this.setState({initialUsername: event.target.value})
  }

  onChangePassword = event => {
    this.setState({initialPassword: event.target.value})
  }

  renderSuccessView = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  renderFailureView = errorMsg => {
    this.setState({errorMsg, isProgress: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const loginApiUrl = 'https://apis.ccbp.in/login'

    const {initialPassword, initialUsername} = this.state

    const options = {
      method: 'POST',
      body: JSON.stringify({
        username: initialUsername,
        password: initialPassword,
      }),
    }

    const responseUrl = await fetch(loginApiUrl, options)
    const responseData = await responseUrl.json()

    if (responseUrl.ok === true) {
      this.renderSuccessView(responseData.jwt_token)
    } else {
      this.renderFailureView(responseData.error_msg)
    }
  }

  render() {
    const {isProgress, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    console.log(token)
    return (
      <div className="login-route">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-page-logo"
          />
          <form className="form" onSubmit={this.onSubmitForm}>
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              className="input"
              placeholder="Username"
              onChange={this.onChangeUsername}
            />
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="Username"
              onChange={this.onChangePassword}
            />
            <button type="submit" className="login-btn">
              Login
            </button>
            {isProgress && <p className="error-msg">{`* ${errorMsg}`}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
