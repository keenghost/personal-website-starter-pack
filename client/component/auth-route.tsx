import _ from 'lodash'
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthRoute = (routeProps: pwsp.RouteProps) => {
  const { $store, component, auth = () => {} } = routeProps
  const Component = component
  const rest = _.omit(routeProps, ['$store', '$dispatch', 'component', 'auth'])

  return (
    <Route
      {...rest}
      render={(props) => {
        const redirect = auth($store!)

        return (
          redirect ? <Redirect to={redirect} /> : <Component {...props} />
        )
      }}
    />
  )
}

export default AuthRoute
