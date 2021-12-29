<template>
<el-select
  v-model="innerValue"
  v-bind="$attrs"
>
  <el-option v-for="i in list" :value="i.value" :label="i.label"></el-option>
</el-select>
</template>

<script lang="ts">
import {computed, defineComponent, reactive, ref, watch} from 'vue'
export default defineComponent({
  name: 'k-select',
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
    const propsValue = props.value
    const innerValue = computed({
      get () {
        return propsValue
      },
      set (value) {
        ctx.emit('update:value', value)
      }
    })
    // const list = reactive([
    //   {value: '1', label: '选项1'},
    //   {value: '2', label: '选项2'},
    //   {value: '3', label: '选项3'},
    // ])
    return {
      innerValue,
      // list
    }
  }
})
</script>

<style scoped lang="scss">

</style>
