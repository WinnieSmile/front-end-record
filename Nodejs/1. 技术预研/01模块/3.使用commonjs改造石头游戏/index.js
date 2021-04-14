/*
 * @Author: your name
 * @Date: 2021-04-13 00:09:05
 * @LastEditTime: 2021-04-15 00:02:53
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \1. 技术预研\01模块\3.使用commonjs改造石头游戏\index.js
 */
var playAction = process.argv[process.argv.length - 1];

const game = require('./lib');

// const result = game(playAction)
// console.log(result)

// （获取进程的标记输入）需要对游戏结果进行统计，这个进程是长期存在，并且让用户输入多次游戏的操作
// 获取进程的标准输入，并且把这个输入转换成字符串输出出来

let count = 0;
process.stdin.on('data', e=>{
    const playAction = e.toString().trim();  //用户的输入操作

    const result = game(playAction)  //返回结果
    
    // 当结果为-1的时候（玩家赢了），结果会自增
    if(result === -1){
        count++;
    }
    // 当增加的结果到达了3（玩家赢3次），把进程给杀掉
    if(count === 3){
        console.log('你太厉害了，我不玩了！')
        process.exit();
    }
})