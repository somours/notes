/*
 * @Author: your name
 * @Date: 2021-12-03 11:45:59
 * @LastEditTime: 2021-12-10 17:47:59
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ts-axios2\src\types\index.ts
 */

export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType // "" | "arraybuffer" | "blob" | "document" | "json" | "text"
}

export type Method = 'get' | 'GET'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'delete' | 'DELETE'
| 'head' | 'HEAD'
| 'patch' | 'PATCH'
| 'options' | 'OPTIONS'

export interface AxiosResponse {
  data:any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}