/*
 * @Author: your name
 * @Date: 2021-12-10 16:36:01
 * @LastEditTime: 2021-12-13 10:10:06
 * @LastEditors: somours
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ts-axios2\src\helpers\data.ts
 */

import { isPlainObject } from "./util";

export function transformRequest(data:any):any {
  if(isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data: any): any {
  if(typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {
      // do thing
    }
  }
   
  return data
}