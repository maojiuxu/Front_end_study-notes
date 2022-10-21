[TOC]



### 一、let和const关键字

1. let 和 const没有预解析，不能被提前使用
2. let 和 const有块级作用域，不会挂载到window上
3. let 和 const声明的变量和常量不允许重复声明
4. const 定义的常量，不允许被修改
   - 命名：一般在项目中固定不变的常量会改写为 全大写
5. 块级作用域，指的是带有{ } 的语法，例如`if`、`if else`、`switch`、`for`、`for...in`、`try...catch`等

其中，const声明时必须赋值。

let块作用域案例：

```JavaScript
for (let i = 0; i < 5; i++) {
    // let j = i;
    setTimeout(function () {
        console.log(i);
    },1000 * i)
};
```



### 二、解构赋值

#### 1.数组的解构赋值



```javascript
// 1. 声明多个变量并赋值，左边是数组，右边是数组
let [a, b, c] = [10, 20, 30]

// 2. 修改多个变量的值
[a,b,c] = [100,200,300];

// 3. 等号左边的变量，类似于形参； 等号右边的类似于实参
// 左边数组结构中只能有变量名， 右边的数组结构中可以有直接量、变量、表达式
let [a, b, c] = [10, num, fn()];

// 4. 左边是数组，右边也必须是数组或者可遍历对象（伪数组）, 否则报错
let [a,b,c] = 1000; // 报错

// 5. 还可以设置默认值
let [a, b, c = 'mouse'] = ['cat','dog']
```

#### 2.伪数组结构赋值

如果等号的左边是数组结构，右边除了是数组，也可以是一个其他可遍历对象（伪数组）

#### 3.对象的结构赋值

```js
// 1、对象的解构赋值   按照属性名进行模式匹配
// let {username: username, age: age, address: address} = {username: '大悲', age: 102, address: '松江'};

// 1.1 简写：
let {username, age, address} = {username: '大悲', age: 102, address: '松江'};

// 1.2 重命名
let {username: un, age: a, address: ads} = {username: '大悲', age: 102, address: '松江'};// 此时再使用时，直接使用un、a、ads，不能使用原属性名。

// 2. 左边对象中成员相当于形参，右边对象中的成员相当于实参； 左边的变量可以有默认值
let {name: v1='大悲', age: v2, address: v3, job="打野"} = {address:'中国上海', name: '大萌萌', username:'小朦朦'};
console.log(v1);  // 大朦朦
console.log(v2);  // undefined
console.log(v3);  // 中国上海
console.log(job); // 打野

// 3. 复杂形式的对象解构赋值； 数组解构：按照索引匹配； 对象解构：按照属性名匹配
let data = {
    str: 'hello',
    nums: [
        10000, 
        2000
    ],
    prop: {
        content: '过年好'
    }
};
let {str, nums: [num1, num2], prop: {content}} = data;
console.log(str);  // hello
// console.log(nums);   // 不存在 nums 变量
console.log(num1);  // 10000
console.log(num2);  // 2000
// console.log(prop);  // 不存在 prop 变量, 删除'：{content}'后可打印出prop对象
console.log(content); // 过年好
```



#### 4.其他对象的结构赋值

如果等号左边是对象结构的形式（{}），等号右边除了写一个Object类型的对象，其他任意类型的对象都可以(`null`和`undefined`除外)。

```js
// 对象解构赋值
let {name, age, address, length} = [10,20,30];
console.log(name,age,address,length);   // undefined undefined undefined 3

// 对象解构赋值
let {length:nums} = 'hello world';
console.log(nums); // 11

let {getElementById:n1, querySelector:n2} = document;
console.log(n1); // getElementById 函数体
console.log(n2); // querySelector 函数体
```

#### 5.解构赋值应用场景

1. 用于给多个变量同时赋值

2. 从数组或对象中提取想要的数据

3. 解构赋值可以用于函数传参

   ```js
   // 定义函数
   function func([a, b]) {
       console.log(a + b);
   }
   var arr = [123, 345];
   func(arr);
   ```

4. 快速交换两个变量的值



### 三、字符串新增特性

#### 1.模板字符串

使用反引号定义的字符串，称之为模板字符串。

#### 2.字符串实例新增方法

```js
// ES3 方法：
	indexOf()     // 从头部开始查询字符在字符串中首次出现的索引
	lastIndexOf() // 从尾部开始查询字符在字符串中首次出现的索引
	slice()       // 根据参数索引截取字符串
		// Object.prototype.toString.call('参数').slice(8, -1); // 判断数据类型，'参数' 代表需要判断的数据
	substring()
	substr()
	split()
	toUpperCase()
	toLowerCase()
	charCodeAt()
	search()
	match()
	replace()
	
// ES5 方法：
	trim()  // 去除字符两端的空格
	
// ES6 方法：
	repeat() // 字符串重复，参数指定重复的次数，默认0
	includes()	判断字符串是否包含某个值； 第一参数指定要查找的值；第二个参数可选指定开始查找的位置，默认0；返回布尔值。
	startsWith()	判断字符串是否以某个值开头；第一参数指定要查找的值；第二个参数可选指定开始查找的位置，默认0；返回布尔值。
	endsWith()	判断字符串是否以某个值结尾；第一参数指定要查找的值；第二个参数可选指定开始查找的位置，默认 0； 返回布尔值。
	padStart()	把字符串补全到指定长度，内容填充在前面；第一参数指定目标长度；第二个参数指定填充的内容，默认空格 （ES2017）
	padEnd()	把字符串补全到指定长度，内容填充在后面；第一参数指定目标长度；第二个参数指定填充的内容，默认空格 （ES2017）
	trimStart()	去除字符串前面的空格（ES2019）
	trimEnd()	去除字符串后面的空格（ES2019）
```



### 四、数值新增特性

#### 1.新增的二进制和八进制表示方式

```js
// 二进制表示方式
0b100;
// 八进制的标识方式
0o100;
// 十六进制的表示方式
0x100;
```

><b>注意</b>
>
>旧语法(ES6以前的语法)中`0`开头表示八进制的方式在严格模式下会报错，不建议使用

#### 2.Number构造函数本身新增的方法和属性

```js
ES3：
	Number.MAX_VALUE // 1.7976931348623157e+308
	Number.MIN_VALUE // 5e-324

ES6:
	Number.isNaN()		// 同全局函数 isNaN()
	Number.isFinite()	// 同全局函数 isFinite()  用来检测传入的参数是否是一个有穷数 
	Number.parseInt()	// 同全局函数 parseInt()
	Number.parseFloat()	// 同全局函数 parseFloat()
	Number.isInteger()	// 判断是否是整数，返回布尔值
	Number.isSafeInteger()	// 判断是否是安全整数，返回布尔值
	Number.MAX_SAFE_INTEGER	// 返回最大的安全数 9007199254740991
	Number.MIN_SAFE_INTEGER	// 返回最小的安全数 -9007199254740991
	Number.EPSILON	// 返回JS中可以表示的最小精度
```

>**安全整数：** 在 -2^53 到 2^53之间的整数是安全的整数，安全整数的运算时精确的； 超出范围的整数无法保证运算的精确性。



#### 3.Math 新增方法

```js
ES3:
	Math.PI
	Math.sqrt()
	Math.pow()
	Math.abs()
	Math.max()
	Math.min()
	Math.floor()
	Math.ceil()
	Math.round()
	Math.random()
	
ES6:
	Math.trunc()		截取数字中的整数部分
	Math.sign()			判断一个数是正数、负数还是0；正数返回1，负数返回-1,0返回0。
	Math.cbrt()			计算一个数的立方根
	Math.hypot()		计算所有参数的平方和的平方根
```



#### 4.指数运算符 **（ES2016）

```js
2 ** 5 // 计算 2 的 5 次方
```



#### 5.新增原始数据类型 bigint （ES2020）

**bigint 数据类型：** bigint 是 ES6 新增的原始数据类型，使用 typeof 查看 bigint 类型的数据返回 `bigint`

**bigint 数据类型的直接量表示方式：**

```js
23423n;    // bigint 直接量
```

**bigint 数据类型的特点：**

1. bigint 不能与其他类型的数据进行运算，只能以 bigint 类型的数据运算。
2. bigint 可以比较，自动类型转换。

**bigint 的作用：**

如果要定义很大数（超过安全数范围）同时需要保证精度，需要定义为 bigint 类型。



### 五、函数新增特性

#### 1.新增函数参数默认值

```js
function fn(a, b = '默认值') { ... }
```



#### 2.rest参数(主要用于箭头函数的参数)

> ES6 引入 rest 参数用于获取函数中多余的参数，用来代替 arguments(箭头函数中没有arguments伪数组)
>
> rest 参数会得到一个真数组，数组中的成员是剩余的实参（没有形参接收的实参）

```js
// 定义函数，计算所有参数的和
function sum( ...arr ) {
    let res = 0;
    arr.forEach(function(item) { // 也可以用数组的reduce方法
		res += item;
    })
    return res;
}

// rest 参数获取的是剩余的实参，且必须卸载所有参数的最后
function( name, ...nums ) {
	...
}
```

**rest 参数的特点（相对于 arguments）：**

1. rest 参数得到是纯数组，arguments 得到是伪数组。
2. rest 参数获取的是多余的实参（没有形参接收的实参），arguments 获取所有的实参。
3. rest 参数的变量名自定义的，且必须写在所有参数的最后面； arguments 无需声明，自动创建。



#### 3.箭头函数

1. 箭头函数的语法

   ```js
   // 1.定义一个有函数体的箭头函数
   let fn1 = () => {
   	console.log('这是一个箭头函数');
   }; 
   
   // 2.定义一个有参数的箭头函数
   let fn2 = ( m, n = 10) => {
   	return m + n;
   }
   
   // 3.如果箭头函数只有一个形参，则可以省略()
   let fn3 = num => {
   	console.log(`num的值为：${num}`);
   };
   
   // 4.如果函数体只有一条语句，且这条语句还是返回语句，则可以省略 {} 和 return 
   let arr = [1, 2, 3, 4, 5];
   let sum = arr.reduce( (res,cur) => res + cur , 0 ) // 0 为res 的初始值
   console.log(sum); // 15
   
   // 5.同时省略() 和 {}的情况
   let fn5 = num => num + 200;
   console.log(fn5(800));
   ```

   

2. 箭头函数的特点

   相对于使用 function 声明的函数，箭头函数具有如下特点：

   - <b>箭头函数中没有自己的this（没有本作用域下的this），如果在箭头函数中使用this，会沿着作用域链向上查找</b>。
   - 箭头函数中不能使用 arguments，可以用 rest 参数代替。
   - 箭头函数只能调用，不能`new`； 箭头函数是函数但不是构造函数。
   - 箭头函数不能用于生成器函数。

#### 4.函数参数尾逗号（ES2017）

```js
// ES6 语法： 最后一个形参后面跟个逗号，不报错！
function fn(name, age, address, ) { ... }
```



### 六、数组新增特性

#### 1.扩展运算符

- **把数组拆分为都喊隔开的参数序列**

`...` 用在等号的右边或者函数的实参，会把数组或其他可遍历对象拆分为逗号隔开的参数序列。

**作用：**

1. 用于实参赋值。

   ```js
   // 定义数组
   var nums = [1231, 2342, 34, 45656, 345, 109];
   // 取出数组中值最大的成员
   console.log(Math.max(...nums));
   ```

   

2. 用于拷贝(合并)数组

   ```js
   // 拷贝数组
   // 引用赋值， num2 和 nums 其实指向一个数组
   // var num2 = nums;
   var num2 = [...nums]; // 浅拷贝，互不影响
   ```



- 把多个值合到一个数组中

  `...` 写在等号的左边或者形参位置，把多个值合并到一个数组中。

  1. 作为 rest 参数；

  2. 在解构赋值中使用；

     ```js
      let [a, ...b] = [1000, 2000, 3000, 4000, 5000, 6000];
     console.log(a);   //  1000
     console.log(b);   // [2000, 3000, 4000, 5000, 6000]
     ```

#### 2.Array构造函数本身新增的方法

```js
Array.from()       // 静态方法，把其他可遍历对象(伪数组)转为纯数组
Array.of()         // 静态方法，创建一个新数组，参数数量任意，会作为数组的成员
```



#### 3.Array实例新增的方法

```js
ES3:
	concat()
	join()
	slice()
	push()
	pop()
	unshift()
	shift()
	splice()  // arr.splice(start, deleteCount, num1, num2, ... , numN)
	reverse()
	sort()

ES5:
	indexOf()
	lastIndexOf()
	forEach()
	filter()
	map()
	some()
	every()
	// 迭代器
	reduce()
	reduceRight()
	
ES6+:
	find()		返回第一个满足条件的数组成员，参数是回调函数。
	findIndex() 返回第一个满足条件的数组成员的索引，参数是回调函数。
	fill()		把数组中每个元素的值都改为指定的（参数）
	keys()		返回由数组的索引组成的遍历器对象
	values()	返回由数组的元素值组成的遍历器对象
	entries()	返回数组的索引和值组成的遍历器对象
	includes()  判断数组中是否存在某个值，类似于字符串的 includes 方法， ES2016
	flat()		把多维数组拉平，参数默认是1表示只拉平一层，可以设置为 Infinity， ES2019
```



### 七、对象新增属性

#### 1.属性简写

定义对象的时候，用变量表示属性的值，并且变量名与属性名是一样的时候，可以简写。

```js
// 定义变量
let name = '虫子';
let age = 18;
// 定义函数
function getSomething() {
    console.log('get something!');
};
// 定义对象
let obj = {
    name,
    age,
    address: 'China',
    getSomething
};
```

#### 2.方法简写

定义对象的时候，方法可以简写。

```js
let obj = {
	getAddress(){ ... },
    getInfo(){ ... }
}
```



#### 3.创建对象时用表达式作为属性名

创建对象的时候，定义属性，把表达式写在`[]`中，会把表达式的值作为属性名

```js
// 定义变量
let prop = 'address';
//声明对象
let obj = {
	uname: '虫子',
    'user-age': 18,
    [ 10 * 5 ]: 1000,  // 属性名是 50
    [prop]: '西安'      // 属性名是 address
}
```



#### 4.super关键字

`super` 关键字与 `this` 类似，在**对象的方法中**使用：

1. `this` 关键字指向调用该方法的对象； `super` 关键字指向方法所属对象的原型。

2. `this` 只与谁调用该方法有关； `super` 与谁调用该方法无关，只与方法声明的位置有关（确定所属的对象）。

   ```js
   // 定义对象
   var obj = {
     name: 'obj',
     say() {
       console.log('My Name is '+this.name);
       console.log('My Name is '+super.name);
     },
   };
   //在obj的原型上添加属性
   Object.prototype.name = 'obj proto';
   obj.say();
   // this: My Name is obj
   // super: My Name is obj proto
   
   // ----------------------------
   // 定义对象并指定原型对象
   var obj1 = Object.create({name: 'obj1 proto'});
   obj1.name = 'obj1';
   obj1.say = obj.say;
   obj1.say();
   // this: My Name is obj1
   // super: My Name is obj proto
   ```

   >**注意：**
   >
   >`super` 关键字只有在简写的对象方法中才可以使用！
   >
   >`var obj1 = Object.create(obj)`：创建obj1对象，并将obj1的原型指向obj

#### 5.对象的扩展运算符（ES2018）

- 把对象转为逗号隔开的键值对序列

  扩展运算符用在等号的右边，可以对象转为逗号隔开的键值对序列。

  可以用于对象的克隆、合并。

  ```js
  // 声明对象
  let obj = {
  	name: '虫子',
      age: 18,
      gender: '女'
  };
  // 赋值对象
  let obj1 = {...obj};
  console.log(obj1);
  // 合并对象
  let objAll = {...obj, ...{ likes: 'dancer', can: 'eat'}}
  console.log(objAll);
  ```

  

- 把键值对序列组成一个对象

  用在等号的左边，与对象解构赋值结合使用

  ```js
  // 声明对象
  let obj = {
      name: '朦朦',
      age: 17,
      address: '上海',
      getInfo() {}
  };
  
  let {name, ...users} = obj;
  console.log(name);
  console.log(users);
  ```



#### 6.Object构造函数本身新增的方法

```
ES5:
	Object.create()
	Object.defineProperty()
	Object.defineProperties()
	Object.getOwnPropertyDescriptor()
	Object.keys()  返回对象属性名组成的数组
	
ES6 +:
	Object.is();	判断两个数据是否相等，判断规则与 === 类似，两点不同：0和-0不等，NaN和NaN相等。
	Object.assign();	把第二个参数往后所有参数中的属性合并到第一个参数中，返回值就是第一个参数； 用于对象的合并、克隆。
	Object.getPrototypeOf()		返回指定对象的原型
	Object.setPrototypeOf()		设置某个对象的原型
	Object.values()			返回对象属性值组成的数组, ES2017
	Object.entries()		返回二维数组，每个成员两个元素属性名和属性值组成的数组, ES2017
	Obejct.fromEntries()	entries 方法的逆运算
	Object.getOwnPropertyDescriptors()		得到对象中所有属性的特性
```



### 八、Class语法

#### 1.使用Class定义类

```js
class 类名 {
    // 给类的实例定义属性
    name = '朦朦';		// 定义属性并给值
	age;				 // 定义属性先不给值
	
	// 给类的实例定义方法 
	getInfo() {
        
    };
	
	say = function() {
        
    }
}
```

**类的特点：**

1. 类本质上仍然是一个构造函数，使用 typeof 判断返回 function。
2. 类只能被实例化，不能被调用。
3. 类中只能写定义属性和方法的代码，类中也不能直接使用this；方法内可以写任意操作的代码和this。
4. 类中的方法如果使用简写方式，该方法会添加到类的实例的原型上，推荐。



#### 2.类中定义构造器

```js
class  Person {
	// 定义构造器方法
    constructor () {
        ...
	}
}
```

**类中构造器方法的特定功能：**

1. 构造器方法会在实例化的时候自动被调用！
2. 构造器方法可以解构实例化类的时候给的实参，通常用构造器的方法给实例的属性进行初始化赋值。

#### 3.类中定义访问器属性

```js
// 定义类
class Person {
	// 定义属性
    firstName;  // 不属于静态属性，会继承到子类身上
    lastName;   // 不属于静态属性，会继承到子类身上
    
    // 构造器方法
    constructor(firstName, lastName){
		this.firstName = firstName;
        this.lastName = lastName;
    }
    
    // 读取访问器属性调用的方法
    get fullName() {
		return this.firstName + '·' + this.lastName;
    }
    
    // 写访问器属性调用的方法
    set fullName(val) {
		this.firstName = val.split('·')[0];
        this.lastName = val.split('·')[1];
    }
}
```



#### 4.类中定义静态方法

```js
class User {
    // 定义静态方法
    static getInfo() {
        ...
    }
}
```



#### 5.继承

- **extends关键字实现继承**

  ```js
  class Animal {
  
  };
  
  class Dog extends Animal {
  
  };
  ```

  >1. 子类的实例可以继承定义在父类上的属性和方法
  >2. 父类可以被多个子类继承，但是子类只能继承一个父类

- **方法和属性的重写**

  子类中如果定义了与父类同名的属性和方法，会把继承过来属性和方法重写！称为**属性重写** 和 **方法重写**。

- **super关键字**

  super关键字既可以作为对象类使用，也可以作为函数使用（调用）；super作为函数去使用的时候具有如下特点：

  - super函数只能在子类的构造器方法中使用！
  - 子类的构造器方法中必须一开启就调用super，再进行其他操作！
  - 调用 super 就相当于调用了父类的构造器方法，子类如果重写了构造器方法，必须要先调用super！

- **继承内置类**

  ```js
  // 定义 类 继承Array
  class MyArray extends Array {
  	// 重写父类的构造器方法
      constructor(...args) {
  		super(...args);
          // 自己的初始化操作
          // ...
      }
  }
  ```

  

### 九、Symbol类型

ES6 新增了一种新的数据类型，`Symbol`。

`Symbol` 类型的数据可以用作对象的属性名（原来对象的属性只能是字符串）。

`Symbol()` 调用 `Symbol` 函数可以创造一个新的 `Symbol` 类型的数据，每调用一次 `Symbol` 函数都创建的是新的 `Symbol` 类型的数据。



`Object.getOwnPropertySymbols()`：获取到对象所有`Symbol`属性名



### 十、Set 和 Map

#### 1.Set

Set 是ES6中新增的一种对象类型，类似于数组，也是值的集合但是值都是唯一的！ 也不具备数组的索引结构。 

**Set 是可遍历对象。**

- Set 构造函数

  Set 构造函数接收一个数组或者可遍历对象作为参数，根据参数创建 Set 数据

  ```js
  // 例一
  const s = new Set(); // s 为空
  
  // 例二
  const set = new Set([1, 2, 3, 4, 5]);
  [...set] // [1, 2, 3, 4, 5]
  
  // 例三 : 去重
  const items = new Set([1, 2, 3, 4, 5, 5, 5, 5, 5])
  [...items]; // [1, 2, 3, 4, 5]
  // const arr = Array.from(items); // 数组去重
  
  // 例四 ： 
  const set = new Set(document.querySelectorAll('div'));
  set.size; // size 属性类似于数组的 length 属性
  
  ```

  

- Set 的实例的方法

  ```js
  add()
  delete()
  has()
  clear()
  keys()
  values()
  entries()
  forEach()
  size	数组，获取值的数量
  ```

  

- Set 的应用场景

  >需要存储成员不能重复的集合
  >
  >借助Set实现数组的去重



#### 2.WeakSet

WeakSet 类似于 Set，也是 ES6 新增的一种对象类型，也是值不能重复的集合，与 Set 相比具有如下不同：

>1. Set 的成员可以是任意类型的数据， WeakSet 的成员只能是对象类型（不能是原始类型）。
>2. Set 是可遍历对象； WeakSet是不可遍历的，不能使用扩展运算符。

- WeakSet构造函数

  ```js
  const ws1 = new WeakSet();
  
  const a = [[1, 2], [3, 4]];
  const ws2 = new WeakSet(a);    // WeakSet {[1, 2], [3, 4]}
  ```

  

- WeakSet实例化的方法

  ```js
  add()
  delete()
  has()
  ```

  

#### 3.Map

Map 是ES6 新增的一种对象数据类型，与 Object 类似，由键值对组成的集合，传统的对象要求属性名（键）只能用字符串或者Symbol来表示，而 Map 中的键可以是任意类型的数据。

**Map 是可遍历对象。**

- Map 构造函数

  Map 构造函数以二维数组作为参数

  ```js
  const map = new Map([
    ['name', '张三'],
    ['title', 'Author']
  ]);
  ```

  

- Map实例的方法

  ```js
  set()
  get()
  delete()
  clear()
  keys()
  values()
  entries()
  forEach()
  size 属性
  ```

  

#### 4.WeakMap

WeakMap 与 Map 的区别如下：

>1. WeakMap 中的键只能是对象类型（不能是原始类型）
>2. WeakMap 不可遍历

WeakMap 的实例的方法：

```js
set()
get()
delete()
has()
```



### 十一、遍历器 iterator

#### 1.iterator 遍历器对象

- iterator 是一种接口，任何数据只要部署了 iterator 接口，该数据就是可遍历对象，能够使用 for ... of 进行遍历。

- 所有的 iterator 对象都有一个 next() 方法， next 方法返回一个对象，对象中包含 value 属性 和 done 属性。

- iterator 对象有个指针，指向当前的值（默认指向第一个），调用 next，把当前指针指向的值取出，并且指针下移。

- Array的实例、Set的实例和Map的实例具有 keys方法、values方法和entries方法，这些方法都会返回对应的 iterator 对象。

  ```js
  // 使用 do while 遍历遍历器对象（iterator） 
  do {
       // 取出当前指向指向的值
       var res = iter.next();
       // 输出结果中的值
       if (!res.done) {
           console.log(res.value);
       }
   } while (!res.done);
  ```

  只有含有 [Symbol.Iterator] 方法，才可以调用for...of遍历方法



#### 2.iterable 可遍历对象

1. 什么是可遍历对象

   - 实现了 iterator 接口的数据类型称之为 iterable（可遍历对象）。
   - 可遍历对象遍历器接口部署在了 [Symbol.iterator] 方法中，该方法返回一个遍历器对象。

2. 内置的可遍历对象

   ```js
   Array
   Set
   Map
   String
   Arguments
   NodeList
   HTMLCollection
   ```

   

3. 哪些情况会调用可遍历对象的遍历器接口

   ```js
   1. 使用 for of
   2. 解构赋值
   3. 扩展运算符 ...
   4. Set 构造函数的参数
   5. WeakSet 构造函数的参数
   6. Map 构造函数的参数
   7. WeakMap 构造函数的参数
   8. Array.form() 的参数
   ```

   > ​	以上用法都会调用可遍历对象的 iterator 接口， 以上用法必须使用可遍历对象！

4. 可遍历对象（iterable）和遍历器对象（iterator）的关系

   ```js
   1. iterator 对象也是 iterable 对象
   	iterable 代表自带 symbol.iterrator 的标致，
   		可以进行for...of遍历
   	iterator 不仅可以for...of，还可以获取keys或者values 
   2. iterable 对象不一定是 iterator 对象
   	iterable 可以手动的 next()  但是不一定能for...of
   ```

   

5. 可遍历对象（iterable）和伪数组的关系

   **伪数组：** 也称之为类数组（Like-Array）; 像数组那样具有索引结构和 length 属性的对象。

   **可遍历对象：** 实现了遍历器接口的对象。

   伪数组不一定是可遍历对象，可遍历对象也不一定是伪数组。



#### 3.`for...of`

for ... of 可以用来遍历可遍历对象和遍历器对象。



### 十二、生成器 generator

#### 1.什么是生成器

生成器就是用于生成遍历器对象的函数。

#### 2.如何定义生成器

```js
function* fn() {
	for(let i = 10; i < 50; i ++){
		yield i;
    }
}
```

调用生成器，得到一个遍历器对象！

#### 3.yield关键字

调用生成器函数，生成器里面的代码不会执行，仅仅是得到一个遍历器对象。

给遍历器对象调用 next() 的时候，执行生成器的代码，遇到 yield 关键字结束，yield 关键字的返回作为 next() 返回的对象中的 value 值； 再次调用 next()，执行到下一个 yield。



#### 4.利用生成器给对象部署 iterator 接口（自定义可遍历对象）

```js
// 创建一个对象
let obj = {
    name: '朦朦',
    age: 198,
    address: '上海',
    grade: 10,
    getInfo() {}
};

// 给 obj 部署一个 iterator 接口
obj[Symbol.iterator] = function*() {
    for (let i in obj) {
        yield [i, obj[i]];   
    }
};
```



### 十三、新增运算符（ES2020）

#### 1.可选链运算符 `?.`

可选链运算符( **`?.`** )允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。

`?.` 操作符的功能类似于 `.` 链式操作符，不同之处在于，在引用为空(null 或者 undefined) 的情况下不会引起错误，该表达式短路返回值是 `undefined`。与函数调用一起使用时，如果给定的函数不存在，则返回 `undefined`。

当尝试访问可能不存在的对象属性时，可选链操作符将会使表达式更短、更简明。

```js
const adventurer = {
  name: 'Alice',
  cat: {
    name: 'Dinah'
  }
};

const dogName = adventurer.dog?.name;
console.log(dogName);   //  undefined

console.log(adventurer.someNonExistentMethod?.()); // undefined
```



#### 2.空值合并运算符 `??`

空值合并运算符**（**`??`**）是一个逻辑操作符，当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。

与逻辑或运算符符（`||`）不同，逻辑或操作符会在左侧操作数为假值时返回右侧操作数。也就是说，如果使用 `||` 来为某些变量设置默认值，可能会遇到意料之外的行为。比如为假值（例如，`''` 或 `0`）时。

```js
const foo = null ?? 'default string';
console.log(foo);  // "default string"

const baz = 0 ?? 42;
console.log(baz);  // 0
```

















### 补充：

#### 一、面向对象

所谓面向对象，就是面向过程的高度封装。

##### 特点：

- 封装
  - 定义：高度封装就是把多个方法抽象为一个类
  - 作用：减少代码冗余，提高代码复用性
- 继承
  - 定义：多个类之间拥有同样的属性或者方法
  - 作用：把相同的类的方法和属性放到一个新的类中
- 多态
  - 定义：多种状态
  - 作用：封装一个方法可以完成多个功能

>面向对象：适用于大项目，对于新手不友好，对于简单的业务表现较为复杂

>面向过程：一步一步实现业务的功能
>
>- 优点：流程清晰可控
>- 缺点：复用性低，不好维护

##### 继承：（下述代码的2-8行是面向对象的格式）

- 寄生组合式继承

```js
// 创建一个构造函数Animal，Animal上有两个实例化属性和一个实例化方法
function Animal(name, color) {
	this.name = name;
    this.color = color;
};
Animal.prototype.sayHi = function () {  // 实例方法放在该构造函数的原型上
    console.log('Hi!');
};


function Dog(name, color, gender) {
	Animal.call(this, name, color);    // 此处用call
    this.gender = gender;
};

Dog.prototype = Object.create(Animal.prototype); // 创建一个原型指向Animal.prototype的对象，并将构造函数Dog的原型指向这个对象（寄生组合是继承）
Dog.prototype.constructor = Dog;

// 利用构造函数Dog创建一个实例化对象dog
let dog = new Dog('虫子', 'yellew', 'man')
dog.sayHi(); // Hi!
```

- 组合式继承

```js
// 创建一个构造函数Animal，Animal上有两个实例化属性和一个实例化方法
function Animal(name, color) {
	this.name = name;
    this.color = color;
};
Animal.prototype.sayHi = function () {  // 实例方法放在该构造函数的原型上
    console.log('Hi!');
};


function Dog(name, color, gender) {
	Animal.call(this, name, color);    // 此处用call
    this.gender = gender;
};

Dog.prototype = new Animal(); // 将构造函数Dog的原型指向构造函数Animal的实例化对象 （组合式继承）
Dog.prototype.constructor = Dog; 

// 利用构造函数Dog创建一个实例化对象dog
let dog = new Dog('虫子', 'yellew', 'man')
dog.sayHi(); // Hi!
```





#### 二、静态属性/方法和实例属性/方法

静态属性和方法指的是对象（构造函数）身上具有的属性和方法；

实例化属性和方法指的是对象（构造函数）内部的代码块。

```js
function Person(name) {
	// 实例化属性和方法 ：最终会到构造函数Person的实例化对象身上
    this.name = name;   // 实例化属性
    this.sayHi = function () {  // 实例化方法
		console.log('hi!');
    }
};
// 静态属性和方法 ： 只在Person函数对象上，不会实例化到实例化对象上
Person.version = 'v1.2.1';  // 静态属性
Person.sayHello = function () {  // 静态方法
	console.log('Hello!');
}
```



#### 三、改变this的三个方法

##### 1.call方法









##### 2.apply方法



##### 3.bind方法



#### 四、事件委派





##### 作用：

1. 提高效率，能够减少内存
2. 能够动态给子元素添加事件













