// 引入模块
// 1.1、引入gulp模块
const gulp = require('gulp');
// 1.2、引入babel模块
const babel = require('gulp-babel');
// 1.3、引入转换为浏览器可识别模块
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
// 1.4、引入压缩文件的模块
const uglify = require('gulp-uglify');
// 1.5、同步多任务处理不需要引入模块，gulp自带方法

// 引入css相关
// 首先将less文件转为css文件
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
// 将css文件合并为一个文件
const concat = require('gulp-concat');
// 将合并后的css文件压缩
const cssmin = require('gulp-cssmin');

// 压缩html文件
const htmlmin = require('gulp-htmlmin');

// 自动运行模块的引入
const livereload = require('gulp-livereload');
const connect = require('gulp-connect');
const opn = require('opn');






// 2、声明任务
// task就是任务的意思，参数1：任务名称； 参数2：回调函数
// gulp.task('maojiu', async () => {
//     console.log('开始执行任务');
// })


// 2、声明配置任务 将ES6代码转为ES5，但转化结果为CommonJS，浏览器仍然不能直接识别
gulp.task('babel', () => { // 'babel'是配置的任务名，使用 'gulp babel' 命令即可将ES6代码转为ES5
  return gulp.src('./src/js/*.js')  // 指定处理所有JS文件, 需要手动设置
    .pipe(babel({                    // 对JS使用Babel进ES6转ES5
      presets: ['@babel/preset-env']
    }))
    .pipe(gulp.dest('build/js'))   // 输出到指定目录
})

// 3、声明配置任务：将转为的 ES5 文件转为浏览器可识别的文件
gulp.task('browserify', () => {
    return gulp.src('./build/js/*.js')  //指定打包的入口文件
      .pipe(browserify())					// 将CommonJs语法转换为浏览器能识别的语法
      .pipe(rename('bundle.js'))			// 为了防止冲突将文件重命名
      .pipe(gulp.dest('build/js'))		// 输出到指定位置
  });

// 4、压缩文件
gulp.task('uglify', function () {
    return gulp.src('build/js/bundle.js')
      .pipe(uglify())  //压缩js
      .pipe(rename('bundle.min.js'))
      .pipe(gulp.dest('dist/js'))
  });


// 5、同步执行多任务
gulp.task('default', gulp.series('babel', 'browserify', 'uglify'));

// less文件转为css并压缩合并
// 6、编译less
gulp.task('less', function () {
    return gulp.src('./src/less/*.less')  // 输入目录
      .pipe(less({
        plugins: [autoprefix] // 自动扩展前缀
      }))
      .pipe(gulp.dest('./build/css_pre')) // 输出目录
  });

// 7、合并
gulp.task('concat', function () {
    return gulp.src('./build/css_pre/*.css')
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('./build/css/concat'))
  });

// 8、压缩
gulp.task('cssmin', function () {
    return gulp.src('./build/css/concat/bundle.css')
        .pipe(cssmin())
        .pipe(rename('bundle.min.css'))
        .pipe(gulp.dest('./dist/css'))
  });


// 9、HTML文件的压缩任务
gulp.task('htmlmin', () => {
    return gulp.src('src/index.html') // 压缩之后需要更改HTML中引入文件的相对路径
      .pipe(htmlmin({
        collapseWhitespace: true ,//去除空格
        removeComments:true //去除注释
      }))
      .pipe(gulp.dest('dist'))
})

// 10、定义监视任务

// 2. 定义监视任务
gulp.task('watch', async function () {  // 异步加async
    //2.1 启动热加载服务
    livereload.listen();
    //2.2 通过自己服务器打开项目，自动刷新
    connect.server({
        root: 'dist',
        port: 3000,
        livereload: true
    });
    //2.3. 自动打开浏览器
    opn('http://localhost:3000/index.html');
    //2.4. 监视指定文件（第一个参数），一旦文件发生变化，就自动执行后面的任务（第二个参数）
    gulp.watch('src/less/*.less', gulp.series(['less', 'concat', 'cssmin']));
    gulp.watch('./src/js/*.js', gulp.series(['babel', 'browserify', 'uglify']));
    gulp.watch('./src/index.html', gulp.series('htmlmin'));
});


