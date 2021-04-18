// 基本写法
// (function(){
//     const result = async function(){
//         var content = new Promise((resolve, reject) => {
//             setTimeout(()=>{
//                 resolve(6);
//             }, 500)
//         })
    
//         console.log(content);
//         return 4
//     }()

//     setTimeout(()=>{
//         console.log(result)
//     }, 800)   
// })()

// await 写法
// (function(){
//     const result = async function(){
//         var content = await new Promise((resolve, reject) => {
//             setTimeout(()=>{
//                 resolve(6);
//             }, 500)
//         })
    
//         console.log(content);
//         return 4
//     }()

//     setTimeout(()=>{
//         console.log(result)
//     }, 800)
     
// })()


// await try-catch 捕捉到await的错误
(function(){
    const result = async function(){
        try {
            var content = await new Promise((resolve, reject) => {
                setTimeout(()=>{
                    reject(new Error('8'));
                }, 500)
            }) 
        } catch (e) {
            console.log('error', e.message);
        }
            
        console.log(content);
        return 4
    }()

    setTimeout(()=>{
        console.log(result)
    }, 800)    
})()