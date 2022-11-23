let count: number;
count = 123

let countInference = 123;

const one = 1;
const two = 2;
const three = one + two;
// console.log('three', three)

// // ----- start 不写类型注释-----
// function getTotal(one, two){
//     return one + two;
// }
// const total = getTotal(1, 2);
// console.log('total', total) //这种写法在 ts 文件中报错，在 js 文件中时正常执行返回 3
// // ----- end  ------

function getTotal(one: number, two: number){
    return one + two;
}
const total = getTotal(1, 2);
// console.log('total', total)

const xiaojiejie = {
    name: '六年',
    age: 18
}
console.log('xiaojiejie', xiaojiejie)

