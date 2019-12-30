export const basics = {
  isNull (o) {
    return (o === null || o === '' || o === undefined)
  },
  isObj (o) { // 是否对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
  },
  isObjNull (o) {
    return Object.keys(o).length === 0
  },
  isArray (o) { // 是否数组
    return (Object.prototype.toString.call(o) === '[object Array]')
  },
  isFunction (o) { // 是否函数
    return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
  },
  isString (o) { // 是否字符串
    return Object.prototype.toString.call(o).slice(8, -1) === 'String'
  },
  isFile (o) { // 是否文件
    return Object.prototype.toString.call(o).slice(8, -1) === 'File'
  },
  isBoolean (o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
  },
  isArrNull (o) {
    return (JSON.stringify(o) === '[]')
  },
  isNumber (o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
  }
}
basics.install = function (Vue) {
  Vue.prototype.basics = basics
}

export default basics
