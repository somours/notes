/* eslint-disable */

export const commonReg = (reg, msg) => {
  return (rule, value, callback) => {
    if (!(reg.test(value))) {
      callback(new Error(msg))
    } else {
      callback()
    }
  }
}

export function regular (type) {
  switch (type) {
    case 'phone': // 手机号码
      return commonReg(/^1\d{10}$/, '请输入正确的电话号码')
    case 'ID': // 身份证
      return commonReg(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, '请输入正确的身份证号')
    case 'pwd': // 密码以字母开头，长度在6~16之间，只能包含字母、数字和下划线
      return commonReg(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/, '请输入正确的密码')
    case 'email': // 邮箱
      return commonReg(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/, '请输入正确的邮箱')
    case 'URL': // 网址
      return commonReg(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/, '请输入正确的网址')
    case 'IP': // IP
      return commonReg(/((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/, '请输入正确的IP')
    case 'number': // 数字
      return commonReg(/^(\d)*$/, '请输入正确的数字')
    case 'fullName': // 姓名
      return commonReg(/^([a-zA-Z0-9\u4E00-\u9FA5\·]{1,10})$/, '请输入正确的姓名')
    case 'percentage':
      return commonReg(/^(100|[1-9]?\d(\.\d\d?)?)%$/, '请输入百分数如10%')
    case 'floatingNum':
      return commonReg(/^\d+\.\d{1,2}$/, '输入最多2位小数且是数字')
    case 'floatingPoint':
      return commonReg(/0\.[0-9]+/, '请输入大于0小于1的小数')
    case 'mechanismPwd':
      return commonReg(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,18}$/, '请输入6~18位需要包含字母,数字,特殊字符')
    case 'mechanismUsn': // 账号以字母开头，长度在6~18之间，只能包含字母、数字和下划线
      return commonReg(/^.{6,18}$/, '请输入6~18位字符')
    case 'mechanismFullName': // 姓名
      return commonReg(/^([\u4E00-\u9FA5]{2,8})$/, '请输入正确的姓名')
    case 'couponIds': // 优惠券Id,用","隔开,只能输入数字
      return commonReg(/^[0-9][0-9,]*$/, '只能输入数字,多个ID用","隔开')
    default:
      console.error('No valid regular')
      return true
  }
}
