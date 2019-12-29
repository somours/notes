<template>
  <div class="my-render">
    自定义render渲染
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {
    MyInput: {
      props: {
        item: {
          type: Object,
          default: () => ({})
        }
      },
      render (h) {
        return h('el-input', {
        })
      }
    }
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    val: {
      type: [String, Number, Array],
      default: ''
    },
    formData: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped>

</style>
