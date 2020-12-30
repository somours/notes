<template>
  <div class="category">
    <!--sizerTab-->
    <SizerTab :sizerState="state" @change="handleSizerChange"></SizerTab>
    <!--滚动列表-->
    <div class="movie-list" v-show="!loading">
      <Scroll v-show="movieList && movieList.length" :data="movieList">

      </Scroll>
    </div>
    <Loading v-show="loading" height="80%" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { useRequest } from "@/assets/js/request";
import { Movie } from "@/types/movie";
import { SizerState } from "@/types/sizer";
import SizerTab from "@/components/SizerTab.vue";

export default defineComponent({
  name: "Category",
  components: {
    SizerTab
  },
  setup() {
    const state: Required<SizerState> = reactive({
      status: "1",
      rate: [0, 10],
      categories: []
    });

    const params = computed(() => ({
      status: state.status,
      rate: state.status !== "0" ? JSON.stringify(state.rate) : undefined,
      categories: !state.categories.length
        ? undefined
        : JSON.stringify(state.categories)
    }));

    const initialData: Movie[] = [];
    const { data, loading, fetch } = useRequest("/ap/movie", params, {
      initialData
    });
    const handleSizerChange = (item: SizerState) => {
      for (const key in item) {
        state[key] = item[key];
      }
    };
    return { state, movieList: data, loading, fetch, handleSizerChange };
  }
});
</script>

<style lang="stylus" scoped>
.movie-list
  page-fixed(97px);
</style>
