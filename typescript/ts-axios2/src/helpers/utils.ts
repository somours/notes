/*
 * @Description: 工具函数
 * @Author: somours
 * @Date: 2021-12-13 15:21:24
 * @LastEditors: somours
 * @LastEditTime: 2021-12-13 15:26:22
 */

export function extend<T, U> (to: T, from: U): T & U {
  for(let key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}