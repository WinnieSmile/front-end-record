function getTotal(one: number, two: number): number {
    return one + two 
}
const total: number = getTotal(1, 2)
// console.log('total', total)

function sayHello(): void{
    console.log('hello world')
}

function errorFunction(): never{
    throw new Error();
    console.log('抛出错误', "Hello World");
}

function forNever(): never{
    while (true){}
    console.log('Hello jspang');
}

// 参数是对象
function add({one, two}: {one: number, two:number}): number{
    return one + two
}
const three = add({ one: 1, two: 2 })

// 参数时对象，并且里面只有一个属性时
function getNumber({one}: {one:number}){
    return one
}
const one = getNumber({ one: 1 })
// console.log('one', one)




