import {globalConfig} from "./config";
import dayjs from 'dayjs'
import {isNull} from "./basicTools";
// 处理图片路径
export const getPicturePath = (str:string) => {
  if (str.startsWith('http')) {
    return str
  } else {
    return globalConfig.imageBasePath + str
  }
}

// 时间的格式化
export const timeFormat = (time: Date, format:string = 'YYYY-MM-DD HH:mm:ss') => {
  if (isNull(time)) {
    return '-'
  }
  return dayjs(time).format(format)
}

/*
* 处理列表, 设置其value, label的值
* */
export const setListValueLabel = (arr: Array<Object>, config: Object): Array<Object> => {
  if(arr.length === 0) {
    return arr
  }
  let result = arr.map(i => {
    value: config.value ||
  })
  return result
}
