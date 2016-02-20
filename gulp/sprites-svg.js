import gulp from 'gulp';
//import svg2png from 'svg2png';
import svgSymbols from 'gulp-svg-symbols';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import errorHandler from 'gulp-plumber-error-handler';
import fs from 'fs';
import merge from 'merge-stream';

gulp.task('sprites-svg', () => {
    const isSvg = fp => !!/\.svg/i.test(fp);
    const spritesDirFiles = fs.readdirSync('app/blocks/icon/images/sprites/');
    const spritesDirSvgFiles = spritesDirFiles.filter(isSvg);
    const hasIconsInSpritesDir = !!spritesDirSvgFiles.length;

    if (!hasIconsInSpritesDir) {
        return;
    }

    const stream = gulp.src('app/blocks/icon/images/sprites/*.svg')
        .pipe(plumber({ errorHandler: errorHandler('Error in \'sprites-svg\' task') }));

    // TODO: svg2png

    const svgSymbolsStream = stream
        .pipe(svgSymbols({
            title: false,
            id: 'sprite--%f',
            className: '.sprite--%f'
        }))
        .pipe(gulpif(/\.scss$/, gulp.dest('app/blocks/icon')))
        .pipe(gulpif(/\.svg$/, rename('sprites.svg')))
        .pipe(gulpif(/\.svg$/, gulp.dest('app/blocks/icon/images/')));

    return merge(svgSymbolsStream);
});
