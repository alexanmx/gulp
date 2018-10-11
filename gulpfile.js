var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
var fs = require('fs');
var path = require('path');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');

gulp.task('html', function () {
    return gulp.src('templates/*.tmpl')
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync('./templates/' + path.basename(file.path, '.tmpl') + '.json'));
    }))
    .pipe(nunjucksRender({
      path: 'templates'
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('css', function(){
  return gulp.src('templates/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'))
});

gulp.task('default', [ 'html', 'css' ]);