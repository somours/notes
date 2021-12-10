/*
 * @Author: your name
 * @Date: 2021-12-03 11:53:29
 * @LastEditTime: 2021-12-10 17:56:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ts-axios2\src\xhr.ts
 */
import {AxiosRequestConfig, AxiosPromise, AxiosResponse} from './types/index'

export default function xhr (config: AxiosRequestConfig):AxiosPromise{

  return new Promise((resolve) => {
    const {data = null, url, method = 'get', headers, responseType} = config
    // console.log('xhr', url, config)
    const request = new XMLHttpRequest()
    if(responseType) {
      request.responseType = responseType
    }
    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad () {
      if(request.readyState !== 4) {
        return 
      }

      const responseHeaders = request.getAllResponseHeaders()
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }

    Object.keys(headers).forEach(name => {
      if(data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
  })
}
