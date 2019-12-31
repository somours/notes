<template>
  <div class="my-render">
    <MyTemplate v-if="item.render" :render="item.render" :data="{data:{row: formData}}" />
    <div class="inline-blcok">
      <MyInput v-if="item.type === formItemType.input" v-model="getVal" :item="item" />
      <MySelect v-if="item.type === formItemType.select || item.type === formItemType.selectMultiple" v-model="getVal" :item="item" />
    </div>
    <!--自定义render渲染
    <MyInput v-model="testVal" :item="inputItem" />
    <MySelect v-model="testSelect" :item="selectItem" />-->
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
    }
  },
  data () {
    return {
      formItemType,
      testVal: '',
      inputItem: {
        key: 'test',
        title: '测试'
      },
      testSelect: '',
      selectItem: {
        key: 'selectTest',
        title: '下拉框测试',
        type: formItemType.select,
        list: [
          { value: 1, label: 'test1' },
          { value: 2, label: 'test2' },
          { value: 3, label: 'test3' }
        ]
      }
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
