import Vue from 'vue'
export default Vue.component('TestRender', {
  props: {
    level: {
      type: [Number, String],
      default: 1
    }
  },
  render(h) {
  //   console.log(this.$scopedSlots)
    // console.log(this.$slots)
    console.log(this)
    const scopedSlotsStr = Object.values(this.$scopedSlots).map((key, index) => key({ abc: 'abc' + index }))
    // console.log(scopedSlotsStr)
    return h(`h${this.level}`, {
      slot: 'test'
    }, scopedSlotsStr)
  }
})
