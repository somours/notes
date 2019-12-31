<template>
  <el-form
    ref="ruleForm"
    :size="size"
    :model="formData"
    :label-width="labelWidth"
    :inline="inline"
    class="my-ruleForm"
  >
    <el-form-item v-for="(item, index) in formLists" :key="index" :label="item.title" :prop="item.key" :rules="getRegular(item, index)">
      <div v-if="item.slot" :slot="item.slot">
        <slot :name="item.slot" />
      </div>
      <div v-else>
        <MyRender :item="item" :index="index" :value.sync="formData[item.key]" :formData="formData" />
      </div>
    </el-form-item>
    <slot name="formContainer"></slot>
  </el-form>
</template>

<script>
import MyRender from './render/index.vue'
import { regular } from '@/utils/validate'
export default {
  name: 'MyForm',
  component: {
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
    formData: {
      type: Object,
      default: () => ({})
    },
    formLists: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      trigger: 'blur'
    }
  },
  methods: {
    getRegular (item, index) {
      const ret = []
      return ret
    },
    setRegular (regArr) {
      return regArr.map((item) => {
        if (this.basics.isObj(item)) {
          return item
        } else {
          if (item === 'required') { return { required: true, message: '此项不能为空', trigger: this.trigger } }
          return { trigger: this.trigger, validator: regular(item) }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
