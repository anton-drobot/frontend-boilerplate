import fs from 'fs';
import glob from 'glob';
import gulp from 'gulp';
import gutil from 'gulp-util';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import jade from 'gulp-jade';
import prettify from 'gulp-jsbeautifier';
import inheritance from 'gulp-jade-inheritance';
import cached from 'gulp-cached';
import filter from 'gulp-filter';
import rename from 'gulp-rename';
import errorHandler from 'gulp-plumber-error-handler';

const data = {
    jv0: 'javascript:void(0);',
    timestamp: Date.now()
};

gulp.task('jade', () => (
    gulp.src('app/**/*.jade')
        .pipe(plumber({errorHandler: errorHandler('Error in \'jade\' task')}))
        .pipe(cached('jade'))
        .pipe(gulpif(global.watch, inheritance({basedir: 'app'})))
        .pipe(filter(file => /app[\\\/]pages/.test(file.path)))
        .pipe(jade({basedir: 'app', data}))
        .pipe(gulpif(gutil.env.prettify !== false, prettify({
            braceStyle: 'expand',
            indentWithTabs: false,
            indentSize: 4,
            indentInnerHtml: true,
            preserveNewlines: true,
            endWithNewline: true,
            wrapLineLength: 120,
            maxPreserveNewlines: 50,
            wrapAttributesIndentSize: 1,
            unformatted: ['use']
        })))
        .pipe(rename({dirname: '.'}))
        .pipe(gulp.dest('dist'))
));

gulp.task('jade:blocks', () => {
    glob('app/blocks/**/*.jade', function (er, files) {
        files = files.map((file) => (
            'include ../..' + file.substr(3)
        ));

        fs.writeFile('app/jade/partials/_blocks.jade', files.join('\r\n'));
    });
});
