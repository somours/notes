import { createStore } from 'vuex'
import searchCache from "@/assets/js/searchCache";

export default createStore({
  state: {
    searchHistory: searchCache.getAll()
  },
  mutations: {
    saveSearchHistory(state, data) {
      state.searchHistory = searchCache.addOne(data);
    },
    deleteSearchHistory(state, data) {
      state.searchHistory = searchCache.removeOne(data);
    },
    clearSearchHistory(state, data) {
      state.searchHistory = searchCache.clearAll();
    }
  },
  actions: {},
  modules: {

  }
});
