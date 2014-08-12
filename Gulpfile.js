'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    jshint = require('gulp-jshint'),
    clean = require('gulp-clean'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    rev = require('gulp-rev'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

// Modules for webserver and livereload
var refresh = require('gulp-livereload'),
    express = require('express'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 3000;

// Set up an express server (not starting it yet)
var server = express();
// Add live reload
server.use(livereload({port: livereloadport}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/*', function(req, res) {
  res.sendfile('index.html', { root: 'dist' });
});

// Dev task
gulp.task('dev', ['views', 'lint', 'styles', 'usemin'], function() {
  // Start webserver
  server.listen(serverport);
  // Start live reload
  refresh.listen(livereloadport);
  // Run the watch task, to keep taps on changes
  gulp.run('watch');
});

// JSHint task
gulp.task('lint', function() {
  gulp.src('app/scripts/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(notify({ message: 'Lint task complete' }));
});

// Styles task
gulp.task('styles', function() {
  gulp.src('app/styles/*.scss')
  // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
  .pipe(sass({onError: function(e) { console.log(e); } }))
  // Optionally add autoprefixer
  .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
  // These last two should look familiar now :)
  .pipe(gulp.dest('dist/css/'))
  .pipe(refresh())
  .pipe(notify({ message: 'Styles task complete' }));
});

// Views task
gulp.task('views', function() {
  // Get our index.html
  gulp.src('app/index.html')
  // And put it in the dist folder
  .pipe(refresh());

  // Any other view files from app/views
  gulp.src('app/views/**/*')
  // Will be put in the dist/views folder
  .pipe(gulp.dest('dist/views/'))
  .pipe(refresh())
  .pipe(notify({ message: 'Views task complete' }));
});

gulp.task('usemin', function() {
  gulp.src('app/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      html: [minifyHtml({empty: true})],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(notify({ message: 'Use min task complete' }));
});

gulp.task('watch', ['lint'], function() {
  // Watch our scripts, and when they change run lint and browserify
  gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'],[
    'lint'
  ]);
  // Watch our sass files
  gulp.watch(['app/styles/**/*.scss'], [
    'styles'
  ]);

  gulp.watch(['app/**/*.html'], [
    'views'
  ]);
});