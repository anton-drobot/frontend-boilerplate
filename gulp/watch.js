import gulp from 'gulp';
import runSequence from 'run-sequence';
import {reload} from 'browser-sync';
import watch from 'gulp-watch';

gulp.task('watch', () => {
    global.watch = true;

    watch(['app/blocks/icon/images/sprites/**/*.png'], () => runSequence('sprites'));
    watch(['app/blocks/icon/images/sprites**/*.svg'], () => runSequence('sprites-svg'));
    watch(['app/blocks/*/images/**/*.{png,jpg,jpeg,gif}', '!app/blocks/icon/images/sprites/**/*.png'], () => runSequence('images', reload));
    watch(['app/blocks/*/images/**/*.svg', '!app/blocks/icon/images/sprites/**/*.svg'], () => runSequence('images-svg', reload));
    watch(['app/scss/**/*.scss', 'app/blocks/**/*.scss'], () => runSequence('styles', () => reload('assets/css/app.min.css')));
    watch(['app/jade/**/*.jade', 'app/pages/**/*.jade', 'app/blocks/**/*.jade'], () => runSequence('jade', reload));
    watch(['app/resources/**/*'], () => runSequence('copy', reload));

    gulp.start('scripts:watch');
});
