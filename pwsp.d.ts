/// <reference types="egg-mongoose" />
/// <reference types="egg-jwt" />

import store from './client/store'

declare namespace pwsp {
  interface AnyObject {
    [propName: string]: any,
  }

  type StoreProps = typeof store

  interface RouteProps {
    path?: string,
    $store?: StoreProps,
    component: any,
    auth?: ($store: StoreProps) => any,
  }

  interface RequestError extends Error {
    status: number,
    code: number | string,
    extra?: any,
  }

  type Next = () => Promise<any>
}

export = pwsp
export as namespace pwsp
