// import {FormComponentTypesEnum} from '@/enums/common'
// import {isNull} from "@/utils/basicTools";
// import {FormItemComponentAttrs} from "@/components/base/form/type";
// // export const renderStrategy = {}
//
// export const createRenderStrategy = () => {
//   const strategy = Object.create(null)
//   /*
//   * config 为组件的配置
//   * form 为表单的实际数据
//   * */
//   [FormComponentTypesEnum.input].forEach((key:FormItemComponentAttrs) => {
//     strategy[key] = (config, form) => {
//
//     }
//   })
// }
//
// // 获取默认值
// export const getInitValue = (componentAttrs: FormItemComponentAttrs, defaultValue: any ) => {
//   if(!isNull(defaultValue)) {
//     return defaultValue
//   }
//   let value:any = ''
//   const compType = componentAttrs.compType
//   if(compType === FormComponentTypesEnum.select) {
//     value = componentAttrs.multiple ? [] : ''
//   }
//   return value
// }
