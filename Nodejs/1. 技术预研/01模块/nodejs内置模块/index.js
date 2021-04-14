/*
 * @Author: your name
 * @Date: 2021-04-14 23:01:52
 * @LastEditTime: 2021-04-14 23:15:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \1. 技术预研\01模块\nodejs内置模块\index.js
 */
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
