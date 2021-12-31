<template>
<div class="ellipsis">
  <template v-if="tableView === TableViewsEnum.date">
    {{getDate}}
  </template>
  <template v-else-if="tableView === TableViewsEnum.listText">
    {{getListLabel}}
  </template>
  <template v-else-if="tableView === TableViewsEnum.link">
    <el-link type="success" @click="clickLinkFn">{{getLabel}}</el-link>
  </template>
  <template v-else-if="tableView === TableViewsEnum.picture">
    <el-image
      style="width: 26px; height: 26px"
      :src="picturePath"
      :preview-src-list="srcList"
    >
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
  </template>
  <template v-else>
    {{getLabel}}
  </template>
</div>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue'
import { isFunction, isNull } from '@/utils/basicTools'
import { getPicturePath, timeFormat } from '@/utils/tools'
import { TableViewsEnum } from '@/enums/common'

export default defineComponent({
  name: 'tableView',
  props: {
    // 当前行的数据
    row: {
      type: Object,
      default: () => ({})
    },
    // 表格项的配置
    colConfig: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const {row, colConfig} = props
    // tableView的类型
    const tableView = computed(() => colConfig.tableView || '')
    // 图片的展示
    const picturePath = computed(() => getPicturePath(row[colConfig.key]))
    // 图片的放大路径配置
    const srcList = computed(() => isNull(picturePath) ? [] : [picturePath])
    // 获取日期,时间等
    const getDate = computed(() => timeFormat(row[colConfig.key], colConfig.format))
    // 点击链接的操作
    const clickLinkFn = () => {
      const fn = colConfig.click || (() => {})
      fn(row)
    }
    return {
      tableView,
      picturePath,
      srcList,
      getDate,
      getListLabel: 'listLabel',
      getLabel: 'getLabel',
      TableViewsEnum,
      clickLinkFn
    }
  },
  /*computed: {
    tableView () {
      return this.colConfig.tableView || ''
    },
    picturePath ({ row, colConfig }) { // 如果不是全路径,需要加上http等
      return getPicturePath(row[colConfig.key])
    },
    // 图片预览的路径
    srcList ({ picturePath }) {
      if (isNull(picturePath) || picturePath.startsWith('-')) {
        return []
      } else {
        return [picturePath]
      }
    },
    // 获取日期,时间等
    getDate ({ row, colConfig }) {
      return timeFormat(row[colConfig.key], colConfig.format)
    },
    // 当是下拉,单选或者多选时,表格的文本展示
    getListLabel ({ row, colConfig }) {
      const { list = [], key = '', multiple = false, listFormat = { value: 'value', label: 'label' } } = colConfig
      let value = row[key]
      if (!isNull(value) && list.length > 0) {
        // 都换成成字符串比较
        const valueArr = multiple ? String(value).split(',') : [String(value)]
        const tempArr = []
        list.forEach((i, index) => {
          const listValue = String(i[listFormat.value])
          if (valueArr.includes(listValue)) {
            const listLabel = i[listFormat.label]
            tempArr[index] = listLabel
          }
        })
        value = tempArr.filter(i => !isNull(i)).join(',')
      }
      return value
    },
    // 当前行的展示值
    getLabel ({ row, colConfig }) {
      let res = row[colConfig.key]
      // todo 对于类似下拉, 单选,多选等列表的展示值,是否需要将其list装换为value, label的统一格式 ? 还是通过下面处理label的函数在每个配置项处自己处理
      // 如果有处理label的函数,则返回处理函数运行后的值
      const dealLabelFn = colConfig.dealLabelFn
      if (isFunction(dealLabelFn)) {
        res = dealLabelFn(row, colConfig)
      }
      return res
    }
  },
  data () {
    return {
      TableViewsEnum
    }
  },
  methods: {
    // 点击链接操作
    clickLinkFn () {
      const fn = this.colConfig.click || (() => {})
      fn(this.row)
    }
  }*/
})
</script>

<style scoped>

</style>
