const { src, dest, watch } = require('gulp');
const minify = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

jsMinify = function () {
    return src(['./frontend/js/*.js'])
    .pipe(minify({
      noSource: true
    }))
    .pipe(dest('dist/app.js'))
}

sass2css = function () {
  return src('./frontend/source/sass/app.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(dest('frontend/dist/'))
} 

cleancssfile = function () {
  return src("./frontend/dist/app.css")
  .pipe(cleanCSS())
  .pipe(dest('dist/css/'));
}


exports.default = function () {
  watch('./frontend/source/sass/**/*.scss', sass2css) 
  watch('./frontend/js/*.js', jsMinify)
  watch('./frontend/dist/*.css', cleancssfile)
}
