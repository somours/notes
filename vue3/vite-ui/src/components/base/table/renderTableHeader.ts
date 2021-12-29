import {defineComponent, h} from 'vue'
export default defineComponent({
  name: 'TableRenderHeader',
  functional: true,
  props: {
    render: {
      type: Function,
      default: () => {}
    },
    column: Object,
    index: Number
  },
  render () {
    const params = {
      column: this.$props.column,
      index: this.$props.index
    }
    return this.$props.render(h, params)
  }
})
