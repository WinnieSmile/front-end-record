console.log('start require')
var lib =  require('./lib.js')
console.log('end require',lib)

console.log(lib.add);

lib.additional = 'test'  //给require的结果的对象引用加一个属性