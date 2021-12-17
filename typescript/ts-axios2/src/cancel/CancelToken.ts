import { Canceler, CancelExecutor, CancelTokenSourece } from './../types/index'
import Cancel from './Cancel'
/*
 * @Description: CancelToken
 * @Author: somours
 * @Date: 2021-12-16 17:37:35
 * @LastEditors: somours
 * @LastEditTime: 2021-12-17 14:00:09
 */

interface ResolvePromise {
  (reason: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  static source(): CancelTokenSourece {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }
}
