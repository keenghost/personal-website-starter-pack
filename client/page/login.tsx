import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { login } from '../service'

interface State {
  username: string,
  password: string,
}

class Login extends React.Component<RouteComponentProps> {
  state: State = {
    username: '',
    password: '',
  }

  onUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      username: e.target.value,
    })
  }

  onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      password: e.target.value,
    })
  }

  onLoginClick() {
    login({
      username: this.state.username,
      password: this.state.password,
    }).then((res) => {
      const token = res.result.token
      window.localStorage.setItem('token', token)
      window.location.href = '/admin'
    }).catch((err) => {
      window.alert(err.message || 'Unknown Error')
    })
  }

  render() {
    return (
      <div>
        <span>username</span>
        <input value={this.state.username} onChange={this.onUsernameChange.bind(this)} />
        <span>password</span>
        <input value={this.state.password} onChange={this.onPasswordChange.bind(this)} type="password" />
        <button onClick={this.onLoginClick.bind(this)}>login</button>
      </div>
    )
  }
}

export default withRouter(Login)
