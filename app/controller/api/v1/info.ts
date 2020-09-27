import { Controller } from 'egg'

export default class InfoController extends Controller {
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
