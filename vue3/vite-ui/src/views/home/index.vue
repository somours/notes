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
  <div>
    <Pagination></Pagination>
  </div>
  <div>
    <Form ref="testForm" :list="formList" size="mini" inline :onValidate="validateForm">
      <template v-slot:testSlot="data">
        <div style="color: red">
          {{data.item}}
        </div>
      </template>
    </Form>
    <el-button @click="startValidateForm">验证表单</el-button>
  </div>
</div>
</template>

<script lang="ts">
import Pagination from '@/components/base/pagination/index.vue'
import Form from '@/components/base/form/index.vue'
import Select from '@/components/base/form/form-component/select.vue'
import {defineComponent, reactive, ref} from "vue";
import {FormConfigList} from "@/components/base/form/type";
import {FormComponentTypesEnum} from "@/enums/common";

const makeRange = (start, end) => {
  const result = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}

export default defineComponent({
  components: {
    Pagination,
    Form,
    'k-select': Select
  },
  setup () {
    const formList = reactive<FormConfigList>([
      {
        key: 'key1',
        title: '测试输入框'
      },
      {
        key: 'key2',
        title: '测试输入框2',
        formItemAttrs: {
          required: true
        }
      },
      {
        key: 'key3',
        title: '自定义render内容',
        render: (h, params) => {
          console.log('render', params)
          return h('div', params.item.key)
        }
      },
      {
        key: 'key4',
        title: '下拉框',
        defaultValue: '2',
        type: FormComponentTypesEnum.select,
        componentAttrs: {
          list: [
            {value: '1', label: '选项1'},
            {value: '2', label: '选项2'},
            {value: '3', label: '选项3'},
            {value: '4', label: '选项4'},
          ],
          clearable: true,
          placeholder: '请输入',
          onChange: (value:string | number) => {
            console.log('enter change', value)
          }
        }
      },
      {
        key: 'key5',
        title: '传递组件自带的prop',
        type: FormComponentTypesEnum.input,
        componentAttrs: {
          type: 'textarea'
        }
      },
      {
        key: 'key6',
        title: 'slot内容',
        slot: 'testSlot'
      },
      {
        key: 'key7',
        title: '单选框',
        defaultValue: '2',
        type: FormComponentTypesEnum.radio,
        componentAttrs: {
          list: [
            {value: '1', label: '选项1'},
            {value: '2', label: '选项2'},
            {value: '3', label: '选项3'},
            {value: '4', label: '选项4'},
          ],
          onChange: (value:string | number) => {
            console.log('enter change单选框', value)
          }
        }
      },
      {
        key: 'key8',
        title: '复选框',
        defaultValue: ['2','3'],
        type: FormComponentTypesEnum.checkbox,
        componentAttrs: {
          border: true,
          list: [
            {value: '1', label: '选项1'},
            {value: '2', label: '选项2'},
            {value: '3', label: '选项3'},
            {value: '4', label: '选项4'},
          ],
          onChange: (value:string | number) => {
            console.log('enter change复选框', value)
          }
        },
      },
      {
        key: 'key9',
        title: '日期',
        type: FormComponentTypesEnum.datePicker,
        componentAttrs: {
          type: 'date',
          placeholder: 'date'
        }
      },
      {
        key: 'key10',
        title: '日期时间',
        type: FormComponentTypesEnum.datePicker,
        componentAttrs: {
          type: 'datetime',
          placeholder: 'datetime',
          // valueFormat: timestamp,
          onChange: (value:any) => {
            console.log('日期时间', value)
          }
        }
      },
      {
        key: 'key11',
        title: '日期范围',
        type: FormComponentTypesEnum.datePicker,
        componentAttrs: {
          type: 'daterange',
          placeholder: 'daterange',
          rangeSeparator: "To",
          startPlaceholder: "Start date",
          endPlaceholder: "End date",
          valueFormat: 'YYYY-MM-DD',
          onChange: (value:any) => {
            console.log('日期范围组件', value)
          }
        }
      },
      {
        key: 'key12',
        title: '时间选择器',
        type: FormComponentTypesEnum.timePicker,
        componentAttrs: {
          placeholder: "Arbitrary time",
          disabledHours: () => {
            return makeRange(0, 16).concat(makeRange(19, 23))
          }
        }
      },
      {
        key: 'key13',
        title: '上传组件',
        type: FormComponentTypesEnum.upload,
        componentAttrs: {
          data: {
            pictureType: 'img'
          },
          onProgress: () => {
            console.log('enter onProgress')
          },
          showFileList: false
        }
      }
    ])
    const validateForm = (params: any) => {
      // console.log('表单验证', params)
    }
    const testForm = ref(null)
    const startValidateForm = () => {
      // const formData = testForm.value.useForm()
      // console.log(formData)
      // formData.list.splice(1,1)
      // formData.form.key1 = 5
      testForm.value.validate((form) => {
        console.log('已验证', form)
      })
    }
    return {
      formList,
      validateForm,
      testForm,
      startValidateForm
    }
  }
})
</script>

<style scoped>

</style>
