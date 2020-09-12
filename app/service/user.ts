import { Application } from 'egg'
import { generateCipher, compareCipher } from '../helper'

interface User {
  _id: string,
  name: string,
  password: string,
  nickname: string,
}

interface Token {
  userId: string,
}

export default (app: Application) => {
  return class UserService extends app.Service {
    signToken(content: Token): Promise<string> {
      return new Promise((resolve, reject) => {
        this.app.jwt.sign(content, this.app.config.jwt.secret, (err: Error, token: string) => {
          if (err) {
            reject(err)
            return
          }

          resolve(token)
        })
      })
    }

    verifyToken(token: string): Promise<Token> {
      return new Promise((resolve, reject) => {
        this.app.jwt.verify(token, this.app.config.jwt.secret, (err: Error, decoded: Token) => {
          if (err) {
            reject(err)
            return
          }

          resolve(decoded)
        })
      })
    }

    async getUserByUsername(username: string) {
      const user: User | null = await this.app.model.User.findOne({
        name: username,
      })

      return user
    }

    public async getUserByToken(token: string) {
      try {
        const tokenContent = await this.verifyToken(token)
        const user: User | null = await this.app.model.User.findOne({
          _id: tokenContent.userId,
        })

        return user
      } catch (err) {
        return null
      }
    }

    public async signup(username: string, password: string, nickname: string) {
      if (this.app.model.User.findOne({ name: username })) {
        return this.ctx.throwError('username has been used')
      }

      if (this.app.model.User.findOne({ nickname })) {
        return this.ctx.throwError('nickname has been used')
      }

      const passwordCipher = await generateCipher(password)

      return this.app.model.User.create({
        name: username,
        password: passwordCipher,
        nickname,
      })
    }

    public async login(username: string, password: string) {
      const user = await this.getUserByUsername(username)

      if (!user) {
        return this.ctx.throwError('wrong username or password')
      }

      const isPassword = await compareCipher(password, user.password)

      if (!isPassword) {
        return this.ctx.throwError('wrong username or password')
      }

      return this.signToken({userId: user._id})
    }
  }
}
