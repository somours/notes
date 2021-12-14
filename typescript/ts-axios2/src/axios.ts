/*
 * @Description: axios
 * @Author: somours
 * @Date: 2021-12-13 15:35:41
 * @LastEditors: somours
 * @LastEditTime: 2021-12-14 16:33:47
 */

import Axios from './core/Axios'
import mergeConfig from './core/mergeConfig'
import defaults from './default'
import { extend } from './helpers/util'
import { AxiosStatic, AxiosRequestConfig } from './types'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function(config: AxiosRequestConfig) {
  return createInstance(mergeConfig(defaults, config))
}

export default axios
