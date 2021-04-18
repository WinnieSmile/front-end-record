(function(){

    Promise
        .all([
            interview('greekbang'),
            interview('tencent')
        ])
        .then(()=>{
            console.log('smile')  //两次面试同时成功
        })
        .catch((err)=>{
            // 某一个公司面试失败，打印出该家公司名称
            console.log('cry for ' + err.name);
        })

    function interview(name){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{      
                if(Math.random() > 0.2 ){
                    resolve('success')
                }else {
                    var error = new Error('fail');
                    error.name = name;
                    reject(error);
                }
            }, 500)
        })    
    }
    
})();

