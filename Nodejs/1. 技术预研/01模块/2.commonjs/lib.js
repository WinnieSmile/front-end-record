/*
 * @Author: your name
 * @Date: 2021-04-12 23:05:26
 * @LastEditTime: 2021-04-12 23:54:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \1. 技术预研\01模块\common.js\lib.js
 */
console.log('hello');

exports.hello = 'world'

exports.add = function(a, b){
    return a + b;
}

exports.greek = { hello:'world' }

module.exports = function minus(a, b){
    return a - b;
}

setTimeout(()=>{
    console.log('test', exports)
},2000);
