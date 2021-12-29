<template>
  <el-radio-group v-model="innerValue"   v-bind="$attrs">
    <el-radio v-for="i in list" :label="i.value">{{i.label}}</el-radio>
  </el-radio-group>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue'
export default defineComponent({
  name: 'k-radio',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  setup (props, ctx) {
    const propsValue = props.value || ''
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
