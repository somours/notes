<template>
  <el-container>
    <el-aside width="197px" class="aside">
      <SideBar></SideBar>
    </el-aside>
    <el-container>
      后台管理系统除登录外的布局结构
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from './components/sideBar'
export default {
  name: 'index',
  components: {
    SideBar
  }
}
</script>

<style scoped>

</style>
