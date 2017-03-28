var gulp = require('gulp'),
mmq = require('gulp-merge-media-queries'),
prefix = require('gulp-autoprefixer'),
livereload = require('gulp-livereload'),
connect = require('gulp-connect'),
concat = require('gulp-concat'),
sass = require('gulp-sass');

// var path = require('path');
// var concat = require('gulp-concat');


//***********************************************************//
gulp.task('connect', function() {
    connect.server({
        root: './',
        livereload: true
    });
});

gulp.task('sass', function() { // Создаем таск "sass"
    return gulp.src(['sass/**/*.sass', 'sass/**/*.scss']) // Берем источник
        .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('css')) // Выгружаем результата в папку css
});

gulp.task('js', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('script.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

gulp.task('html', function() {
    return gulp.src('*.html')
        .pipe(connect.reload());
});

// gulp.task('watch', function() {
//     gulp.watch('src/css/*.css', ['css']);
//     gulp.watch('src/js/*.js', ['js']);
//     gulp.watch('*.html', ['html']);
//     gulp.watch('dist/pages/*.html', ['html']);
// });

gulp.task('watch', function() {
    gulp.watch(['src/sass/**/*.sass', 'src/sass/**/*.scss'], ['sass']);
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('*.html', ['html']);
});

gulp.task('default', ['connect', 'sass', 'js', 'watch']);
