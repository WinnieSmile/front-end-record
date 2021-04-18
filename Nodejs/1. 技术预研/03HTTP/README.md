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

