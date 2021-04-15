// 写一个Promise，在chrome浏览器控制台运行


(function(){
    var promise = new Promise(function(resolve, reject){
        setTimeout(()=>{
            // resolve()
            reject(new Error());
        }, 500)
    })
    
    console.log(promise)
    
    setTimeout(()=>{
        console.log(promise);
    }, 800)
})()



