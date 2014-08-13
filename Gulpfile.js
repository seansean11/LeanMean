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
// Dev task
gulp.task('dev', ['views', 'lint', 'styles', 'images', 'usemin'], function() {
  // Start live reload
  refresh.listen(livereloadport);
  // Run the watch task, to keep taps on changes
  gulp.run('watch');
});

// JSHint task
gulp.task('lint', function() {
  gulp.src(['app/scripts/**/*.js', 'app/scripts/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// Styles task
gulp.task('styles', function() {
  gulp.src('app/styles/scss/*.scss')
  // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
  .pipe(sass({onError: function(e) { console.log(e); } }))
  // Optionally add autoprefixer
  .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
  // These last two should look familiar now :)
  .pipe(gulp.dest('app/styles/'))
  .pipe(refresh())
  .pipe(notify({ message: 'Styles task complete' }));
});

// Views task
gulp.task('views', function() {
  // Get our index.html
  gulp.src('app/index.html')
  // And put it in the dist folder
  .pipe(refresh());

  gulp.src('app/views/**/*')
  .pipe(gulp.dest('dist/views/'))
  .pipe(refresh())
  .pipe(notify({ message: 'Views task complete' }));
});

gulp.task('usemin', function() {
  gulp.src('app/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      html: [minifyHtml({empty: true})],
      js: [ngAnnotate(), uglify(), rev()]
    }))
    .pipe(gulp.dest('dist/'));
});

// Images
gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('watch', ['lint'], function() {
  // Watch our sass files
  gulp.watch(['app/styles/**/*.scss'], ['styles', 'usemin']);
  gulp.watch(['app/views/**/*.html'], ['views', 'usemin']);
  gulp.watch(['app/scripts/**/*.js'], ['usemin']);
  gulp.watch(['app/images/**/*'], ['images']);
});