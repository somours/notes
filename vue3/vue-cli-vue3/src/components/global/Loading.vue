<template>
  <div class="loading-wrap" :style="{height: height}">
    <div class="spinner">
      <div class="rect rect1"></div>
      <div class="rect rect2"></div>
      <div class="rect rect3"></div>
      <div class="rect rect4"></div>
      <div class="rect rect5"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Loading",
    props: {
      height: {
        type: String,
        default: '100%'
      }
    }
  }
</script>

<style scoped lang="stylus">
.loading-wrap
  layout-flex(center);
.spinner
  layout-flex(center, center);
  width: 100%;
  height: 40px;
  .rect
    background $color-theme;
    height 100%;
    width 5px;
    margin-right 1px;
    animation scale-y 1.2s infinite ease-in-out;
    &.rect2
      animation-delay: -1.1s;
    &.rect3
      animation-delay: -1.0s;
    &.rect4
      animation-delay: -0.9s;
    &.rect5
      animation-delay: -0.8s;
@keyframes scale-y
  0%, 40%, 100%
    transform: scaleY(0.4);
  20%
    transform: scaleY(1);
</style>
