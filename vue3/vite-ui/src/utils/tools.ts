import {globalConfig} from "./config";
import dayjs from 'dayjs'
import {isNull} from "./basicTools";
import placeholder from "lodash/fp/placeholder";
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
* 参数:
*   arr 对象数组列表
*   config value, label 的替换值
* 返回值
*   新的数组 比起arr数组新增或者变更了value,label 选项
* */

interface ValueLabelConfig {
  value: string
  label: string
  [propName: string]: string
}
interface PlainObject {
  [propName: string]: any
}
export const setListValueLabel = (arr: Array<PlainObject>, config: ValueLabelConfig): Array<PlainObject> => {
  if(arr.length === 0) {
    return arr
  }
  const keys = Object.keys(config)
  let result = arr.map(i => {
    const tempItem = {...i}
    keys.forEach(key => {
      tempItem[key] = i[config[key]]
    })
    return tempItem
  })
  return result
}
/*
* 筛选列表,根据value的值,获取相应的展示label值
* arr: 对象数组, 里面需要有value,label选项,这样才能获取到正确的值
* value: 作为比对的值
* placeholder: 占位符,默认 '-'
* 返回值: 占位符或者任意值,一般是字符串
* */
type StringAndNumber = string | number
interface FilterEnumsParams {
  list: Array<PlainObject>
  value: StringAndNumber | StringAndNumber[]
  config:  ValueLabelConfig
  placeholder: string
}

export const filterEnums = (arr: Array<PlainObject>, value:any, placeholder?:string): any{
  placeholder = placeholder || '-'
  if(arr.length === 0 || isNull(value)) {
    return placeholder
  } else {
    const tempObj = arr.find(i => i.value === value!) || {}
    return tempObj.label || placeholder
  }
}
