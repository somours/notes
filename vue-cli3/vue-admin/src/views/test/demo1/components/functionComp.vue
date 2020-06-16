<script>
export default {
  name: 'FunctionComp',
  functional: true,
  props: {
    text: {
      type: [String, Number],
      default: '123'
    }
  },
  inject: ['a'],
  render: function(h, context) {
    console.dir(context)
    const { props, listeners, injections } = context
    // console.log(parent.$data.text)
    const slotsStr = Object.values(context.slots())
    return h('div', context.data, [
      h('div', {
        on: {
          click: listeners.fail
        }
      }, props.text + '_' + injections.a()),
      ...slotsStr
    ])
  }
}
</script>
