<template>
  <div class="my-page">
    <div class="search-contianer">
      <MySearch
        @handleSearch="handleSearch"
        :searchLists="listMixins.searchList"
        :extraItemListObj="extraItemListObj"
      >
        <template slot="searchContainer">
          <slot name="addBefore" />
          <el-form-item v-if="listMixins.isNeedAdd">
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
        :tableLists="listMixins.tableList"
        :urls="urls"
        :query="query"
        :paginationState="paginationState"
        @tableLoad="tableLoad"
        @getByIdCallback="getByIdCallback"
        @dialog="dialog"
        :extraItemListObj="extraItemListObj"
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
    <!--formdialog-->
    <MyFormDialog
      :dialogVisible.sync="addOrEditDialog.visible"
      :formData="addOrEditDialog.data"
      :formLists="listMixins.formList"
      :is-edit="addOrEditDialog.isEdit"
      :urls="urls"
      :extraItemListObj="extraItemListObj"
    />
  </div>
</template>

<script>
import MyTable from '../table/index'
import MySearch from '../search/index'
import MyDialog from '../dialog/index'
import MyFormDialog from '../dialogForm/index'
import basics from '@/utils/libs/basics'
import { tableItemType } from '@/utils/config'
import { deepClone } from '@/utils'
export default {
  name: 'MyPage',
  components: {
    MyTable,
    MySearch,
    MyDialog,
    MyFormDialog
  },
  props: {
    // 请求接口,列表getListUrl, 新增insertHttp, 编辑updateHttp
    urls: {
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
    },
    // 需要请求的item里的list数组,为一个对象,key为item.key,value为请求后的列表数据
    extraItemListObj: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      // 表格的搜索条件
      query: {},
      // 默认新增或者编辑详情的弹窗
      addOrEditDialog: {
        visible: false,
        isEdit: false,
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
        isNeedAdd: false, // 是否需要新增按钮
        tableList: [],
        formList: []
      }
      this.list.forEach((item) => {
        // item.list = basics.isArray(item.list) ? item.list : [] // 每个自身组件里做了处理,因为要独立出去
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
        if (item.form === true && !this.typeIsActive(item)) {
          ret.formList.push(this.filterKey('form', { ...item }))
        }
        if (item.search === true && !this.typeIsActive(item)) {
          ret.searchList.push(this.filterKey('search', { ...item, reg: [] }))
        }
      })
      console.log('listMixins', ret)
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
    handleAdd () {
      this.addOrEditDialog.visible = true
      this.addOrEditDialog.isEdit = false
      this.addOrEditDialog.data = {}
      this.$emit('handleAdd')
    },
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
