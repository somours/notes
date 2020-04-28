<template>
  <div class="home-page">
    首页
    <div>
      <button style="color: #fff">测试button效果</button>
    </div>
    <div class="box-shadow">box shadow</div>
    <div class="blurry-text no-select">模糊文本</div>
    <br />
    <span class="loading"></span>
  </div>
</template>

<script>
export default {
  name: "index"
};
</script>

<style scoped lang="scss">
// 只在一边或两边显示盒子阴影
.box-shadow {
  background-color: #ff8020;
  width: 160px;
  height: 90px;
  margin-top: -45px;
  margin-left: -80px;
  position: absolute;
  top: 50%;
  left: 50%;
}
.box-shadow:after {
  content: "";
  width: 150px;
  height: 1px;
  margin-top: 88px;
  margin-left: -75px;
  display: block;
  position: absolute;
  left: 50%;
  z-index: -1;
  -webkit-box-shadow: 0px 0px 8px 2px #000000;
  -moz-box-shadow: 0px 0px 8px 2px #000000;
  box-shadow: 0px 0px 8px 2px #000000;
}
</style>
