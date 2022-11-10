[TOC]





本练习为一个学生信息管理系统，主要利用react实现学生系统的增删改查。

## 一、项目初始化

### 1、创建react-cli脚手架环境：

1. `npm i create-react-app -g`：全局安装`create-react-app`模块
2. `create-react-app projectname`：利用`create-react-app`创建并初始化项目(其中projectname为项目名，必须是英文，且必须小写)
3. 进入到创建的项目目录下并启动项目:`npm start`
4. 本项目采用`react`17版本的，所以需要降版本：`npm i react@17 reacr-dom@17`
5. 然后将`src`和`public`文件夹目录下的文件删除，之后就可以在这两个目录下编写自己的代码，并利用`npm start`启动项目。

本次项目的主要结构如下：

![](S:\learning\4-react框架\homework\student\img\学生信息管理.png)



## 二、项目思路

#### 前端实现界面：

![](S:\learning\4-react框架\homework\student\img\show.png)

#### 思路：

1. 首先在父组件`Student`中请求数据，然后将数据给到`List`子组件，让`List`组件将其渲染到页面；
2. 增加 添加学生信息 功能，并实时渲染到前端页面
3. 增加删除学生信息功能，并实时删除
4. 增加更改学生信息功能
5. 增加查询学生信息功能，并将查询数据放到页面中(选做)



## 三、渲染数据库的数据到前端页面

1、首先，全局安装`json-server`模块：`npm i json-server -g`

2、在有json数据的文件夹中打开命令行窗口，然后输入命令：`json-server --watch db.json --port 4000`，按下回车即可启动服务器，在本地浏览器`http://localhost:4000`即可找到自己的数据。

> 可能遇到的问题：无法运行`json-server --watch db.json --port 4000`命令
>
> (注意，这里的`db.json`是文件夹的名字，4000是自己设置的端口，默认端口是3000)
>
> 解决方法：开启配置 vscode 必须以管理员身份运行： set-ExecutionPolicy RemoteSigned

3、在`Student`组件中发送`axios`请求获取数据并使用`useState`存放：

```jsx
// 首先引入useState
import { useState } from 'react';
// 使用useState存储数据
let [stuData, setStuData] = useState(); // 该数据用来存储从服务器端获取的全部数据


// 在Student组件中请求数据时应该在组件挂载后请求，然而本次项目用的是16.8版本之后的react(16.8版本之后的react推荐使用函数式组件，所以本次用的也是函数式组件)，生命周期只有利用useEffect来模拟componentDidMount
useEffect(() => {
	async function main() {
        // 此处的axios已经被我封装过，具体封装的代码见下
		let result = await axios.get('/data') // 因为是获取数据，所以用的是get请求
        // 将请求到的结果放到stuData中，便于数据传递和渲染
    	setStuData(result);
    };
    main();
}, []);
```

3.1、`axios`的二次封装

需要提前下载`axios`：`npm i axios`;

如果想添加请求时的虚拟进度条，还可以下载`nprogress`包：`npm i nprogress`

```js
// 首先从node_modules导入axios
import axios from 'axios';

// 此处增加发请求时虚拟进度条的功能
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 开始封装
let newAxios = axios.create({
    baseURL: 'http://localhost:4000' // 跟地址
    // ...
});

// 设置请求拦截
newAxios.interceptors.request.use(config => {
	// 请求成功时的配置
    // 发请求时进度条开始
    NProgress.start();
    // 配置完成后一定要记得将请求返回!!!
    return config;
}, err => { // 请求失败
    // 打印报错信息
    console.log('请求报错！！！')
    console.error(err);
    return err;
});

// 设置响应拦截
newAxios.interceptors.response.use(res => {
    // 成功响应时的配置
    // 关闭进度条
    NProgress.done();
    
    return res.data;  // 将需要的数据抽离出来并返回
}, err => {
    // 请求响应报错时
    // 关闭进度条
    NProgress.done();
    console.log("响应报错了！！！");
    console.error(err);
});

// 最后导出封装的axios
export default newAxios;
```

4、此时我们已经在`Student`组件中拿到需要渲染的数据，现在需要做的是将`Student`组件中的数据传给子组件`List`，然后由`List`组件来渲染。

传递数据：

在父组件传递给子组件的情况下，我们可以用`props`来传递，在父组件引入子组件时直接将需要传递的数据作为属性和值来传给子组件。

```jsx
// Student组件中：
return (
    <Info></Info>
	<List stuData={stuData}></List>
);

// List组件中：
// List组件中接收传递进来的值并将其解构
let { stuData } = props;
// 然后将解构出来的数据放到自己组件中的useState中存储并监测stuData的值并随时更改，此时就需要模拟生命周期中的componentDidUpdade;
let [datalist, setDatalist] = useState([]);
useEffect(() => {
    setDatalist(stuData)
}, [stuData]); // 切记！这里的监测只能监测stuData数组一层的变化，也就是说类似于浅克隆，不能检测到数组中每个对象里面属性值的变化！

// 拿到数据后，将数据渲染到页面中：
// ...
```



5、添加学生信息

5.1、首先将需要输入信息的`input`中利用`useRef`都加上`ref`属性，以此来监测输入框信息的变化并获取信息，然后给提交按钮添加点击事件，处理事件时获取输入信息是否符合要求，最后提交到服务器端并渲染在页面中。因为数据都存放在父组件`Student`中，所有收集到的数据也将由父组件处理。

```jsx
// 父组件中处理收集到的数据的方法：
let addStuData = (obj) => { // 设置一个形参(是个对象)用来接收需要添加的数据
	async function main() {
		await axios.post('/data', obj);// 发post请求添加数据
        // 给前端页面添加数据
        setStuData(cloneDeep([...stuData, obj])); // 深克隆，以防子组件List监测不到数据的变化，使页面及时更新(cloneDeep方法来自于lodash这个包，需要下载和引入)
    };
    main();
};
// 将父组件的方法传给子组件
return (
	<Info addStuData={addStuData}></Info>
)


// 子组件Info中收集数据并接收父组件传来的添加方法：
let { addStuData } = props;
// 首先从react中引入uesRef
import { useRef } from 'react';

// 性别用的是单选框，所以要用useState单列出来
let [sex, setSex] = useState(true);
// 如果电话号码不符合要求可以添加模态框
let [flag, setFlag] = useFlag(false);
// 姓名、年龄和电话号码用useRef来获取
let name = useRef();
let age = useRef();
let tel = useRef();

// 同时给男女单选框添加单选点击事件，回调函数名字分别为 man 和 women
let man = () => {
    setSex(true);
};
let women = () => {
	setSex(false);
};

// 给提交按钮添加点击事件 回调函数为 addData
let addData = () => {
	// 获取性别
    let sexadd = sex ? '男' : '女';
    // 判断电话号码是否符合要求
    if(/^1[3|4|5|7|8|9]\d{9}$/.test(tel.current.value)){ // 符合要求情况下
		// 收集数据并调用父组件Student中的addStuData方法来发请求提交数据
        // 匹配成功则不需要加模态框
        setFlag(false);
        
        // 收集数据
        let obj = {
			name: name.current.value,
            age: age.current.value,
            telphone: tel.current.value,
            id: stuData.length + 1,
            sex: sexadd
        };
        
        // 调用父组件方法添加数据
        addStuData(obj);
        // 添加成功之后清除页面数据
        name.current.value = '';
        age.current.value = '';
        tel.current.value = '';
    } else { // 不符合则添加模态框
		setFlag(true);
    }
}








```

























