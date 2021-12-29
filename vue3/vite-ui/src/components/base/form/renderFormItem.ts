import {defineComponent,h} from "vue";

export default defineComponent({
  name: 'FormItemRender',
  functional: true,
  props: {
    item: Object,
    render: {
      type: Function,
      default: () => {}
    },
    index: Number
  },
  render() {
    const params = {
      item: this.$props.item,
      index: this.$props.index,
    }
    return this.$props.render(h, params)
  }
})
