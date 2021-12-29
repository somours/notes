import {defineComponent,h} from "vue";

export default defineComponent({
  name: 'TableRenderBody',
  functional: true,
  props: {
    row: Object,
    render: {
      type: Function,
      default: () => {}
    },
    index: Number,
    column: {
      type: Object,
      default: null
    }
  },
  render() {
    const params = {
      row: this.$props.row,
      index: this.$props.index,
      column: this.$props.column
    }
    return this.$props.render(h, params)
  }
})
