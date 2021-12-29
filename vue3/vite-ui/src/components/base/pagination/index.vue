<template>
  <el-pagination
    v-model:currentPage="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>
<script lang="ts">
import {usePagination, PaginationConfig} from '@/utils/useComponent/pagination'
import {toRefs, defineComponent} from 'vue'
export default defineComponent({
  props: {
    // pageSize: {
    //   type: Number,
    //   default: 10
    // },
    // total: {
    //   type: Number,
    //   default: 0
    // },
    // currentPage: {
    //   type: Number,
    //   default: 0
    // },
    // pageSizes: {
    //   type: Array,
    //   default: []
    // }
  },
  setup () {
    const {paginationConfig, pageSizes } = usePagination()
    const {pageSize, total, currentPage} = toRefs<PaginationConfig>(paginationConfig)
    const handleSizeChange = (size:number) => {
      pageSize.value = size
      // paginationConfig.pageSize = size
      console.log('handleSizeChange', size, paginationConfig)
    }
    const handleCurrentChange = (page: number) => {
      currentPage.value = page
      // paginationConfig.currentPage = page
      console.log('handleCurrentChange', page, paginationConfig)
    }
    total.value = 100
    // paginationConfig.total = 100
    return {
      pageSizes,
      pageSize,
      total,
      currentPage,
      // ...paginationConfig,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped>
</style>
