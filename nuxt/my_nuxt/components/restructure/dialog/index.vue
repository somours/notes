<template>
  <el-dialog
    :visible.sync="visible"
    :title="data.title || ''"
    :width="data.width || '30%'"
    :append-to-body="data.appendToBody || false"
    :close-on-click-modal="data.closeOnClickModal || false"
    :close-on-press-escape="data.closeOnPressEscape || false"
    :custom-class="data.customClass || ''"
    @open="openDialog"
    @close="closeDialog"
  >
    <slot />
  </el-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {}
  },
  computed: {
    visible: {
      get () {
        return this.dialogVisible
      },
      set (value) {
        this.$emit('update:dialogVisible', value)
      }
    }
  },
  methods: {
    openDialog () {
      this.$emit('openDialog')
    },
    closeDialog () {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style scoped></style>
