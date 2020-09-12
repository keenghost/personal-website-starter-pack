import _ from 'lodash'
import { formatQueryString } from '../helper'

export function requireLogin($store: pwsp.StoreProps) {
  const user = _.get($store, 'common.user')

  if (user) {
    return null
  }

  return {
    pathname: '/login',
    search: formatQueryString({
      redirect: window.location.href,
    }),
  }
}

export function requireNotLogin($store: pwsp.StoreProps) {
  const user = _.get($store, 'common.user')

  if (!user) {
    return null
  }

  return {
    pathname: '/',
  }
}

export function redirectToHomepage(_$store: pwsp.StoreProps) {
  return {
    pathname: '/',
  }
}
