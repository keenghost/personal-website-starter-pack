import { Application } from 'egg'

export default (app: Application) => {
  const signals = ['SIGINT', 'SIGTERM'] as NodeJS.Signals[]
  signals.forEach(signal => {
    process.on(signal, () => {
      app.mongoose.connections.forEach((connection, connectionIndex) => {
        connection.close((...args: any[]) => {
          console.log(`[Mongoose] Connection #${connectionIndex} closed by signal ${signal}`, ...args)
        })
      })
    })
  })
}
