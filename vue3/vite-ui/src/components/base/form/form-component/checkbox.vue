<template>
  <el-checkbox-group v-model="innerValue" v-bind="$attrs">
    <el-checkbox v-for="i in list" :label="i.value">{{i.label}}</el-checkbox>
  </el-checkbox-group>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
export default defineComponent({
  name: 'k-radio',
  inheritAttrs: false,
  props: {
    value: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  setup (props, ctx) {
    const propsValue = props.value || []
    console.log('组件el-checkbox', props.value,propsValue)
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
