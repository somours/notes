/*
 * @Description: axios
 * @Author: somours
 * @Date: 2021-12-13 15:35:41
 * @LastEditors: somours
 * @LastEditTime: 2021-12-13 17:46:08
 */

import Axios from './core/Axios'
import { extend } from './helpers/utils'
import { AxiosInstance } from './types'

function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
