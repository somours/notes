<template>
  <div class="table-component">
    <el-table
      :data="tableData"
      size="medium"
      border
      style="width: 100%"
    >
      <template
        v-for="(item) in tableLists"
      >
        <template v-if="!item.slot">
          <el-table-column
            :label="getItemTitle(item)"
            :width="item.width"
            :min-width="item.minWidth"
            :align="basics.isNull(item.align) ? 'center' : item.align"
            :show-overflow-tooltip="basics.isNull(item.tooltip) ? true : item.tooltip"
            :fixed="basics.isNull(item.fixed) ? false : item.fixed"
          >
            <el-table-column
              v-if="item.children"
              v-for="(childrenItem, childrenIndex) in item.children"
              :key="childrenIndex"
              :align="basics.isNull(childrenItem.align) ? 'center' : childrenItem.align"
              :label="getItemTitle(childrenItem)"
              :width="childrenItem.width"
              :show-overflow-tooltip="basics.isNull(childrenItem.tooltip) ? true : childrenItem.tooltip"
            >
              <template slot-scope="scope">
                <div v-if="!childrenItem.render">
                  {{ getObjKeyValue(childrenItem.key, scope.row, childrenItem.standBy ) }}
                </div>
                <MyTemplate v-else :render="childrenItem.render" :data="{data: scope, column: childrenItem}" />
              </template>
            </el-table-column>
            <template v-if="!item.children" slot-scope="scope">
              <div>
                <MyTemplate v-if="item.render" :render="item.render" :data="{data: scope, column: item}" />
                <div v-else>
                  <div v-if="itemTypeIsActive(item)">
                    <TableButton
                      :row="scope.row"
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
                  <div v-else>
                    {{ getObjKeyValue(item.key,scope.row, item.standBy) }}
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column>
            <slot :name="item.slot" :column="item" />
          </el-table-column>
        </template>
      </template>
    </el-table>
    <div v-if="paginationState" class="pagination">
      <Pagination
        :total="total"
        :page-size.sync="tableInfo.pageSize"
        :currentPage.sync="tableInfo.pageNum"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { MyTemplate } from '../form/render/render.js'
import Pagination from '../pagination/index'
import TableView from './components/tableView/index'
import TableButton from './components/tableButton/index'
import { tableItemType, tableInfo } from '@/utils/config'
import { getObjKeyValue, delectConfirm } from '@/utils/index'

export default {
  name: 'MyTable',
  components: {
    MyTemplate,
    TableView,
    TableButton,
    Pagination
  },
  props: {
    tableLists: {
      type: Array,
      default: () => []
    },
    operateTitle: {
      type: String,
      default: '操作'
    },
    request: { // 表格的相关接口,要求传入的是一个返回promise的函数
      type: Object,
      default: () => ({
        getListUrl: () => Promise.resolve({}),
        deleteUrl: () => Promise.resolve()
      })
    },
    query: { // 表格的查询条件
      type: Object,
      default: () => ({})
    },
    paginationState: { // 是否展示分页
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      getObjKeyValue,
      // 表格数据
      tableData: [],
      total: 0,
      // 表格分页信息
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
      if (this.itemTypeIsActive(item)) {
        ret = this.operateTitle
      }
      return ret
    },
    // 是否是操作列
    itemTypeIsActive (item) {
      return item.type === tableItemType.active
    },
    handleSizeChange (pageSize) {
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
      this.request.getListUrl({ ...this.tableInfo, ...this.query }).then((res) => {
        if (this.paginationState === false) {
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
      const http = this.basics.isNull(getByIdUrl) ? () => Promise.resolve(row)
        : this.basics.isObj(getByIdUrl) ? () => Promise.resolve(getByIdUrl) : getByIdUrl
      this.$emit('getByIdCallback', () => {
        return new Promise((resolve) => {
          http({ id: row.id }, row).then((res) => {
            resolve(res)
          })
        })
      })
    },
    // 表格里点击弹窗的按钮
    dialog (data) {
      this.$emit('dialog', data)
    }
    // 处理表格里面的列表,需要从接口请求的列表
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
