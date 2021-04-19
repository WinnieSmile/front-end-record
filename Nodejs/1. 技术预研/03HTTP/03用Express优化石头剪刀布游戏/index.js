const querystring = require('querystring');
const http = require('http');
const url = require('url');
const fs = require('fs');
const game = require('./game');
const express = require('express');

// 玩家胜利次数，如果超过3，则后续往该服务器的请求都返回500
let playerWon = 0;

let playerLastAction = null;  // 玩家的上一次游戏动作
let sameCount = 0;  // 玩家连续出同一个动作的次数

const app = express();

app.listen(3000);

http.createServer(function(request, response){
    const parsedUrl = url.parse(request.url)
    
    if(parsedUrl.pathname == '/favicon.ico'){
        response.writeHead(200);
        response.end();
        return;
    }

    if(parsedUrl.pathname == '/game'){
        const query = querystring.parse(parsedUrl.query);
        const playerAction = query.action;

        // 如果人赢3次，则：电脑返回500
        if(playerWon >= 3 || sameCount == 9){
            response.writeHead(500);
            response.end('我再也不和你玩了！');
            return
        }

        if(playerLastAction && playerAction == playerLastAction){
            sameCount++;
        }else {
            sameCount = 0;
        }
        playerLastAction = playerAction   //记录上一次的playerAction

        // 用户连续出同一个行为的次数 为3次的话表示作弊
        if(sameCount >= 3){
            response.writeHead(400);
            response.end('你作弊！'); 
            sameCount = 9;
            return
        }

        const gameResult = game(playerAction);
     
        response.writeHead(200);
        if(gameResult == 0){ 
            response.end('平局！');
        }else if(gameResult == 1){
            console.log('playerWon', playerWon)
            response.end('你赢了bbb！');
            playerWon++;  // 人赢的次数
            
        }else{
            response.end('你输了！');
        }

    }
    
    if(parsedUrl.pathname == '/'){
        // 文件流的读取方式
        fs.createReadStream(__dirname + '/index.html').pipe(response);
    }
}).listen(3000)