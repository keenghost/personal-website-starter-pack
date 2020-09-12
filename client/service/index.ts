import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import Promise from 'bluebird'

interface RequestErrorData {
  message: string,
  code: number | string,
  extra: any,
}

function fetcher(options: AxiosRequestConfig) {
  const token = window.localStorage.getItem('token')
  const opts = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    withCredentials: true,
    ...options,
    params: {
      ...options.params,
      _: Date.now(),
    },
  }

  const fetchPromise = Promise.resolve(axios(opts))
    .then((res: AxiosResponse) => {
      return res.data
    }).catch(Promise.CancellationError, () => {
      fetchPromise.cancel()
    }).catch((err: AxiosError) => {
      const errorData = (err.response!.data || {}) as RequestErrorData
      const requestError = new Error(errorData.message || 'Unknown Error') as pwsp.RequestError
      requestError.code = errorData.code
      requestError.extra = errorData.extra

      return Promise.reject(requestError)
    })

  return fetchPromise
}

export function getProfile() {
  return fetcher({
    method: 'get',
    url: '/api/v1/user/profile',
  })
}

export function login(data: { username: string, password: string}) {
  return fetcher({
    method: 'post',
    url: '/api/v1/user/login',
    data,
  })
}
