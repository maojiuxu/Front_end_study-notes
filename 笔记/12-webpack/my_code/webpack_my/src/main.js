// 导入文件
import data from "./json/data.json"; // 导入JSON数据
import { Public, sum } from "./js/test.js";

// 导入css文件
import "./css/reset.css";

// 导入less文件
import "./less/index.less";

// 导入图标
import './fonts/iconfont.css';

// 报错查找配置
import { test1 } from './js/test1.js';
test1(1, 2)

// 配置js文件中的ES6+语法转换为ES5
// @babel/polyfill 这个包太大，所以直接在webpack配置中使用即可
// import '@babel/polyfill'

if (data) {
    console.log(data);
}

console.log(data);
let person = new Public("maojiu");
console.log(person);
console.log(sum(2, 3));
