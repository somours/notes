<template>
  <div class="normal-table">
    <el-form size="small" :model="formData" label-width="120">
      <el-form-item label="日期">
        <el-input />
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      />
      <el-table-column
        prop="address"
        label="地址"
      />
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="edit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="dele(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'NormalTable',
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      formData: {}
    }
  },
  methods: {
    dele(data) {

    },
    edit(data) {
    }
  }
}
</script>

<style scoped lang="scss">
.normal-table {
  padding: 20px;
}
</style>
