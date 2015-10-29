var gulp = require('gulp'),
    watch = require('gulp-watch'),

    // jade
    jade = require('gulp-jade'),
    prettify = require('gulp-html-prettify'),
    // /jade

    // js
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    // /js

    // scss
    sass = require('gulp-sass'),
    bulkSass = require('gulp-sass-bulk-import'),
    autoprefixer = require('gulp-autoprefixer'),
    cmq = require('gulp-combine-media-queries'),
    minifyCss = require('gulp-minify-css'),
    csscomb = require('gulp-csscomb'),
    // /scss

    // images
    imagemin = require('gulp-imagemin'),
    // /images

    // svg & sprites
    spritesmith = require('gulp.spritesmith'),
    svg2png = require('gulp-svg2png'),
    svgSymbols = require('gulp-svg-symbols'),
    // /svg & sprites

    zip = require('gulp-zip'),
    del = require('del'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    plumber = require('gulp-plumber'),
    reload = browserSync.reload,
    paths = require('../paths'),
    config = require('../config'),
    errorHandler = require('../utils/errorHandler'),
    pkg = require('../../package.json');

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    del([paths.clean], cb);
});

gulp.task('jade:build', function () {
    return gulp.src(paths.app.jade)
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(jade())
        .pipe(prettify({
            race_style: 'expand',
            indent_size: 4,
            indent_char: ' ',
            indent_inner_html: true,
            preserve_newlines: true
        }))
        .pipe(gulp.dest(paths.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    return gulp.src(paths.app.js)
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('libraries:build', function() {
    return gulp.src(paths.app.libraries)
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(gulp.dest(paths.build.libraries))
});

gulp.task('scss:build', function () {
    return gulp.src(paths.app.scss.src)
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(bulkSass())
        .pipe(sass({
            includePaths: [paths.app.scss.includePaths],
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer(
            'Android >= ' + pkg.browsers.android,
            'Chrome >= ' + pkg.browsers.chrome,
            'Firefox >= ' + pkg.browsers.firefox,
            'Explorer >= ' + pkg.browsers.ie,
            'iOS >= ' + pkg.browsers.ios,
            'Opera >= ' + pkg.browsers.opera,
            'Safari >= ' + pkg.browsers.safari
        ))
        .pipe(cmq())
        .pipe(minifyCss())
        .pipe(csscomb())
        .pipe(gulp.dest(paths.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('sprite:build', function () {
    var spriteData = gulp.src(paths.app.images.sprites)
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(spritesmith({
            imgName: 'icons.png',
            cssName: '_icons.scss',
            imgPath: '../images/icons.png',
            cssFormat: 'scss',
            cssOpts: {
                selector: function (sprite) {
                    return 'icon--' + sprite.name;
                }
            }
        }));

    spriteData.img
        .pipe(imagemin({
            optimizationLevel: 3
        }))
        .pipe(gulp.dest(paths.build.images));

    spriteData.css
        .pipe(gulp.dest(paths.app.scss.sprite));

    return spriteData;
});

gulp.task('images:build', function () {
    return gulp.src([
        paths.app.images.src,
        '!' + paths.app.images.sprites
    ])
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            optimizationLevel: 3
        }))
        .pipe(gulp.dest(paths.build.images))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    return gulp.src(paths.app.fonts)
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(gulp.dest(paths.build.fonts));
});

gulp.task('resources:build', function() {
    return gulp.src(paths.app.resources)
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(gulp.dest(paths.build.resources));
});

gulp.task('zip', function () {
    return gulp.src(paths.zip.src)
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(zip('build.zip'))
        .pipe(gulp.dest(paths.zip.to));
});

gulp.task('build', ['clean'], function () {
    return gulp.start('jade:build', 'js:build', 'libraries:build', 'scss:build', 'images:build', 'fonts:build', 'resources:build');
});

gulp.task('watch', function() {
    watch([paths.watch.jade], function(event, cb) {
        gulp.start('jade:build');
    });
    watch([paths.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([paths.watch.libraries], function(event, cb) {
        gulp.start('libraries:build');
    });
    watch([paths.watch.scss], function(event, cb) {
        gulp.start('scss:build');
    });
    watch([paths.watch.images], function(event, cb) {
        gulp.start('images:build');
    });
    watch([paths.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([paths.watch.resources], function(event, cb) {
        gulp.start('resources:build');
    });
});

gulp.task('default', ['build', 'webserver', 'watch']);
