<!--
 * @Author: your name
 * @Date: 2021-04-12 20:58:09
 * @LastEditTime: 2021-04-15 00:05:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \1. 技术预研\01模块\README.md
-->
一、nodejs全局变量
Nodejs的全局变量与Chrome会有一些差别，大部分是类似的。
相似的有：Date（日期对象）、Math（数学对象）、setTimeout、setInterval
例外：requestAnimationFrame 浏览器渲染下一帧，在node环境中是不存在的，用 setImmediate 来代替的。
Nodejs特有的环境变量：
`__filename`  当前所在的js，即当前所运行的脚本所在的位置
`__dirname` 当前脚本所在的目录位置
`process`  进程对象。记载运行nodeJS这个程序的进程信息，如verson（版本号）、platform（运行环境的操作系统）、kill、exit、hrtime（记录时间）、cpuUsage（cpu）、memoryUsage（系统内存）、env（打印node目前所运行的环境变量）、argv（用户在启动node时，敲击的命令，在做一些命令行程序的时候会用到）
```javascript
console.log(Date);
console.log(Math);
console.log(setTimeout);
console.log(setInterval);
console.log(setImmediate);

console.log(__filename);
console.log(__dirname);

console.log(process);
```
二、CommonJS模块规范
（原始，以前唯一加载JS的方法）前端加载一个JS的过程：   
在浏览器里面是用 `<script />`加载js，如果`<script />`标签有一个src属性，浏览器就会从远端下载一个js脚本下来，并且执行它，如果`<script />`标签没有src属性，它就会直接把`<script />`标签里面的代码执行一遍。   
`<script />`加载JS的问题：      
* 脚本变多时，需要手动管理加载JS的顺序。
举例：当你的页面代码使用了jquery的js时，就需要把jquery放在第一个`<script />`去加载，然后再运行业务脚本。如果函数库过多就会有很大的管理成本。
* 不同脚本之间逻辑调用，需要通过全局变量的方式。
举例：如jquery，jquery的函数是挂在 $ 这个全局变量上，每次调用jquery，都是访问 $ 变量，去找它里面的函数去调用，也就是说每一个脚本之间的输出都是需要把它的逻辑输出到一个全局变量上，才能够被其他脚本所调用，如果脚本变得非常多，那用全局变量就会越来越多，全局变量多了，程序就会很难管理，因为很难确定哪一天全局变量就会被别人所覆盖。
* 没有html怎么办？
解析：当一个 javasctipt运行环境没有html怎么办。    

JavaScript社区发起，在 Node.js 上应用并推广。
后续也影响到了浏览器端JavaScript。   

模块化写法：`require('./lib.js')`
index.js文件 
```javascript
console.log('start require')
require('./lib.js')
console.log('end require')
```
lib.js文件
```javascript
console.log('hello')
```
执行index.js文件： node index.js   
打印结果是
start require     
hello      
end require     


CommonJS规范的内容：    
当一个模块的初始状态被别人用了之后，默认是一个空对象
在index.js中  
```javascript
var lib = require('./lib.js')
console.log('lib', lib)  // {}
```    

定义模块输出方式：exports 字面量  
指定被引用的js的输出
在lib.js文件中
```javascript
exports.hello = 'world'   //在exports里挂载字符串

exports.add = function(a, b){ //在exports里挂载函数
    return a + b;
}

exports.greek = { hello:'world' } //在exports里挂载对象
```    

使用 webpack打包出main.js：   
`webpack --devtool none --mode development --target node index.js`


**使用commonjs改造石头剪刀布游戏**   
index.js文件
```javascript
var playAction = process.argv[process.argv.length - 1];
const game = require('./lib');

let count = 0;
process.stdin.on('data', e=>{
    const playAction = e.toString().trim(); 
    const result = game(playAction)  
    if(result === -1){
        count++;
    }   
    if(count === 3){
        console.log('你太厉害了，我不玩了！')
        process.exit();
    }
})
```
lib.js文件
```javascript
module.exports = function(playAction){
    var random = Math.random() * 3;

    if(random < 1){
        var computerAction = 'rock'
    }else if(random > 2){
        var computerAction = 'scissor'
    }else {
        var computerAction = 'paper'
    }
    console.log('我出了'+ computerAction);

    if(computerAction == playAction){
        console.log('平局');
        return 0;
    }else if(
        (computerAction === 'rock' && playAction === 'paper')||
        (computerAction === 'scissor' && playAction === 'rock')||
        (computerAction === 'paper' && playAction === 'scissor')
    ){
        console.log('玩家你赢了')
        return -1;
    }else{
        console.log('玩家你输了');
        return 1;
    }
}
```

三、npm
* npm 是什么
    * Node.js 的包管理工具
* 包是什么
    * 别人写的 Node.js 模块   

先创建npm文件夹，在npm文件夹下执行命令
`npm init` 生成 package.json文件
`npm glob` 安装glob这个包   ，作用：当你上传你的代码到git仓库的时候是可以去掉的，下一次下载的时候执行一个 npm install就可以把 `dependencies` 里的包下载下来   

例如：删除 node_modules 文件夹：rm -rf node_modules/
再执行 npm install   

`npm i gulp` 安装 glup 这个包
`npm i extend` 安装 extend 这个包
`npm uninstall extend` 删除 extend 这个包
 
淘宝镜像：https://npm.taobao.org/
官方文档（关于包的解释说明）： docs.npmjs.com/packages-and-modules/   
例如：
怎么去弄一个私有包、加一个包的可见性、package.json的字段说明、怎样把包发布到npm上面

npm的演变
* npm上的著名大神
    * TJ Holowaychunk
    * Mafintosh
    * Dominictarr
    * ……
* npm event-stream 事件

四、Node.js内置模块
作用：负责node.js应用层面到操作系统层面的通信，node.js调用os的能力（os通知node.js的能力）    

Nodejs是基于Chrome V8引擎的 JavaScript 运行环境，Nodejs使用事件驱动非阻塞式的IO模型，使其轻量又高效。    

node.js官方文档：https://nodejs.org/dist/latest-v14.x/docs/api/
node.js的 `os` 模块（与操作系统相关的事情）：https://nodejs.org/dist/latest-v14.x/docs/api/os.html    

**关于node.js的所有模块都在 node.js源码的 `lib`文件夹下边。**

* `EventEmitter` 
    * 观察者模式
        * addEventListener
        * removeEventListener

    * 直接调用 和 抛事件（观察者模式）的使用场景：
        *  “不知道被通知者存在” 或 “没有人听还能继续下去” 情况下使用 抛事件（观察者模式），否则使用 直接调用 
        

```javascript
const EventEmitter = require('events').EventEmitter;

// 事件收发器
// 构造函数
class Greektime extends EventEmitter{
    constructor(){
        super();
        setInterval(()=>{
            this.emit('newlesson', { price: Math.random()* 100 });  //this.emit 实例可以抛任意的事件出来，并且带着它的参数
        }, 3000)
    }
}

const greektime = new Greektime;  //创建实例

// 事件监听器

// 在greektime里添加一个事件监听器addListener，监听到有新课程(newlesson)上线的时候，打印每次的价格price
// greektime.addListener('newlesson', (res)=>{
//     console.log('yeah!', res)  //打印每次的价格
// })

// res 表示 this.emit 抛出的内容
greektime.addListener('newlesson', (res)=>{
    if(res.price < 80){
        console.log('buy!', res)
    }
})
```








