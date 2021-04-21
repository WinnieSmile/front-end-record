<!--
 * @Author: your name
 * @Date: 2021-04-18 22:40:13
 * @LastEditTime: 2021-04-21 22:32:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-end-record\Nodejs\1. 技术预研\03HTTP\README.md
-->
## HTTP服务   
HTTP是什么？
* 应用层协议
* 五层网络协议

```
5.应用层
4.运输层
3.网络层
2.数据链路层
1.物理层
```    
**以下是对HTTP协议的简单介绍：**   
HTTP服务：
* 一个网页请求，包含两次HTTP包交换：
    * 浏览器向HTTP服务器发送请求HTTP包
    * HTTP服务器向浏览器返回HTTP包    

HTTP服务要做什么事情？
* 解析进来的 HTTP 请求报文：
* 返回对应的 HTTP 返回报文   
HTTP上面有一个服务程序，这个程序是把浏览器传送过来的HTTP请求报文解析出来，理解浏览器想要什么东西，然后返回浏览器想要的东西，把它的返回内容通过HTTP协议打一个包，把它发回去，然后对方浏览器就能再根据HTTP协议的规范解析这个报文，形成整个网页。    

```javascript
const http = require('http');

http.createServer(function(req, res){
    res.writeHead(200);
    res.end('hello');
}).listen(3000)
```

执行 `localhost:3000`
```javascript
const http = require('http');
const fs = require('fs');

http.createServer(function(request, response){
    if(request.url == '/favicon.ico'){
        response.writeHead(200);
        response.end();
        return;
    }
    
    response.writeHead(200);
    fs.createReadStream(__dirname + '/index.html')
        .pipe(response);
}).listen(3000)
```
能够快速在一个目录下启动一个静态文件服务器：npm的 httpserver 模块  
`http://npmjs.com/package/httpserver`

## 用express优化石头剪刀布   
**Express**   
要了解一个框架，最好的方法是   
* 了解它的关键功能   
* 推导出它要解决的问题是什么    

http://npmjs.com/package/express

功能：
* Robust routing  路由   
一个请求包进来，进到服务器，服务器会根据请求包的内容进行分发，把这个请求包分发到不同的逻辑单元处理，这个分发的过程就称为路由
* Focus on high performance 设计思路：高性能
* Super-high test coverage 设计思路：非常广泛的测试覆盖率（单元测试）
* HTTP helpers (redirection, caching, etc) 处理HTTP请求的能力   
    * redirection（302）：HTTP有一个重定向规范，就是说当服务器希望浏览器把网页请求重定向到另外页面，服务器会返回302的状态码，同时带上Location:http://url
    * caching（304）
* View system supporting 14+ template engines 模板引擎
* Content negotiation
* Executable for generating applications quickly  脚手架

Express的作用：能够更加方便、简洁地写出HTTP服务，减轻开发负担。   
核心功能：   
* 路由
* request/response 简化
    * request: pathname、query 等
    * response: send()、json()、jsonp() 等

## 用koa优化石头剪刀布游戏  
koa官网：  https://www.npmjs.com/package/koa    
* 中间件：Middleware      
express最大的缺点：express虽然有中间件，但是它在同步的情况下没有任何非阻塞I/O，或者说异步调用的情况下，符合洋葱模型的，一旦有异步，洋葱模型就打破了，koa的诞生就解决了这个问题，它的中间件通过async function 来编写，意味着 next() 函数可以中断这个中间件的执行，等到所有中间件执行完之后，才继续执行async function    

* 请求和处理 
* koa和express的区别：      
koa不会绑定任何的中间件，路由放到中间件里边去，让别人通过中间件实现想要的路由，koa是不会带路由中间件的。   

执行命令：`npm i koa koa-mount`      

Koa的核心功能：   
* 比 express 更极致的 request/response 简化   
    * ctx.status = 200
    * ctx.body = 'hello world'
* 使用 async function 实现的中间件
    * 有 “暂停执行” 的能力
    * 在异步的情况下也符合洋葱模型
* 精简内核，所有额外功能都移到中间件里实现


**Express 与 Koa 的对比**  
* express 门槛更低；koa更强大优雅。   
* express 封装更多东西（路由、引擎等）；开发更快速，koa 可定制型更高。 
* Express适合小型应用，Koa适用于更加大型、更加可维护的程序。适用场景不同。  

    




