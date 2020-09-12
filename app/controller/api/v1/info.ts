import { Application } from 'egg'

export default (app: Application) => {
  return class InfoController extends app.Controller {
    public async index() {
      this.ctx.apiOk({
        node: process.version,
      })
    }

    public async logged() {
      this.ctx.apiOk({
        user: this.ctx.user.nickname,
      })
    }
  }
}
