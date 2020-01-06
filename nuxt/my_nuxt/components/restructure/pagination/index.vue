<template>
  <div class="pagination-box">
    <el-pagination
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size.sync="getPageSize"
      :current-page.sync="getCurrentPage"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      background
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    }
  },
  computed: {
    getPageSize: {
      get () {
        return this.pageSize
      },
      set (val) {
        this.$emit('update:pageSize', val)
      }
    },
    getCurrentPage: {
      get () {
        return this.currentPage
      },
      set (val) {
        this.$emit('update:currentPage', val)
      }
    }
  },
  methods: {
    handleSizeChange (val) { // 条数切换触发
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange (val) { // 页数改变
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>

<style scoped>

</style>
