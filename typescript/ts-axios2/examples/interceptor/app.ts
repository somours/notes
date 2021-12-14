/*
 * @Author: somours
 * @Date: 2021-12-06 11:53:35
 * @LastEditTime: 2021-12-14 14:06:39
 * @LastEditors: somours
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ts-axios2\examples\base\app.ts
 */
import axios from '../../src/index'

axios.interceptors.request.use(config => {
  config.headers.test += '1'
  console.log('1')
  return config
})

axios.interceptors.request.use(config => {
  config.headers.test += '2'
  console.log('2')
  return config
})

axios.interceptors.request.use(config => {
  console.log('3')
  config.headers.test += '3'
  return config
})

axios.interceptors.response.use(res => {
  res.data = '1'
  return res
})

let interceptor = axios.interceptors.response.use(res => {
  res.data += '2'
  return res
})

axios.interceptors.response.use(res => {
  res.data += '3'
  return res
})

axios.interceptors.response.eject(interceptor)

axios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
}).then(res => {
  console.log(res.data)
})
