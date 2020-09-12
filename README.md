# Personal Website Starter Pack
> a project init for personal website. may be only for frontenders.

## Project Technology Listing
* Typescript
* Egg
* MongoDB
* React
* Mobx
* Less
* CDN - Qiniu

## Getting Started
> Assuming that you know about `nodejs`, familiar with `npm` usage.
> `mongodb` is the pre-environment which can be only done by yourself. Learn to set up a mongodb server first.

### Step 1. Clone the repositry, and install dependencies
```
git clone git@github.com:keenghost/personal-website-starter-pack.git
cd personal-website-starter-pack
npm i
```

### Step 2. Finish all TODO: Tag

#### token_config
```
/* default.ts */
tokenSecret: '[any-characters-better-32-bit]'
```
`tokenSecure` is the secret key for `jwt` encoding. 32 bit any characters.

#### mongodb_config
```
/* default.ts */
mongodb: {
  pwsp: {
    uri: 'mongodb://[your-internal-mongodb-domain]:[port]/[database-name]',
    publicUri: 'mongodb://[your-public-mongodb-domain]:[port]/[database-name]',
    username: '[username]',
    password: '[password]',
  },
}
```
* `publicUri`: mongodb server address that can be access from the Internet. this field will be used when running locally.
* `uri`: mongodb server address that can be only access from the internal network. this field will be used when project is deployed to the server.
* `username`: mongodb username.
* `password`: mongodb password.
> `pwsp` is just a name, you can rename it to any. note that all the reference about mongodb usage should be changed.

#### qiniu_config
> `qiniu` is a cdn in China. you could easliy change to `aws` or other service provider when you are in code.
```
/* default.ts */
qiniu: {
  accessKey: '[your-qiniu-access-key]',
  secretKey: '[your-qiniu-secret-key]',
  bucket: '[your-qiniu-bucket-name]',
  origin: '[your-static-domain]',
  uploadURL: 'https://up-z2.qiniup.com', // z2 may not fit you
  prefix: '[upload-path-prefix]',
}
```
* `accessKey`: given by service provider.
* `secretKey`: given by service provider.
* `bucket`: your bucket that you created on qiniu.
* `origin`: your own domain which uses CName redirecting to qiniu.
* `uploadUrl`: `up.qiniu.com` is outdated, you should check your bucket's upload zone in your qiniu console.
* `prefix`: path to your domain root. all cdn files will be put here.

#### ant_design_config
```
/* webpack.config.prod.js */
// const tsImportPlugin = require('ts-import-plugin')

// getCustomTransformers: () => ({
  // before: [tsImportPlugin({
  //   libraryName: 'antd',
  //   libraryDirectory: 'es',
  //   style: 'css',
  // })],
// })
```
if you want to use ant design (really fantastic ui library) later on, just uncomment the lines above.

#### upload_to_cdn
```
/* gulpfile.js */
uploadQiniuCdnAssets,
deleteQiniuCdnAssets,

// webpack.config.prod.js
publicPath: '[your-cdn-path-prefix-where-you-put-your-built-files]',

/* config.default.ts */
// {
//   prefix: '/build',
//   dir: path.join(appInfo.baseDir, '/build'),
// },
```
built files will upload to cdn for providing better service. this is the default option.
if you dont know what this is or you just want the files provided from your own host, just toggle the comments above.

#### node_docker_image
```
/* Dockerfile */
FROM xxx.aliyuncs.com/your-repositry/node-12.18.3
```
set your node image before build. `dumb-init` could be removed if not needed, otherwise you should install it to your node image first.

### Step 3. Start and debug
```
npm run dev
```
