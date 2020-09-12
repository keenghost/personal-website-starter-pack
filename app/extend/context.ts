import _ from 'lodash'
import { Context } from 'egg'

export default {
  apiOk(this: Context, data?: any, totalCount?: number, nextId?: number|string, previousId?: number|string, extra?: any) {
    const body: any = {
      result: data || null,
    }

    if (_.isNumber(totalCount)) {
      body.totalCount = totalCount
    }

    if (nextId) {
      body.nextId = nextId
    }

    if (previousId) {
      body.previousId = previousId
    }

    if (extra) {
      body.extra = extra
    }

    this.body = body
  },

  throwError(this: Context, message: string, extra?: any, code?: number | string, status?: number) {
    const error = new Error(message || 'Unknown Error') as pwsp.RequestError

    error.status = status || 400
    error.code = code || 0
    error.extra = extra || null

    throw error
  }
}
