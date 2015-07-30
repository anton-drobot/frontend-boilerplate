module.exports = {
    build: {
        html: 'build/',
        js: 'build/assets/js/',
        css: 'build/assets/css/',
        images: 'build/assets/images/',
        fonts: 'build/assets/fonts/',
        libraries: 'build/assets/libraries/',
        resources: 'build/'
    },
    app: {
        jade: 'app/jade/pages/*.jade',
        js: 'app/assets/js/**/*.js',
        scss: {
            src: 'app/assets/scss/main.scss',
            includePaths: 'app/assets/scss/',
            sprite: 'app/assets/scss/includes/'
        },
        images: {
            src: 'app/assets/images/**/*.{png,jpg,jpeg,gif}',
            svg: 'app/assets/images/**/*.svg',
            sprites: 'app/assets/images/sprites/**/*.png'
        },
        fonts: 'app/assets/fonts/**/*.*',
        libraries: 'app/assets/libraries/**/*.*',
        resources: 'app/resources/**/*.*'
    },
    watch: {
        jade: 'app/jade/pages/*.jade',
        js: 'app/assets/js/**/*.js',
        scss: 'app/assets/scss/**/*.scss',
        images: 'app/assets/images/**/*.*',
        fonts: 'app/assets/fonts/**/*.*',
        libraries: 'app/assets/libraries/**/*.*',
        resources: 'app/resources/**/*.*'
    },
    clean: './build/',
    zip: {
        src: 'build/**/*',
        to: 'build/'
    }
};
