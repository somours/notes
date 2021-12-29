<template>
<div>
  弹窗示例
  <el-button @click="open">打开弹窗</el-button>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"
        >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
export default defineComponent({
  setup () {
    const dialogVisible = ref(false)
    const open = () => {
      dialogVisible.value = true
    }
    const handleClose = () => {
      console.log('我关闭了啊')
    }
    return {
      dialogVisible,
      open,
      handleClose
    }
  }
})
</script>

<style scoped>

</style>
