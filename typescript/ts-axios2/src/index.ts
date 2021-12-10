/*
 * @Author: your name
 * @Date: 2021-12-03 11:44:48
 * @LastEditTime: 2021-12-10 17:56:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ts-axios2\src\index.ts
 */
import {AxiosRequestConfig, AxiosPromise} from './types/index'
import xhr from './xhr'
import { buildUrl } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'
function axios (config: AxiosRequestConfig):AxiosPromise {
  processConfig(config)
  return xhr(config)
}

function processConfig (config: AxiosRequestConfig):void {
  config.url = transformUrl(config)
  config.headers = transfromHeaders(config)
  config.data = transformRequestData(config)
}

function transformUrl (config:AxiosRequestConfig):string {
  const {url, params} = config
  return buildUrl(url, params)!
}

function transformRequestData (config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transfromHeaders (config:AxiosRequestConfig) {
  const {headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
