import { Controller } from 'egg'

export default class IndexController extends Controller {
  public async index() {
    await this.ctx.render('index.html')
  }
}
