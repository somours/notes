<template>
  <TheHeader></TheHeader>
  <div class="layout-content">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "@/components/TheHeader";
export default defineComponent({
  name: "App",
  components: {
    TheHeader
  }
});
</script>
<style lang="stylus">
#app
  height: 100vh;
  .layout-content
    position: absolute;
    top: $headerHeight;
    bottom: 0;
    width: 100%;
    > div
      height: 100%;
</style>
