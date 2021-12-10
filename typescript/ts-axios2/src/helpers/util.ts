/*
 * @Author: your name
 * @Date: 2021-12-03 15:41:55
 * @LastEditTime: 2021-12-10 16:53:14
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ts-axios2\src\helpers\util.ts
 */
const toString = Object.prototype.toString

// 是否是日期格式
export function isDate (val: any) :val is Date{
  return toString.call(val) === '[object Date]'
}

// 是否是对象
export function isObject (val: any) :val is Object{
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any) :val is Object {
  return toString.call(val) === '[object Object]'
}