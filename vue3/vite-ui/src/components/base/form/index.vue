<template>
<el-form
  class="custom-form"
  ref="customFormDom"
  v-bind="$attrs"
  :model="form"
>
  <slot name="before"></slot>
  <el-form-item
    v-for="(i, index) in formItemList"
    v-bind="i.formItemAttrs || {}"
    :label="i.title"
    :prop="i.key"
  >
    <!--  自定义每一项的label部分  -->
    <!--    <template v-if="i.renderLabel">
      <template v-slot:label></template>
    </template>-->

    <template v-if="i.render">
      <!--   使用render添加组件   -->
      <RenderFromItem :item="i" :render="i.render" :index="index"></RenderFromItem>
    </template>
    <!--  使用插槽自定义页面样式  -->
    <template v-else-if="i.slot">
      <slot :name="i.slot" :data="form" :item="i"></slot>
    </template>
    <!--  默认情况下使用render组件展示预定义好的组件  -->
    <template v-else>
      <FormRender :form="form" :item="i"></FormRender>
    </template>
  </el-form-item>
  <slot name="after"></slot>
</el-form>
</template>

<script lang="ts">
import {defineComponent, reactive, PropType, ref} from 'vue'
import FormInput from './form-component/input.vue'
import RenderFromItem from './renderFormItem'
import FormRender from './render.vue'
import {FormItemComponentAttrs, FormItemConfig, FormConfigList, FormData} from './type'
import type { ElForm } from 'element-plus'
import {ElFormContext} from "element-plus";
// import {getDefaultValue, getInitValue} from "@/components/base/form/render";

// 增加一个唯一id
let uid = 1
interface FormItemInnerConfig extends  FormItemConfig {
  uid: number
}

export default defineComponent({
  components: {
    FormInput,
    RenderFromItem,
    FormRender
  },
  props: {
    list: { // 表单项配置列表
      type: Array as PropType<FormConfigList>,
      default: () => []
    },
    formData: { // 表单
      type: Object,
      default: () => ({})
    },
    isEdit: { // 是否是编辑
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    // 1 根据传入的值formData, list, 生成相应的表单数据form
    // 2 list 配置列表的每项的数据处理
    // 3 rule规则由每项配置生成,或者由外部直接生成
    // 4 保留外部通过form节点获取form数据的方法及验证方法
    // 5 watch监听 (formData?) 与list变化时,form表单也动态的变化
    // 6 如何处理每一项的form的联动
    const {isEdit,formData, list} = props
    const form = reactive(isEdit ? formData || {} : {})
    const customFormDom = ref<InstanceType<typeof ElForm>>()
    const formItemList = reactive<Array<FormItemInnerConfig>>([])
    list.forEach((item) => {
      const i = {
        uid: uid++,
        ...item
      }
      const key = i.key
      // 默认值处理 或者回显值处理
      const defaultValue = isEdit ? formData[key] || '' : i.defaultValue || ''
      if(i.dealValueFn) {
        form[key] = i.dealValueFn(defaultValue)
      } else {
        form[key] = defaultValue
      }
      // 校验规则处理,由自身在formItemAttrs配置里面的rules
      formItemList.push(i)
    })
    console.log('form组件', form)
    const validate = (fn: Function) => {
      customFormDom.value && customFormDom.value.validate((flag) => {
        // 验证通过的操作
        if(flag) {
          console.log('validate success', form)
          fn && fn(form)
        }
      })
      // console.log('组件内部validate', params)
    }

    // 对于联动操作时,在外部用refs获取组件实例后然后处理操作
    const useForm = (key?: string): FormData => {
      console.log('enter useForm .... ')
      const result:FormData = {
        form,
        list: formItemList
      }
      if(!key) {
        return result
      } else {
        const data = formItemList.find(i => i.key === key)
        return data ? Object.assign(result, data) : result
      }
    }
    return {
      form,
      formItemList,
      customFormDom,
      validate,
      useForm
    }
  }
})
</script>

<style scoped lang="scss">
</style>
