import React from 'react'
import { BrowserRouter, Switch, RouteProps } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import AuthRoute from './component/auth-route'

const Login = React.lazy(() => import('./page/login'))
const Homepage = React.lazy(() => import('./page/homepage'))
const Admin = React.lazy(() => import('./page/admin'))

import { requireLogin, requireNotLogin, redirectToHomepage } from './middleware/route-auth'

@inject('$store')
@observer
export default class Container extends React.Component {
  fallback() {
    return (
      <p>lazy component loading...</p>
    )
  }

  render() {
    const Route = (routeProps: RouteProps & pwsp.RouteProps) => {
      return AuthRoute({ ...this.props, ...routeProps })
    }

    return (
      <React.Suspense fallback={this.fallback()}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/admin" auth={requireLogin} component={Admin} />
            <Route path="/login" auth={requireNotLogin} component={Login} />
            <Route auth={redirectToHomepage} component={Homepage} />
          </Switch>
        </BrowserRouter>
      </React.Suspense>
    )
  }
}
