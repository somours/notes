import {globalConfig} from "./config";
import dayjs from 'dayjs'
import {isNull} from "./basicTools";
import {keyOf} from "element-plus/es/utils/props";
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

interface ValueLabelConfig extends PlainObject{
  value: string
  label: string
  [propName: string]: string
}
interface PlainObject {
  [propName: string]: any
}
export const setListValueLabel = <T extends PlainObject>(arr: Array<T>, config: ValueLabelConfig): Array<T | T & ValueLabelConfig> => {
  if(arr.length === 0) {
    return arr
  }
  const keys = Object.keys(config)
  let result = arr.map(i => {
    const tempItem = Object.create(i)
    keys.forEach(key => {
      tempItem[key] = i[config[key]]
    })
    return tempItem
  })
  return result
}
/*
* 筛选列表,根据value的值,获取相应的展示label值
* arr: 对象数组, 这个对象有什么属性,那么相应的返回值也有什么属性,并额外加上configkeys里面每一个属性值作为key的数据
* value: 作为比对的值,先只用字符串 (可以为数字,字符串, 或者字符串,数字数组),
* configkeys: {}, 一个对象, value, label 配置必须存在 ,配置需要添加或者转换的key, 默认值为{value: 'value', label: 'label'}, 但还可以添加其他属性
* placeholder: 占位符,默认 '-', 字符串
* 返回值: 返回跟数组对象一样的类型, 并新添加属性: configkeys里面的每一个属性值
* */
interface FilterEnumsParams<T>{
  list: Array<T>
  value: string
  configKeys?:  ValueLabelConfig
  placeholder?: string
}

export const filterEnums = <T extends {[propName: string]: any}>(params: FilterEnumsParams<T>): T&ValueLabelConfig => {
  const {list = [], value = '', configKeys = {value: 'value', label: 'label'}, placeholder = '-'} = params
  const keys = Object.keys(configKeys)
  let defaultResult = Object.create(null)
  if(list.length === 0 || isNull(value)) {
    keys.forEach(key => {
      defaultResult[key] = placeholder
    })
    return defaultResult
  } else {
    const valueKey = configKeys.value
    const index = list.findIndex((i:T) => {
      const flag = i[valueKey] === value
      if(flag) {
        defaultResult = {...i}
        keys.forEach((key:string) => {
          defaultResult[key] = i[configKeys[key]] || placeholder
        })
      }
      return flag
    })
    if(index === -1) {
      keys.forEach(key => {
        defaultResult[key] = placeholder
      })
    }
    return defaultResult
  }
}
