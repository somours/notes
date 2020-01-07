<template>
  <div>
    <span @click="handleClick" v-if="column.tableView===tableView.text||column.tableView===tableView.requestText">{{ getText(column) }}</span>
    <span @click="handleJumpClick" v-if="column.tableView===tableView.jump" class="JumpClick">{{ data[column.key] }}</span>
    <!--    <span v-if="column.tableView===tableView.subTitle">{{getSubTitle(column)}}</span>-->
    <!--    <span v-if="column.tableView===tableView.prefixTitle">{{getPrefixTitle(column)}}</span>-->
    <span v-if="column.tableView===tableView.picture">
      <img
        @click="getView(data[column.key])"
        v-error
        :src="picturePath(data[column.key])"
        class="login-page"
      >
    </span>
    <!--<span @click="handleClick" v-if="column.tableView===tableView.tagState">
      <el-tag :type="column.tagState[String(data[column.key])]">{{getText(column)}}</el-tag>
    </span>-->
    <span @click="handleClick" v-if="column.tableView===tableView.date">{{ showTime() }}</span>
    <!--    <span @click="handleClick" v-if="column.tableView===tableView.colorView||column.tableView===tableView.pointerColorView" :style="getStyle">{{ basics.isNull(data[column.key])?((column.options&&column.options.alternate)||'-'):data[column.key] }}</span>-->
  </div>
</template>

<script>
import { filterEnumsLabel, getObjKeyValue, picturePath } from '@/utils/index'
import { tableItemType } from '@/utils/config'
import { listSerialize } from '@/components/restructure/form/render/render'
import { parseTimeTwo } from '@/utils/filter'

export default {
  name: 'Index',
  props: {
    column: { // 自定义的表格的列的配置项
      type: Object,
      default: () => {}
    },
    data: { // 表格的数据
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      tableView: tableItemType.tableView,
      picturePath,
      getObjKeyValue,
      tagState: ''
    }
  },
  computed: {
    getStyle () {
      return {
        ...{},
        ...{
          color: this.column.color || '#409EFF',
          cursor:
            this.column.tableView === this.tableView.pointerColorView
              ? 'pointer'
              : 'auto'
        },
        ...(this.column.style || {}),
        ...(this.column.options && this.column.options.style
          ? this.column.options.style(this.data)
          : {})
      }
    }
  },
  methods: {
    // 时间格式化
    showTime () {
      const timeValue = this.getObjKeyValue(this.column.key, this.data)
      const timeFormat = (this.column.options && this.column.options.format) || 'yyyy-MM-dd hh:mm:ss'
      return parseTimeTwo(timeValue, timeFormat)
    },
    // 展示文本
    getText (column, callback) {
      let ret = '-'
      const list = !this.basics.isArray(column.list) ? [] : column.list
      // 把表格的requestList放在这里处理感觉比较好 ??
      if (column.requestList) {
        column.requestList().then((res) => {
          listSerialize(res, column.listFormat, (serializedItem) => {
            list[serializedItem.index] = serializedItem
          })
        })
      }
      const keyValue = this.data[column.key]
      const formatObj = this.basics.isObj(column.listFormat) ? column.listFormat : {
        value: 'value',
        label: 'label'
      }
      ret = filterEnumsLabel(keyValue, list, formatObj)
      // if (callback) callback(filter[0]);
      return ret
    },
    getSubTitle (column) {
      const data = this.data[column.key]
      if (this.basics.isNull(data)) { return '-' }
      return column.options.subTitle + data
    },
    getPrefixTitle (column) {
      const data = this.data[column.key]
      if (this.basics.isNull(data)) { return '-' }
      return data + column.options.prefixTitle
    },
    // 图片显示
    getView (path) {
      this.$store.commit('SET_PICTUREINFO', picturePath(path))
    },
    handleClick () {
      try {
        if (this.column.options) {
          this.column.options.on.click(this.data, this.column)
        } else {
          this.column.tableOptions.on.click(this.data, this.column)
        }
      } catch (e) {
        console.log(e)
      }
    },
    getOptions () {
      return this.column.options || {}
    },
    async handleJumpClick () {
      if (this.column.options) {
        const data = this.column.options
        const query = data.query || []
        let aggieQuery = {}
        if (this.basics.isArray(query)) {
          query.filter((item) => {
            aggieQuery[item] = data[item] || ''
          })
        } else if (this.basics.isFunction(query)) {
          aggieQuery = await query(this.data)
        }
        this.$router.push({
          name: data.name,
          query: aggieQuery
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.test {
  cursor: auto;
}
.login-page {
  cursor: pointer;
  max-width: 50px;
  max-height: 50px;
  &:hover {
    box-shadow: 1px 1px 8px -2px #333333;
  }
}
.JumpClick {
  color: #409eff;
  cursor: pointer;
  text-decoration: underline;
}
div {
  white-space: nowrap;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
