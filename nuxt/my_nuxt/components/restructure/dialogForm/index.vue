<template>
  <MyDialog
    :dialogVisible="dialogVisible"
    :data="data"
  >
    <MyForm
      ref="dialogRuleForm"
      :size="size"
      :formData="dealedFormData"
      :form-lists="formLists"
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
        <el-button @click="close">
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
          updateHttp: () => Promise.resolve(),
          insertHttp: () => Promise.resolve(),
          getByIdHttp: () => Promise.resolve()
        }
      }
    },
    dialogFooterState: {
      type: String,
      default: dialogFooterState.common
    },
    isEdit: { // 默认为添加
      type: Boolean,
      default: false
    },
    tableRefresh: { // 刷新相应的表格
      type: Function,
      default: () => {}
    },
    // 请求的参数
    requestParams: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      // 确认按钮时的按钮loading
      loading: false,
      // 处理后的formData, 将传入的与请求的合并
      dealedFormData: {}
    }
  },
  computed: {
    addOrEditRequest () {
      if (basics.isNull(this.urls.insertHttp) && this.basics.isNull(this.urls.updateHttp)) {
        return () => new Promise()
      } else {
        return this.isEdit ? this.urls.updateHttp : this.urls.insertHttp
      }
    },
    getByIdHttp () {
      return basics.isFunction(this.urls.getByIdHttp) ? this.urls.getByIdHttp : () => Promise.resolve({})
    },
    // 默认要请求的参数
    defaultRequestParams () {
      const ret = []
      this.formLists.map((item) => {
        const key = item.key
        if (item.childKey && basics.isArray(item.childKey)) {
          ret.push(item.childKey[0], item.childKey[1])
        } else {
          ret.push(key)
        }
      })
      return ret
    }
  },
  mounted () {
    this.getByIdHttp().then((res) => {
      this.dealedFormData = { ...this.formData, ...res }
      // 暴露事件
      this.$emit('dialogFormLoad', this.dealedFormData)
    })
  },
  methods: {
    cancel () {
      this.close()
    },
    close () {
      this.$emit('update:dialogVisible', false)
    },
    sure () {
      this.$refs.dialogRuleForm.validateForm().then((res) => { // res为处理后的数据
        console.log(res)
        this.$emit('validateFormDataSuc', res)
      })
    },
    // 添加或者更新接口
    _addOrEditRequest (data) {
      // 处理请求数据
      const postObj = {}
      const keysArr = (basics.isArray(this.requestParams) && this.requestParams.length === 0) ? this.defaultRequestParams : this.requestParams
      keysArr.forEach((key) => {
        postObj[key] = data[key]
      })
      if (this.isEdit) { // 编辑多一个id
        postObj.id = data.id
      }
      this.addOrEditRequest(postObj).then((res) => {
        this.close()
        this.tableRefresh && this.tableRefresh()
      })
    }
  }
}
</script>

<style scoped>

</style>
