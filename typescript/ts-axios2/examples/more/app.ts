/*
 * @Author: somours
 * @Date: 2021-12-06 11:53:35
 * @LastEditTime: 2021-12-22 10:45:30
 * @LastEditors: somours
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ts-axios2\examples\base\app.ts
 */
import axios from '../../src/index'
import qs from 'qs'
import { AxiosError } from '../../src/helpers/error'
import { config } from 'shelljs'
// import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

// axios
//   .post(
//     '/more/post',
//     {
//       a: 1
//     },
//     {
//       auth: {
//         username: 'Yee',
//         password: '123456'
//       }
//     }
//   )
//   .then(res => {
//     console.log('auth res', res)
//   })

// axios
//   .get('/more/get', {
//     params: new URLSearchParams('a=b&c=d')
//   })
//   .then(res => {
//     console.log(res)
//   })

// axios
//   .get('/more/get', {
//     params: {
//       a: 1,
//       b: 2,
//       c: ['a', 'b', 'c']
//     }
//   })
//   .then(res => {
//     console.log(res)
//   })

// const instance = axios.create({
//   paramsSerializer(params) {
//     return qs.stringify(params, { arrayFormat: 'brackets' })
//   }
// })

// instance
//   .get('/more/get', {
//     params: {
//       a: 1,
//       b: 2,
//       c: ['a', 'b', 'c']
//     }
//   })
//   .then(res => {
//     console.log(res)
//   })

// axios
//   .get('/more/304')
//   .then(res => {
//     console.log(res)
//   })
//   .catch((e: AxiosError) => {
//     console.log(e.message)
//   })

// axios
//   .get('/more/304', {
//     validateStatus: status => {
//       return status > 200 && status < 400
//     }
//   })
//   .then(res => {
//     console.log(res)
//   })
//   .catch((e: AxiosError) => {
//     console.log(e.message)
//   })

// const instance = axios.create()

// function calculatePerentage(loaded: number, total: number): number {
//   return Math.floor((loaded * 1.0) / total)
// }

// function loadProgressBar() {
//   const setupStartProgress = () => {
//     instance.interceptors.request.use(config => {
//       NProgress.start()
//       return config
//     })
//   }
//   const setupUpdateProgress = () => {
//     const update = (e: ProgressEvent) => {
//       console.log(e)
//       NProgress.set(calculatePerentage(e.loaded, e.total))
//     }
//     instance.defaults.onDownloadProgress = update
//     instance.defaults.onUploadProgress = update
//   }

//   const setupStopProgress = () => {
//     instance.interceptors.response.use(
//       response => {
//         NProgress.done()
//         return response
//       },
//       error => {
//         NProgress.done()
//         return Promise.reject(error)
//       }
//     )
//   }

//   setupStartProgress()
//   setupUpdateProgress()
//   setupStopProgress()
// }

// loadProgressBar()

// const downloadEl = document.getElementById('download')
// downloadEl.addEventListener('click', e => {
//   instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')
// })
// const uploadEl = document.getElementById('upload')
// uploadEl.addEventListener('click', e => {
//   const data = new FormData()
//   const fileEl = document.getElementById('file') as HTMLInputElement
//   if (fileEl.files) {
//     data.append('file', fileEl.files[0])
//     instance.post('/more/upload', data)
//   }
// })

document.cookie = 'a=b'
axios.get('/more/get').then(res => {
  console.log(res)
})

axios
  .post(
    'http://127.0.0.8088/more/server2',
    {},
    {
      // withCredentials: true
    }
  )
  .then(res => {
    console.log(res)
  })
