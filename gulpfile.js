const gulp = require('gulp');
const server = require('gulp-develop-server');
const webpack = require('webpack-stream');

const ts = require('gulp-typescript');
const tsProject = ts.createProject("tsconfig.json");

gulp.task('build-js', ['compile-ts', 'bundle-js']);

gulp.task('compile-ts', () => {
  tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('build'));
});

gulp.task('bundle-js', () => {
  const webpacky = webpack({
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
        },
      }]
    },
    output: {
      filename: 'bundle.js',
    },
  });
  webpacky.on('error', (error) => console.log(error));
  gulp.src('./build/main.js')
    .pipe(webpacky)
    .pipe(gulp.dest('./public/'));
});

gulp.task('default', ['build-js', 'server:start'], () => {
  gulp.watch('./src/**/*.ts', ['build-js']);
});

gulp.task('server:start', () => {
  server.listen({path: './app.js'}, (error) => {
    if (error) {
      console.log(error);
    }
  });
});

gulp.task('server:restart', () => server.restart());
