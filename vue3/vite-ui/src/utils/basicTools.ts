// 是否是空值
export const isNull = (o:any):boolean => {
  return o === null || o === '' || o === undefined
}
// 是否对象
export const isObj = (o:any):boolean => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
}
// 是否数组
export const isArray = (o:any):boolean => {
  return Object.prototype.toString.call(o) === '[object Array]'
}
// 是否FormData
export const isFormData = (o:any):boolean => {
  return Object.prototype.toString.call(o) === '[object FormData]'
}
// 是否File
export const isFile = (o:any):boolean => {
  return Object.prototype.toString.call(o) === '[object File]'
}
// 是否FileList
export const isFileList = (o:any):boolean => {
  return Object.prototype.toString.call(o) === '[object FileList]'
}
// 是否函数
export const isFunction = (o:any):boolean => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
}
// 是否字符串
export const isString = (o:any):boolean => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'String'
}
//  是否是数字
export const isNumber = (o:any):boolean=> {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
}
