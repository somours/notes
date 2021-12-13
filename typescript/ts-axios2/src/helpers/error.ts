import { AxiosRequestConfig, AxiosResponse } from './../types/index';
/*
 * @Description: error
 * @Author: somours
 * @Date: 2021-12-13 10:56:47
 * @LastEditors: somours
 * @LastEditTime: 2021-12-13 11:08:00
 */


export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true
    
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError (
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
): AxiosError {
  const error =  new AxiosError(message, config, code, request, response)
  return error
}