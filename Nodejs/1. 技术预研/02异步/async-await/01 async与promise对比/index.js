console.log(async function(){
    throw new Error('4')
}())


console.log(function(){
    return new Promise((resolve, reject) => {
        resolve(new Error('4'));
    })
}())
