<template>
  <div class="sizer-tabs">
    <div class="sizer-tab-item" v-for="(tab, idx) in tabList" :key="tab.name">
      <span class="text">{{ tab.name }}</span>
      <i
        class="iconfont icon-drop-down"
        :class="{ 'icon-drop-up': state.activeTab === idx }"
      ></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import SizerCategory from "@/components/SizerCategory";
import SizerStatus from "@/components/SizerStatus";
import SizerRate from "@/components/SizerRate";
export default defineComponent({
  name: "SizerTab",
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
  }
});
</script>

<style scoped></style>
