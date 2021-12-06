import {AxiosRequestConfig} from './types/index'

export default function xhr (config: AxiosRequestConfig) {
  const {data = null, url, method = 'get'} = config
  // console.log('xhr', url, config)
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)
  request.send(data)
}
