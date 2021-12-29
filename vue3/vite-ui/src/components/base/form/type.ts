import {FormComponentTypesEnum} from "@/enums/common";

export interface FormItemComponentAttrs {
  [propName: string]: any
}

// todo formItemConfig 的配置类型, 还需要细化每一个字段的描述
export interface FormItemConfig {
  key: string
  title: string
  type?: FormComponentTypesEnum // 判断是渲染什么组件
  show?: boolean | ((value: any) => boolean) // 控制该项组件的显示与隐藏
  render?: Function
  slot?: string
  componentAttrs?: FormItemComponentAttrs // 里面内部的组件的属性
  formItemAttrs?: object // el-form-item 的属性
  defaultValue?: any // 一些组件的默认值
  dealValueFn?: (value: any) => any // 数据处理函数, 要注意包含了默认值的处理,保持与接口数据统一的处理, 例如: tags: '1,2,3', 处理成[1,2,3], 设置默认值时也应设置","分割的字符串
  getData?: () => FormData
  [propName: string]: any
}

export type FormConfigList = FormItemConfig[]

export interface FormData {
  data?: FormItemConfig
  list: FormConfigList
  form: object
}
