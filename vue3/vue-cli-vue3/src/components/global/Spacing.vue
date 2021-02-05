<template>
  <div class="spacing" :style="style"></div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
export default defineComponent({
  name: "Spacing",
  props: {
    height: {
      type: Number,
      default: 10
    },
    bgColor: {
      type: String,
      default: "#f6f6f6"
    }
  },
  setup(props) {
    const style = computed(() => {
      return {
        height: props.height + "px",
        backgroundColor: props.bgColor
      };
    });
  }
});
</script>

<style scoped lang="stylus"></style>
