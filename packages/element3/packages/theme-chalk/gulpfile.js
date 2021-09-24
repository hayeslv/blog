/*
 * @Author: Lvhz
 * @Date: 2021-09-23 17:15:23
 * @Description: Description
 */
'use strict'
const { series, src, dest } = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')

function compile() {
  return src('./src/*.scss')
    .pipe(sass.sync())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['ie > 9', 'last 2 versions'],
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(dest('./lib'))
}

function copyfont() {
  return src('./src/fonts/**').pipe(cssmin()).pipe(dest('./lib/fonts'))
}

exports.build = series(compile, copyfont)

