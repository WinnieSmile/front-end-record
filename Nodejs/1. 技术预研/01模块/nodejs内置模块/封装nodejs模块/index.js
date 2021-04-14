const greektime = require('./lib')  //使用commonjs规范定义子模块lib里边的内容

// 事件监听器
greektime.addListener('newlesson', (res)=>{
    if(res.price < 80){
        console.log('buy!', res)
    }
})
