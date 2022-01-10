<template>
<div>
  <el-row>
    第一行
  </el-row>
  <el-row>
    {{ text }}
  </el-row>
  <el-row>
    第三行
  </el-row>
</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
  props: {
    text: {
      type: String,
      default: '第二行'
    }
  }
})
</script>
