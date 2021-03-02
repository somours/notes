<template>
  <div class="search">
    <Scroll>
      <div class="search-input-wrapper">
        <Input v-model="state.keyword" @change="search" />
      </div>
      <div class="search-keys-wrapper">
        <h1 class="title">热门搜索</h1>
        <div class="list">
          <span
            v-for="item in hotSearchKeys"
            :key="item.name"
            class="item"
            @click="addQuery(item.name)"
          >
            {{ item.name }}
          </span>
        </div>
      </div>
      <div v-if="state.searchHistory.length" class="search-history-wrapper">
        <h1 class="title">
          <span>历史</span>
          <i
            class="iconfont icon-clear"
            @click="state.isShowConfirm = true"
          ></i>
        </h1>
        <div class="list">
          <div class="item" v-for="item in state.searchHistory" :key="item">
            <i class="iconfont icon-history"></i>
            <span class="text" @click="addQuery(item)">{{ item }}</span>
            <i class="iconfont icon-del" @click="deleteSearchHistory(item)"></i>
          </div>
        </div>
      </div>
    </Scroll>
    <div class="movie-list">
      <Scroll :data="movieList" v-show="movieList.length">
        <Card v-for="movie in movieList" :key="movie.id" :movie="movie"></Card>
      </Scroll>
      <NoResult v-show="!movieList.length"></NoResult>
    </div>
    <Confirm
      v-model="state.isShowConfirm"
      content="是否删除所有的搜索历史"
      @confirm="clearSearch"
    ></Confirm>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { mapMutations, useStore } from "vuex";
import { useRequest } from "@/assets/js/request";
import useDebounce from "@/assets/js/useDebounce";
export default defineComponent({
  name: "Search",
  setup() {
    const store = useStore();
    const state = reactive({
      isShow: false,
      isShowConfirm: false,
      keyword: "",
      searchHistory: computed(() => store.state.searchHistory)
    });

    // 获取热门搜索词汇
    const { data: hotSearchKeys } = useRequest("/api/keyword");

    const params = computed(() => ({
      keyword: state.keyword
    }));
    const { data: movieList, fetch } = useRequest("/api/movie/search", params, {
      immediate: false,
      initialData: []
    });
    // 搜索操作
    const search = useDebounce(() => {
      if (!state.keyword.trim()) {
        movieList.value = [];
        state.isShow = false;
      } else {
        fetch().then(() => {
          state.isShow = true;
          store.commit("saveSearchHistory", state.keyword);
        });
      }
    });

    const addQuery = (word: string) => {
      state.keyword = word;
      search();
    };

    const clearSearch = () => {
      store.commit("clearSearchHistory", state.keyword);
      state.isShowConfirm = false;
    };

    return {
      state,
      hotSearchKeys,
      movieList,
      addQuery,
      search,
      clearSearch,
      ...mapMutations(["deleteSearchHistory"])
    };
  }
});
</script>

<style lang="stylus" scoped>
.search-input-wrapper
  background: $color-background;
  padding: 10px 15px;
.search-keys-wrapper
  padding: 0 15px 8px 15px;
  background-color: $color-white;
  .title
    padding: 15px 0;
    font-size: $font-size-base;
    color: $color-text-regular;
  .list
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    .item
      padding: 6px 12px;
      margin: 0 12px 12px 0;
      border-radius: $border-radius-base;
      font-size: $font-size-small;
      color: $color-text-primary ;
      background-color: $color-background;
.search-history-wrapper
  padding: 0 15px 8px 15px;
  background-color: $color-white;
  .title
    padding-bottom: 15px;
    font-size: $font-size-base;
    color: $color-text-regular;
    .icon-clear
      float: right;
      font-size: $font-size-base;
  .list
    .item
      height: 40px;
      line-height: 40px;
      display: flex;
      font-size: $font-size-base;
      color: $color-text-primary;
      border-bottom: $bordered;
      .icon
        font-size: $font-size-base;
        color: $color-text-secondary;
      .icon-history
        margin-right: 10px;
      .text
        flex: 1;
.movie-list
  page-fixed(111px);
</style>
