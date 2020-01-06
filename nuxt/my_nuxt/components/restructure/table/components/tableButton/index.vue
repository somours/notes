<template>
  <div>
    <template v-for="(item) in activeTypeList">
      <div v-if="showOrHidden(item,row)" class="activeButton">
        <el-button
          :size="item.size"
          :type="item.theme"
          :icon="otherOrFn(item.icon, item)"
          :disabled="basics.isFunction(item.disabled) ? item.disabled(row) : item.disabled"
          @click="item.click(index,item,row,vm)"
        >
          {{ otherOrFn(item.text, item) }}
        </el-button>
      </div>
    </template>
  </div>
</template>

<script>
import { tableItemType, error } from '@/utils/config'
import { deepClone } from '@/utils/index'
const basicsButtonConfig = {
  text: '默认配置',
  click: () => {
  },
  theme: 'primary',
  size: 'mini'
}
export default {
  name: 'Index',
  props: {
    activeType: {
      type: Array,
      default: () => [tableItemType.activeType.detailsDialog, tableItemType.activeType.delete]
    },
    row: {
      type: Object,
      default: () => ({})
    },
    index: { // 外面的index,暂时没用到
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      vm: this,
      [tableItemType.activeType.detailsDialog]: {
        text: '编辑',
        click: () => {
          this.$emit('getById')
        },
        theme: 'primary',
        size: 'mini'
      },
      [tableItemType.activeType.dialog]: {
        text: '弹窗',
        click: (index, item, row, vm) => {
          console.log(item, row)
          if (this.basics.isNull(item.key)) { error('key Can not be empty') }
          this.$emit('dialog', {
            key: item.key,
            index,
            row
          })
        },
        theme: 'primary',
        size: 'mini'
      },
      [tableItemType.activeType.delete]: {
        text: '删除',
        click: () => {
          this.$emit('deleteActive')
        },
        theme: 'danger',
        size: 'mini'
      },
      [tableItemType.activeType.newWin]: {
        text: '跳转',
        click: (index, item, row) => {
          this.$router.push({
            path: item.path || '/',
            query: item.setQuery ? item.setQuery(row) : {}
          })
        },
        theme: 'primary',
        size: 'mini'
      }
    }
  },
  computed: {
    activeTypeList () {
      const activeType = deepClone(this.activeType)
      return activeType.map((item) => {
        // if (item.load) { item.load.apply(this, [item, this.row]) }
        return this.getActiveType(item)
      })
    }
  },
  methods: {
    // 获取按钮类型
    getActiveType (activeItem) {
      let type = ''
      if (this.basics.isString(activeItem)) {
        type = activeItem
      } else if (this.basics.isObj(activeItem)) {
        type = activeItem.type
      }
      return {
        basicsButtonConfig,
        ...this[type] ? this[type] : {}
        // ...this.basics.isFunction(activeItem) ? activeItem(this.params) : (this.basics.isObj(activeItem) ? activeItem : {})
      }
    },
    // 文本以及Icon的传入显示,可直接字符串,以及函数
    otherOrFn (data, activeTypeItem) {
      if (this.basics.isFunction(data)) {
        return data(this.row, activeTypeItem)
      }
      return data
    },
    // 控制button的显示与否,
    showOrHidden (item, params) {
      if (!this.basics.isNull(item.hidden)) { /* false */
        const hidden = item.hidden
        if (this.basics.isFunction(hidden)) {
          return !(hidden(params))
        }
        return !(hidden)
      } else if (!this.basics.isNull(item.show)) { /* true */
        const show = item.show
        if (this.basics.isFunction(show)) {
          return show(params)
        }
        return show
      }
      return true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .activeButton {
    display: inline-block;
    margin-right: 10px;
    &:last-child {
      margin: 0;
    }
  }
</style>
