[TOC]



## HTTP(s)协议

HTTP（hypertext transport protocol）协议也叫『超文本传输协议』，是一种基于 TCP/IP 的应用层通信协议，这个协议详细规定了浏览器和万维网服务器之间互相通信的规则。

协议主要规定了两方面的内容

- 客户端(浏览器)向服务器发送的数据，称之为【请求报文】
- 服务器向客户端(浏览器返回数据)，称之为【响应报文】

### 内容

#### 1、<span style='color:red'>请求</span>  

HTTP 请求报文包括四部分

* 请求行
* 请求头
* 空行
* 请求体

```http
GET http://localhost:3000/index.html?username=sunwukong&password=123123 HTTP/1.1
Host: localhost:3000
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
```

*  GET http://localhost:3000/hello.html HTTP/1.1：GET请求，请求服务器路径为http://localhost:3000/hello.html，?后面跟着的是**请求参数**（查询字符串），协议是HTTP 1.1版本

*  Host: localhost:3000：请求的主机名为localhost，端口号3000

*  Connection: keep-alive：处理完这次请求后继续保持连接，默认为3000ms

*  Pragma: no-cache：不缓存该资源，http 1.0的规定

*  Cache-Control: no-cache： 不缓存该资源 http 1.1的规定，优先级更高

*  Upgrade-Insecure-Requests: 1：告诉服务器，支持发请求的时候不用 http 而用 https

*  User-Agent: Mozilla/5.0 (...：与浏览器和OS相关的信息。有些网站会显示用户的系统版本和浏览器版本信息，这都是通过获取User-Agent头信息而来的

*  Accept: text/html,...：告诉服务器，当前客户端可以接收的文档类型。q 相当于描述了客户端对于某种媒体类型的喜好系数，该值的范围是 0-1。默认为1

*  Accept-Encoding: gzip, deflate, br：支持的压缩格式。数据在网络上传递时，服务器会把数据压缩后再发送

*  Accept-Language: zh-CN,zh;q=0.9：当前客户端支持的语言，可以在浏览器的工具选项中找到语言相关信息



#### 2、<span style='color:red'>响应</span>  

HTTP 响应报文也包括四个部分

- 响应行
- 响应头
- 空行
- 响应体

```http
HTTP/1.1 200 OK
X-Powered-By: Express
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Wed, 21 Mar 2018 13:13:13 GMT
ETag: W/"a9-16248b12b64"
Content-Type: text/html; charset=UTF-8
Content-Length: 169
Date: Thu, 22 Mar 2018 12:58:41 GMT
Connection: keep-alive

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>首页</title>
</head>
<body>
  <h1>网站首页</h1>
</body>
</html>
```

*  HTTP/1.1 200 OK：协议是HTTP 1.1版本，请求响应成功

*  X-Powered-By: Express：自定义的头，表示用的框架，一般不返回容易造成安全漏洞。

*  Accept-Ranges: bytes：告诉浏览器支持多线程下载

*  Cache-Control: public, max-age=0：强制对所有静态资产进行缓存，即使它通常不可缓存。max-age指定多久缓存一次

*  Last-Modified: Wed, 21 Mar 2018 13:13:13 GMT：这个资源最后一次被修改的日期和时间

*  ETag: W/"a9-16248b12b64"：请求资源的标记/ID

*  Content-Type: text/html; charset=UTF-8：返回响应体资源类型

*  Content-Length: 169：响应体的长度

*  Date: Thu, 22 Mar 2018 12:58:41 GMT：提供了日期的时间标志，标明响应报文是什么时间创建的



#### 3、WEB 服务

使用 nodejs 创建 HTTP 服务器

```js
// 1、引入 http 模块
let http = require('http');

// 2、创建一个服务器
let app = http.createServer((req, res) => { // 第一个参数是 request 请求； 第二个参数是 response 响应
	res.end('Hello Server!');
});

// 3、启动服务器(监听端口)
app.listen(5050, () => {  // 第一个参数是配置的端口； 第二个参数是回调函数，可有可无。
	console.log('succee');
});
```

> * request 是对请求报文的封装对象
> * response 是对响应的封装对象



##### 获取请求

```js
//获取请求方法
console.log(request.method);

//获取http版本
console.log(request.httpVersion);

//获取请求路径
console.log(request.url);

//获取请求头
console.log(request.headers);

//获取请求体
request.on('data', function(chunk){})
request.on('end', function(){});
```



##### 设置响应

```js
//设置状态码
response.statusCode = 200;

//设置响应头
response.setHeader('content-type','text/html;charset-utf-8');

//设置响应体
response.write('body');

//结束
response.end();
```



#### 案例：

```js
// 1. 引入模块
const http = require('http');
const path = require('path');
const fs = require('fs');

// 2. 创建服务器模型
const app = http.createServer((req, res) => {
    // 2.1 从地址信息中提取文件的路径名称和文件及后缀
    // URL 构造函数的两个参数
    // 参数1， 路径
    // 参数2： 主机名称
    let { pathname } = new URL(req.url, 'http://127.0.0.1:8080');

    // 2.2 如果访问根路径，其实就相当于请求 index.html
    if (pathname === '/') pathname = 'index.html';  // 兼容写法

    // 2.3 获取资源所在的正确地址
    const filename = path.join(__dirname, 'static', pathname);

    // 2.4 读取文件并返回
    fs.readFile(filename, (err, data) => {
        if (err) {
            res.setHeader('content-type', 'text/html;charset=utf8');
            res.end('<h2>请求的资源找不到!</h2>')
            return;
        }
        // 把读取的内容直接返回
        res.end(data);
    })
})

// 3. 启动并监听服务器
app.listen(8080, () => {
    console.log('server running at http://localhost:8080');
})
```



#### 4、GET 和 POST的区别

GET 和 POST 是 HTTP 协议请求的两种方式

* GET 主要用来获取数据, POST 主要用来提交数据
* GET 带参数请求是将参数缀到 URL 之后, 在地址栏输入url访问网站就是 GET 请求, POST 带参数请求是将参数放到请求体中
* POST 请求相对 GET 安全一些, 因为在浏览器中参数会暴露在地址栏.
* GET 请求大小有限制, 一般为 2k, 而 POST 请求则没有大小限制
* GET 类型报文请求方法的位置为 GET , POST 类型报文请求方法为 POST



#### 5、GET 和 POST 使用场景

GET 请求的情况

* 在地址栏直接输入 url 访问
* 点击 a 连接
* link 标签引入 css 
* script 标签引入 js
* img 标签引入 图片
* form 表单  <form method="get">
* AJAX GET 请求 

post 请求的情况

* form 表单 <form method="POST">
* AJAX  POST 请求 



### 附录

#### 响应状态码

响应状态码是服务器对结果的标识，常见的状态码有以下几种：

- 200：请求成功，浏览器会把响应体内容（通常是html）显示在浏览器中；
- 301：重定向，被请求的旧资源永久移除了（不可以访问了），将会跳转到一个新资源，搜索引擎在抓取新内容的同时也将旧的网址替换为重定向之后的网址；
- 302：重定向，被请求的旧资源还在（仍然可以访问），但会临时跳转到一个新资源，搜索引擎会抓取新的内容而保存旧的网址；
- 304：（Not Modified）请求资源未被修改，浏览器将会读取缓存；
- 403：forbidden 禁止的
- 404：请求的资源没有找到，说明客户端错误的请求了不存在的资源；
- 500：请求资源找到了，但服务器内部出现了错误；





## 模块化

#### 介绍

模块化指的就是将一个大的功能拆分为一个一个小的模块，通过不同的模块的组合来实现一个大功能。

- 在node中一个 js 文件就是一个模块
- 模块内部代码对于外部来说都是不可见的，可以通过两种方式向外部暴露



#### 模块导出（暴露）

```js
// 一、 首先创建 js 文件，编写代码
// 二、 对外进行暴露，暴露有两个方法(两种方法均可以暴露任意数据)：
//     1、 exports.属性名 = 属性值; (该方法可以多次使用去暴露)
//     2、 module.exports = { ... }; 将需要暴露的属性/方法等写入该对象(该暴露方法在每个模块中只能使用一次，多次使用时前面的会被后面的暴露覆盖)
```



#### 模块导入

> ​	<span style = 'color:red'>使用 require 引入即可</span>

```js
let test = require('./test.js');
```

**注意：**

* 如果没有加文件后缀，会按照以下后缀加载文件
  * .js    fs模块同步读取文件编译执行
  * .json  fs模块同步读取文件，用JSON.parse()解析返回结果
  * .node 这是c/c++编写的扩展文件，通过dlopen()方法编译
* 其他扩展名  会以.js文件载入
* 如果是文件夹则会默认加载该文件夹下 package.json 文件中 main 属性对应的文件
* 如果 main 属性对应的文件不存在，则自动找 index.js  index.json 
* 如果是内置模块或者是 npm 安装的模块，直接使用包名字即可
* npm 引入包时，如果当前文件夹下的 node_modules 没有，则会自动向上查找



## 包管理工具 - NPM

### 介绍

全称：Node Package Manager , Node 的包管理器，也是一个应用程序。

### 包是什么

Node.js 的包基本遵循 CommonJS 规范，将一组相关的模块组合在一起，形成一个完整的工具

### 作用

通过 NPM 可以对 Node 的工具包进行搜索、下载、安装、删除、上传。

借助别人写好的包，可以让我们的开发更加方便。

### 安装

安装完 nodejs 之后会自动安装 npm

### 常用命令

#### 查看 npm 的版本

```sh
npm -v 
```

#### 初始化

```sh
npm init
npm init --yes   or   npm init -y
```

运行后会创建 package.json 文件             

```json
{
  "name": "1-npm",      #包的名字
  "version": "1.0.0",   #包的版本
  "description": "",    #包的描述
  "main": "index.js",   #包的入口文件
  "scripts": {			#脚本配置
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",			#作者
  "license": "ISC"		#版权声明
}
```

> 注意生成的包名不能使用中文，大写 ！！！ 不能使用 npm 作为包的名字,
>
> 不能与未来要下载的包的名字一致

> 关于开源证书扩展阅读
>
> <http://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html>

#### 搜索包

一般在搜索工具包的时候，会到 https://npmjs.org 或者  https://npmjs.com 搜索

#### 安装工具包

```sh
npm install jquery
npm i jquery

# 安装并在 package.json 中保存包的信息(dependencies 属性：项目依赖包 )
npm install jquery --save
npm install jquery -S

# 安装并在 package.json 中保存包的信息(devDependencies 属性：项目打包工具)
npm install babel --save-dev
npm install babel -D
```

>  6 版本的 npm ，安装包时会自动保存在 dependencies 中，可以不用写 --save

#### 全局安装

```sh
npm install less -g
npm install nodemon -g 
```

全局安装一般用于安装全局工具，如 cnpm，yarn，webpack ，gulp等，全局命令的安装位置

```
C:\Users\你的用户名\AppData\Roaming\npm    # npm root -g
```

> 全局安装命令在任意的命令行下都可以执行
>
> 全局安装包的使用, 都是在命令行中使用的

#### 安装依赖

根据 package.json 中的依赖声明， 安装工具包

```sh
npm i
npm install
```

#### 移除包

```sh
npm remove jquery
npm uninstall moment
npm r chalk
## 全局包卸载
npm r nodemon -g
```

### 使用流程

团队开发时使用流程

1. 从仓库中拉取仓库代码
2. 运行 npm install 或者  npm  i  安装相关依赖
3. 运行项目，继续开发

### CNPM

#### 介绍

cnpm 是淘宝对国外 npm 服务器的一个完整镜像版本，也就是淘宝 npm 镜像，网站地址<http://npm.taobao.org/>

#### 安装

安装配置方式有两种

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

#### 使用

配置完成后，就可以使用 cnpm 命令来管理包，使用方法跟 npm 一样

```sh
cnpm install lodash
```

#### npm 配置镜像地址

```sh
//淘宝镜像
npm config set registry https://registry.npm.taobao.org
//官方镜像   
npm config set registry https://registry.npmjs.org/
```

### nrm

借助 nrm 也可以方便的切换 npm 的镜像地址.  『npm  registry manager』

```sh
npm i -g nrm
## 查看 npm 可用的下载地址
nrm ls 
## 切换淘宝的下载地址
nrm use taobao
```



### Yarn

#### 介绍

yarn 是 Facebook 开源的新的包管理器，可以用来代替 npm。

#### 特点

yarn 相比于 npm 有几个特点

* 本地缓存。安装过的包下次不会进行远程安装
* 并行下载。一次下载多个包，而 npm 是串行下载
* 精准的版本控制。保证每次安装跟上次都是一样的

#### 安装

##### yarn 安装

只需要一行命令即可安装 yarn

```sh
npm install -g yarn 
```

##### msi 安装包安装

<https://classic.yarnpkg.com/en/docs/install#windows-stable>

#### 相关命令

yarn 的相关命令

1)  yarn -v

2)  yarn init  //生成package.json   

3)  yarn global add  package   全局安装

​	全局安装路径 `C:\Users\你的用户名\AppData\Local\Yarn\bin`

4)  yarn global remove less  (全局删除)

5)  yarn add package  (局部安装)

6)  yarn add package --dev   (相当于npm中的--save-dev)

7)  yarn remove package  移除

8)  yarn list  //列出已经安装的包名 用的很少

9)  yarn  //安装 package.json 中的所有依赖 

> npm 5 引入离线缓存，提高了安装速度，也引入了 package-lock.json 文件增强了版本控制

yarn 修改仓库地址

```sh
yarn config set registry https://registry.npm.taobao.org
```

### CYarn

跟 npm 与 cnpm 的关系一样，可以为 yarn 设置国内的淘宝镜像，提升安装的速度

```sh
npm install cyarn -g --registry "https://registry.npm.taobao.org"
```

配置后，只需将 yarn 改为 cyarn 使用即可

### 附录

1. 安装指定版本的工具包

   ```shell
   yarn add jquery@1.11.2
   ```

2. npm 清除缓存. (npm命令,明明没有错误, 但是就是安装失败, 此时可以使用以下命令)

   ```
   npm cache clean --force
   ```

3. 查看全局安装的位置

   npm

       npm root -g

   yarn

       yarn global dir

4. npm 运行脚本

   1. package.json 中的 `scripts` 新建一个属性

      ```json
      {
      	.
      	.
      	.
          "scripts": {
              "test": "echo \"Error: no test specified\" && exit 1",
              "server": "node server.js"
           },
           .
           .
           .
      }
      ```


      2. 命令行中使用 npm 启动服务
    
         ```
         npm run server
         ```

>  start 是一个特殊的命令别名,  运行时可以直接使用『npm start』 来运行脚本



## 补充

### 一、JSON

两个方法：

```JSON
JSON.stringify(参数); // 参数是一个对象，结果返回一个该对象形成的字符串
JSON.parse(参数); // 参数是一个字符串，结果返回一个由该字符串形成的对象
```

> 1、 JSON.stringify() 方法将对象转换为字符串时，会忽略对象中的未定义的属性和方法：
>
> - a: undefined
> - fn: function() { ... }
>
> 
>
> 2、JSON.parse() 方法会参数(字符串)中的对象属性名必须用英文双引号引起来。



### 二、(深度)克隆的封装

```js
let obj = {
    uname: 'maojiu',
    age: undefined,
    sayHi: function () {
        console.log(this.uname);
    },
    hobby: ['basketball', 'ride', ['和平精英', '王者荣耀'], '跑步'],
};

// 判断数据类型的封装
function getType(data){
    return Object.prototype.toString.call(data).slice(8, -1);
}

// 深拷贝封装
function deepClone(data) {
    let newData;
    // 首先判断需要拷贝的类型
    if (getType(data) === 'Array') { // 数组
        newData = [];
    } else if (getType(data) === 'Object') { // 对象
        newData = {};
    } else {  // 普通数据类型直接返回
        return data;
    };

    // 然后根据类型来拷贝数据
    for(let k in data) {  // Array 并不建议使用 for ... in 循环，在数组中，k代表数组的索引
        if (getType(data[k]) === 'Array' || getType(data[k]) === 'Object') { // 拷贝为数组或者对象时
            newData[k] = arguments.callee(data[k]);
        } else {
            newData[k] = data[k];
        }
    }
    return newData;
}

let newObj = deepClone(obj);

newObj.uname = 'maojiuxu';
newObj.age = 18;
newObj.hobby.pop(); 

console.log(obj);
console.log(newObj);
```

> ​	除此方法外，还可以直接用JSON的两个方法来进行深度克隆(有缺点：不能克隆undefined和函数)
