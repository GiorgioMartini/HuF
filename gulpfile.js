const gulp   = require('gulp'),
      sass   = require('gulp-sass'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      babel  = require('gulp-babel'),
      browserSync = require('browser-sync').create(),
      reload = browserSync.reload,
      watch = require('gulp-watch')

gulp.task('copyHtml', () =>{
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
})

gulp.task('copyCss', () =>{
    gulp.src('src/styles/*.css')
        .pipe(gulp.dest('dist/css'))
})

gulp.task('sass', () =>{
    gulp.src('src/styles/*.scss')
        .pipe(sass({indentedSyntax: true}).on('error',sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())
})

gulp.task('babel', () =>{ 
    gulp.src('src/js/main.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dist/js'))
})

gulp.task('uglify', () =>{
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
})

gulp.task('watch',['browser-sync', 'sass'], ()=>{
    gulp.watch('src/styles/*.scss', ['sass'])
    gulp.watch('src/index.html', ['copyHtml'])
})

gulp.task('default', ['serve'])

gulp.task('serve',['sass'], ()=>{
    browserSync.init({
        server: 'dist'
    })

    gulp.watch('src/styles/*.css', ['sass']) 
    gulp.watch('dist/css/*.css').on('change', reload)

    gulp.watch('src/index.html', ['copyHtml'])
    gulp.watch('src/index.html').on('change', reload)
})

