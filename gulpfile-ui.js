var gulp = require('gulp')
var selenium = require('selenium-standalone')
var webdriver = require('gulp-webdriver')


gulp.task('selenium', (done) => {
  selenium.install({logger: console.log}, () => {
    selenium.start((err, child) => {
      if (err) { done(err) }
      done()
    })
  })

  done()
})

gulp.task('ui', gulp.series('selenium', (done) => {
  return gulp.src('test/wdio.conf.js')
    .pipe(webdriver()).on('error', () => {
      done()
      process.exit(1)
    })
    .once('error', function () { // Explicit exit for gulp-mocha
      done()
      process.exit(1)
    })
    .once('end', function () {
      done()
      process.exit(0)
    })
}))

gulp.task('default', gulp.series('ui'))