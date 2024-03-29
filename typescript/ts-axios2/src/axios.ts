/*
 * @Description: axios
 * @Author: somours
 * @Date: 2021-12-13 15:35:41
 * @LastEditors: somours
 * @LastEditTime: 2021-12-20 17:44:31
 */

import Axios from './core/Axios'
import mergeConfig from './core/mergeConfig'
import defaults from './default'
import { extend } from './helpers/util'
import { AxiosStatic, AxiosRequestConfig } from './types'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config: AxiosRequestConfig) {
  return createInstance(mergeConfig(defaults, config))
}
axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel
axios.all = function all(promises) {
  return Promise.all(promises)
}

axios.spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr)
  }
}

axios.Axios = Axios

export default axios
