import React from 'react'

export default class Admin extends React.Component {
  onLogoutClick() {
    window.localStorage.removeItem('token')
    window.location.reload()
  }

  render() {
    return (
      <div>
        <p>you arrived admin</p>
        <button onClick={this.onLogoutClick.bind(this)}>logout</button>
      </div>
    )
  }
}
