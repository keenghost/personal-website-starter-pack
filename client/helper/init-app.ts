import Promise from 'bluebird'

import store from '../store'
import { getProfile } from '../service'

export default function initApp() {
  const token = window.localStorage.getItem('token')

  if (!token) {
    return Promise.resolve()
  }

  return Promise.props({
    user: getProfile().then((res) => res.result),
  }).then(({ user }) => {
    store.common.setUser(user)
  }).catch(() => {})
}
