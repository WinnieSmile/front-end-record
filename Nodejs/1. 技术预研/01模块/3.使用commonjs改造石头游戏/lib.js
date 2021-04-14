module.exports = function(playAction){
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
        return 0;
    }else if(
        (computerAction === 'rock' && playAction === 'paper')||
        (computerAction === 'scissor' && playAction === 'rock')||
        (computerAction === 'paper' && playAction === 'scissor')
    ){
        console.log('玩家你赢了')
        return -1;
    }else{
        console.log('玩家你输了');
        return 1;
    }
}

