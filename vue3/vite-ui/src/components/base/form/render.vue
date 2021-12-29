<template>
<component :is="compType" v-model="form[item.key]" v-bind="item.componentAttrs"></component>
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from 'vue'
import Input from './form-component/input.vue'
import Select from './form-component/select.vue'
import Radio from './form-component/radio.vue'
import Checkbox from './form-component/checkbox.vue'
import DatePicker from './form-component/datePicker.vue'
import TimePicker from './form-component/timePicker.vue'
import Upload from './form-component/upload.vue'
import {FormItemConfig} from './type'
import {FormComponentTypesEnum} from "@/enums/common"

const getCompType = (type:any):any => {
  switch (type) {
    case FormComponentTypesEnum.input:
      return Input
    case FormComponentTypesEnum.select:
      return Select
    case FormComponentTypesEnum.checkbox:
      return Checkbox
    case FormComponentTypesEnum.radio:
      return Radio
    case FormComponentTypesEnum.datePicker:
      return DatePicker
    case FormComponentTypesEnum.timePicker:
      return TimePicker
    case FormComponentTypesEnum.upload:
      return Upload
    default:
      return Input
  }
}
export default defineComponent({
  props: {
    item: { // 每一个组件的配置
      type: Object as PropType<FormItemConfig>,
      default: () => ({})
    },
    form: { // form 表单的值
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const {item} = props
    /*
    * 1 由组件的配置item数据得到组件的类型,判断渲染哪一个组件
    * 2 由组件配置与form表单数据,根据策略模式计算出组件的value值, 以及如何更新value的值
    * 3 如何更新form表单的值
    * */
    const compType = getCompType(item.type)
    console.log('render', item, item.key, props.form[item.key])
    return {
      compType
    }
  }
})
</script>

<style scoped lang="scss">

</style>
