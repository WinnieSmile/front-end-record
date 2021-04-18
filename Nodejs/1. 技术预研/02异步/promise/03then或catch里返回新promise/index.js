(function(){
    var promise = interview();
    var promise2 = promise
        .then((res)=>{
            // 下边new Promise的执行结果与promise2保持一致
            return new Promise(function(resolve,reject){
                setTimeout(()=>{
                    resolve('accept')
                }, 400)
            })
        })

    setTimeout(()=>{
        console.log(promise);    
        console.log(promise2);
    }, 800)

    setTimeout(()=>{
        console.log(promise);    
        console.log(promise2);
    }, 1000)

    function interview(){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{      
                if(Math.random() > 0 ){
                    resolve('success')
                }else {
                    reject(new Error('fail'));
                }
            }, 500)
        })    
    }
    
})();

