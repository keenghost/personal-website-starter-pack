import { Application } from 'egg'

export default (app: Application) => {
  return class UserController extends app.Controller {
    public async profile() {
      this.ctx.apiOk({
        username: this.ctx.user.name,
        nickname: this.ctx.user.nickname,
      })
    }

    public async signup() {
      const { username, password, nickname } = this.ctx.request.body

      await this.ctx.service.user.signup(username, password, nickname)

      this.ctx.apiOk()
    }

    public async login() {
      const { username, password } =  this.ctx.request.body

      const token = await this.ctx.service.user.login(username, password)

      this.ctx.apiOk({
        token,
      })
    }
  }
}
