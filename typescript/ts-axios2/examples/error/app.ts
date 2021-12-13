/*
 * @Author: your name
 * @Date: 2021-12-06 11:53:35
 * @LastEditTime: 2021-12-13 11:23:31
 * @LastEditors: somours
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ts-axios2\examples\base\app.ts
 */
import { AxiosError } from '../../src/helpers/error'
import axios from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1'
}).then(res => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

axios({
  method: 'get',
  url: '/error/get',
}).then(res => {
  console.log(res)
}).catch(e => {
  console.log(e)
})

 setTimeout(() => {
   axios({
     method: 'get',
     url: '/error/get'
   }).then(res => {
     console.log(res)
   }).catch(e => {
     console.log(e)
   })
 }, 5000)

 axios({
   method: 'get',
   url: '/error/timeout',
   timeout: 2000,
 }).then(res => {
   console.log(res)
 }).catch((e: AxiosError)=> {
   console.log(e)
   console.log(e.message)
   console.log(e.code)
})