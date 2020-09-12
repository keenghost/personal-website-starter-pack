export default {
  // TODO: token_secret
  tokenSecret: '[any-characters-better-32-bit]',
  // TODO: mongodb_config
  mongodb: {
    pwsp: {
      uri: 'mongodb://[your-internal-mongodb-domain]:[port]/[database-name]',
      publicUri: 'mongodb://[your-public-mongodb-domain]:[port]/[database-name]',
      username: '[username]',
      password: '[password]',
    },
  },
  // TODO: qiniu_config
  qiniu: {
    accessKey: '[your-qiniu-access-key]',
    secretKey: '[your-qiniu-secret-key]',
    bucket: '[your-qiniu-bucket-name]',
    origin: '[your-static-domain]',
    uploadURL: 'https://up-z2.qiniup.com', // z2 may not fit you
    prefix: '[upload-path-prefix]',
  },
}
