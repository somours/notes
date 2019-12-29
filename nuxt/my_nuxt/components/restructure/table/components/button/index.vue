<template>
  <div>
    <span v-for="(i,$index) in fliterActiveType" v-if="showOrHidden(i,params)" class="activeButton">
      <el-button
        :size="i.size"
        :type="i.theme"
        :icon="otherOrFn(i.icon,fliterActiveType[$index])"
        :disabled="basics.isFunction(i.disabled)?i.disabled(params):i.disabled"
        @click="i.click($index,fliterActiveType[$index],params,index,vm)"
      >{{ otherOrFn(i.text,fliterActiveType[$index]) }}</el-button>
    </span>
  </div>
</template>

<script>
import { tableItemType, error } from '@/utils/config'
import { copy } from '@/utils/libs/basicsMethods'

export default {
  name: 'Index',
  props: {
    activeType: {
      type: Array,
      default: () => [tableItemType.activeType.detailsDialog, tableItemType.activeType.delete]
    },
    params: {
      type: Object,
      default: () => {
      }
    },
    index: {
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
        click: ($index, i, params, index) => {
          if (this.basics.isNull(i.key)) { error('key Can not be empty') }
          this.$emit('dialog', {
            key: i.key,
            $index,
            params,
            index
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
        click: ($index, item, params) => {
          this.$router.push({
            path: item.path || '/',
            query: item.setQuery ? item.setQuery(params) : {}
          })
        },
        theme: 'primary',
        size: 'mini'
      },
      basicsButtonConfig: {
        text: '默认配置',
        click: () => {
        },
        theme: 'primary',
        size: 'mini'
      }
    }
  },
  computed: {
    fliterActiveType () {
      return copy(this.activeType).map((item) => {
        if (item.load) { item.load.apply(this, [item, this.params]) }
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
      } else if (this.basics.isObj(activeItem)) { type = activeItem.type }
      return {
        ...this.basicsButtonConfig,
        ...this[type] ? this[type] : {},
        ...this.basics.isFunction(activeItem) ? activeItem(this.params) : (this.basics.isObj(activeItem) ? activeItem : {})
      }
    },
    otherOrFn (data, that) {
      if (this.basics.isFunction(data)) {
        return data(this.params, that)
      }
      return data
    },
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
    margin-right: 10px;

    &:last-child {
      margin: 0;
    }
  }
</style>
