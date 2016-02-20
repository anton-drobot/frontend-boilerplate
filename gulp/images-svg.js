import gulp from 'gulp';
import plumber from 'gulp-plumber';
import errorHandler from 'gulp-plumber-error-handler';
import flatten from 'gulp-flatten';

gulp.task('images-svg', () => (
    gulp.src(['app/blocks/*/images/**/*.svg', '!app/blocks/icon/images/sprites/**/*.svg'])
        .pipe(plumber({errorHandler: errorHandler('Error in \'images-svg\' task')}))
        .pipe(flatten({includeParents: 1}))
        .pipe(gulp.dest('dist/assets/images'))
));
