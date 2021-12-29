import {ref} from 'vue'

// 倒计时的实现
// canClick 一般用于控制按钮处样式处理, 以及防止还在倒计时的时候重复点击
// htmlText 用于页面内的文字展示
// action 是实际的倒计时操作函数,需要用户手动调用
export const timeCountDown = (initTime: number, text: string) => {
  let canClick = ref(true)
  let htmlText = ref(text)
  const action = (fn?: Function):void => {
    if(!canClick.value) {
      return
    }
    let time = initTime
    htmlText.value = `${--time}s`
    canClick.value = false
    const timer = setInterval(() => {
      time--
      htmlText.value = `${time}s`
      if(time <= 0) {
        canClick.value = true
        clearInterval(timer)
        htmlText.value = text
        fn && fn(canClick)
      }
    }, 1000)
  }
  return {
    canClick,
    htmlText,
    action
  }
}

export const timeCountDown1 = (initTime: number) => {
  let time = ref(initTime)
  const action = (fn?: Function):void => {
    console.log('action', time.value)
    if(time.value <= 0) {
      return
    }
    time.value--
    const timer = setInterval(() => {
      time.value--
      if(time.value <= 0) {
        clearInterval(timer)
        time.value = initTime
        fn && fn(time)
      }
    }, 1000)
  }
  return {
    time,
    action
  }
}
