<template>
  <MyDialog
    append-to-body
    width="30%"
    :
  >
    <MyForm
      ref="ruleForm"
      :size="size"
      :formData="formData"
      :label-width="labelWidth"
      :inline="inline"
      class="my-ruleForm"
    />
    <div slot="footer" class="dialog-footer">
      <div v-if="dialogFooterState === dialogFooterState.common">
        <el-button @click="cancel">
          取消
        </el-button>
        <el-button :loading="loading" @click="sure" type="primary">
          确定
        </el-button>
      </div>
      <div v-if="dialogFooterState===dialogFooterState.close" style="text-align: center;">
        <el-button @click="dialogVisible = false">
          关 闭
        </el-button>
      </div>
    </div>
  </MyDialog>
</template>

<script>
import MyDialog from '@/components/restructure/dialog/index'
import MyForm from '@/components/restructure/form/index'
import { dialogFooterState } from '@/utils/config'
import basics from '@/utils/libs/basics'

export default {
  name: 'DialogForm',
  components: {
    MyDialog,
    MyForm
  },
  props: {
    // 弹窗
    dialogVisible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => ({})
    },
    // form表单
    size: {
      type: String,
      default: 'small'
    },
    labelWidth: {
      type: [Number, String],
      default: '120px'
    },
    inline: {
      type: Boolean,
      default: false
    },
    formData: { // 初始化值, 回显值
      type: Object,
      default: () => ({})
    },
    formLists: { // 表格每一项的配置列表
      type: Array,
      default: () => []
    },
    urls: {
      type: Object,
      default: () => {
        return {
          updateHttp: () => Promise.resolve(1),
          insertHttp: () => Promise.resolve(2),
          getByIdHttp: {}
        }
      }
    },
    dialogFooterState: {
      type: String,
      default: dialogFooterState.common
    }
  },
  data () {
    return {
      dialogFooterState,
      loading: false
    }
  },
  computed: {
    getRequest () {
      if (basics.isNull(this.urls.insertHttp) && this.basics.isNull(this.urls.updateHttp)) {
        return () => Promise.resolve()
      }
    }
  },
  methods: {
    cancel () {},
    sure () {}
  }
}
</script>

<style scoped>

</style>
