const gulp = require('gulp');
const purify = require('gulp-purifycss');

gulp.task('purifyCSS', () => {
  return gulp.src('./dist/mobile/styles.*.css')
    .pipe(
      purify(
        ['./src/app/**/*.ts', './src/app/**/*.html'],
        {
          info: true, // Outputs reduction information 
          minify: true, // Minifies the files after reduction
          rejected: false, // Logs the CSS rules that were removed
          whitelist: ['*transition*', '*dimmer*'] // Ignored css classes
        }
      ),
    )
    .pipe(gulp.dest('./dist/mobile/'));
});