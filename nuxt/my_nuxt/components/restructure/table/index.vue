<template>
  <div class="table-component">
    <el-table
      :data="tableData"
      size="medium"
      border
      style="width: 100%"
    >
      <template
        v-for="(item,index) in tableLists"
        :key="index"
      >
        <template v-if="!item.slot">
          <el-table-column
            v-else
            :label="getItemTitle(item)"
            :prop="item.key"
            :width="item.width"
            :min-width="item.minWidth"
            :align="basics.isNull(item.align) ? 'center' : item.align"
            :show-overflow-tooltip="basics.isNull(item.tooltip) ? true : item.tooltip"
            :fixed="basics.isNull(item.fixed) ? false : item.fixed"
          >
            <template v-if="item.children">
              <el-table-column
                v-for="(childrenItem, childrenIndex) in item.children"
                :key="childrenIndex"
                :align="basics.isNull(childrenItem.align) ? 'center' : childrenItem.align"
                :label="getItemTitle(childrenItem)"
                :width="childrenItem.width"
                :show-overflow-tooltip="basics.isNull(childrenItem.tooltip) ? true : childrenItem.tooltip"
              >
                <template slot-scope="scope">
                  <div v-if="!childrenItem.render">
                    {{ getLabelText(childrenItem.key, scope.row, childrenItem.standBy ) }}
                  </div>
                  <MyTemplate v-else :render="childrenItem.render" :data="{data: scope, column: childrenItem}" />
                </template>
              </el-table-column>
            </template>
            <template v-else slot-scope="scope">
              <MyTemplate v-if="item.render" :render="item.render" :data="{data: scope, column: item}" />
              <template v-else>
                <div v-if="itemTypeIsActive(item)">
                  <TableButton :row="scope.row"
                               :index="scope.$index"
                               :activeType="item.activeType"
                               @deleActive="deleteActive(scope.row, scope.$index)"
                               @getById="getById(scope.row)"
                               @dialog="dialog"
                  />
                </div>
                <div v-else-if="item.tableView">
                  <TableView :column="item" :data="scope.row" />
                </div>
              </template>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <slot :name="item.slot" :column="item" />
        </template>
      </template>
    </el-table>
    <div class="paginatin" v-if="paginationState">
      <pagination
        :total="total"
        :page-size.sync="tableInfo.pageSize"
        :current.sync="tableInfo.pageNum"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      ></pagination>
    </div>
  </div>

</template>

<script>
import { MyTemplate } from '../form/render/render.js'
import TableView from './tableView/index'
import TableButton from './tableButton/index'
import Pagination from './pagination/index'
import { tableItemType } from '@/utils/config'
import { getObjKeyValue, delectConfirm } from '@/utils/index'
import { tableInfo } from '@/utils/config'
import { listSerialize } from '../form/render/render'

export default {
  name: 'MyTable',
  components: {
    MyTemplate,
    TableView,
    TableButton,
    Pagination
  },
  props: {
    // tableData: {
    //   type: Object,
    //   default: () => ({})
    // },
    tableLists: {
      type: Array,
      default: () => []
    },
    operateTitle: {
      type: String,
      default: '操作'
    },
    // rowData: {
    //   type: Array,
    //   defautl
    // },
    request: { // 表格的相关接口,要求传入的是一个返回promise的函数
      type: Object,
      default: () => ({
        getListUrl: () => Promise.resolve([]),
        deleteUrl: () => Promise.resolve()
      })
    },
    query: { // 表格的查询条件
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      getLabelText: getObjKeyValue,
      tableData: [],
      total: 0,
      tableInfo,
      tableItemType
    }
  },
  computed: {

  },
  mounted () {
    this.getTableList()
  },
  methods: {
    // 获取每一列表格的标题
    getItemTitle (item) {
      let ret = item.title || ''
      if (this.itemTypeIsActive) {
        ret = this.operateTitle
      }
      return ret
    },
    // 是否是操作列
    itemTypeIsActive (item) {
      return item.type === tableItemType.active
    },
    handleSizeChange(pageSize) {
      this.tableInfo.pageSize = pageSize
      this.getTableList()
    },
    handleCurrentChange (pageNum) {
      this.tableInfo.pageNum = pageNum
      this.getTableList()
    },
    // 获取表格数据
    getTableList () {
      // if(!this.basics.isArrNull(this.rowData)) {
      //   this.tableData = this.rowData
      //   this.total = this.tableData.length
      //   return false
      // }
      this.request.getListUrl({...this.tableInfo, this.query}).then((res) => {
        if(this.paginationState === false) {
          this.tableData = res
        } else {
          const { datas = [], meta = {} } = res
          this.tableData = datas
          this.total = this.basics.isNull(meta.total) ? datas.length : meta.total
        }
        this.$emit('tableLoad', res)
      })
    },
    // 表格里面的删除按钮
    deleteActive (row, index) {
      delectConfirm(this).then(() => {
        this.request.deleteUrl(
          {
            id: row.id
          },
          row
        ).then((res) => {
          this.$message.success('删除成功')
          this.getTableList()
        })
      }).catch(() => {
        this.$message.error('删除失败')
      })
    },
    // 表格普遍的通过id查询详情
    getById (row) { // 可以是空,或者返回Promise的函数,或者一个对象
      const getByIdUrl = this.request.getByIdHttp
      const http = this.basics.isNull(getByIdUrl) ? () => Promise.resolve(row) :
        this.basics.isObj(getByIdUrl) ? () => Promise.resolve(getByIdUrl) : getByIdUrl
      this.$emit('getByIdCallback', () => {
        return new Promise((resolve => {
          http({ id: row.id }, row).then(res => {
            resolve(res)
          })
        }))
      })
    },
    // 表格里点击弹窗的按钮
    dialog (data) {
      this.$emit('dialog', data)
    }
    //处理表格里面的列表,需要从接口请求的列表
    // handleTableListsItemList() { //
    //   const tableLists = this.tableLists
    //   tableLists.forEach((item, index) => {
    //     if( item.tableView === tableItemType.tableView.requestText ) {
    //       item.list = this.basics.isArray(item.list) || []
    //       item.requestList().then((res) => {
    //         listSerialize(res, item.listFormat, (dealedListObj) => {
    //           item.list[dealedListObj.index] = dealedListObj
    //         })
    //       })
    //     }
    //   })
    // }
  }
}
</script>

<style scoped>

</style>
