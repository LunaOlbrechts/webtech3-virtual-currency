const { src, dest } = require('gulp');
const minify = require('gulp-minify');

function jsMinify (){
    return src(['./frontend/js/*.js'])
    .pipe(minify({
      noSource: true
    }))
    .pipe(dest('dist/app.js'))
}

exports.jsMinify = jsMinify;
