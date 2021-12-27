/*
 * @Author: your name
 * @Date: 2021-12-03 11:53:29
 * @LastEditTime: 2021-12-27 15:17:05
 * @LastEditors: somours
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ts-axios2\src\xhr.ts
 */
import cookie from '../helpers/cookie'
import { createError } from '../helpers/error'
import { parseHeaders } from '../helpers/headers'
import { isURLSameOrigin } from '../helpers/url'
import { isFormData } from '../helpers/util'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      auth,
      validateStatus,
      onDownloadProgress,
      onUploadProgress,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName
    } = config
    // console.log('xhr', url, config)
    // 整个流程分为 7 步：
    // - 创建一个 `request` 实例。
    // - 执行 `request.open` 方法初始化。
    // - 执行 `configureRequest` 配置 `request` 对象。
    // - 执行 `addEvents` 给 `request` 添加事件处理函数。
    // - 执行 `processHeaders` 处理请求 `headers`。
    // - 执行 `processCancel` 处理请求取消逻辑。
    // - 执行 `request.send` 方法发送请求。
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url!, true)
    configureRequest()
    addEvents()
    processHeaders()
    processCancel()

    function configureRequest(): void {
      if (timeout) {
        request.timeout = timeout
      }
      if (responseType) {
        request.responseType = responseType
      }
      if (withCredentials) {
        request.withCredentials = true
      }
    }

    function addEvents(): void {
      request.onreadystatechange = function handleLoad() {
        if (request.readyState !== 4) {
          return
        }

        if (request.status === 0) {
          return
        }

        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        const responseData =
          responseType && responseType !== 'text' ? request.response : request.responseText
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
      request.ontimeout = function handleTimeout() {
        reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
      }
      request.onerror = function handleError() {
        reject(createError('Network Error', config, null, request))
      }
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function handleResponse(response: AxiosResponse) {
      if (!validateStatus || validateStatus(response.status)) {
        resolve(response)
      } else {
        reject(
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

    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }

      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }
    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise
          .then(reason => {
            request.abort()
            reject(reason)
          })
          .catch(e => {
            console.log('cancel', e)
          })
      }
    }

    request.send(data)
  })
}
