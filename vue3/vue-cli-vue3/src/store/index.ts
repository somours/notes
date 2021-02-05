import { createStore } from 'vuex'

export default createStore({
  state: {
    searchHistory: []
  },
  mutations: {
    saveSearchHistory(state, data) {
      state.searchHistory = data;
    }
  },
  actions: {},
  modules: {

  }
});
