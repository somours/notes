<template>
  <MyDialog>
    <MyForm />
  </MyDialog>
</template>

<script>
import MyDialog from '@/components/restructure/dialog/index'
import MyForm from '@/components/restructure/form/index'
export default {
  name: 'DialogForm',
  components: {
    MyDialog,
    MyForm
  },
  props: {

  }
}
</script>

<style scoped>

</style>
