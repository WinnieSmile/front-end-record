(function(){
    var promise = interview();
    var promise2 = promise
        .then((res)=>{
            throw new Error('refuse');
            // return 'accept'
        })

    setTimeout(()=>{
        console.log(promise);    
        console.log(promise2);
    }, 800)

    function interview(){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{      
                if(Math.random() >0 ){
                    resolve('success')
                }else {
                    reject(new Error('fail'));
                }
            }, 500)
        })    
    }
    
})();

