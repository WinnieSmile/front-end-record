/*
 * @Author: your name
 * @Date: 2021-04-26 23:29:37
 * @LastEditTime: 2021-04-26 23:33:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-end-record\Nodejs\1. 技术预研\04RPC调用\index.js
 */
const buffer1 = Buffer.from('geekbang');
const buffer2 = Buffer.from([1, 2, 3, 4]);

const buffer3 = Buffer.alloc(20);

// console.log(buffer1);
// console.log(buffer2);
// console.log(buffer3);

buffer2.writeInt8(12, 1); //第二位写入 12的十六进制字符 0C   
console.log('写入十六进制', buffer2)  // <Buffer 01 0c 03 04>

buffer2.writeInt16BE(512, 2);  //第三位和第四位写入 Int16BE
console.log('写入Int16BE', buffer2);

buffer3.writeInt16LE(512, 2); 
console.log('写入Int16LE', buffer3)