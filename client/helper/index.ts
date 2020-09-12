import QS from 'querystring'
import URL, { UrlObject } from 'url'

export function parseJson(text: string): pwsp.AnyObject|null {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

export function parseQueryString(queryString: String): pwsp.AnyObject {
  const search = (queryString || '').replace(/^\?/, '')
  return QS.parse(search)
}

export function formatQueryString(query: pwsp.AnyObject = {}) {
  return QS.stringify(query)
}

export function formatUrl(urlObject: UrlObject = {}) {
  return URL.format(urlObject)
}
