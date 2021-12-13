/*
 * @Author: your name
 * @Date: 2021-12-03 11:53:29
 * @LastEditTime: 2021-12-13 15:08:02
 * @LastEditors: somours
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ts-axios2\src\xhr.ts
 */
import { createError } from '../helpers/error'
import { parseHeaders } from '../helpers/headers'
import {AxiosRequestConfig, AxiosPromise, AxiosResponse} from '../types/index'

export default function xhr (config: AxiosRequestConfig):AxiosPromise{

  return new Promise((resolve, reject) => {
    const {data = null, url, method = 'get', headers, responseType, timeout} = config
    // console.log('xhr', url, config)
    const request = new XMLHttpRequest()
    if(timeout) {
      request.timeout = timeout
    }
    if(responseType) {
      request.responseType = responseType
    }
    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = function handleLoad () {
      if(request.readyState !== 4) {
        return 
      }

      if(request.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    function handleResponse(response: AxiosResponse) {
      if(response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject (
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null, 
            request, 
            response
          )
        )
      }
    }

    request.ontimeout = function handleTimeout() {
      reject(
        createError(
          `Timeout of ${timeout} ms exceeded`,
          config,
          'ECONNABORTED',
          request
        )
      )
    }
     request.onerror =  function handleError () {
       reject(createError(
         'Network Error',
         config,
         null, 
         request
       ))
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
