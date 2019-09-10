'use strict';

const gulp = require('gulp');
const fs = require("fs");

//
const tap = require('gulp-tap');
// Модуль для замены текста в файлах
const replace = require('gulp-replace');
// Модуль для переименования фалов
const rename = require("gulp-rename");
// Модуль для условного управления потоком
const gulpIf = require('gulp-if');
// плагин для удаления файлов и каталогов
const del = require('del');
// модуль для кэширования
const cache = require('gulp-cache');
// сервер для работы и автоматического обновления страниц
const browserSync = require('browser-sync').create();
// модуль для импорта содержимого одного файла в другой
const rigger = require('gulp-rigger');
// html препроцессор
const pug = require('gulp-pug');
// модуль для генерации карты исходных файлов
const sourcemaps = require('gulp-sourcemaps');
// модуль для компиляции SASS (SCSS) в CSS
const sass = require('gulp-sass');
// модуль для автоматической установки автопрефиксов
const autoprefixer = require('gulp-autoprefixer');
// модуль для минификации JavaScript
const uglify = require('gulp-uglify');
// модуль для минификации css
const cssmin = require('gulp-minify-css')
// плагин для сжатия PNG, JPEG, GIF и SVG изображений
const imagemin = require('gulp-imagemin');
// плагин для сжатия jpeg
const jpegrecompress = require('imagemin-jpeg-recompress');
// плагин для сжатия png
const pngquant = require('imagemin-pngquant');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

const paths = {
  pages: {
    src: ["./src/pages/*.html", "!./src/pages/t_*.html"],
    dist: "./dist/pages/",
    watch: "./src/pages/*.html"
  },
  pugTemplate: {
    src: ["./src/pages/dt_*.pug"],
    pageDir: "./src/pages/",
    dist: "./src/pages/",
    watch: "./src/pages/dt_*.pug"
  },
  pug: {
    src: ["./src/pages/*.pug", "!./src/pages/{t,dt}_*.pug"],
    dist: "./dist/pages/",
    watch: ["./src/pages/p_*.pug", "./src/components/**/*.pug"]
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
    src: ["./src/js/libraries.js", "./src/js/main.js", "./src/js/p_*.js"],
    dist: "./dist/js/",
    watch: "./src/js/**/*.js"
  },
  styles: {
    src: ["./src/styles/libraries.scss", "./src/styles/main.scss", "./src/styles/site.scss", "./src/styles/p_*.scss"],
    dist: "./dist/styles/",
    watch: ["./src/styles/**/*.scss", "./src/components/**/*.scss"]
  }
};

gulp.task('clearCache', () => {
  cache.clearAll();
});

gulp.task('clean', () => {
  return del([
    './dist/**/*'
  ]);
});

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

gulp.task('pages', () => {
  return gulp.src(paths.pages.src)
    .pipe(rigger())
    .pipe(gulp.dest(paths.pages.dist))
    .pipe(browserSync.stream());
});

gulp.task('pugTemplate', () => {
  // Получаем массив содержащий имена pug-файлов без расширения для которых необходимо реализовать динамический include
  const pageList = fs.readdirSync(paths.pugTemplate.pageDir);
  let pugList = [];
  pageList.forEach((item, i, arr) => {
    if (/^p_.*\.pug/.test(item)) {
      pugList.push(item.substr(0, item.length - 4));
    }
  });
  return gulp.src(paths.pugTemplate.src)
    .pipe(replace(/^(\s*)include=[ ](.*?(\$nameMask\$)\..*?)$/gm, (str, indent, dynPath, nameMask, offset, s) => {
      let dynInclude = indent + 'case _nameMask_';
      pugList.forEach((item, i, arr) => {
        dynInclude += indent + "  when '" + item + "'";
        dynInclude += indent + "    include " + dynPath.replace(nameMask, item);
      });
      return dynInclude;
    }))
    .pipe(rename(function (path) {
      path.basename = path.basename.substr(1);
    }))
    .pipe(gulp.dest(paths.pugTemplate.dist));
});

gulp.task('pug', () => {
  return gulp.src(paths.pug.src)
    .pipe(tap((file, t) => {
      const nameMask = file.path.match(/.*\\(.*?).pug$/)[1];
      t.through(pug, [{
        pretty: true,
        locals: {
          _isDevelopment_: isDevelopment,
          _nameMask_: nameMask
        }
      }]);
    }))
    .pipe(gulp.dest(paths.pug.dist))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('fonts', () => {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dist))
    .pipe(browserSync.stream());
});

gulp.task('images', () => {
  return gulp.src(paths.images.src)
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      jpegrecompress({
        loops: 5,
        min: 70,
        max: 75,
        quality: 'medium'
      }),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {cleanupIDs: false}
        ]
      }),
      imagemin.optipng({optimizationLevel: 3}),
      pngquant({quality: '70-75', speed: 5})
    ]))
    .pipe(gulp.dest(paths.images.dist))
    .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
  return gulp.src(paths.scripts.src)
    .pipe(rigger())
    //.pipe(gulpIf(isDevelopment, sourcemaps.init()))
    //.pipe(gulpIf(!isDevelopment, uglify()))
    //.pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulp.dest(paths.scripts.dist))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('styles', () => {
  return gulp.src(paths.styles.src)
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: autoprefixerList
    }))
    //.pipe(gulpIf(!isDevelopment, cssmin()))
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(browserSync.stream());
});

gulp.task('webserver', () => {
  browserSync.init({
    server: "./dist/",
    port: 4000
  });

  gulp.watch(paths.pages.watch, gulp.series('pages'));
  gulp.watch(paths.pugTemplate.watch, gulp.series('pugTemplate', 'pug'));
  gulp.watch(paths.pug.watch, gulp.series('pug'));
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
    ),
    'pugTemplate',
    'pug'
  )
);

gulp.task('default', gulp.series(
  'build',
  'webserver'
));