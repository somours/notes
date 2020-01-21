<template>
  <div class="my-render">
    <MyTemplate v-if="item.render" :render="item.render" :data="{data:{row: formData}}" />
    <div class="inline-blcok">
      <MyInput v-if="item.type === formItemType.input" v-model="getValue" :item="item" />
      <MySelect v-if="item.type === formItemType.select || item.type === formItemType.selectMultiple" v-model="getValue" :item="item" />
    </div>
  </div>
</template>

<script>
import { MySelect, MyInput, MyTemplate } from './render'
import { formItemType } from '@/utils/config'
export default {
  name: 'Index',
  components: {
    MyInput,
    MySelect,
    MyTemplate
  },
  props: {
    item: { // 列表的每一项数据
      type: Object,
      default: () => ({})
    },
    index: { // 索引
      type: [Number, String],
      default: ''
    },
    formData: { // 表单的数据
      type: Object,
      default: () => {}
    },
    value: {
      type: [Number, String, Array],
      default: ''
    },
    // 需要请求的item里的list数组,为一个对象,key为item.key,value为请求后的列表数据
    extraItemListObj: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      formItemType
    }
  },
  computed: {
    getValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('update:value', newValue)
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
