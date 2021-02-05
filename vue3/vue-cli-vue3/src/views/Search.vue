<template>
  <div class="search">
    <Scroll>
      <div class="search-input-wrapper">
        <Input v-model="state.keyword" @change="search">
      </div>
      <div class="search-keys-wrapper">
        <h1 class="title">热门搜索</h1>
        <div class="list">
          <span v-for="item in hotSearchKeys" :key="item.name" class="item" @click="addQuery(item.name)">
            {{item.name}}
          </span>
        </div>
      </div>
      <div class="search-history-wrapper">
        <h1 class="title">
          <span>历史</span>
          <i class="iconfont icon-clear" ></i>
        </h1>
        <div class="list">
          <div class="item" v-for="item in state.searchHistory" :key="item">
            <i class="iconfont icon-history"></i>
            <span class="text" @click="addQuery(item)">{{item}}</span>
            <i class="iconfont icon-del" @click="deleteSearchHistory(item)"></i>
          </div>
        </div>
      </div>
    </Scroll>
    <div class="movie-list">
      <Scroll :data="movieList" v-show="movieList.length">
        <Card v-for="(movie, idx) in movieList" :key="movie.id" :movie="movie" ></Card>
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
import {useStore} from "vuex";
export default defineComponent({
  name: "Search",
  setup() {
    const store = useStore();
    const state = reactive({
      isShow: false,
      isShowConfirm: false,
      keyword: '',
      searchHistory: computed(() => {
        store.state.searchHistory
      })
    })
  }
});
</script>

<style scoped></style>
