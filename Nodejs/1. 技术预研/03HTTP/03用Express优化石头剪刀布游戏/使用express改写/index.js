/*
 * @Author: your name
 * @Date: 2021-04-20 23:07:30
 * @LastEditTime: 2021-04-20 23:07:39
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \front-end-record\Nodejs\1. 技术预研\03HTTP\03用Express优化石头剪刀布游戏\使用express改写\index.js
 */
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
    // response.writeHead(200);
    // response.end();
    return;
})

app.get('/game', 
    function(request, response, next){
        // const parsedUrl = url.parse(request.url);
        // const query = querystring.decode(parsedUrl.query);
        const query = request.query;
        const playerAction = query.action;

        // 如果人赢3次，则：电脑返回500
        if(playerWon >= 3 || sameCount == 9){
            // response.writeHead(500);
            // response.end('我再也不和你玩了！');
            response.status(500);
            response.send('我再也不和你玩了！');
            return
        }
        if(!playerAction){
            // response.writeHead(400);
            // response.end();
            response.status(400);
            response.send();
            return;
        }

        if(playerAction == playerLastAction){
            sameCount++;
            if(sameCount >= 3){
                response.status(400);
                response.send('你作弊！我再也不玩了！');

                // response.writeHead(400);
                // response.end('你作弊！我再也不玩了！');
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
        const playerAction = response.playerAction
        const gameResult = game(playerAction);
        // response.writeHead(200);
        response.status(200);
        
        if(gameResult == 0){ 
            // response.end('平局！');
            response.send('平局！');
        }else if(gameResult == 1){
            // response.end('你赢了！');
            response.send('你赢了！');
            playerWon++;  // 人赢的次数       
        }else{
            // response.end('你输了！');
            response.send('你输了！');
        }

    }

)

app.get('/', function(request, response){  
    // 文件流的读取方式
    response.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'))
    // response.writeHead(200);
    // fs.createReadStream(__dirname + '/index.html').pipe(response);   
})

app.listen(3000);
