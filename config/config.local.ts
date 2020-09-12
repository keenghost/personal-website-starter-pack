import { PowerPartial, EggAppConfig } from 'egg'
import envConfig from 'config'

export default (): any => {
  const config = {
    mongoose: {
      clients: {
        pwsp: {
          url: envConfig.get('mongodb.pwsp.publicUri'),
        },
      },
    },
  } as PowerPartial<EggAppConfig>

  return config
}
