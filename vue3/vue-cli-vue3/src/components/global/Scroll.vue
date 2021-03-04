<template>
  <div class="scroll-wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onActivated, watch } from "vue";
import BScroll from "@better-scroll/core";
import PullUp from "@better-scroll/pull-up";
import ObserveDom from "@better-scroll/observe-dom";
BScroll.use(ObserveDom).use(PullUp);
export default defineComponent({
  name: "Scroll",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    pullUpLoad: {
      type: [Boolean, Object],
      default: false
    }
  },
  setup(props, { emit }) {
    const wrapper = ref<HTMLElement>();
    const scroll = ref<BScroll>();
    // 初始化滚动
    const initScroll = () => {
      if (!wrapper.value) {
        return;
      }
      scroll.value = new BScroll(wrapper.value, {
        bounce: false,
        click: true,
        pullUpLoad: props.pullUpLoad,
        ObserveDom: true
      });
      if (props.pullUpLoad) {
        scroll.value.on("pullingUp", () => {
          emit("pulling-up");
        });
      }
    };
    // 刷新滚动
    const refresh = () => {
      scroll.value && scroll.value.refresh();
    };
    // 强制刷新, 停止滚动
    const forceRefresh = () => {
      setTimeout(() => {
        refresh();
      }, 30);
      if (props.pullUpLoad && scroll.value) {
        scroll.value.finishPullUp();
        refresh();
      }
    };
    // keepalive时触发
    onActivated(() => {
      if (props.data && props.data.length) {
        refresh();
      }
    });
    // mounted时
    onMounted(() => {
      // setTimeout(() => {
        initScroll();
      // }, 500);
    });
    // watch, 观测props.data变化
    watch(
      () => props.data,
      () => {
        forceRefresh();
      }
    );
    return {
      wrapper
    };
  }
});
</script>
<style lang="stylus" scoped>
.scroll-wrapper
  height 100%
  overflow auto
</style>
