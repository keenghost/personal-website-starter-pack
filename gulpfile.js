const del = require('del')
const config = require('config')
const childProcess = require('child_process')
const gulp = require('gulp')
const gulpTypescript = require('gulp-typescript')
const qiniu = require('gulp-upto-qiniu')

const childProcesses = []

function spawn(...args) {
  const cp = childProcess.spawn(...args)
  childProcesses.push(cp)

  return cp
}

process.on('SIGINT', () => {
  childProcesses.forEach((cp) => {
    try {
      cp.kill()
    } catch {}
  })
})

function deleteDist() {
  return del([
    'dist',
  ])
}

function watchEgg() {
  return spawn('egg-bin', ['dev', '--dts'], { stdio: 'inherit', shell: true })
}

function watchClient() {
  return spawn('webpack-dev-server', ['--config', 'client/webpack.config.dev.js'], { stdio: 'inherit', shell: true })
}

function checkEts() {
  return childProcess.spawn('ets', [], { stdio: 'inherit', shell: true })
}

function buildEgg() {
  return gulp
    .src([
      '**/*.ts',
      '!node_modules/**/*',
      '!client/**/*',
    ])
    .pipe(gulpTypescript.createProject('tsconfig.json')())
    .pipe(gulp.dest('./dist'))
}

function buildClient() {
  return childProcess.spawn('webpack', ['--config', 'client/webpack.config.prod.js'], { stdio: 'inherit', shell: true })
}

function copyAssets() {
  return gulp.src([
    'app/**/*',
    '!app/**/*.ts',
    'config/**/*',
    '!config/**/*.ts',
    'package.json',
  ], { base: '.' }).pipe(gulp.dest('./dist'))
}

function uploadQiniuCdnAssets() {
  return gulp.src([
    'dist/build/**/*',
  ]).pipe(qiniu({
    qiniu: {
      accessKey: config.get('qiniu.accessKey'),
      secretKey: config.get('qiniu.secretKey'),
      bucket: config.get('qiniu.bucket'),
      origin: config.get('qiniu.origin'),
      uploadURL: config.get('qiniu.uploadURL'),
    },
    prefix: config.get('qiniu.prefix'),
  }))
}

function deleteQiniuCdnAssets() {
  return del([
    'dist/build/**/*',
    '!dist/build/index.html',
  ])
}

gulp.task('dev', gulp.parallel(
  watchEgg,
  watchClient,
))

gulp.task('build', gulp.series(
  deleteDist,
  gulp.series(
    gulp.parallel(
      gulp.series(
        checkEts,
        buildEgg,
      ),
      buildClient,
      copyAssets,
    ),
    // TODO: upload_to_cdn if you dont use asset cdn, comment the two lines below
    uploadQiniuCdnAssets,
    deleteQiniuCdnAssets,
  ),
))
