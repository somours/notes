<template>
  <div class="container">
    <MyPage :list="list" :urls="request" />
  </div>
</template>

<script>
import { formItemType, tableItemType } from '@/utils/config'
import { orderListData } from '@/mockData/order/index'
import MyPage from '@/components/restructure/page'
// 账号的类型
const userTypeList = [
  { value: 0, label: '用户' },
  { value: 100, label: '机构' }
]
export default {
  components: {
    MyPage
  },
  data () {
    return {
      request: {
        getListUrl: (data) => {
          console.log(data)
          return Promise.resolve(orderListData.data)
        }
      },
      list: [
        {
          key: 'id',
          title: 'ID'
        },
        {
          key: 'age',
          title: '年龄',
          type: formItemType.input,
          form: true,
          reg: ['required']
        },
        {
          title: '抢单结束时间',
          key: 'robSuccessTime',
          width: 160,
          tableView: tableItemType.tableView.date
        },
        {
          title: '账号类型',
          key: 'userType',
          list: userTypeList,
          search: true,
          form: true,
          type: formItemType.select,
          reg: ['required'],
          tableView: tableItemType.tableView.text
        },
        {
          title: '客单价格',
          children: [
            {
              title: '原价',
              key: 'originalPrice',
              width: 90
            },
            {
              title: '折扣率',
              key: 'discountRate',
              render (h, { data }) {
                const discountRat = data.row.discountRate
                return h(
                  'span',
                  discountRat !== null ? discountRat + '%' : '-'
                )
              },
              width: 90
            },
            {
              title: '折扣价',
              key: 'discountPrice',
              width: 90,
              standBy: 0
            },
            {
              title: '特价',
              key: 'tjPrice',
              width: 90
            },
            {
              title: '最终成交价',
              key: 'currentPrice',
              width: 90
            }
          ]
        },
        {
          isNeedAdd: true,
          type: tableItemType.active,
          activeType: [
            {
              key: 'test',
              type: tableItemType.activeType.detailsDialog
            }
          ]
        }
      ],
      dialogVisible: false,
      dialogData: {
        title: 'hahaha'
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
    width: 1200px;
  }
</style>
