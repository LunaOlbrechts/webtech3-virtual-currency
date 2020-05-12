const { src, dest, watch } = require('gulp')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')

sass2css = function () {
    return src('./frontend/source/sass/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('frontend/dist/'))
} 

exports.default = function () {
    // here we can add other functions to be run in parrallell or series when default function is run
    watch('./frontend/source/sass/**/*.scss', sass2css) 
}