import { Context } from 'egg'

export default () => {
  return async (ctx: Context, next: pwsp.Next) => {
    try {
      const authorization: string = ctx.headers.authorization || ''
      const token = authorization.replace(/^Bearer /i, '')
      const user = await ctx.service.user.getUserByToken(token)

      ctx.user = user
    } catch (err) {
      ctx.logger.info('get user failed:', err)
    }

    await next()
  }
}
