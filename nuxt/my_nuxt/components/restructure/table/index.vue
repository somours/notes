<template>
  <el-table :data="tableData" style="width: 100%">
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
                button系列
              </div>
              <div v-else-if="item.tableView">
                tableView....
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
</template>

<script>
import { MyTemplate } from '../form/render/render.js'
import { tableItemType } from '@/utils/config'
import { getObjKey } from '@/utils/index'

export default {
  name: 'MyTable',
  components: {
    MyTemplate
  },
  props: {
    tableData: {
      type: Object,
      default: () => ({})
    },
    tableLists: {
      type: Array,
      default: () => []
    },
    operateTitle: {
      type: String,
      default: '操作'
    }
  },
  data () {
    return {
      getLabelText: getObjKey
    }
  },
  computed: {

  },
  methods: {
    getItemTitle (item) {
      let ret = item.title || ''
      if (this.itemTypeIsActive) {
        ret = this.operateTitle
      }
      return ret
    },
    itemTypeIsActive (item) {
      return item.type === tableItemType.active
    }
  }
}
</script>

<style scoped>

</style>
