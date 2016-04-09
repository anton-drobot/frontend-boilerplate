import gulp from 'gulp';
import plumber from 'gulp-plumber';
import spritesmith from 'gulp.spritesmith';
import merge from 'merge-stream';
import path from 'path';
import errorHandler from 'gulp-plumber-error-handler';

gulp.task('sprites', () => {
    const spriteData = gulp.src(['app/blocks/icon/images/sprites/**/*.png'])
        .pipe(plumber({errorHandler: errorHandler('Error in \'sprites\' task')}))
        .pipe(spritesmith({
            imgName: 'sprites.png',
            imgPath: '../images/icon/sprites.png',
            cssName: '_sprites-data.scss',
            cssFormat: 'scss',
            cssVarMap: function (sprite) {
                sprite.name = 'sprite-' + sprite.name;
            }
        }));

    const imgStream = spriteData.img.pipe(gulp.dest('app/blocks/icon/images'));
    const styleStream = spriteData.css.pipe(gulp.dest('app/scss/system'));

    return merge(imgStream, styleStream);
});
