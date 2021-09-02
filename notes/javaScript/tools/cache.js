export class Local {
  constructor(type = 'localStorage') { // type: 'localStorage', 'sessionStorage'
    this.local = window.localStorage
  },
  get(key) { // 获取本地缓存值
    return JSON.parse(this.local.getItem(key))
  },
  set (key, value) { // 设置本地缓存值
    this.local.setItem(key, JSON.stringify(value))
  },
  remove (key) { // 移除某项缓存
    this.local.removeItem(key)
  }
}

const defaultLocal = new Local()
export default defaultLocal

// 项目里一般默认的userKey, userToken
export const localEnums = {
  userKey: 'userKey',
  userToken: 'Token',
}

// 获取本地的userKey
export const getUserKey = () => defaultLocal.get(localEnums.userKey)
// 设置本地的userKey
export const setUserKey = (value) => defaultLocal.set(localEnums.userKey, value)
// 移除本地的userKey
export const removeUserKey = () => defaultLocal.remove(localEnums.userKey)
// 获取本地的userToken
export const getUserToken = () => defaultLocal.get(localEnums.userToken)
// 设置本地的userToken
export const setUserToken = value => defaultLocal.set(localEnums.userToken, value)
// 移除本地的userToken
export const removeUserToken = () => defaultLocal.remove(localEnums.userToken)

