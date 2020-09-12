import { Application } from 'egg'

export default (app: Application) => {
    const { router, controller } = app

    const requireLogin = app.middleware.requireLogin

    router.get('/api/v1/info', controller.api.v1.info.index)
    router.get('/api/v1/logged-info', requireLogin(), controller.api.v1.info.logged)

    router.get('/api/v1/user/profile', controller.api.v1.user.profile)
    router.post('/api/v1/user/signup', controller.api.v1.user.signup)
    router.post('/api/v1/user/login', controller.api.v1.user.login)

    router.get('/*', controller.index.index)
}
