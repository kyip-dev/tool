var gulp  = require('gulp');
var fs    = require('fs');
var es    = require('event-stream');
var pkg   = require('./package.json');

var jshint  = require('gulp-jshint');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var rename  = require('gulp-rename');
var replace = require('gulp-replace');
var header  = require('gulp-header');

var banner = ['<!--',
  ' * Copyright (c) <%= new Date().getFullYear() %> <%= name %>',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @license <%= pkg.license %>',
  ' -->',
  ''].join('\n');

gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  return gulp.src([
      './js/qr_code.js',
      './js/hash.js',
      './js/random_str.js',
      './js/base64.js',
      './js/handlebars.js',
      './js/regex_cap.js',
      './js/markdown.js'
    ]
  )
  .pipe(concat('tool.js'))
  .pipe(gulp.dest('dist'))
  .pipe(rename('tool.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist'));
});

gulp.task('html', function() {
  var normal = gulp.src('./html/tool.html')
    .pipe(header(banner, { pkg: pkg, name: 'Franz Wong'}))
    .pipe(replace(/<script src="tool.js"><\/script>/, function(s) {
      var script = fs.readFileSync('./dist/tool.js', 'utf8');
      return '<script>\n' + script + '\n</script>';
    }))
    .pipe(gulp.dest('dist'));

  var min = gulp.src('./html/tool.html')
    .pipe(header(banner, { pkg: pkg, name: 'Franz Wong'}))
    .pipe(replace(/<script src="tool.js"><\/script>/, function(s) {
      var script = fs.readFileSync('./dist/tool.min.js', 'utf8');
      return '<script>\n' + script + '\n</script>';
    }))
    .pipe(rename('tool.min.html'))
    .pipe(gulp.dest('dist'));

  return es.merge(normal, min);
});

gulp.task('default', ['lint', 'scripts', 'html']);