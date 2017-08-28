var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');

var Files = {
    html : './index.html',
    css_dest : './css',
    scss : './sass/style.scss'
};


gulp.task('sass', function(){

    return gulp.src(Files.scss)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .on('error', sass.logError)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(Files.css_dest));

});

gulp.task('default', ['sass'], function(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./sass/**/*.scss', ['sass', browserSync.reload]);
    gulp.watch(Files.html, browserSync.reload);
});
