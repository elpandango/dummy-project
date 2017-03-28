var gulp = require('gulp'),
    mmq = require('gulp-merge-media-queries'),
    prefix = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    path = require('path');
// var concat = require('gulp-concat');


//***********************************************************//
gulp.task('connect', function () {
    connect.server({
        root: './',
        livereload: true
    });
});

gulp.task('sass', function () {
    return gulp.src(['src/sass/**/*.sass', 'src/sass/**/*.scss'])
        .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

gulp.task('js', function () {
    return gulp.src('src/js/*.js')
        .pipe(concat('script.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    return gulp.src('dist/**/*.html')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['src/sass/**/*.sass', 'src/sass/**/*.scss'], ['sass']);
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('dist/**/*.html', ['html']);
});

gulp.task('default', ['connect', 'sass', 'js', 'watch']);
