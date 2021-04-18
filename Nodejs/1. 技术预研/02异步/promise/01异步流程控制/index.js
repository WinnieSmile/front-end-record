(function(){
    var promise = interview();
    promise
        .then((res)=>{
            console.log('smile')
        })
        .catch((err)=>{
            console.log('cry')
        })

    function interview(){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{      
                if(Math.random() < 0.8){
                    resolve('success')
                }else {
                    reject(new Error('fail'));
                }
            }, 500)
        })    
    }
    
})();

