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
  // caseAndCase (field) {
  //   return field.replace(/\_\w/g, function (letter, position) {
  //     letter = letter.replace(/\_/g, '')
  //     return letter.toUpperCase()
  //   })
  // }
  // copy: (obj) => { // 深拷贝
  //   const objClone = Array.isArray(obj) ? [] : {}
  //   if (obj && typeof obj === 'object') {
  //     for (const key in obj) {
  //       if (obj.hasOwnProperty(key)) {
  //         // 判断ojb子元素是否为对象，如果是，递归复制
  //         if (obj[key] && typeof obj[key] === 'object') {
  //           objClone[key] = copy(obj[key])
  //         } else {
  //           // 如果不是，简单复制
  //           objClone[key] = obj[key]
  //         }
  //       }
  //     }
  //   }
  //   return objClone
  // }
}
basics.install = function (Vue) {
  Vue.prototype.basics = basics
}

export default basics
