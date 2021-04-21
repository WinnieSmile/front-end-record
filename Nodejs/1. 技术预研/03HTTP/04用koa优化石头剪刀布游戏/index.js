const fs = require('fs');
const game = require('./game');
// const express = require('express');  //加载express
const koa = require('koa');
const mount = require('koa-mount');

// 玩家胜利次数，如果超过3，则后续往该服务器的请求都返回500
let playerWon = 0;

let playerLastAction = null;  // 玩家的上一次游戏动作
let sameCount = 0;  // 玩家连续出同一个动作的次数

const app = new koa();

app.use(mount('/favicon.ico', function(ctx){
    ctx.status = 200;
}))

const gameKoa = new koa();

app.use(
    mount('/game', gameKoa)
)

gameKoa.use(
    async function(ctx, next){
        if(playerWon >=3 || sameCount == 9){
            ctx.status = 500;
            ctx.body = '我不会再玩了！'
            return;
        }
        await next();

        if(ctx.playerWon){
            playerWon++;
        }
    },  
)

gameKoa.use(
    async function(ctx, next){ 
        console.log(11);

        const query = ctx.query;
        const playerAction = query.action;

        if(!playerAction){
            ctx.status = 400;
            return;
        }

        if(sameCount == 9){
            ctx.status = 500;
            ctx.body = '我不会再玩了！'
        }       

        if(playerAction == playerLastAction){
            sameCount++;
            if(sameCount >= 3){
                ctx.status = 400;
                ctx.body = '你作弊！我再也不玩了！'
                sameCount = 9
                return;
            }
        }else {
            sameCount = 0;
        }
    
        playerLastAction = playerAction;   //记录上一次的playerAction
        
        ctx.playerAction = playerAction     
        await next();  
    }
)

gameKoa.use(
    async function(ctx, next){
        console.log(22)
        const playerAction = ctx.playerAction;
        const gameResult = game(playerAction);

        await new Promise(resolve =>{
            setTimeout(()=>{
                ctx.status = 200;
                if(gameResult == 0){
                    ctx.body = '平局';
                }else if(gameResult == -1){
                    ctx.body = '你输了';
                }else{
                    ctx.body = '你赢了';
                    ctx.playerAction = true;
                }
                resolve();
            }, 500)
        })
    }
)

app.use(
    mount('/', function(ctx){
        ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8')
    })
)

app.listen(3000);
