import basics from '@/utils/libs/basics'

/**
 * @desc:获取当天时间yyyy-mm-dd
 */
export function currentTime () {
  const now = new Date()
  const year = now.getFullYear() // 年
  const month = now.getMonth() + 1 // 月
  const day = now.getDate() // 日
  let clock = year + '-'
  if (month < 10) {
    clock += '0'
  }
  clock += month + '-'
  if (day < 10) {
    clock += '0'
  }
  // clock += day + " ";
  clock += day
  return clock
}
/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
export function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @description: 过滤枚举
 * @author:somours
 * @date:2019/7/29
 * @param:value 指定的值
 * @param:enums 需要过滤的枚举
 * @return:
 */
export const filterEnums = (value, enums) => {
  if (basics.isNull(value) || basics.isNull(enums)) {
    return {
      value: '-',
      label: '-'
    }
  }
  const filterEnum = enums.filter((item) => {
    if (String(item.value) === String(value)) { return item }
  })
  if (filterEnum.length > 0) { return filterEnum[0] } else {
    return {
      value: '-',
      label: '-'
    }
  }
}

/**
 * @description: 获取对象里的值
 * @author:somours
 * @date:2020/1/2
 * @param: obj要枚举的独享
 * @param: key为对象里的key值 (可以key.key的形式)
 * @param: standBy 占位符
 * @return: obj[key]
*/

export const getObjKeyValue = (key, obj, standBy = '-') => {
  let ret = standBy
  if (basics.isNull(key)) {
    return ret
  }
  const tempArr = key.split('.')
  const tempKey = tempArr[tempArr.length - 1]
  if (obj.hasOwnProperty(tempKey) && !basics.isNull(obj[tempKey])) {
    ret = obj[tempKey]
  }
  return ret
}
/**
 * 图片路劲
 * */
export const picturePath = (picturePath) => {
  return picturePath
}
/**
 * @desc:删除提示框
 * @author:somours
 * @param:vm this
 * @return:Promise
 */
export const delectConfirm = (vm) => {
  return new Promise((resolve, reject) => {
    vm.$confirm('此操作将永久删除, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      resolve()
    }).catch(() => {
      reject(new Error(''))
      vm.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  })
}
