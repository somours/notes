<!--
 * @Author: somours
 * @Date: 2020-12-31 00:36:59
 * @LastEditTime: 2021-01-20 16:23:36
 * @LastEditors: somours
 * @Description: In User Settings Edit
 * @FilePath: \vue-cli-vue3\src\components\SizerCategory.vue
-->

<template>
  <div class="sizer-category">
    <div class="category-list">
      <span
        class="item"
        v-for="item in categoryList"
        :key="item.id"
        :class="{ active: state.selectKeys.includes(item.id) }"
        @click="selectItem(item.id)"
      >
        {{ item.name }}
      </span>
    </div>
    <button class="confirm-btn" @click="confirm">完成</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef, reactive } from "vue";
import { SizerState } from "@/types/sizer";
import { useRequest } from "@/assets/js/request";

export default defineComponent({
  name: "SizerCategory",
  props: {
    sizerState: {}
  },
  setup(props, { emit }) {
    const categories = toRef<SizerState, "categories">(
      props.sizerState,
      "categories"
    );
    const state = reactive({
      selectKeys: categories.value || []
    });

    const { data } = useRequest("/api/category");

    const selectItem = (id: number) => {
      const arr = [...state.selectKeys];
      const idx = arr.indexOf(id);
      if (idx > -1) {
        arr.splice(idx, 1);
      } else {
        arr.push(id);
      }
      state.selectKeys = arr;
    };

    const confirm = () => {
      emit("change", { categories: state.selectKeys });
    };

    return {
      state,
      categoryList: data,
      selectItem,
      confirm
    };
  }
});
</script>

<style scoped></style>
