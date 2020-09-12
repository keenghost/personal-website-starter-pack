import path from 'path'
import { EggAppConfig, PowerPartial, EggAppInfo } from 'egg'
import envConfig from 'config'

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

interface StaticConfig {
  dir: ({ prefix: string, dir: string })[],
}

export default (appInfo: EggAppInfo): any => {
  const config = {
    keys: '4Gbk@uG60&n1YhPW^$9HL7y2X1j*L$Ez',
    proxy: true,
    view: {
      root: path.join(appInfo.baseDir, 'build'),
      mapping: {
        '.html': 'nunjucks',
      },
    },
    static: {
      dir: [
        {
          prefix: '/public',
          dir: path.join(appInfo.baseDir, '/app/public'),
        },
        // TODO: upload_to_cdn if you dont use asset cdn, uncomment this
        // {
        //   prefix: '/build',
        //   dir: path.join(appInfo.baseDir, '/build'),
        // },
      ],
    },
    session: {
      key: 'pwsp-session',
      maxAge: 1000 * 60 * 60 * 24 * 30,
    },
    mongoose: {
      clients: {
        pwsp: {
          options: {
            user: envConfig.get('mongodb.pwsp.username'),
            pass: envConfig.get('mongodb.pwsp.password'),
          },
          url: envConfig.get('mongodb.pwsp.uri'),
        },
      },
    },
    multipart: {
      mode: 'file',
    },
    security: {
      csrf: {
        enable: false,
      },
    },
    cluster: {
      listen: {
        port: 6001,
      },
    },
    jwt: {
      secret: envConfig.get('tokenSecret'),
    },
    middleware: [
      'apiError',
      'token',
    ],
    apiError: {
      match: '/api',
    },
    token: {
      match: '/api',
    },
  } as PowerPartial<Overwrite<EggAppConfig, { static: StaticConfig }>>

  return config
}
