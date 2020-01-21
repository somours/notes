<template>
  <MyDialog
    :dialogVisible.sync="visible"
    :data="dialogData"
  >
    <MyForm
      ref="dialogRuleForm"
      :formRef="formRef"
      :size="size"
      :formData="dealedFormData"
      :form-lists="formLists"
      :label-width="labelWidth"
      :inline="inline"
      :extraItemListObj="extraItemListObj"
      class="my-ruleForm"
    />
    <slot name="dialogFooter">
      <div class="dialog-footer">
        <div v-if="isCommon">
          <el-button @click="cancel">
            取消
          </el-button>
          <el-button :loading="loading" @click="sure" type="primary">
            确定
          </el-button>
        </div>
        <div v-else style="text-align: center;">
          <el-button @click="close">
            关 闭
          </el-button>
        </div>
      </div>
    </slot>
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
    dialogData: {
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
          getByIdHttp: () => Promise.resolve(),
          getListUrl: () => Promise.resolve()
        }
      }
    },
    needRequest: {
      type: Boolean,
      default: false
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
      default: null
    },
    // 请求的参数
    requestParams: {
      type: Array,
      default: () => []
    },
    // form的ref节点
    formRef: {
      type: String,
      default: 'ruleForm'
    },
    // 需要请求的item里的list数组,为一个对象,key为item.key,value为请求后的列表数据
    extraItemListObj: {
      type: Object,
      default: () => ({})
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
    // 底部状态
    isCommon () {
      return this.dialogFooterState === dialogFooterState.common
    },
    // 弹窗的显示
    visible: {
      get () {
        return this.dialogVisible
      },
      set (val) {
        this.$emit('update:dialogVisible', val)
      }
    },
    addOrEditRequest () {
      if (basics.isNull(this.urls.insertHttp) && this.basics.isNull(this.urls.updateHttp)) {
        return () => (new Promise(resolve => resolve({})))
      } else {
        return this.isEdit ? this.urls.updateHttp : this.urls.insertHttp
      }
    },
    // getByIdHttp () {
    //   const ret = basics.isFunction(this.urls.getByIdHttp) ? this.urls.getByIdHttp : () => (new Promise(() => resolve({})))
    //   return ret
    // },
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
  watch: {
    dialogVisible () {
      if (this.dialogVisible && this.needRequest) {
        this._dialogFormLoad()
      }
    },
    formData: {
      deep: true,
      handler () {
        console.log('dialogFormData', this.formData)
        if (this.isEdit) {
          this._dialogFormLoad()
        }
      }
    }
  },
  mounted () {
    this._dialogFormLoad()
  },
  methods: {
    _dialogFormLoad () {
      if (this.needRequest) {
        const getByIdHttp = basics.isFunction(this.urls.getByIdHttp) ? this.urls.getByIdHttp : () => (new Promise(resolve => resolve({})))
        getByIdHttp().then((res) => {
          this.dealedFormData = { ...this.formData, ...res }
          // 暴露事件
          this.$emit('dialogFormLoad', this.dealedFormData)
        })
      } else {
        this.dealedFormData = { ...this.formData }
        // 暴露事件
        this.$emit('dialogFormLoad', this.dealedFormData)
      }
    },
    cancel () {
      this.close()
    },
    close () {
      this.visible = false
      this.dealedFormData = {}
      this.$refs.dialogRuleForm.resetForm()
      // this.$emit('update:dialogVisible', false)
    },
    sure () {
      this.$refs.dialogRuleForm.validateForm().then((res) => { // res为处理后的数据
        console.log(res)
        this.$emit('validateFormDataSuc', res)
        this._addOrEditRequest(res)
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
        const tableRefresh = basics.isNull(this.tableRefresh) ? this.urls.getListUrl : this.tableRefresh
        if (basics.isFunction(tableRefresh)) {
          tableRefresh()
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
