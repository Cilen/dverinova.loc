var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat      = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    //uglify      = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

gulp.task('sass', function(){ // Создаем таск "sass"
    return gulp.src('resources/assets/sass/app.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('public/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js', //Беремо bootstrap.js
        'resources/assets/js/vendor/menu/modernizr.custom.js', // меню
        'resources/assets/js/vendor/menu/cbpHorizontalSlideOutMenu.js', // меню
        'resources/assets/js/vendor/menu/pushy.js', // Адмін-меню
        'resources/assets/js/vendor/jquery.toastmessage.js', // Повідомленн toastmessage
        'resources/assets/js/vendor/tabulator.js', // Bootgrid
        'resources/assets/js/vendor/slick.js', // Slick
        'resources/assets/js/app.js', // Власні скрипти
        'resources/assets/js/vendor/lightbox.min.js', // lightbox
    ])
        .pipe(concat('app.js')) // Собираем их в кучу в новом файле libs.min.js
        //.pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('public/js')) // Выгружаем в папку app/js
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('fonts', function() {
    return gulp.src('node_modules/bootstrap-sass/assets/fonts/bootstrap/**/*')
        .pipe(gulp.dest('public/fonts'))
})

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        proxy: "dveri.loc",
        notify: false,
        browser: "google-chrome"
    });
});


gulp.task('watch', ['browser-sync', 'sass', 'scripts', 'fonts'], function() {
    gulp.watch('resources/assets/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch('resources/views/**/*.php', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('resources/assets/js/**/*.js', ['scripts']); // Наблюдение за JS файлами в папке js
});
