/*
 * @Description: dispatchRequest
 * @Author: somours
 * @Date: 2021-12-13 14:32:51
 * @LastEditors: somours
 * @LastEditTime: 2021-12-14 18:00:21
 */
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import xhr from './xhr'
import { buildUrl } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'
function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url!, params)
}

// function transformRequestData(config: AxiosRequestConfig): any {
// return transformRequest(config.data)
// }

// function transfromHeaders(config: AxiosRequestConfig) {
//   const { headers = {}, data } = config
//   return processHeaders(headers, data)
// }

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
export default dispatchRequest
