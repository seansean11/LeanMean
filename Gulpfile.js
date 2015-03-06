'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    jshint = require('gulp-jshint'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    ngAnnotate = require('gulp-ng-annotate'),
    rev = require('gulp-rev'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

// Modules for webserver and livereload
var refresh = require('gulp-livereload'),
    livereload = require('connect-livereload'),
    livereloadport = 35729;
livereload({port: livereloadport});

// The main, all-inclusive task
gulp.task('dev', ['views', 'lint', 'styles', 'images', 'usemin', 'fonts'], function() {
  refresh.listen(livereloadport);
  gulp.run('watch');
});

// JSHint task
gulp.task('lint', function() {
  gulp.src(['client/scripts/**/*.js', 'client/scripts/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// Styles task
gulp.task('styles', function() {
  gulp.src('client/styles/scss/*.scss')
  .pipe(sass({onError: function(e) { console.log(e); } }))
  .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
  .pipe(gulp.dest('client/styles/'))
  .pipe(refresh())
  .pipe(notify({ message: 'Styles task complete' }));
});

// Views task
gulp.task('views', function() {
  // Index file
  gulp.src('client/index.html')
  .pipe(refresh());
  // View files
  gulp.src('client/views/**/*')
  .pipe(gulp.dest('dist/views/'))
  .pipe(refresh())
  .pipe(notify({ message: 'Views task complete' }));
});

// Usemin task
gulp.task('usemin', function() {
  gulp.src('client/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      html: [minifyHtml({empty: true})],
      js: [ngAnnotate(), uglify(), rev()]
    }))
    .pipe(gulp.dest('dist/'));
});

// Images task
gulp.task('images', function() {
  return gulp.src('client/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Copy
gulp.task('fonts', function(){
  gulp.src('client/fonts/**')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch', ['lint'], function() {
  // Watch our sass files
  gulp.watch(['client/styles/**/*.scss'], ['styles', 'usemin']);
  gulp.watch(['client/**/*.html'], ['views', 'usemin']);
  gulp.watch(['client/scripts/**/*.js'], ['usemin']);
  gulp.watch(['client/images/**/*'], ['images']);
  gulp.watch(['client/fonts/**/*'], ['fonts']);
});