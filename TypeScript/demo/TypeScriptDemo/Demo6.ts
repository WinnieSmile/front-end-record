// const numberArr = [1, 2, 3]; //类型推断
const numberArr: number[] = [1,2,3] //类型注解

const stringArr: string[] = ['1', '2', '3']

const undefinedArr: undefined[] = [undefined, undefined]

const arr:(number | string)[] = [1,"string", 2]
// console.log('arr', arr)

// 数组中对象类型的定义 ----start
const xiaojiejies:{
    name:string,
    age:number
}[] = [
    {name:"六年", age: 18},
    {name:'喜喜', age: 18}
]

// 将上面的写法用【类别别名】方式来定义
type Lady = { name: string, age: Number };
const xiaojiejiesLady: Lady[] = [
    {name: "六年", age: 18},
    {name:"喜喜", age: 18}
]
console.log('xiaojiejiesLady', xiaojiejiesLady)

// 数组中对象类型的定义 ----end


// 使用【class类】的方式定义 ----start 错误------
// 此版本，这种写法有问题：https://www.jianshu.com/p/cec1add8ddf0
// class Madam{
//     name: string;
//     age: number;
// }

// const xiaojiejieMadam: Madam[] = [
//     {name:'六年', age: 18},
//     {name:'喜喜', age: 18}
// ]
// console.log('xiaojiejieMadam', xiaojiejieMadam)
// 使用【class类】的方式定义 ----end 错误------















