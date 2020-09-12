import { Application } from 'egg'

export default (app: Application) => {
  return class IndexController extends app.Controller {
    public async index() {
      await this.ctx.render('index.html')
    }
  }
}
