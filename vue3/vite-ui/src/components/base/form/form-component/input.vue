<template>
<el-input
  v-model="innerValue"
  v-bind="$attrs"
>
</el-input>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
export default defineComponent({
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
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
