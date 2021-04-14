const EventEmitter = require('events').EventEmitter;

class Greektime extends EventEmitter{
    constructor(){
        super();
        setInterval(()=>{
            this.emit('newlesson', { price: Math.random()* 100 });  //this.emit 实例可以抛任意的事件出来，并且带着它的参数
        }, 3000)
    }
}

const greektime = new Greektime;  //创建实例

module.exports = greektime