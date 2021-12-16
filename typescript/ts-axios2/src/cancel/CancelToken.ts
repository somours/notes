import { CancelExecutor } from './../types/index'
/*
 * @Description: CancelToken
 * @Author: somours
 * @Date: 2021-12-16 17:37:35
 * @LastEditors: somours
 * @LastEditTime: 2021-12-16 17:45:08
 */

interface ResolvePromise {
  (reason?: string): void
}

export default class CancelToken {
  promise: Promise<string>
  reason?: string
  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<string>(resolve => {
      resolvePromise = resolve
    })
  }
}
