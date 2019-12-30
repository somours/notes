<template>
  <div class="my-render">
    自定义render渲染
    <MyInput v-model="testVal" :item="item" />
    <MySelect v-model="testSelect" :item="selectItem" />
  </div>
</template>

<script>
import { MyInput, MySelect } from './index'
import { formItemType } from '@/utils/config'
export default {
  name: 'Index',
  components: {
    MyInput,
    MySelect
  },
  props: {

  },
  data () {
    return {
      testVal: '',
      item: {
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
  }
}
</script>

<style scoped>

</style>
