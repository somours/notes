<template>
  <div>
    验证码示例
    <br/>
    <!--  <el-button @click="countDown" :disabled="!canClick">{{htmlText}}</el-button>-->
    <el-button @click="countDown1" :disabled="time > 0 && time < 5">{{time > 0 && time < 5 ? `${time}s` : '获取验证码'}}</el-button>
  </div>
</template>

<script lang="ts">
import {timeCountDown, timeCountDown1} from "@/utils/component"
import {defineComponent} from "vue";

export default defineComponent({
  setup () {
    // const {canClick, htmlText, action} = timeCountDown(5, '获取验证码')
    // console.log('倒计时函数初始化', canClick, htmlText, action)
    // const countDown = () => action((canClick) => {
    //   setTimeout(() => {
    //     console.log('倒计时完成后的操作', canClick)
    //   }, 2000)
    // })
    const {time, action } = timeCountDown1(5)
    const countDown1 = () => action((time) => {
      setTimeout(() => {
        console.log('倒计时完成后的操作1', time)
      }, 2000)
    })
    return {
      // canClick,
      // htmlText,
      // countDown,
      time,
      countDown1
    }
  }
})
</script>

<style scoped>

</style>
