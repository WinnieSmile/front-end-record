const glob = require('glob');

// var result = null;
// console.time('glob')
// result = glob.sync(__dirname + '/**/*')  // 阻塞 I/O调用方式
// console.timeEnd('glob')
// console.log('result',result)

var result = null;
// 非阻塞 I/O 调用方式：
console.time('glob')
glob(__dirname + '/**/*', function(err,res){
    result = res;
    // console.log('result', result)
    console.log('got result')
})
console.timeEnd('glob')
console.log(1 + 1);
