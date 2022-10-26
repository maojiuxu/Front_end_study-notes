# JavaScript 模块化教程

## 1. 模块与模块化

### 1-1 理解

* 什么是模块?
  * 将一个复杂的程序依据一定的规则(规范)封装成几个文件, 再进行组合在一起运行
  * 拆分出的每个文件就是一个模块
  * 模块的内部数据/实现是私有的, 只是向外部暴露一些接口(方法)供外部使用
* 什么是模块化?
  * 编码时是按照模块一个一个编码的, 整个项目就是一个模块化的项目

### 1-2. 模块化好处

* 防止命名冲突
* 更高复用性
* 更高的维护性

### 1-3. 模块化进化史
1. 全局 function 模式
  * module1.js
    ```js
    //数据
    let data = 'atguigu.com'
    
    //操作数据的函数
    function foo() {
      console.log(`foo() ${data}`)
    }
    function bar() {
      console.log(`bar() ${data}`)
    }
    ```
  * module2.js
    ```js
    let data2 = 'other data';
    
    function foo() {  //这里与另一个模块中的函数冲突了
      console.log(`foo() ${data2}`)
    }
    ```
  * test.html
    ```html
    <script type="text/javascript" src="module1.js"></script>
    <script type="text/javascript" src="module2.js"></script>
    <script type="text/javascript">
      let data = "我是修改后的数据"
      foo()
      bar()
    </script>
    ```
   * 说明:
      * 全局函数模式: 将不同的功能封装成不同的全局函数
      * 问题: Global被污染了, 很容易引起命名冲突
2. namespace 模式(命名空间)
  * module1.js
    ```
    let myModule = {
      data: 'module1 atguigu.com',
      foo() {
        console.log(`foo() ${this.data}`)
      },
      bar() {
        console.log(`bar() ${this.data}`)
      }
    }
    ```
  * module2.js
    ```js
    let myModule2 = {
      data: 'module2 atguigu.com',
      foo() {
        console.log(`foo() ${this.data}`)
      },
      bar() {
        console.log(`bar() ${this.data}`)
      }
    }
    ```
  * test.html
    ```
    <script type="text/javascript" src="module2.js"></script>
    <script type="text/javascript" src="module22.js"></script>
    <script type="text/javascript">
      myModule.foo()
      myModule.bar()
    
      myModule2.foo()
      myModule2.bar()
    
      //可以直接修改模块内部的数据
      myModule.data = 'other data' 
      myModule.foo()
    </script>
    ```
  * 说明
    * namespace 模式: 简单对象封装
    * 作用: 减少了全局变量
    * 问题: 依然可以修改模块内部代码，不安全
3. IIFE 模式
  * module1.js
    ```
    (function () {
      //数据
      let data = 'atguigu.com'
    
      //操作数据的函数
      function foo() { //向外暴露的内部私有函数
        console.log(`foo() ${data}`)
      }
    
      function bar() {//向外暴露的内部私有函数
        console.log(`bar() ${data}`)
        otherFun() //内部调用
      }
    
      function otherFun() { //未暴露的内部私有函数
        console.log('otherFun()')
      }
    
      //暴露行为
      window.myModule = {foo, bar}
    })()
    ```
  * test.html
    ```
    <script type="text/javascript" src="module3.js"></script>
    <script type="text/javascript">
      myModule.foo()
      myModule.bar()
      //myModule.otherFun()  //报错：myModule.otherFun is not a function
      console.log(myModule.data) //undefined 不能访问模块内部数据
      myModule.data = 'xxxx' //并不是修改的模块内部的data
      myModule.foo() //未受影响
    
    </script>
    ```
  * 说明:
    * IIFE模式: 匿名函数自调用(闭包)
    * IIFE : immediately-invoked function expression(立即调用函数表达式)
    * 作用: 数据是私有的, 外部只能通过暴露的方法操作
    * 问题: 如果当前这个模块依赖另一个模块怎么办?
4. IIFE 模式增强
  * 引入jquery到项目中
  * module4.js
    ```
    (function (window, $) {
      //数据
      let data = 'atguigu.com'
    
      //操作数据的函数
      function foo() { //用于暴露有函数
        console.log(`foo() ${data}`)
        $('body').css('background', 'red')
      }
    
      function bar() {//用于暴露有函数
        console.log(`bar() ${data}`)
        otherFun() //内部调用
      }
    
      function otherFun() { //内部私有的函数
        console.log('otherFun()')
      }
    
      //暴露行为
      window.myModule = {foo, bar}
    })(window, jQuery)
    ```
  * test4.html
    ```
    <script type="text/javascript" src="jquery-1.10.1.js"></script>
    <script type="text/javascript" src="module4.js"></script>
    <script type="text/javascript">
      myModule.foo()
    </script>
    ```
  * 说明
    * IIFE模式增强 : 引入依赖
    * 这就是现代模块实现的基石

5. 页面加载多个js的问题
  * 页面:
    ```
    <script type="text/javascript" src="module1.js"></script>
    <script type="text/javascript" src="module2.js"></script>
    <script type="text/javascript" src="module3.js"></script>
    <script type="text/javascript" src="module4.js"></script>
    <script type="text/javascript" src="module5.js"></script>
    <script type="text/javascript" src="module6.js"></script>
    <script type="text/javascript" src="module7.js"></script>
    <script type="text/javascript" src="module8.js"></script>
    <script type="text/javascript" src="module9.js"></script>
    <script type="text/javascript" src="module10.js"></script>
    <script type="text/javascript" src="module11.js"></script>
    <script type="text/javascript" src="module12.js"></script>
    ```
  * 说明
    * 一个页面需要引入多个js文件
    * 问题:
        * 请求过多
        * 依赖模糊
        * 难以维护
    * 这些问题可以通过现代模块化编码和项目构建来解决

## 2. JS 模块化规范

模块化规范前后出现过下面几个

- `CommonJS`: 服务器端的Node.js使用的规范, 模块同步加载, 后来还发展到浏览器端也支持
- AMD: 支持异步加载的 JS 模块化规范, 代表的实现库是 require.js, 支持Node端和浏览器端
- CMD: 国内(淘宝)制订了一种 JS 模块化规范, 它的实现库是  sea.js, 它与AMD类似
- `ES Module`: ES6推出的 JS 模块化规范, 只有新的浏览器原生支持, 一般开发中都会进行编译处理

## 3. CommonJS

### 3-1. 语法

- 整体理解
  - 模块化语法主要就关注2个点
    - 如何导出
    - 如何引入
  - 整个模块向外导出的就是exports, exports的默认值是一个空对象
  - exports 与 module.exports 默认都是指向空的模块对象的

- 导出
  - 方式一: module.exports = value
  - 方式二: exports.xxx = value
- 导入
  - const m = require(模块名 / 模块路径)
  - m就是模块中指定的 exports 变量的值(也就是 module.exports 的值)

### 3-2. Node端使用

> - 需求1: 根据要求使用 CommonJS 定义下面2个模块
>   - 模块1: 计算数组元素总和     sum.js
>   - 模块2: 计算数组元素的平均值 和 最大元素   arr-utils.js
> - 需求2: 利用第三方工具包 `uniq`对数组元素去重

1. sum.js

   ```js
   // 计算数组元素的总和
   function sum(arr){
     return arr.reduce((pre, item) => pre + item , 0)
   }
   
   module.exports = sum
   ```

2. arr-utils.js

   ```js
   const sum = require('./sum')
   
   // 计算数组元素的平均值
   function average(arr){
      const total = sum(arr)
      return total/arr.length
   }
   exports.average = average
   
   // 计算数组元素的最大值
   function max(arr) {
     arr.sort((item1, item2) => item2- item1)
   
     return arr[0]
   }
   exports.max = max
   ```

3. app.js

   ```js
   const {average, max} = require('./arr-utils') // 引入自定义模块
   const uniq = require('uniq') // 引入第三方模块
   
   const arr = [3, 7, 4, 6]
   
   //调用函数
   console.log(average(arr))
   console.log(max(arr))
   console.log(uniq([1, 4, 1, 3, 4]))
   ```
   
4. 下载第三方工具包

   ```shell
   npm init
   
   npm i uniq
   ```

5. 运行

   ```sh
   node app.js
   ```


### 3-3. 浏览器端使用

#### 1). 创建目录结构

  ```
  |-js
    |-sum.js
    |-arr-utils.js
    |-app.js
  |-index.html
  ```

#### 2). 模块化编码

  * js/sum.js
    ```js
    // 计算数组元素的总和
    function sum(arr){
      return arr.reduce((pre, item) => pre + item , 0)
    }
    
    module.exports = sum
    ```
  * js/arr-utils.js
    ```js
    const sum = require('./sum')
    
    // 计算数组元素的平均值
    function average(arr){
       const total = sum(arr)
       return total/arr.length
    }
    exports.average = average
    
    // 计算数组元素的最大值
    function max(arr) {
      arr.sort((item1, item2) => item2- item1)
    
      return arr[0]
    }
    exports.max = max
    ```
  * js/app.js
    ```js
    const {average, max} = require('./arr-utils') // 引入自定义模块
    const uniq = require('uniq') // 引入第三方模块
    
    const arr = [3, 7, 4, 6]
    
    //调用函数
    console.log(average(arr))
    console.log(max(arr))
    
    console.log(uniq([1, 4, 1, 3, 4]))
    
    // 给页面中的button绑定点击监听
    document.getElementById('btn').onclick = () => {
      alert('中奖序号为: ' + Math.floor(Math.random()*100))
    }
    ```
    
  * index.html
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
        <button id="btn">点击抽取中奖序号</button>
        <!-- 直接引入 app.js -->
        <script src="./js/app.js"></script>
    </body>
    </html>
    ```

> `问题`: 运行会报错
>
> `原因`: 浏览器不支持CommonJS
>
> `解决`: 利用 `browserify`编译出浏览器能支持的ES5代码

#### 3). 下载 browserify

  * 全局安装 browserify
    
    ```sh
    npm i browserify -g
    ```

#### 4). 编译 CommonJS 
  * 第一步: cd 进入到 HTML 所在的文件夹

  * 第二步: 执行命令

    ```shell
    browserify js/app.js -o dist/bundle.js
    ```

#### 5). 页面中引入JS打包文件

```html
<script type="text/javascript" src="./dist/bundle.js"></script>
```

## 4. ES Module

### 4-1. 语法

ESM 模块的核心理解

整体模块暴露的是一个对象 {}, 任何暴露方式都是向模块对象中添加属性/方法

#### 4-1-1 暴露数据

1. 导出方式一: `分别导出` (可以有多个)

   export yyy

   export zzz

   本质: 整个模块是一个对象, 对象中有yyy和zzz属性, 即: {yyy, zzz}

2. 导出方式二: `统一导出 `(可以有多个)

   export { yyy, zzz }

   本质:  整个模块是一个对象, 对象中有yyy和zzz属性, 即: {yyy, zzz}  

3. 导出方式三: `默认导出` (只能有一个)

   export default xxx

   本质: 整个模块是一个对象, 对象中有default属性, 即: {default: xxx}

#### 4-1-2 导入数据

1. 导入方式一: 导入分别导出和统一导出的模块

   import { yyy, zzz } from './test'  // 必须是指定的名称

2. 导入方式二: 导入默认导出的模块

   简洁写法: import xxx from './test' // 可以是任意名称

   完整写法: import {default as xxx} from './test'

3. 导入方式三: 导入所有模块(包括默认与非默认导出的)

   import * as test from './test' // 可以是任意名称

   test的结构: { default,  yyy,  zzz }

### 4-2. 使用 ESM 

- js/m1.js

  ```js
  /* 
  导出方式一: `分别导出` (可以有多个)
    export yyy
    export zzz
    本质: 整个模块是一个对象, 对象中有yyy和zzz属性, 即: {yyy, zzz}
  */
  export function add(a, b){
      return a + b
  }
  
  export function minus(a, b){
      return a - b
  }
  
  export let data = 'I Miss You'
  
  // 私有方法
  function test(){
    console.log('test')
  }
  ```

- js/m2.js

  ```js
  /* 
  导出方式二: `统一导出 `(可以有多个)
    export { yyy, zzz }
    本质:  整个模块是一个对象, 对象中有yyy和zzz属性, 即: {yyy, zzz}  
  */
  
  function cheng(a, b){
      return a * b
  }
  
  // 私有函数
  function chu(a, b){
      return a / b
  }
  
  let data = '昔我往矣，杨柳依依'
  
  // 统一暴露
  export {
      cheng, 
      data
  }
  ```

- js/m3.js

  ```js
  /* 
  导出方式三: `默认导出` (只能有一个)
    export default xxx
    本质: 整个模块是一个对象, 对象中有default属性, 即: {default: xxx}
  */
  
  export default function Person(){
      console.log('是个人 没错!!');
  }
  ```

- js/app.js

  ```js
  /* 
  import 导入 
  from 来自于
  './m1.js' 模块相对路径
  *  所有
  as  取别名
  */
  
  /* 
  导入方式一: 导入分别导出和统一导出的模块
  import { yyy, zzz } from './test'  // 必须是指定的名称
  可以通过 as 来取别名, 避免命名冲突
  */
  import {add, minus, data} from './m1.js'
  import {cheng, data as data2} from './m2.js'
  console.log(add, minus, data)
  console.log(cheng, data2)
  
  /* 
  导入方式二: 导入默认导出的模块
  完整写法: import {default as xxx} from './test'
  简洁写法: import xxx from './test' // 可以是任意名称
  */
  import {default as m33} from './m3.js'
  import person from './m3.js'
  console.log(m33, person)
  
  /* 
  导入方式三: 导入所有模块(包括默认与非默认导出的)
  import * as test from './test' // 可以是任意别名
  test的结构: { default,  yyy,  zzz }
  */
  import * as m1 from './m1.js'
  import * as m2 from './m2.js'
  import * as m3 from './m3.js'
  console.log(m1, m2, m3)
  ```

- index.html

  ```js
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <script src="./js/app.js" type="module"></script>
  </body>
  </html>
  ```

  > 最新的chrome浏览器已经支持ESM了, 只需要声明 `type 为 module`
  >
  > 还有很多浏览器不支持ESM, 后面我们可以通过webpack/gulp之类的工具来帮我编译ESM

- 运行

  > 用 vscode 打开index页面所在的文件夹,  后面通过 `Live server`插件运行index页面

### 4-3. ESM 练习

> 将commonJS中的需求实现代码改造为ESM

- js/sum.js

  ```js
  export default function sum(arr){
    return arr.reduce((pre, item) => pre + item , 0)
  }
  ```

- js/arr-utils.js

  ```js
  import sum from './sum.js'
  
  // 计算数组元素的平均值
  export function average(arr){
     const total = sum(arr)
     return total/arr.length
  }
  
  // 计算数组元素的最大值
  export function max(arr) {
    arr.sort((item1, item2) => item2- item1)
  
    return arr[0]
  }
  
  /* 
  export {
    average,
    max
  }
  */
  ```

- js/app.js

  ```js
  // const {average, max} = require('./arr-utils') // 引入自定义模块
  // const uniq = require('uniq') // 引入第三方模块
  import {average, max} from './arr-utils.js'
  
  const arr = [3, 7, 4, 6]
  
  //调用函数
  console.log(average(arr))
  console.log(max(arr))
  
  document.getElementById('btn').onclick = () => {
    alert('中奖序号为: ' + Math.floor(Math.random()*100))
  }
  ```

- index.html

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
      <button id="btn">点击抽取中奖序号</button>
      <script type="module" src="./js/app.js"></script>
  </body>
  </html>
  ```

  > 问题: `uniq`工具包只支持CommonJS
  >
  > 解决: 大家看看怎么解决?

