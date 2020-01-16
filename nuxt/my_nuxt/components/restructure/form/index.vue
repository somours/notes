<template>
  <el-form
    :ref="ref"
    :size="size"
    :model="resFormData"
    :label-width="labelWidth"
    :inline="inline"
    class="my-ruleForm"
  >
    <el-form-item v-for="(item, index) in formLists" :key="index" :label="item.title" :prop="item.key" :rules="getRegular(item, index)">
      <template v-if="basics.isNull(item.showState) ? true : item.showState">
        <div v-if="item.slot" :slot="item.slot">
          <slot :name="item.slot" />
        </div>
        <div v-else>
          <MyRender :item="item" :index="index" :value.sync="resFormData[item.key]" :formData="resFormData" />
        </div>
      </template>
    </el-form-item>
    <slot name="formContainer" />
  </el-form>
</template>

<script>
import MyRender from './render/index.vue'
import { regular } from '@/utils/validate'
import { keyWord } from '@/utils/config'
import { deepClone } from '@/utils/index'

export default {
  name: 'MyForm',
  components: {
    MyRender
  },
  props: {
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
    // form的ref节点
    ref: {
      type: String,
      default: 'ruleForm'
    }
  },
  data () {
    return {
      trigger: 'blur',
      resFormData: {}
    }
  },
  mounted () {
    this.dealFormData((item, index) => {
      if (item.requestList) {
        item.list = []
        this.requestListApi(item, index)
      }
    })
  },
  methods: {
    requestListApi (item, index) { // 一般下拉框列表的请求
      item.requestList().then((res) => {
        this.$set(this.formLists[index], 'list', res) // 不知道这里可以直接赋值不
      })
    },
    dealFormData (fn) { // 处理formData, 初始化及显示值 fn作为处理list的请求
      const tempObj = {}
      this.formLists.forEach((item, index) => {
        if (!item.slot && !this.basics.isNull(item.key)) { // key值不能为空
          item.value = this.setItemValue(item)
          item.list = item.list ? item.list : this.$set(this.formLists[index], 'list', []) // 在render里面好像有list处理
          item.$index = index
          const key = item.key
          if (this.basics.isNull(this.formData[key]) && (this.basics.isArray(this.formData[key]) && this.basics.isArrNull(this.formData[key]))) {
            tempObj[key] = this.basics.isNull(item.value) ? '' : item.value
          } else {
            tempObj[key] = this.formData[key] || ''
          }
        }
        if (fn) { fn(item, index) }
      })
      this.resFormData = tempObj
    },
    setItemValue (item) {
      let res
      if (item.type.includes(keyWord.multiple) && this.basics.isString(item.value)) {
        res = item.value.split(keyWord.relatedWords)
      } else {
        res = !this.basics.isNull(item.value) ? item.value : ''
      }
      return res
    },
    getRegular (item) { // 获取每一项的正则规则
      let ret = []
      const { reg } = item
      if (this.basics.isString(reg)) {
        ret = this.setRegular([reg], item)
      } else if (this.basics.isArray(reg)) {
        ret = this.setRegular(reg, item)
      }
      return ret
    },
    setRegular (regArr, item) { // 设置每一项列表的正则
      const title = item.title || item.regTitle || '此项'
      return regArr.map((regItem) => {
        if (this.basics.isObj(regItem)) {
          return regItem
        } else {
          if (regItem === 'required') { return { required: true, message: `${title}不能为空`, trigger: this.trigger } }
          return { trigger: this.trigger, validator: regular(regItem) }
        }
      })
    },
    resetForm (formName = this.ref) { // 重置表单
      this.$refs[formName].resetFields()
    },
    validateForm (formName = this.ref) { // 验证表单
      return new Promise((resolve, reject) => {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const resultFormData = deepClone(this.resFormData)
            this.formLists.forEach((item, index) => {
              const key = item.key
              const keyValue = resultFormData[key]
              if (item.childKey && this.basics.isArray(item.childKey)) {
                item.childKey.forEach((childItem, childIndex) => {
                  resultFormData[childItem] = keyValue[childIndex] || ''
                })
              } else if (this.basics.isArray(keyValue)) {
                resultFormData[key] = keyValue.join(keyWord.relatedWords)
              }
            })
            resolve(resultFormData)
          } else {
            reject(new Error('表单错误'))
          }
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
