import runSequence from 'run-sequence';
import gulp from 'gulp';

gulp.task('styles:dependencies', () => (
    runSequence(
        'sprites-svg',
        'sprites',
        'styles'
    )
));

gulp.task('images:dependencies', () => (
    runSequence(
        'images',
        'images-svg'
    )
));

gulp.task('default', () => (
    runSequence(
        'clean',
        [
            'styles:dependencies',
            'jade'
        ],
        'images:dependencies',
        'server',
        'watch'
    )
));

gulp.task('build', () => (
    runSequence(
        'clean',
        [
            'styles:dependencies',
            'jade'
        ],
        'images:dependencies',
        'scripts',
        'copy'
    )
    /*gulp.start(
        'clean',
        'styles:dependencies',
        'jade',
        'images:dependencies',
        'scripts',
        'copy'
    )*/
));
