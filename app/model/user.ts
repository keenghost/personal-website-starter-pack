import { Application, MongooseSingleton } from 'egg'

export default (app: Application) => {
  const Schema = app.mongoose.Schema
  const mongooseDB = app.mongooseDB as MongooseSingleton
  const pwsp = mongooseDB.get('pwsp')
  const UserSchema = new Schema({
    name: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
      index: true,
    },
  }, {
    collection: 'user',
    timestamps: {
      createdAt: 'createTime',
      updatedAt: 'modifyTime',
    },
  })

  return pwsp.model('User', UserSchema)
}
