/**
 * Created by Administrator on 2017/3/8.
 */
'use strict';


var gulp = require('gulp');                        //获取gulp
var browsersync = require('browser-sync').create();//获取browsersync

//删除dist目录下文件
var del=require('del');
gulp.task('clean',function(cb){
    return del(['dist/*'],cb);
})

//操作js文件
var uglify = require('gulp-uglify');               //js压缩插件
var concat = require('gulp-concat');               //js合并插件
gulp.task('scripts', function() {
    gulp.src('js/*.js')               //需要操作的源文件
        .pipe(uglify())               //压缩js文件
        .pipe(concat('app.js'))       //把js文件合并成app.js文件
        .pipe(gulp.dest('dist/js'))   //把操作好的文件放到dist/js目录下
        .pipe(browsersync.stream());  //文件有更新自动执行
});

//操作css文件
var cssnano = require('gulp-cssnano');    //css压缩插件
var less=require('gulp-less')             //less文件编译
gulp.task('style', function() {
    gulp.src('style/*.css')
        .pipe(less())                     //编译less文件
        .pipe(cssnano())                  //css压缩
        .pipe(gulp.dest('dist/style'))
        .pipe(browsersync.stream());
});

var imagemin = require('gulp-imagemin');    //图片压缩插件
gulp.task('image', function() {
    gulp.src('images/*.{png,jpg,jpeg,gif}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        .pipe(browsersync.stream());
});

var htmlmin = require('gulp-htmlmin');      //html压缩插件
gulp.task('html', function() {
    gulp.src('*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,            //压缩html
            collapseBooleanAttributes: true,     //省略布尔属性的值
            removeComments: true,                //清除html注释
            removeEmptyAttributes: true,         //删除所有空格作为属性值
            removeScriptTypeAttributes: true,    //删除type=text/javascript
            removeStyleLinkTypeAttributes: true, //删除type=text/css
            minifyJS:true,                       //压缩页面js
            minifyCSS:true                       //压缩页面css
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browsersync.stream());
});

gulp.task('serve', ['clean'], function() {
    gulp.start('scripts','style','image','html');
    browsersync.init({
        port: 63342,
        server: {
            baseDir: ['dist']
        }
    });
    gulp.watch('js/*.js', ['scripts']);         //监控文件变化，自动更新
    gulp.watch('style/*.css', ['style']);
    gulp.watch('images/*.*', ['image']);
    gulp.watch('*.html', ['html']);
});

gulp.task('default',['serve']);