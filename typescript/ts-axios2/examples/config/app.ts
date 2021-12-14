import { AxiosTransformer } from './../../src/types/index'
/*
 * @Author: somours
 * @Date: 2021-12-06 11:53:35
 * @LastEditTime: 2021-12-14 17:50:54
 * @LastEditors: somours
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ts-axios2\examples\base\app.ts
 */
import axios from '../../src/index'
import qs from 'qs'

// axios.defaults.headers.common['test2'] = '123'

// axios({
//   url: '/config/post',
//   method: 'post',
//   data: qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test: '321'
//   }
// }).then(res => {
//   console.log(res.data)
// })

// axios({
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1
//   },
//   transformRequest: [
//     function(data) {
//       return JSON.stringify(data)
//     },
//     ...(axios.defaults.transformRequest as AxiosTransformer[])
//   ],
//   transformResponse: [
//     ...(axios.defaults.transformResponse as AxiosTransformer[]),
//     function(data) {
//       if (typeof data === 'object') {
//         data.b = 2
//       }
//       return data
//     }
//   ]
// }).then(res => {
//   console.log(res.data)
// })

const instance = axios.create({
  transformRequest: [(function (data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function (data) {
    if (typeof data === 'object') {
      data.b = 2
      data.c = 3
    }
    return data
  }]
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})
