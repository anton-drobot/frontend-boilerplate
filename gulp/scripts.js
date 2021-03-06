import path from 'path';
import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import stylish from 'eslint/lib/formatters/stylish';
import notifier from 'node-notifier';
import plumber from 'gulp-plumber';
import errorHandler from 'gulp-plumber-error-handler';
import statsLogger from 'webpack-stats-logger';

function runWebpack(watch = false) {
    const webpackConfig = {
        watch,
        bail: false,
        profile: true,
        entry: {
            app: './app/js/app.js',
            common: [
                'babel-polyfill'
            ]
        },
        output: {
            filename: '[name].min.js',
            pathinfo: false
        },
        devtool: (gutil.env.sourcemaps || !gutil.env.debug) ? '#source-map' : '#cheap-module-eval-source-map',
        debug: true,
        resolve: {
            modulesDirectories: [
                'node_modules'
            ],
            extensions: ['.js', '']
        },
        module: {
            preLoaders: [{
                test: /\.js$/,
                loader: 'source-map-loader'
            }],
            loaders: [{
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }, {
                test: /\.json$/,
                loader: 'json'
            }, {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }]
        },
        plugins: gutil.env.debug ? [] : [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common'
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                }
            })
        ],
        eslint: {
            configFile: path.join(__dirname, '../.eslintrc'),
            emitError: false,
            emitWarning: true,
            formatter: errors => {
                if (errors[0].messages) {
                    console.log(stylish(errors));
                    if (gutil.env.notify) {
                        const error = errors[0].messages.find(msg => msg.severity === 2);
                        if (error) {
                            notifier.notify({
                                title: error.message,
                                message: `${error.line}:${error.column} ${error.source.trim()}`
                            });
                        }
                    }
                }
            }
        }
    };

    return gulp
        .src('app/js/app.js')
        .pipe(plumber({errorHandler: errorHandler('Error in \'scripts\' task')}))
        .pipe(webpackStream(webpackConfig, null, statsLogger))
        .pipe(gulp.dest('dist/assets/js'));
}

gulp.task('scripts', () => {
    return runWebpack(false);
});

gulp.task('scripts:watch', () => {
    return runWebpack(true);
});
