/*
 * @Description: Cancel构造函数
 * @Author: somours
 * @Date: 2021-12-17 10:50:53
 * @LastEditors: somours
 * @LastEditTime: 2021-12-17 11:11:35
 */

export default class Cancel {
  message?: string
  constructor(message?: string) {
    this.message = message
  }
}

export function isCancel(value: any): boolean {
  return value instanceof Cancel
}
