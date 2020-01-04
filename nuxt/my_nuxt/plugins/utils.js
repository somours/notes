import Vue from 'vue'
import basics from '~/utils/libs/basics'
import * as filters from '~/utils/filter'

Vue.use(basics)
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
