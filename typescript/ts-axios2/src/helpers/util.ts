const toString = Object.prototype.toString

// 是否是日期格式
export function isDate (val: any) :val is Date{
  return toString.call(val) === '[object Date]'
}

// 是否是对象
export function isObject (val: any) :val is Object{
  return val !== null && typeof val === 'object'
}
