# RPC调用 

## 什么是 RPC 调用？ 
Remote Procedure Call （远程过程调用）   

* 和 Ajax 有什么相同点？    
    * 都是两个计算机之间的网络通信   
    * 需要双方约定一个数据格式  
* 和 Ajax有什么不同点？   
    * 不一定适用 DNS 作为寻址服务。    
    浏览器发一个请求，一般是使用DNS作为寻址服务，RPC就不一定，RPC通信一般是在内网里互相请求。
    * 应用层协议一般不使用HTTP。     
    RPC通信会使用一些二进制协议来取代HTTP，二进制协议有一些性能上的优势。
    * 基于TCP或UDP协议

**具体说明：**   
* 寻址/负载均衡  
    * Ajax：使用 DNS 进行寻址
浏览器发生一个ajax请求的时候（例如 http://baidu.com）， 浏览器把域名发送给 DNS 服务器，DNS服务器把 IP 返回给浏览器，浏览器拿到这个 IP ，就去找真正的服务器找数据。  

* TCP通信方式   
    * **单工通信**   
    在TCP连接过程中，永远只有一方给另外一方发送数据。   
    * **半双工通信** （也可说轮番单工通信）   
    同一时间之内，client可以给server发包，在这个时间段内，server是不可以给client发包的；等到client把包发到server之后，接下来才是server给client发包的时间；如此循环往复，就是一个半双工通信。 
    * **全双工通信**   
    客户端和服务端能够自由地通信，在客户端给服务端通信的时候，服务端也能给客户端发包，交叉的形式。

使用全双工通信的难度和成本比较高，所以有时候也会使用半双工通信。

* 二进制协议
    * 更小的数据包体积
    * 更快的编解码速率   
ajax使用HTTP协议进行通信，HTTP是一个文本协议，交互数据的时候，要么是一个HTML，要么是 json，json格式是 `key:value` 形式，RPC通信会使用二进制协议，如 `0001 0000 1111 0001`。二进制协议更接近计算机所能理解的形式，计算机运行二进制要比文本协议快得多。   
RPC通信是处在服务端与服务端之间的通信，对于效率的追求会更大，所以一般会采用二进制协议来实现服务器之间的通信。

## Nodejs Buffer编解码二进制数据包
http://nodejs.org/dist/latest-v12.x/docs/api/buffer.html#buffer_buffer

处理TCP连接的流数据、及文件系统的数据。   
编译解码二进制包的方法：   

ASCII码对照表：http://ascii.911cha.com/index.php

Buffer模块的创建：   
`Buffer.from()  Buffer.alloc()`
```javascript
const buffer1 = Buffer.from('geekbang');
const buffer2 = Buffer.from([1, 2, 3, 4]);

const buffer3 = Buffer.alloc(20);

console.log(buffer1);
console.log(buffer2);
console.log(buffer3);
```
Buffer模块的读写：   
```javascript
buffer2.writeInt8(12, 1); //第二位写入 12的十六进制字符 0C   
console.log('写入十六进制', buffer2)  // <Buffer 01 0c 03 04>

buffer2.writeInt16BE(512, 2);  //第三位和第四位写入 Int16BE
console.log('写入Int16BE', buffer2);

buffer3.writeInt16LE(512, 2); 
```
二进制协议的编码库：     
Protocol Buffers：   


