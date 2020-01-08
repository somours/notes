<template>
  <div class="my-page">
    <div class="search-contianer">
      <MySearch @handleSearch="handleSearch">
        <template slot="searchContainer">
          <slot name="addBefore" />
          <el-form-item v-if="isNeedAdd">
            <el-button @click="handleAdd" size="small" type="primary" icon="el-icon-circle-plus-outline">
              添加
            </el-button>
          </el-form-item>
          <slot name="addAfter" />
        </template>
      </MySearch>
    </div>
    <div class="table-container">
      <MyTable
        :request="request"
        :query="query"
        :paginationState="paginationState"
        @tableLoad="tableLoad"
        @getByIdCallback="getByIdCallback"
        @dialog="dialog"
      />
    </div>
    <MyDialog
      v-for="(item,key) in dialogList"
      :key="key"
      :data="item"
      :dialog-visible="dialogState[key]"
      @open="$emit(key + 'DialogOpen')"
      @close="$emit(key + 'DialogClose')"
    >
      <template>
        <slot :name="key" :params="dialogDetailData" :state="dialogState" />
      </template>
    </MyDialog>
  </div>
</template>

<script>
import MyTable from '../table/index'
import MySearch from '../search/index'
import MyDialog from '../dialog/index'
import basics from '@/utils/libs/basics'
import { tableItemType } from '@/utils/config'
import { deepClone } from '@/utils'
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
    paginationState: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // 是否需要新增按钮
      isNeedAdd: false,
      // 表格的搜索条件
      query: {},
      // 默认新增或者编辑详情的弹窗
      addOrEditDialog: {
        visible: false,
        data: {}
      },
      // 存放dialog的状态
      dialogState: {},
      // 存放dialog的数据
      dialogList: {},
      // 传给dialog内部的数据 (存的是表格当前行的数据)
      dialogDetailData: {}
    }
  },
  computed: {
    // 搜索,表格,表单的list的分割
    listMixins () {
      const ret = {
        searchList: [],
        isNeedAdd: false,
        tableList: [],
        formList: []
      }
      this.list.forEach((item) => {
        if (item.tableHidden !== false) {
          if (this.typeIsActive(item)) {
            if (basics.isArray(item.activeType)) {
              item.activeType.forEach((activeItem, activeIndex) => {
                if (item.isNeedAdd === true ||
                  activeItem === tableItemType.activeType.detailsDialog ||
                  (basics.isObj(activeItem) && activeItem.type === tableItemType.activeType.detailsDialog)) {
                  ret.isNeedAdd = true
                }
                if (activeItem === tableItemType.activeType.dialog ||
                  (basics.isObj(activeItem) && activeItem.type === tableItemType.activeType.dialog)
                ) {
                  // 当前这一项弹窗的状态
                  const state = activeItem.state ? activeItem.state : false
                  this.$set(this.dialogState, activeItem.key, state)
                  this.$set(this.dialogList, activeItem.key, deepClone(activeItem))
                }
              })
            }
          }
          ret.tableList.push({ ...item })
        }
        if (item.formHidden !== false && !this.typeIsActive(item)) {
          ret.formList.push(this.filterKey('form', { ...item }))
        }
        if (item.search === true && !this.typeIsActive(item)) {
          ret.searchList.push(this.filterKey('search', { ...item }))
        }
      })
      return ret
    }
  },
  methods: {
    // 筛选出list中的form,或者搜索框的前缀属性 prefix: ['form', 'search']
    filterKey (prefix, obj = {}, keys = ['key', 'render', 'title', 'options', 'type', 'val', 'showState']) {
      keys.forEach((key) => {
        const prefixKey = prefix + key
        if (obj.hasOwnProperty(prefixKey) && !basics.isNull(obj[prefixKey])) {
          obj[key] = obj[prefixKey]
        }
      })
      return obj
    },
    // 是否是 active
    typeIsActive (item) {
      return item.type === tableItemType.active
    },
    // 新增的按钮
    handleAdd () {},
    // 表格加载列表完成
    tableLoad (data) { // data为接口返回的数据
      console.log(data)
    },
    // 点击获取详情时的请求 (默认的编辑)
    getByIdCallback (getPromise) { // getPromise为返回promise的一个函数
      this.addOrEditDialog.visible = true
      this.addOrEditDialog.isEdit = true
      getPromise().then((res) => {
        this.addOrEditDialog.data = res
      })
    },
    // 表格点击弹出自定义弹窗
    dialog (data) {
      const { key, row } = data
      if (this.dialogList[key] && this.dialogList[key].click) { // 执行acitveItem的点击事件
        this.dialogList[key].click(data)
      }
      this.dialogState[key] = true
      this.dialogDetailData = row
    },
    handleSearch (data) {

    }
  }
}
</script>

<style scoped>

</style>
