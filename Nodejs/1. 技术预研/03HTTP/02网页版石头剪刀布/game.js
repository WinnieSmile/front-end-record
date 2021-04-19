/*
 * @Author: your name
 * @Date: 2021-04-18 23:42:07
 * @LastEditTime: 2021-04-19 20:49:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-end-record\Nodejs\1. 技术预研\03HTTP\02网页版石头剪刀布\game.js
 */
module.exports = function(playerAction){
    if(['rock', 'scissor', 'paper'].indexOf(playerAction) == -1){
        throw new Error('invalid playerAction');
    }
    // 计算电脑出的东西
    var computerAction;
    var random = Math.random() * 3;

    if(random < 1){
        computerAction = 'rock'
    }else if(random > 2){
        computerAction = 'scissor'
    }else {
        computerAction = 'paper'
    }

    if(computerAction == playerAction){
        return 0;
    }else if(
        (computerAction === 'rock' && playerAction === 'scissor')||
        (computerAction === 'scissor' && playerAction === 'paper')||
        (computerAction === 'paper' && playerAction === 'rock')
    ){
        return -1;
    }else{   
        return 1;
    }
}

