<template>
<el-time-picker
  v-model="innerValue"
  v-bind="$attrs"
>
</el-time-picker>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
export default defineComponent({
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number, Array],
      default: ''
    }
  },
  setup (props, ctx) {
    const propsValue = props.value
    const innerValue = computed({
      get () {
        return propsValue
      },
      set (value) {
        ctx.emit('update:value', value)
      }
    })
    return {
      innerValue
    }
  }
})
</script>

<style scoped lang="scss">

</style>
