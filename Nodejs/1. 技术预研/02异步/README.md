
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

实际中是比较复杂的：      
比如说添加了一个写文件的操作。
```javascript
const eventloop = {
    queue:[],
    timeoutqueue:[], //定时操作的队列
    fsqueue:[],  //文件操作队列

    loop(){
        while(this.queue.length){
            var callback = this.queue.shift();
            callback();
        }
        // 每个循环里面依次地从队列里面做一个遍历。   
        /* 比如文件操作队列，就会去看哪一个队列所对应的文件操作是已经完成的，如果完成了它才会去调用，如果没有完成就会跳过。*/
        this.fsqueue.forEach(callback=>{
            if(done){
                callback()
            }
        })
        setTimeout(this.loop.bind(this), 50);
    },
    add(callback){
        this.queue.push(callback);
    }
}
eventloop.loop();

setTimeout(()=>{
    // 添加一个写文件的操作：fswrite
    eventloop.add('fswrite' ,function(){
        console.log(1);
    })
}, 500)
setTimeout(()=>{
    eventloop.add(function(){
        console.log(2);
    })
}, 800)
```
**每一个事件循环都是一个全新的调用栈。**   
调用栈是一个一个层级往上的，调用栈底部（即eventloop触发的事件），即callback()，在调用这个回调函数之前，前面的代码都是C++代码，从这个函数开始才是 JS，才有 JS的调用栈。


## 四、异步编程之Promise   
**Promise**   
* 当前事件循环得不到的结果，但未来的事件循环会给到你结果。   
* Promise 是一个状态机   
    * pending
    * fulfilled/resolved
    * rejected

写一个Promise，在 chrome 浏览器控制台运行
```javascript
(function(){
    var promise = new Promise(function(resolve, reject){
        setTimeout(()=>{
            resolve()
            // reject(new Error());
        }, 500)
    })
    
    console.log(promise)
    
    setTimeout(()=>{
        console.log(promise);
    }, 800)
})()
```   
解析：在刚声明 promise 时，打印 promise，它是一个 pending 状态，800ms 之后再打印是个 resolved 状态。
   
`reject(new Error());`    
当一个promise进入到reject状态，这个错误有没有被正确地捕捉的话，这个错误就会抛到 js 解释环境（node.js或浏览器）的全局，形成一个未捕获的错误。    


**关于Promise：**    
* promise是能够从pending状态扭转到 resolve、reject状态的
* resolve与reject状态之间是不可以转换的。
* promise是一个状态机、使用promise解决异步问题，是希望它在得到结果的同时马上通知我们。
    * then：当它成为 promise，进入 resolve 状态，并且能够把我们 resolve 的结果拿到。
    * catch：进入reject状态，才会被回调

当一个 promise 进入 reject 状态，但是它又被 catch 捕捉到之后，它这个错误就不会捕捉到全局。

**.then 和 .catch 的用法：**   
* resolved 状态的 Promise 会回调后面的第一个 .then
* rejected 状态的 Promise 会回调后面的第一个 .catch
* 任何一个 rejected 状态且后面没有 .catch 的 Promise ，都会造成浏览器 /node 环境的全局错误

**Promise执行异步的功能：**
* Promise 通过 .then 和 .catch 执行异步获取执行结果的功能
* Promise 的优秀之处在于它解决了很多异步流程控制问题


```javascript
(function() {
  var promise = new Promise(function(resolve, reject) {
    setTimeout(() => {
      // resolve()
      reject(new Error('3'))
    }, 300)
  })
    .then(function(res) {
      console.log('then回调', res)
    })
    .catch(function(err) {
      console.log('catch回调', err)
    })

  console.log(promise)

  setTimeout(() => {
    console.log(promise)
  }, 800)
})()
```

如果在面试多人的情况，或者说需要同时获取多个公司面试结果的情况下，如何解决异步流程问题。            
使用 promise 处理异步：   
```javascript
(function(){
    var promise = interview();
    promise
        .then((res)=>{
            console.log('smile')
        })
        .catch((err)=>{
            console.log('cry')
        })
})();

function interview(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{      
            if(Math.random() < 0.8){
                resolve('success')
            }else {
                reject(new Error('fail'));
            }
        }, 500)
    })    
}
```

`.then` 会产生一个新的`promise`，这个`promise`的结果是会根据`.then`里面的返回（抛出的错误，也就是这个函数的执行结果），它`return`或者`throw`来决定的。
主要代码：
```javascript
.then((res)=>{
    throw new Error('refuse');
    // return 'accept'
})
```
```javascript
(function(){
    var promise = interview();
    var promise2 = promise
        // .then((res)=>{
        //     throw new Error('refuse');
        //     // return 'accept'
        // })
        .catch((res)=>{
            throw new Error('refuse')
        })

    setTimeout(()=>{
        console.log(promise);    
        console.log(promise2);
    }, 800)

    function interview(){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{      
                if(Math.random() >1 ){  //大于>1 表示必然失败，大于0表示必然通过
                    resolve('success')
                }else {
                    reject(new Error('fail'));
                }
            }, 500)
        })    
    }
})();
``` 
**总结：**   
* 执行 then 和 catch 会返回一个新 Promise，该 Promise 最终状态根据then和catch的回调函数的执行结果决定。    
    * 如果回调函数最终是 throw，该 Promise 是 rejected 状态
    * 如果回调函数最终是 return，该 Promise 是 resolved状态 
    * 但如果回调函数最终return了一个Promise，该Promise会和回调函数return的Promise状态保持一致

在then和catch里面再返回一个新的Promise， 异步任务。   
.then和.catch会把回调地狱变成一个比较线性的代码。    
**三轮面试：**   
```javascript
(function(){
    var promise = interview(1)
            .then(()=>{
                return interview(2)
            })
            .then(()=>{
                return interview(3)
            })
            .then(()=>{
                console.log('smile');
            })
            .catch((err)=>{
                console.log('cry at' + err.round + 'round');
            });
   

    function interview(round){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{      
                if(Math.random() > 0.2 ){
                    resolve('success')
                }else {
                    var error = new Error('fail');
                    error.round = round;
                    reject(error);
                }
            }, 500)
        })    
    }
    
})();
```
异步流程问题：`并发异步的问题`：同时面试两家公司，在面试完成之后， 同时成功之后， 再去做清除的事情。    
解决方法：`Promise.all()`     
```javascript
(function(){

    Promise
        .all([
            interview('greekbang'),
            interview('tencent')
        ])
        .then(()=>{
            console.log('smile')  //两次面试同时成功
        })
        .catch((err)=>{
            // 某一个公司面试失败，打印出该家公司名称
            console.log('cry for ' + err.name);
        })

    function interview(name){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{      
                if(Math.random() > 0.2 ){
                    resolve('success')
                }else {
                    var error = new Error('fail');
                    error.name = name;
                    reject(error);
                }
            }, 500)
        })    
    }
    
})();
```
## 四、异步编程之async/await
async/await  
* async function 是 Promise的语法糖封装
* 异步编程的终极方案 - 以同步的方式写异步   
    * await 关键字可以“暂停” async function 的执行
    * await 关键字可以以同步的写法获取 Promise 的执行结果
    * try-catch 可以获取 await 所得到的错误
* async/await是一个穿越事件循环存在的 function

async基本写法：
```javascript
(function(){
    const result = async function(){
        var content = new Promise((resolve, reject) => {
            setTimeout(()=>{
                resolve(6);
            }, 500)
        })
    
        console.log(content);
        return 4
    }()

    setTimeout(()=>{
        console.log(result)
    }, 800)   
})()
```
await 写法
```javascript
(function(){
    const result = async function(){
        var content = await new Promise((resolve, reject) => {
            setTimeout(()=>{
                resolve(6);
            }, 500)
        })
    
        console.log(content);
        return 4
    }()

    setTimeout(()=>{
        console.log(result)
    }, 800)
     
})()
```
await try-catch 捕捉到await的错误
```javascript
(function(){
    const result = async function(){
        try {
            var content = await new Promise((resolve, reject) => {
                setTimeout(()=>{
                    reject(new Error('8'));
                }, 500)
            }) 
        } catch (e) {
            console.log('error', e.message);
        }
            
        console.log(content);
        return 4
    }()

    setTimeout(()=>{
        console.log(result)
    }, 800)    
})()
```
利用async改造多轮面试代码：
```javascript
(async function(){
    try {
        await interview(1);
        await interview(2);
        await interview(3);

        
    } catch (e) {
        return console.log('cry at ' + e.round)
    }
    console.log('smile');
    
}())
    

function interview(round){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{      
            if(Math.random() > 0.2 ){
                resolve('success')
            }else {
                var error = new Error('fail');
                error.round = round;
                reject(error);
            }
        }, 500)
    })    
}
```   
并行异步任务： 在`await` 后面跟 `Promise.all()`    
作用是把整个异步写法同步化。
```javascript
(async function(){
    try {
        await Promise.all([interview(1), interview(2)])
    } catch (e) {
        return console.log('cry at ' + e.round)
    }
    console.log('smile');    
}())
    

function interview(round){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{      
            if(Math.random() > 0.2 ){
                resolve('success')
            }else {
                var error = new Error('fail');
                error.round = round;
                reject(error);
            }
        }, 500)
    })    
}
```



