const { src, dest } = require('gulp');
const minify = require('gulp-minify');

exports.minifyJs = function() {
    return src(['./frontend/js/*.js'])
      .pipe(minify({
        noSource: true
      }))
      .pipe(dest('dist/minifyjs'))
  };
