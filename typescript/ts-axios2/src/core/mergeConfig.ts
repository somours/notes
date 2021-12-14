/*
 * @Description: 合并策略
 * @Author: somours
 * @Date: 2021-12-14 15:33:23
 * @LastEditors: somours
 * @LastEditTime: 2021-12-14 16:29:36
 */

import { deepMerge, isPlainObject } from '../helpers/util'
import { AxiosRequestConfig } from './../types/index'

const starts = Object.create(null)
// 默认合并策略
function defaultStart(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

// 以参数2为准
function fromVal2Start(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

// 深度合并策略
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    // 应用此策略的地方是axios的headers和auth, 所以此处的val1 也是一个对象,是defaults的headers与auth
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else {
    return val1
  }
}

const startKeysFromVal2 = ['url', 'params', 'data']

startKeysFromVal2.forEach(key => {
  starts[key] = fromVal2Start
})

const startKeysDeepMerge = ['headers', 'auth']
startKeysDeepMerge.forEach(key => {
  starts[key] = deepMergeStrat
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }
  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }
  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }
  function mergeField(key: string): void {
    const strat = starts[key] || defaultStart
    config[key] = strat(config1[key], config2![key])
  }
  return config
}
