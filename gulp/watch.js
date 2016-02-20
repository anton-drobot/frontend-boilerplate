import gulp from 'gulp';
import runSequence from 'run-sequence';
import {reload} from 'browser-sync';
import watch from 'gulp-watch';

gulp.task('watch', () => {
    global.watch = true;

    watch(['app/blocks/icon/images/**/*.png'], () => runSequence('sprites'));
    watch(['app/blocks/icon/images/**/*.svg'], () => runSequence('sprites-svg', reload));
    watch(['app/scss/**/*.scss', 'app/blocks/**/*.scss'], () => runSequence('styles', () => reload('assets/css/app.min.css')));
    watch(['app/pages/**/*.jade', 'app/blocks/**/*.jade'], () => runSequence('jade', reload));
    watch(['app/resources/**/*'], () => runSequence('copy', reload));

    gulp.start('scripts:watch');
});
