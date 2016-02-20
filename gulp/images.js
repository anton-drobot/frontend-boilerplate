import gulp from 'gulp';
import plumber from 'gulp-plumber';
import errorHandler from 'gulp-plumber-error-handler';
import imageMin from 'gulp-imagemin';
import flatten from 'gulp-flatten';

gulp.task('images', () => (
    gulp.src(['app/blocks/*/images/**/*.{png,jpg,jpeg,gif}', '!app/blocks/icon/images/sprites/**/*.png'])
        .pipe(plumber({errorHandler: errorHandler('Error in \'images\' task')}))
        .pipe(imageMin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(flatten({includeParents: 1}))
        .pipe(gulp.dest('dist/assets/images'))
));
