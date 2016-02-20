import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gutil from 'gulp-util';
import gulpif from 'gulp-if';
import sass from 'gulp-sass';
import bulkSass from 'gulp-sass-bulk-import';
import autoprefixer from 'gulp-autoprefixer';
import cssComb from 'gulp-csscomb';
import gcmq from 'gulp-group-css-media-queries';
import nano from 'gulp-cssnano';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import errorHandler from 'gulp-plumber-error-handler';

gulp.task('styles', () => (
    gulp.src('app/scss/*.scss')
        .pipe(plumber({errorHandler: errorHandler('Error in \'styles\' task')}))
        .pipe(gulpif(gutil.env.debug, sourcemaps.init()))
        .pipe(bulkSass())
        .pipe(sass({
            includePaths: ['app/assets/scss/'],
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer())
        .pipe(cssComb())
        .pipe(gulpif(!gutil.env.debug, gcmq()))
        .pipe(gulpif(!gutil.env.debug, nano()))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulpif(gutil.env.debug, sourcemaps.write()))
        .pipe(gulp.dest('dist/assets/css'))
));
