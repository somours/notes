<template>
  <div class="container">
    test
    <TestRender />
    <MyDialog :dialog-visible.sync="dialogVisible" :data="dialogData">
      TEST DIALOG
    </MyDialog>
    <el-button @click="dialogVisible = true" type="primary">
      弹窗
    </el-button>
    <MyForm ref="myForm" :form-lists="formLists" :form-data="formData" />
    <el-button @click="save" type="primary">
      保存表单
    </el-button>
    <div>
      <MyTable :request="request" :table-lists="tableLists" />
    </div>
  </div>
</template>

<script>
import TestRender from '@/components/restructure/form/render/index.vue'
import MyDialog from '@/components/restructure/dialog/index.vue'
import MyForm from '@/components/restructure/form/index.vue'
import MyTable from '@/components/restructure/table/index.vue'
import { formItemType, tableItemType } from '@/utils/config'
import { orderListData } from '@/mockData/order/index'
const statusList = [
  {
    value: '0',
    label: '已申请'
  }, {
    value: '100',
    label: '已处理'
  }, {
    value: '200',
    label: '退单中'
  }, {
    value: '300',
    label: '已退单'
  }]
export default {
  components: {
    TestRender,
    MyDialog,
    MyForm,
    MyTable
  },
  data () {
    return {
      request: {
        getListUrl: (data) => {
          console.log(data)
          return Promise.resolve(orderListData.data)
        }
      },
      tableLists: [
        {
          key: 'id',
          title: 'ID'
        },
        {
          key: 'age',
          title: '年龄'
        },
        {
          title: '抢单结束时间',
          key: 'robSuccessTime',
          width: 160,
          tableView: tableItemType.tableView.date
        },
        {
          type: tableItemType.active,
          activeType: [
            {
              key: 'test',
              type: tableItemType.activeType.dialog
            }
          ]
        }
      ],
      dialogVisible: false,
      dialogData: {
        title: 'hahaha'
      },
      formLists: [
        {
          key: 'id',
          title: 'Id',
          type: formItemType.input,
          reg: ['required']
        },
        {
          key: 'status',
          title: '状态',
          type: formItemType.select,
          reg: ['required'],
          list: statusList
        },
        {
          key: 'name',
          title: '姓名',
          type: formItemType.input,
          reg: 'required'
        }
      ],
      formData: {
        id: 1,
        name: 'somours',
        status: ''
      }
    }
  },
  methods: {
    save () {
      this.$refs.myForm.validateForm().then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
  width: 1200px;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
