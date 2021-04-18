module.exports = function(playAction){
    if(['rock', 'scissor', 'paper'].indexOf(playAction) == -1){
        throw new Error('invalid playAction');
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

    if(computerAction == playAction){
        return 0;
    }else if(
        (computerAction === 'rock' && playAction === 'paper')||
        (computerAction === 'scissor' && playAction === 'rock')||
        (computerAction === 'paper' && playAction === 'scissor')
    ){
        return -1;
    }else{   
        return 1;
    }
}

