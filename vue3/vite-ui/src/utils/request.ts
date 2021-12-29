import axios, {AxiosRequestConfig, AxiosResponse, AxiosPromise} from 'axios'
// @ts-ignore
import qs from 'qs'

interface MyAxiosRequestConfig extends AxiosRequestConfig {
  loading?: boolean
}

interface ResponseData<T=any> {
  code: string
  data: T
  message?: string
}

enum CodeEnums {
  success= '1',
  fail = 'error',
  logout = '2',
  blackList = '-1000'
}

const baseUrl = process.env.baseUrl

const instance = axios.create({
  baseURL: baseUrl,
  // timeout: 0,
  transformRequest: [function (data, headers) {
    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    if (['application/json'].includes(headers!['Content-Type'])) {
      return JSON.stringify(data);
    }
    if (headers!['Content-Type'] === 'application/x-www-form-urlencoded') {
      return qs.stringify(data);
    }
    return data;
  }]
})

// 拦截器
// 请求
instance.interceptors.request.use((config: MyAxiosRequestConfig) => {
  // todo
  // 1 给请求头设置userKey, userToken
  // 2 给请求设置sign或者其他需要的头部
  // 3 设置数据的传输格式, 默认为application/json, 但可配置化
  // 4 给请求增加loading配置, 并设置全局的loading效果样式, 默认没有
  return config
}, (error => {
  console.log('request error',error)
  return error
}))

// 响应
instance.interceptors.response.use((response) => {
  const data: ResponseData | undefined = response.data
  if(!data) {
    return {
      code: CodeEnums.fail,
      data: ''
    } // 返回undefined
  }
  // todo
  // 1 当code是登录过期需要重新登录时,退出页面,跳转至登录页
  // 2 code是失败,错误时,统一弹出提示消息
  // 3 其他code业务时,具体操作

  if(data.code === CodeEnums.logout) {
    console.log(data)
  }
  return response
}, error => {
  console.log(`response error`, error)
  return error
})

function request<T=any, D=any>(config: AxiosRequestConfig<T>): Promise<ResponseData<D>>{
  return new Promise((resolve, reject) => {
    instance.request(config).then((res:AxiosResponse):void => {
      resolve(res.data)
    }).catch(e => {
      reject(e)
    })
  })
}
export default request
interface MenuRequestData {
  userId: number
}
interface MenuResponseData {
  menu: object[]
}

const menuList = request<MenuRequestData, MenuResponseData>({
  url: '/getMemuList',
  method: 'get',
  params: {
    userId: 1
  }
}).then(res => {
  console.log(res.code)
})

// 这种方法可能较现在项目通用一点
// 可以吧泛型T直接写死成响应数据的类型,因为一个接口的响应基本都是固定一种的
// const getMenuList = <T>(data:MenuRequestData): AxiosPromise<T> => {
//   return (axios.get('/getMenuList', {params:data}))
// }
// const getMenuList = <MenuResponseData>(data:MenuRequestData): AxiosPromise<MenuResponseData> => {
//   return (axios.get('/getMenuList', {params:data}))
// }
interface UserInfo {
  userName: string
  userId: number
  roleId: number
}

// axios实例的使用
export const getUserInfo = <T>(data?:object) => instance.get<T>('/getUserInfo', {params: data})
getUserInfo<UserInfo>().then(res => {
  console.log('userInfo', res.data.userId)
})
