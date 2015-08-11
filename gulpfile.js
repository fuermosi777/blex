var gulp = require('gulp');

gulp.task('copyFile', function() {
    return gulp.src([
            '*.png',
            'background.js',
            'manifest.json'
        ])
        .pipe(gulp.dest('./dist'));
});

gulp.task('copyBuild', function() {
    return gulp.src([
            './build/*'
        ])
        .pipe(gulp.dest('./dist/build'));
});

gulp.task('copyLib', function() {
    return gulp.src([
            './lib/**/*'
        ])
        .pipe(gulp.dest('./dist/lib'));
});

gulp.task('default', ['copyFile', 'copyBuild', 'copyLib']);