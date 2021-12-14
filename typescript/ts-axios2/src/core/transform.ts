import { AxiosTransformer } from './../types/index'
/*
 * @Description: transform, 处理请求与响应的数据
 * @Author: somours
 * @Date: 2021-12-14 17:40:29
 * @LastEditors: somours
 * @LastEditTime: 2021-12-14 17:43:04
 */

export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
) {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}
