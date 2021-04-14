/*
 * @Author: your name
 * @Date: 2021-04-12 20:58:33
 * @LastEditTime: 2021-04-12 23:04:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \1. 技术预研\01模块\index.js
 */

var playAction = process.argv[process.argv.length - 1];
console.log(playAction)

var random = Math.random() * 3;

if(random < 1){
    var computerAction = 'rock'
}else if(random > 2){
    var computerAction = 'scissor'
}else {
    var computerAction = 'paper'
}
console.log('我出了'+ computerAction);

if(computerAction == playAction){
    console.log('平局');
}else if(
    (computerAction === 'rock' && playAction === 'paper')||
    (computerAction === 'scissor' && playAction === 'rock')||
    (computerAction === 'paper' && playAction === 'scissor')
){
    console.log('玩家你赢了')
}else{
    console.log('玩家你输了')
}