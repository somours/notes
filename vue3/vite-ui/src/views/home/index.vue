<template>
<div>
  <el-button>
    <router-link to="/table">
      表格
    </router-link>
  </el-button>
  <el-button>
    <router-link to="/code">
      验证码
    </router-link>
  </el-button>
  <el-button>
    <router-link to="/dialog">
      弹窗
    </router-link>
  </el-button>
  <el-button>
    <router-link to="/form">
      表单
    </router-link>
  </el-button>
  <div>
    <Pagination></Pagination>
  </div>

</div>
</template>

<script lang="ts">
import Pagination from '@/components/base/pagination/index.vue'
import {defineComponent, reactive, ref} from "vue";


export default defineComponent({
  components: {
    Pagination,
  },
  setup () {

    return {

    }
  }
})
</script>

<style scoped>

</style>
