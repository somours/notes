<template>
<el-table
  :data="tableData"
  border
>
  <el-table-column
    type="selection"
    header-align="center"
    align="center"
    fixed="left"
    width="46"
  >
  </el-table-column>
  <el-table-column
    v-for="i in columns"
    :key="i.key"
    :label="i.title"
    :prop="i.key"
  >
   <template #header="headerScope">
     <RenderTableHeader
       :column="headerScope.column"
       :index="headerScope.$index"
       :render="i.renderHeader"
     >
     </RenderTableHeader>
   </template>
    <template #default="scope">
      <template v-if="i.render">
        <RenderTableBody
          :row="scope.row"
          :index="scope.$index"
          :column="scope.column"
          :render="i.render"
        ></RenderTableBody>
      </template>
      <div v-else-if="i.html" v-html="i.html(scope)"></div>
      <template v-else-if="i.slot">
        <slot :name="i.slot" :row="scope.row" :index="scope.$index"></slot>
      </template>
      <template v-else>
        <!--     常见的一些带样式的tableView     -->
        <tableView :row="scope.row" :col-config="i"></tableView>
      </template>
    </template>
  </el-table-column>
  <el-table-column label="Date" prop="date" />
  <el-table-column label="Name" prop="name" />
</el-table>
</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue'
import RenderTableHeader from './renderTableHeader'
import RenderTableBody from './renderTableBody'
export default defineComponent({
  name: "index",
  components: {
    RenderTableHeader,
    RenderTableBody
  },
  props: {
    // 表格的数据
    data: {
      type: Array,
      default: () => []
    },
    // 表格的列配置
    columns: {
      type: Array,
      default: () => []
    }
  },
  setup (props, ctx) {
    const tableData = reactive([
      {date: new Date(), name: '测试1'},
      {date: new Date(), name: '测试2'}
    ])
    return {
      tableData
    }
  }
})
</script>

<style scoped>

</style>
