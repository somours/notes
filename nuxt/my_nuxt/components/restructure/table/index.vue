<template>
  <el-table :data="tableData" style="width: 100%">
    <template
      v-for="(item,index) in tableLists"
      :key="index"
    >
      <el-table-column v-if="item.render">
        <span>自定义render</span>
        <!--        <Template ></Template>-->
      </el-table-column>
      <el-table-column
        v-else
        :label="item.title"
        :prop="item.key"
        :width="item.width"
        :min-width="item.minWidth"
        :align="basics.isNull(item.align) ? 'center' : item.align"
        :show-overflow-tooltip="basics.isNull(i.tooltip) ? true : i.tooltip"
        :fixed="basics.isNull(item.fixed) ? false : item.fixed"
      >
        <template slot-scope="scope">
          <span>1234</span>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  name: 'MyTable',
  props: {
    tableData: {
      type: Object,
      default: () => ({})
    },
    tableLists: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

</style>
