interview(function(res){
    // if(res instanceof Error){
    //     return console.log('cry')
    // }
    if(res){
        return console.log('cry')
    }
    console.log('smile');
})

function interview(callback){
    setTimeout(()=>{
        // callback('success');
        if(Math.random() < 0.8){
            callback(null,'success')
        }else {
            callback(new Error('fail'));
        }
    }, 500)
}