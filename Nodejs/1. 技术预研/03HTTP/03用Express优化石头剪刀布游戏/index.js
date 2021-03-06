const querystring = require('querystring');
const http = require('http');
const url = require('url');
const fs = require('fs');
const game = require('./game');
const express = require('express');  //加载express

// 玩家胜利次数，如果超过3，则后续往该服务器的请求都返回500
let playerWon = 0;

let playerLastAction = null;  // 玩家的上一次游戏动作
let sameCount = 0;  // 玩家连续出同一个动作的次数

const app = express();

app.get('/favicon.ico', function(request, response){
    response.status(200)
    return;
})

app.get('/game', 
    function(request, response, next){
        // 如果人赢3次，则：电脑返回500
        if(playerWon >= 3 || sameCount == 9){
            response.status(500);
            response.send('我再也不和你玩了！');
            return
        }
        next();  //中间件

        if(response.playerWon){
            playerWon++;
        }     
    },
    function(request, response, next){
        const query = request.query;
        const playerAction = query.action;

        
        if(!playerAction){
            response.status(400);
            response.send();
            return;
        }

        if(playerAction == playerLastAction){
            sameCount++;
            if(sameCount >= 3){
                response.status(400);
                response.send('你作弊！我再也不玩了！');
                sameCount = 9
                return;
            }
        }else {
            sameCount = 0;
        }
    
        playerLastAction = playerAction   //记录上一次的playerAction
        
        response.playerAction = playerAction     
        next();
    },
    function(request, response){
        const playerAction = response.playerAction;
        const gameResult = game(playerAction);
        response.status(200);
        
        if(gameResult == 0){ 
            response.send('平局！');
        }else if(gameResult == 1){
            response.send('你赢了！');
            // playerWon++;  
            response.playerWon = true;     
        }else{
            response.send('你输了！');
        }

    }

)

app.get('/', function(request, response){  
    // 文件流的读取方式
    response.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'))   
})

app.listen(3000);
