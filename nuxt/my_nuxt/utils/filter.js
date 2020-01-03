/**
 * @param date 时间戳（毫秒）
 * @param fmt 格式
 * @returns {string}
 */
export function parseTimeTwo (time, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (time === '' || !time || time === '-') { return '-' }
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) { time = parseInt(time) * 1000 }
    date = new Date(time)
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  // 遍历这个对象
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt

  function padLeftZero (str) {
    return ('00' + str).substr(str.length)
  }
}
