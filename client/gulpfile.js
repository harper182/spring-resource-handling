
var gulpFilter = require('gulp-filter'),
    cram = require('gulp-cram'),
    uglify = require('gulp-uglify'),
    bowerSrc = require('gulp-bower-src'),
    cssMinify = require('gulp-minify-css'),
    gulp = require('gulp');

var paths = {
    run: 'src/run.js',
    css: {
        files: ['src/css/*.css'],
        root: 'src/css'
    },
    destination: './dist'
};

// Optimize application CSS files and copy to "dist" folder
gulp.task('optimize-and-copy-css', function() {

    return gulp.src(paths.css.files)
        .pipe(cssMinify({root : paths.css.root}))
        .pipe(gulp.dest(paths.destination + '/css'));
});

// Optimize application JavaScript files and copy to "dist" folder
gulp.task('optimize-and-copy-js', function() {

    var options = {
        includes: ['curl/loader/legacy'],
        appRoot: "./src"
    };
    return cram(paths.run, options).into('run.js')
        .pipe(uglify())
        .pipe(gulp.dest(paths.destination));
});

// Optimize bower-managed JavaScript dependencies and copy to "dist" folder
gulp.task('optimize-and-copy-lib', function() {

    var filter = gulpFilter(["**/*.js", "!**/*.min.js"]);
    return bowerSrc()
        .pipe(filter)
        .pipe(uglify())
        .pipe(filter.restore())
        .pipe(gulp.dest(paths.destination + '/lib'));
})

gulp.task('build', ['optimize-and-copy-css', 'optimize-and-copy-js', 'optimize-and-copy-lib'], function(){});