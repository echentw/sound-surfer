const gulp = require('gulp');
const server = require('gulp-develop-server');
const webpack = require('webpack-stream');

const ts = require('gulp-typescript');
const tsProject = ts.createProject("tsconfig.json");

function compileTS() {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('build'));
}

function bundleJS() {
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
  return gulp.src('./build/main.js')
    .pipe(webpacky)
    .pipe(gulp.dest('./public/'));
}

function startServer() {
  server.listen({path: './app.js'}, (error) => {
    if (error) {
      console.log(error);
    }
  });
}

function restartServer() {
  server.restart();
}

gulp.task('build', gulp.series(compileTS, bundleJS));

gulp.task('watch', () => {
  gulp.watch('./src/ts/**/*.ts', gulp.series('build'));
});

gulp.task('default', gulp.series('build', gulp.parallel(startServer, 'watch')));
