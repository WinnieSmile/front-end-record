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
    * request: pathname、query等
    * response: send()、json()、jsonp() 等

