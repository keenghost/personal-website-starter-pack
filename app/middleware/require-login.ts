import { Context } from 'egg'

export default () => {
  return async (ctx: Context, next: pwsp.Next) => {
    if (!ctx.user) {
      ctx.throwError('not logged in', null, 0, 403)
    }

    await next()
  }
}
