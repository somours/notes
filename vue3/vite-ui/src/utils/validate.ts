// 应用与表单配置的验证规则,以及一些常用的正则表达式

import {isNull} from "@/utils/basicTools";
import {RegValidateEnum} from "@/enums/common";

// 手机号正则
const regPhone = /^1\d{10}$/
// 邮箱正则
const regEmail = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/
// 数字正则
const regNumber = /^(\d)*$/

/**
 * 生成常用的正则验证规则
 */
export const createCommonReg = (reg: RegExp, msg: string) => {
  return (rule:any, value: any, callback: Function) => {
    if(isNull(value)) {
      callback()
    } else if(!reg.test(value)) {
      callback(new Error(msg))
    } else {
      callback()
    }
  }
}

export const getCommonRegular = (type: RegValidateEnum, msg?: string): () => any {
  switch (type) {
    case RegValidateEnum.phone:
      return createCommonReg(regPhone, msg || '请输入正确的电话')
    case RegValidateEnum.email:
      return createCommonReg(regEmail, msg || '请输入正确的邮箱')
    case RegValidateEnum.number:
      return createCommonReg(regNumber, msg || '请输入正确的数字')
    default:
      return () => any
  }
}
