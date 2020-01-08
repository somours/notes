<template>
  <div class="search-container">
    <MyForm :label-width="labelWidth" :inline="inline" :form-lists="searchLists">
      <el-form-item>
        <el-button @click="handleSearch" type="primary" icon="el-icon-search">
          {{ searchButtonText }}
        </el-button>
      </el-form-item>
      <slot name="searchContainer" />
    </MyForm>
  </div>
</template>
<script>
import MyForm from '../form/index.vue'
export default {
  name: 'MySearch',
  components: {
    MyForm
  },
  props: {
    labelWidth: {
      type: [Number, String],
      default: ''
    },
    inline: {
      type: Boolean,
      default: true
    },
    searchLists: {
      type: Array,
      default: () => []
    },
    searchButtonText: {
      type: String,
      default: '搜索'
    }
  },
  methods: {
    handleSearch () { // 触发searchData出去
      this.$emit('handleSearch', {})
    }
  }
}
</script>

<style scoped>

</style>
