/*
 * @Description: 默认值
 * @Author: somours
 * @Date: 2021-12-14 15:13:40
 * @LastEditors: somours
 * @LastEditTime: 2021-12-14 17:27:33
 */

import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'
import { AxiosRequestConfig } from './types/index'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ]
}

const methodsNoData = ['delete', 'get', 'head', 'options']
methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']
methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
