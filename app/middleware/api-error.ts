import { Context } from 'egg'

export default () => {
  return async (ctx: Context, next: pwsp.Next) => {
    try {
      await next()

      if (ctx.status === 404 && !ctx.body) {
        ctx.throwError("not found", null, 0, 404)
      }
    } catch (caughtError) {
      const err = caughtError as pwsp.RequestError

      ctx.status = err.status > 0 ? err.status : 500
      ctx.body = {
        code: err.code || -1,
        extra: err.extra || null,
        message: err.message || 'Unknown Error',
      }

      if (ctx.status >= 500) {
        ctx.logger.error('Caught', err)
      }
    }
  }
}
