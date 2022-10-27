# gulp

## 介绍

  * gulp 是一个基于 Nodejs 的自动化构建工具
  * 官方文档: http://www.gulpjs.com.cn/
  * 能自动化完成 js/css/sass/less/html/image 等文件的合并、压缩、检查、监听文件变化、浏览器自动刷新等任务

> 当前前端开发使用较少, 了解基本功能和使用即可

## 使用初体验
1. 安装 gulp

```shell
npm init -y
npm install gulp -g 
npm install gulp --save-dev
```

2. 根目录下创建gulp配置文件: gulpfile.js

```js
//引入gulp模块
const gulp = require('gulp');

//定义任务
gulp.task('任务名称', () => {
  console.log('在此执行任务')
})
```

3. 构建命令: 

```shell
 gulp 任务名
```

> 抛出错误: 
>
> ​	Did you forget to signal async completion?
>
> 错误的解决方法：
>
> 1. 回调函数设置为 async 函数
> 2. 返回一个可读流

## gulp 插件

gulp 插件是专门针对 gulp 开发的各种工具包，用来实现特定的功能。

### gulp-babel 

> 问题: ES6的新语法不能兼容低版本浏览器
>
> 解决: 利用 babel 进行 ES6 转 ES5

1. 准备JS代码

    src/js/m1.js
    
    ```js
    export const sum = (a, b) => {
      return a + b
    }
    ```
    
    src/js/main.js
    
    ```js
    import {sum} from './m1'
    
    console.log(sum(2, 3))
    
    document.write('Hello gulp!')
    ```
    
2. 安装插件： 

    ```shell
    npm install --save-dev gulp-babel @babel/core @babel/preset-env
    ```

3. gulpfile.js 引入：

    ```js
    const babel = require('gulp-babel')
    ```

4. 定义任务:
    ```js
    gulp.task('babel', () => {
      return gulp.src('./src/js/*.js') // 指定处理所有JS文件
        .pipe(babel({ // 对JS使用Babel进ES6转ES5
          presets: ['@babel/preset-env']
        }))
        .pipe(gulp.dest('build/js')) // 输出到指定目录
    })
    ```

5. 运行命令：
    ```
     gulp babel
    ```

### gulp-browserify 

> 问题: 经过 babel 转换后的 ES6 模块化语法变成了 CommonJS 语法，还不能直接运行
>
> 解决: 用 gulp-browserify 编译CommonJS代码

1. 安装插件：

   ```shell
   npm install --save-dev gulp-browserify gulp-rename
   ```
3. 修改 gulpfile.js 引入：
    ```js
    const browserify = require('gulp-browserify');
    const rename = require('gulp-rename');
    ```

4. 定义任务:
    ```js
    gulp.task('browserify', () => {
      return gulp.src('./build/js/index.js')  //指定打包的入口文件
        .pipe(browserify())					// 将CommonJs语法转换为浏览器能识别的语法
        .pipe(rename('bundle.js'))			// 为了防止冲突将文件重命名
        .pipe(gulp.dest('build/js'))		// 输出到指定位置
    });
    ```

5. 运行命令
    ```shell
     gulp browserify
    ```

### gulp-uglify

> 问题: gulp-browserify 编译后的代码没有压缩
>
> 解决: 利用 `gulp-uglify` 对打包产生的JS 进行压缩处理

1. 安装插件
    ```shell script
    npm install --save-dev gulp-uglify
    ```

2. 引入插件
    ```js
        const uglify = require('gulp-uglify');
    ```

3. 定义任务
    ```js
    gulp.task('uglify', function () {
      return gulp.src('build/js/bundle.js')
        .pipe(uglify())  //压缩js
        .pipe(rename('bundle.min.js'))
        .pipe(gulp.dest('dist/js'))
    });
    ```

4. 运行命令
    ```shell script
     gulp uglify
    ```

5. 创建HTML页面: src/index.html

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Document</title>
   </head>
   <body>
       <script src="../dist/js/bundle.min.js"></script>
   </body>
   </html>
   ```

   

### 配置默认任务

> 问题: 需要多次执行多个任务才能达到目标
>
> 解决: 配置一个默认任务, 串连多个任务, 让多个任务依次执行

1. 定义默认任务

   ```js
   gulp.task('default', gulp.series('babel', 'browserify', 'uglify'));
   ```

2. 运行命令

   ```
    gulp
   ```

### gulp-less 

> 问题: 如何编译 less 与 添加 CSS3 样式的厂商前缀
>
> 解决: 利用 gulp-less 编译 less, 利用 less-plugin-autoprefix 添加厂商前缀

1. 准备less 和 html
   
    src/less/app.less
    
    ```less
    @color: rgb(21, 73, 125);
    header {
      height:100px;
      display:flex;
      background: @color;
    }
    ```
    
    src/less/admin.less
    
    ```less
    @bg: linear-gradient(to right bottom, #cef, rgb(187, 68, 211));
    
    section{
      height: 200px;
      background: @bg;
    }
    ```
    
    src/index.html
    
    ```
    <header></header>
    <section></section>
    ```
    
    
    
2. 安装插件 

    ```shell script
    npm install gulp-less less-plugin-autoprefix --save-dev
    ```

3. 引入插件
    ```js
    const less = require('gulp-less');
    const LessAutoprefix = require('less-plugin-autoprefix');
    const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
    ```

4. 定义任务：
    ```js
    gulp.task('less', function () {
      return gulp.src('./src/less/*.less')
        .pipe(less({
          plugins: [autoprefix] // 自动扩展前缀
        }))
        .pipe(gulp.dest('./build/css'))
    });
    ```

5. 运行命令：
    ```shell
     gulp less
    ```

### gulp-concat 

> 问题: gulp-less 编译生成的 css 没有合并
>
> 解决: 利用 gulp-concat 合并 css

1. 安装插件
    ```shell script
    npm install --save-dev gulp-concat
    ```

2. 引入
    ```js
    const concat = require('gulp-concat');
    ```

3. 定义任务
    ```js
    gulp.task('concat', function () {
      return gulp.src('./build/css/*.css')
          .pipe(concat('bundle.css'))
          .pipe(gulp.dest('./build/css/concat'))
    });
    ```
    
4. 运行命令

    ```
     gulp concat
    ```

### gulp-cssmin 

> 问题: gulp-concat 合并生成的 css 没有压缩
>
> 解决: 利用 gulp-cssmin 压缩 css 文件

1. 安装插件
    ```shell script
    npm install --save-dev gulp-cssmin
    ```

2. 引入
    ```js
    const cssmin = require('gulp-cssmin');
    ```

3. 定义任务
    ```js
    gulp.task('cssmin', function () {
      return gulp.src('./build/css/concat/bundle.css')
          .pipe(cssmin())
          .pipe(rename('bundle.min.css'))
          .pipe(gulp.dest('./dist/css'))
    });
    ```
4. 运行命令

   ```
    gulp cssmin
   ```

5. 在页面中引入打包的css文件

   ```html
   <link rel="stylesheet" href="../dist/css/bundle.min.css">
   ```

### gulp-htmlmin 

> 问题: html 文件没有压缩
>
> 解决: 利用 gulp-htmlmin 压缩 html 文件

1. 对 src/index.html 进行压缩

2. 安装插件

    ```shell script
    npm install --save gulp-htmlmin
    ```

3. 引入
    ```js
    const htmlmin = require('gulp-htmlmin');
    ```

4. 定义任务
    ```js
    gulp.task('htmlmin', () => {
      return gulp.src('src/index.html')
        .pipe(htmlmin({
          collapseWhitespace: true ,//去除空格
          removeComments:true //去除注释
        }))
        .pipe(gulp.dest('dist'))
    })
    ```
    
1. 修改面中引入的 js 和 css
   
    ```html
    <link rel="stylesheet" href="./css/bundle.min.css">
    
    <script src="./js/bundle.min.js"></script>
    ```
    
6. 运行命令

   ```
    gulp htmlmin
   ```

## 自动运行(Live Reload)

1. 安装模块
    ```shell script
    npm install gulp-livereload gulp-connect opn --save-dev
    ```


2. 引入模块
    ```js
    const livereload = require('gulp-livereload');
    const connect = require('gulp-connect');
    const opn = require('opn');
    ```

3. 自动执行任务，编译代码
    ```js
    //1. 在所有可能要执行任务后面加上 .pipe(livereload());
    
    // 2. 定义监视任务
    gulp.task('watch', function () {
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
    ```

4. 运行命令

   ```
    gulp watch
   
   http://localhost:3000/index.html
   ```

## 相关插件
* gulp-babel & gulp-browserify: 编译JS
* gulp-uglify: 压缩JS
* gulp-less : 编译 less
* gulp-concat : 合并css
* gulp-cssmin: 压缩css
* gulp-htmlmin: 压缩html
* gulp-rename : 文件重命名
* gulp-livereload & gulp-connect : 实时自动编译刷新
## 相关API
* gulp.src(filePath/pathArr) : 
  * 指向指定路径的所有文件, 返回文件流对象
  * 用于读取文件
* gulp.dest(dirPath/pathArr)
  * 指向指定的所有文件夹
  * 用于向文件夹中输出文件
* gulp.task(name, [deps], fn) 
  * 定义一个任务
* gulp.watch() 
  * 监视文件的变化

