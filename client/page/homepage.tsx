import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

@inject('$store')
@observer
class Homepage extends React.Component<RouteComponentProps & pwsp.RouteProps> {
  onToLoginClick() {
    this.props.history.replace('/login')
  }

  onToAdminClick() {
    this.props.history.replace('/admin')
  }

  render() {
    return (
      <div>
        <p>homepage</p>
        {
          this.props.$store!.common.user ?
            <p>logged {this.props.$store!.common.user.nickname}</p> :
            <button onClick={this.onToLoginClick.bind(this)}>to login</button>
        }
        <button onClick={this.onToAdminClick.bind(this)}>try to admin</button>
      </div>
    )
  }
}

export default withRouter(Homepage)
