
Node.js的事件循环、非阻塞I/O
## 一、Node.js的非阻塞 I/O
* I/O 即 Input/Qutput，一个系统的输入和输出   
* 阻塞 I/O 和非阻塞 I/O 的区别：`系统接收输入再到输出期间，能不能接收其他输入。`    

例子1：   
* 去饭堂吃：排队打饭 
    * 排队 → 等前面的人打饭 → 轮到你打饭 → 吃饭
* 出去吃：餐厅点菜 
    * 坐下 → 点菜 → 等待 → 吃饭   

* 对于点菜人员：
    * 排队打饭 【阻塞 I/O】
    * 餐厅点菜 【非阻塞 I/O】

> 系统=食堂阿姨/服务生，输入=点菜，输出=端菜
> 饭堂阿姨只能一份一份饭地打 -> 阻塞I/O
> 服务生点完菜之后可以服务其他客人 -> 非阻塞I/O

例子2：
在某个论坛提出一个问题：“这个Node.js问题怎么解决？在线等，急”   
>一直按住F5刷新页面，一直等到有人回答这个问题的时候才停止刷新页面。 【阻塞 I/O】   
>提出问题之后去做别的事情，然后再回来看是否有人回答这个问题。提出问题到解决问题之间是可以坐其他事情的【非阻塞 I/O】      

理解非阻塞I/O的要点在于：
* 确定一个进行 Input/Output 的系统。（I/O：输入/输出）  
* 思考在I/O过程中，能不能进行其他 I/O   

用代码解释：    
新建一个nonblocking文件夹，创建index.js文件，   
初始化当前包：`npm init`，   
安装 glob 包：`npm install glob`     glob包可以把目录下的所有的文件、文件名递归地获取到。  
在index.js文件中引入 glob ：    
`const glob = require('glob');`      

**使用阻塞I/O方式调用：**
```javascript
const glob = require('glob');

var result = null;
result = glob.sync(__dirname + '/**/*')  //阻塞I/O调用方式
console.log('获取目录下的所有文件',result)
```
这种方式调用，node.js在获取过程中是不可以做其他事情的。  `/**/*`是目录的通配符
查看使用这种方式的操作耗时：   
使用 `console.time()`和`console.timeEnd()` 这两种函数能够打印出这个语句在node.js的整个耗时是多少。
```javascript
const glob = require('glob');

var result = null;
console.time('glob')
result = glob.sync(__dirname + '/**/*')  
console.timeEnd('glob')
```
**使用非阻塞I/O方式调用：**   
传一个函数作为第二个参数，作为操作回调。   
非阻塞I/O方式节省了它在node.js里的等待时间。
```javascript
const glob = require('glob');

var result = null;
// 非阻塞 I/O 调用方式：
console.time('glob')
glob(__dirname + '/**/*', function(err,res){
    result = res;
    console.log(res);
    console.log('got result');
})
console.timeEnd('glob')
console.log(1 + 1)
```   

## 二、Node.js —— 异步编程之callback 
### 1、callback写法     
* 回调函数格式规范   
    * error-first callback
    * Node-style callback
* callback第一个参数是error，后面的参数才是结果。

一个非阻塞I/O 的场景：   
当我们面试完之后，面试官会给我们说让我们等通知，过一段时间或说面试是通过还是没通过。    

```javascript
interview(function(){
    console.log('smile');  //500ms之后，面试官会通知面试通过
})

function interview(callback){
    setTimeout(()=>{
        callback('success');
    }, 500)
}
```
执行 node index.js，程序运行500ms之后，结果是打印出来 `smile`

写一个随机函数，80%的概率会通过面试，这种情况下，希望面试失败时，函数会抛出一个错误，在调用的地方加一个`try catch`，把错误给抓出来。 
```javascript
try {
    interview(function(){
        console.log('smile');
    })
} catch (error) {
    console.log('cry', e);
}


function interview(callback){
    setTimeout(()=>{
        if(Math.random() < 0.8){
            callback('success')
        }else {
            throw new Error('fail');
        }
    }, 500)
}

```
上面代码在node.js里面会造成全局错误，是一个很大的问题
在异步里面throw一个错误，是不会被外面的try catch 所包裹到的。   
所以上面代码应该为：  
```javascript
interview(function(res){
    if(res instanceof Error){
        return console.log('cry')
    }  
    console.log('smile');
})

function interview(callback){
    setTimeout(()=>{
        if(Math.random() < 0.8){
            callback('success')
        }else {
            callback(new Error('fail'));
        }
    }, 500)
}
```  
node.js里边有很多callback，写回调函数的时候是不会去了解回调函数里面的第一个参数到底有哪几种格式的。   
所以node.js提出了一种写回调的规范：所有的Error都放在第一个参数，第二个第三个才是结果。   
约定俗成，只要第一个参数不为null，则说明这次异步调用或者说非阻塞I/O是失败的。（即哪些是处理失败的，哪些是处理成功的）   
```javascript
interview(function(res){
    // if(res instanceof Error){
    //     return console.log('cry')
    // }  
    if(res){
        return console.log('cry')
    }
    console.log('smile');
})

function interview(callback){
    setTimeout(()=>{
        if(Math.random() < 0.8){
            callback(null,'success')
        }else {
            callback(new Error('fail'));
        }
    }, 500)
}
```
### 2、异步流程控制    
callback可能会产生两个问题：    
* 回调地狱   
* 两个流程是并发的   

异步流程控制：  
* `async.js`
https://www.npmjs.com/package/async
* `thunk`

## 三、Node.js —— 事件循环（Event Loop）   
事件循环：   
```javascript
const eventloop = {
    queue:[],

    loop(){
        while(this.queue.length){
            var callback = this.queue.shift();
            callback();
        }
        setTimeout(this.loop.bind(this), 50);
    },
    add(callback){
        this.queue.push(callback);
    }
}
eventloop.loop();

setTimeout(()=>{
    eventloop.add(function(){
        console.log(1);
    })
}, 500)
setTimeout(()=>{
    eventloop.add(function(){
        console.log(2);
    })
}, 800)
```
结果为：1 2      










