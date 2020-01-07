<template>
  <div class="my-page">
    <div class="search-contianer">
      <MySearch />
    </div>
    <div class="table-container">
      <MyTable />
    </div>
    <MyDialog />
  </div>
</template>

<script>
import MyTable from '../table/index'
import MySearch from '../search/index'
import MyDialog from '../dialog/index'
export default {
  name: 'MyPage',
  components: {
    MyTable,
    MySearch,
    MyDialog
  },
  props: {
    // 请求接口,列表getListUrl, 新增insertHttp, 编辑updateHttp
    request: {
      type: Object,
      default: () => ({})
    },
    // 搜索,表单,表格的列表配置
    list: {
      type: Array,
      default: () => []
    },
    // 表单的默认值选项
    formData: {
      type: Object,
      default: () => ({})
    },
    // 表格的分页
    tablePaginationState: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {

    }
  },
  computed: {
    // 搜索,表格,表单的list的分割
    listMixins () {
      const ret = {
        searchList: []
      }
      const searchList = []
      const tableList = []
      const formList = []
      this.list.forEach((item) => {
        if (item.tableHidden !== false) {
          tableList.push({ ...item })
        }
        if (item.formHidden !== false) {
          formList.push({ ...item })
        }
        if (item.search === true) {
          searchList.push({ ...item })
        }
      })
      return ret
    }
  }
}
</script>

<style scoped>

</style>
