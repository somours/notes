import Vue from 'vue'
// formItemType, tableItemType,
import basics from '@/utils/libs/basics'
import { selectConfig, keyWord } from '@/utils/config'

const commonProps = {
  item: {
    type: Object,
    default: () => ({})
  },
  value: ''
}
// 获取item里的options里的属性, 每一个都为函数
const getOptionsAttr = (vm, attrName, type = {}) => {
  const itemOptions = vm.item.options
  return itemOptions && itemOptions[attrName] ? itemOptions[attrName](vm) : type
}
/**
 * @description: 将list生成children节点
 * @author:somours
 * @date:2019/12/30
 * @param: list 数组
 * @param: format一个对象,替换数组里label,value
 * @return: void
*/
export const listSerialize = (list, format, callback) => {
  return list.map((item, index) => {
    const callbackObj = {
      index,
      value: basics.isObj(format) ? String(item[format.value || 'value']) : String(item.value),
      label: basics.isObj(format) ? String(item[format.label || 'label']) : String(item.label)
    }
    return callback ? callback(callbackObj) : {}
  })
}

/**
 * @description: 用于最外层的手写render函数,
 * @author:somours
 * @date:2019/12/31
 * @param: createElement为Vue的render函数里的创建函数,data为传入的对象
 * @return: render
*/
// 手写的render函数
export const MyTemplate = Vue.component('MyTemplate', {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    render: {
      type: Function,
      default: (h) => {}
    }
  },
  render (createElement) {
    return this.render(createElement, this.data)
  }
})
/**
 * @description: 主要render的函数
 * @author:somours
 * @date:2019/12/30
 * @param:
 * @return:
*/
export const basicsRender = (name, options = () => ({}), childrenNode = () => false) => {
  return {
    props: commonProps,
    render (h) {
      if (!basics.isArray(this.item.list)) {
        this.item.list = []
      }
      const vmOptions = options(this)
      const vmChildrenNode = childrenNode(this, h, this.item.list, this.item.listFormat)
      const itemOptions = this.item.options
      const on = getOptionsAttr(this, 'on')
      let onInput = () => {}
      if (on.input) {
        onInput = on.input
      }
      return h(name, {
        props: {
          value: this.value,
          ...(vmOptions.props || {}),
          ...getOptionsAttr(this, 'props')
        },
        on: {
          'input': (value) => {
            const newValue = (this.item.type && this.item.type.includes(keyWord.multiple)) ? [] : ('' || value)
            this.$emit('input', newValue)
            onInput(newValue, this)
          },
          ...(vmOptions.on || {}),
          ...on
        },
        nativeOn: {
          ...(vmOptions.nativeOn || {}),
          ...getOptionsAttr(this, 'nativeOn')
        },
        attrs: {
          placeholder: (itemOptions && itemOptions.placeholder) || this.item.title,
          ...(vmOptions.attrs || {}),
          ...getOptionsAttr(this, 'attrs')
        },
        style: {
          ...(vmOptions.style),
          ...getOptionsAttr(this, 'style')
        },
        'class': {
          ...(vmOptions.class),
          ...getOptionsAttr(this, 'class')
        }
      }, vmChildrenNode)
    }
  }
}
// 输入框
export const MyInput = Vue.component('MyInput', basicsRender('el-input', () => {
  return {
    props: {
      clearable: selectConfig.clearable
    }
  }
}))
// 下拉框
export const MySelect = Vue.component('MySelect', basicsRender('el-select', (vm) => {
  return {
    props: {
      value: basics.isArray(vm.value) ? vm.value : String(vm.value),
      multiple: basics.isArray(vm.value),
      ...selectConfig
    }
  }
}, (vm, h, list, format) => listSerialize(list, format, (item) => {
  return h('el-option', {
    props: {
      key: item.value,
      label: item.label,
      value: item.value,
      disable: item.disabled
    }
  })
})))
// 单选框 radio
export const MyRadio = Vue.component('MyRadio', basicsRender('el-radio-group', '', (vm, h, list, format) => listSerialize(list, format, (item) => {
  return h('el-radio', { // el-radio上的label是value值,显示内容在标签内
    props: {
      key: item.value,
      label: item.value,
      disabled: item.disabled
    }
  }, item.label)
})))
// 复选框 checkbox
export const MyCheckbox = Vue.component('MyCheckbox', basicsRender('el-checkbox-group', '', (vm, h, list, format) => listSerialize(list, format, (item) => {
  return h('el-checkbox', {
    props: {
      key: item.value,
      label: item.value,
      disabled: item.disabled
    }
  }, item.label)
})))
// 日期选择 (单个)
export const MyDatePicker = Vue.component('MyDatePicker', basicsRender('el-date-picker', (vm) => {
  const options = vm.item.options || {}
  const value = vm.value

  return {
    props: {
      value,
      type: options.type ? options.type : 'date',
      format: options.format ? options.format : 'yyyy - MM - dd',
      valueFormat: options.valueFormat ? options.valueFormat : 'yyyy-MM-dd'
    }
  }
}))

// 日期选择 (两个)
export const MyDatePickerDouble = Vue.component('MyDatePickerDouble', basicsRender('div', '', (vm, h) => {
  const options = vm.item.options || {}
  const value = [].concat(vm.value || [])
  return [
    h('el-date-picker', {
      props: {
        value: value[0],
        valueFormat: options.valueFormat ? options.valueFormat : 'yyyy-MM-dd'
      },
      attrs: {
        placeholder: (options && options.startPlaceholder) || '开始日期'
      },
      style: {
        width: '160px'
      },
      on: {
        'input': (newValue) => {
          value[0] = newValue
          vm.$emit('input', value)
        }
      }
    }),
    '-',
    h('el-date-picker', {
      props: {
        value: value[1],
        valueFormat: options.valueFormat ? options.valueFormat : 'yyyy-MM-dd'
      },
      attrs: {
        placeholder: (options && options.endPlaceholder) || '结束日期'
      },
      style: {
        width: '160px'
      },
      on: {
        'input': (newValue) => {
          value[1] = newValue
          vm.$emit('input', value)
        }
      }
    })
  ]
}))

// 开关 switch
export const MySwitch = Vue.component('MySwtich', basicsRender('el-switch', (vm) => {
  const on = getOptionsAttr(vm, 'on')
  if (on.input) {
    if (!basics.isNull(vm.value)) {
      on.input(String(vm.value))
    }
  }
  return {
    props: {
      value: basics.isNull(vm.value) ? '' : String(vm.value)
    },
    on: {
      'change': (newValue) => {
        vm.$emit('input', newValue)
      }
    }
  }
}))
