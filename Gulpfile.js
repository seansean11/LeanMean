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
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    karma = require('karma').Server;

// Serve dev environment
gulp.task('serve', ['styles:watch'], function() {
  browserSync({
    files: [
      './client/index.html',
      './client/scripts/**/*.js',
      './client/views/**/*.html',
      './client/styles/main.css',
      './client/images/*'
    ],
    proxy: 'localhost:8080'
  });
});

// Build production app
gulp.task('build', ['views', 'lint', 'styles', 'images', 'usemin']);

// Set up Karma tests
gulp.task('test', function (done) {
  new karma({
    configFile: __dirname + '/karma.conf.js',
  }, done).start();
});

// JSHint task
gulp.task('lint', function() {
  gulp.src('./client/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Styles task
gulp.task('styles', function() {
  gulp.src('./client/styles/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
    .pipe(gulp.dest('./client/styles/'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Watch for SASS changes
gulp.task('styles:watch', function () {
  gulp.watch('./client/styles/**/*.scss', ['styles']);
});

// Minify views
gulp.task('views', function() {
  gulp.src('./client/views/**/*')
  .pipe(gulp.dest('./dist/views/'))
  .pipe(notify({ message: 'Views task complete' }));
});

// Minify assets
gulp.task('usemin', function() {
  gulp.src('./client/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      html: [minifyHtml({empty: true})],
      js: [ngAnnotate(), uglify(), rev()]
    }))
    .pipe(gulp.dest('dist/'));
});

// Minify images
gulp.task('images', function() {
  return gulp.src('./client/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('./dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});