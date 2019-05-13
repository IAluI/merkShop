'use strict';

const gulp = require('gulp'), // подключаем Gulp
  browserSync = require('browser-sync'), // сервер для работы и автоматического обновления страниц
  rigger = require('gulp-rigger'), // модуль для импорта содержимого одного файла в другой
  sourcemaps = require('gulp-sourcemaps'), // модуль для генерации карты исходных файлов
  sass = require('gulp-sass'), // модуль для компиляции SASS (SCSS) в CSS
  autoprefixer = require('gulp-autoprefixer'), // модуль для автоматической установки автопрефиксов
  uglify = require('gulp-uglify'), // модуль для минимизации JavaScript
  cache = require('gulp-cache'), // модуль для кэширования
  imagemin = require('gulp-imagemin'), // плагин для сжатия PNG, JPEG, GIF и SVG изображений
  jpegrecompress = require('imagemin-jpeg-recompress'), // плагин для сжатия jpeg
  pngquant = require('imagemin-pngquant'), // плагин для сжатия png
  rimraf = require('gulp-rimraf'), // плагин для удаления файлов и каталогов
  gulpIf = require('gulp-if');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

const paths = {
  pages: {
    src: ["./src/pages/*.html", "!./src/pages/t_*.html"],
    dist: "./dist/pages/",
    watch: "./src/pages/*.html"
  },
  fonts: {
    src: "./src/fonts/**/*.{ttf,otf,woff,woff2}",
    dist: "./dist/fonts/",
    watch: "./src/fonts/**/*.{ttf,otf,woff,woff2}"
  },
  images: {
    src: "./src/img/**/*.{jpg,jpeg,png,gif,svg}",
    dist: "./dist/uploaded/images/",
    watch: "./src/img/**/*.{jpg,jpeg,png,gif,svg}"
  },
  scripts: {
    src: "./src/js/main.js",
    dist: "./dist/js/",
    watch: "./src/js/**/*.js"
  },
  styles: {
    src: ["./src/styles/main.scss", "./src/styles/site.scss"],
    dist: "./dist/styles/",
    watch: "./src/styles/**/*.scss"
  }
};

const autoprefixerList = [
  'Chrome >= 45',
  'Firefox ESR',
  'Edge >= 12',
  'Explorer >= 10',
  'iOS >= 9',
  'Safari >= 9',
  'Android >= 4.4',
  'Opera >= 30'
];

gulp.task('pages', function () {
  return gulp.src(paths.pages.src)
    .pipe(rigger()) // импорт вложений
    .pipe(gulp.dest(paths.pages.dist))
    .pipe(browserSync.reload({ stream: true })); // перезагрузим сервер
});

gulp.task('fonts', function () {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dist))
    .pipe(browserSync.reload({ stream: true })); // перезагрузим сервер
});

gulp.task('images', function () {
  /*gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dist))*/
  return gulp.src(paths.images.src) // путь с исходниками картинок
    .pipe(cache(imagemin([ // сжатие изображений
      imagemin.gifsicle({ interlaced: true }),
      jpegrecompress({
        progressive: true,
        max: 90,
        min: 80
      }),
      pngquant(),
      imagemin.svgo({ plugins: [{ removeViewBox: false }] })
    ])))
    .pipe(gulp.dest(paths.images.dist)) // выгрузка готовых файлов
    .pipe(browserSync.reload({ stream: true })); // перезагрузим сервер
});

gulp.task('scripts', function () {
  return gulp.src(paths.scripts.src)
    .pipe(rigger()) // импортируем все указанные файлы в main.js
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(gulpIf(isDevelopment, uglify()))
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulp.dest(paths.scripts.dist))
    .pipe(browserSync.reload({ stream: true })); // перезагрузим сервер
});

gulp.task('styles', function () {
  return gulp.src(paths.styles.src)
    .pipe(sass())
    .pipe(autoprefixer({ // добавим префиксы
      browsers: autoprefixerList
    }))
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(browserSync.reload({ stream: true })); // перезагрузим сервер
});

gulp.task('clean', function () {
  return gulp.src('/dist', { read: false, allowEmpty: true })
    .pipe(rimraf());
});

gulp.task('clearCache', function () {
  cache.clearAll();
});

gulp.task('webserver', function () {
  browserSync.init({
    server: "./dist/",
    port: 4000
  });

  gulp.watch(paths.pages.watch, gulp.series('pages'));
  gulp.watch(paths.styles.watch, gulp.series('styles'));
  gulp.watch(paths.scripts.watch, gulp.series('scripts'));
  gulp.watch(paths.images.watch, gulp.series('images'));
  gulp.watch(paths.fonts.watch, gulp.series('fonts'));
});

gulp.task('build',
  gulp.series('clean',
    gulp.parallel(
      'pages',
      'fonts',
      'images',
      'scripts',
      'styles'
    )
  )
);

gulp.task('default', gulp.series(
  'build',
  'webserver'
));