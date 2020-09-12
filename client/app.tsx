import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Provider } from 'mobx-react'

import initApp from './helper/init-app'
import store from './store'
import Container from './container'

class App extends React.Component {
  state: {
    appStatus: number,
  } = {
    appStatus: 0,
  }

  componentDidMount() {
    initApp().then(() => {
      this.setState({
        appStatus: 1,
      })
    })
  }

  render() {
    const { appStatus } = this.state

    return (
      <Provider {...{ $store: store }}>
        {
          appStatus === 0 ?
            <p>app loading</p> :
            <Container />
        }
      </Provider>
    )
  }
}

export default hot(App)
