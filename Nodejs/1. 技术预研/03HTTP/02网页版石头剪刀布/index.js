/*
 * @Author: your name
 * @Date: 2021-04-18 23:21:35
 * @LastEditTime: 2021-04-18 23:49:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-end-record\Nodejs\1. 技术预研\03HTTP\02网页版石头剪刀布\index.js
 */
/*
 * @Author: your name
 * @Date: 2021-04-18 23:21:35
 * @LastEditTime: 2021-04-18 23:42:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-end-record\Nodejs\1. 技术预研\03HTTP\02网页版石头剪刀布\index.js
 */
const querystring = require('querystring');
const http = require('http');
const url = require('url');
const fs = require('fs');

const game = require('./game');

http.createServer(function(request, response){
    const parseUrl = url.parse(request.url)
    
    if(request.url == '/favicon.ico'){
        response.writeHead(200);
        response.end();
        return;
    }

    if(parseUrl.pathname == '/game'){
        const query = querystring.parse(parseUrl.query);
        const playAction = query.action;

        console.log(game(playAction));

        response.writeHead(200);
        response.end();
    }
    
    if(require.url == '/'){
        // 文件流的读取方式
        fs.createReadStream(__dirname + '/index.html').pipe(response);
    }
}).listen(3000)