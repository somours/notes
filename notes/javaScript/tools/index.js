// 判断对象的数据类型
export const isType = type => target => `[Object ${type}]` === Object.prototype.toString.call(target);
const isArray = isType('Array')
console.log(isArray([])) // true
