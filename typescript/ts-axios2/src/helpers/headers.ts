/*
 * @Author: somours
 * @Date: 2021-12-10 17:17:28
 * @LastEditTime: 2021-12-13 10:06:34
 * @LastEditors: somours
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ts-axios2\src\helpers\headers.ts
 */

import { isPlainObject } from "./util"

function normalizeHeaderName (headers: any, normalizedName: string) :void {
  if(!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if(name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}
export function processHeaders(headers:any, data:any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if(isPlainObject(data)) {
    if(headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders (headers: string):any {
  let parsed = Object.create(null)
  if(!headers) {
    return parsed
  }
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if(!key) {
      return
    }
    if(val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}