<!--
 * @Author: your name
 * @Date: 2020-12-31 00:23:07
 * @LastEditTime: 2021-01-20 16:18:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-cli-vue3\src\components\SizerTab.vue
-->
<template>
  <div class="sizer-tabs">
    <div
      class="sizer-tab-item"
      v-for="(tab, idx) in tabList"
      :key="tab.name"
      :class="getTabClass(idx)"
      @click="switchTab(idx)"
    >
      <span class="text">{{ tab.name }}</span>
      <i
        class="iconfont icon-drop-down"
        :class="{ 'icon-drop-up': state.activeTab === idx }"
      ></i>
    </div>
    <div class="sizer-tab-content">
      <component
        :is="activeComp"
        :sizerState="sizerState"
        @change="handleSizerChange"
      ></component>
    </div>
    <transition name="drop-menu-mask">
      <div
        class="sizer-mask"
        v-show="state.activeTab !== -1"
        @click="state.activeTab = -1"
      ></div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import SizerCategory from "@/components/SizerCategory.vue";
import SizerStatus from "@/components/SizerStatus.vue";
import SizerRate from "@/components/SizerRate.vue";
import { SizerState } from "@/types/sizer";
export default defineComponent({
  name: "SizerTab",
  props: ["sizerState"],
  components: {
    SizerCategory,
    SizerStatus,
    SizerRate
  },
  setup(props, { emit }) {
    const state = reactive({
      activeTab: -1
    });

    const tabList = [
      { name: "分类", component: SizerCategory },
      { name: "以上映", component: SizerStatus },
      { name: "评分", component: SizerRate }
    ];

    const getTabClass = (idx: number) => {
      return {
        active: idx === state.activeTab,
        disable: idx === 2 && props.SizerState.status === "0"
      };
    };

    const switchTab = (idx: number) => {
      // 点击相同的等于关闭
      if (idx === state.activeTab) {
        state.activeTab = -1;
        return;
      }
      // 当选择未上映时, 评分不可选
      if (props.SizerState.status === "0" && idx === 2) return;
      state.activeTab = idx;
    };

    const activeComp = computed(() => {
      const match = tabList[state.activeTab];
      return state.activeTab > -1 ? match.component : undefined;
    });

    const handleSizerChange = (changeField: SizerState) => {
      state.activeTab = -1;
      tabList[1].name = !changeField.status
        ? "全部"
        : changeField.status === "1"
        ? "已上映"
        : "未上映";
      emit("change", changeField);
    };

    return {
      state,
      tabList,
      getTabClass,
      switchTab,
      activeComp,
      handleSizerChange
    };
  }
});
</script>
<style lang="stylus" scoped>
.sizer-tabs
  layout-flex();
  height: 40px;
  line-height: 40px;
  border-bottom: $bordered;
  .sizer-tab-item
    position: relative;
    flex: 1;
    text-align: center;
    font-size: $font-size-small;
    color: $color-text-regular;
    &.active
      color: $color-text-primary;
    &.disable
      color: $color-text-lighter;
    &:not(:first-child)::before
      position: absolute
      content: "";
      display: block;
      height: 20px;
      top: 10px;
      left: 0;
      border-left: 1px solid #e8e8e8;
.sizer-tab-content
  position: absolute;
  width: 100%;
  top: 41px;
  z-index: 20;
  background: $color-white;
.sizer-mask
  page-fixed(97px);
  z-index: 15;
  background: rgba(0, 0, 0, 0.5);
.drop-menu-mask-enter-active,
.drop-menu-mask-leave-active
  transition: opacity 0.3s;
.drop-menu-mask-enter-from,
.drop-menu-mask-leave-to
  opacity: 0;
</style>
