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
        'jade:blocks',
        'styles:dependencies',
        'images:dependencies',
        'jade',
        'server',
        'watch'
    )
));

gulp.task('build', ['env'], () => (
    runSequence(
        'clean',
        'jade:blocks',
        'styles:dependencies',
        'images:dependencies',
        'jade',
        'scripts',
        'copy'
    )
));
