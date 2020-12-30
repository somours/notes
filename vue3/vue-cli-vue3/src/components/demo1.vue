<template>
  <div>
    <p>
      demo组件1
    </p>
    <p>{{counter}}</p>
  </div>
</template>

<script lang="ts">
  import {ref, watch, toRefs} from 'vue'
  export default {
    name: "demo1",
    props: {
      outerCounter: {
        type: Number,
        default: 0
      }
    },
    setup(props) {
      const counter = ref(0)
      const {outerCounter} = toRefs(props)
      watch(outerCounter, () => {
        console.log('watch count',props.outerCounter)
        counter.value = props.outerCounter
      })
      return {
        counter
      }
    }
  }
</script>

<style scoped>

</style>
