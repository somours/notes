<template>
<div>
  table示例
  <Table></Table>
</div>
</template>

<script lang="ts">
import Table from '@/components/base/table/index.vue'
import {defineComponent} from "vue";

export default defineComponent({
  name: "index",
  components: {
    Table
  }
})
</script>

<style scoped>

</style>
