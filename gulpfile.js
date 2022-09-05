const gulp = require('gulp');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const webpack = require('webpack-stream');
const { exec } = require('child_process');

const webpackConfig = require('./webpack.config.js');

// Removes previous dist
gulp.task('clean', () => {
  return gulp.src('./dist', { allowEmpty: true })
    .pipe(clean());
});



// Initial ts compile
gulp.task('tsc', cb => {
  exec('tsc', () => cb());
});

// Watch ts files and recompile
gulp.task('tsc-w', () => {
  const tsc = exec('tsc -w --preserveWatchOutput --pretty');

  tsc.stdout.on('data', data => console.log(data));
  tsc.stderr.on('data', data => console.error(data));

  tsc.on('close', code => console.log(`tsc exited with code ${code}`));
});

// Start express
gulp.task('express', () => {
  const tsc = exec('nodemon --watch ./src/server ./src/server/server.ts');
  tsc.stdout.on('data', data => console.log(data));
  tsc.stderr.on('data', data => console.error(data));
});

// Build all
gulp.task('build', gulp.series(
  'clean',
  'tsc',
));


// Heroku copy root files
gulp.task('heroku-copy-root', () => {
  return gulp.src([
    './package.json',
    './package-lock.json',
    './Procfile',
    './dist/tsc/server.js',
    './dist/tsc/postgres.js',
  ])
    .pipe(gulp.dest('./deploy'));
});

// Heroku clean files
gulp.task('heroku-clean', () => {
  return gulp.src([
    './deploy/server.js',
    './deploy/Procfile',
    './deploy/package.json',
    './deploy/package-lock.json',
    './deploy/dist',
  ], { allowEmpty: true })
    .pipe(clean());
});

// Heroku deploy
gulp.task('deploy', gulp.series(
  'heroku-clean',
  'build',
  'heroku-copy-root',
));

// Run all (without express)
gulp.task('dev', gulp.series(
  'build',
  gulp.parallel(
    'tsc-w',
  ),
));

// Run all together
gulp.task('default', gulp.series(
  'build',
  gulp.parallel(
    'tsc-w',
    'express',
  ),
));
