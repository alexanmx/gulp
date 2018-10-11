var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
var fs = require('fs');
var path = require('path');
var less = require('gulp-less');

gulp.task('html', function () {
    return gulp.src('src/views/*.nunj')
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync('./src/json/' + path.basename(file.path, '.nunj') + '.json'));
    }))
    .pipe(nunjucksRender({
      path: 'src/views'
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('css', function(){
  return gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('build/css'))
});

gulp.task('default', [ 'html', 'css' ]);