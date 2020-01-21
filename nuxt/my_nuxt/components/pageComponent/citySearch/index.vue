<template>
  <div class="city-search-box" v-if="showSearch">
    <header class="search-box">
      <div class="input-box">
        <input type="text" v-model="cityName" @input="input" placeholder="城市名或拼音" class="input">
        <span class="text" @click="cancel">取消</span>
      </div>
      <div class="current-city">
        <div class="loaction-suc" v-if="locationCity">
          <span class="location-city">成都</span>
          <em class="text">当前定位城市</em>
        </div>
        <div class="location-fail" v-else>未定位到城市</div>
      </div>
    </header>
    <div class="can-select-area">可选地区</div>
    <div class="city-box">
      <template  v-if="!cityName">
        <ProvinceItem class="province-list" :list="provinceList" :selected="selected" @clickItem="clickProvince" @clickChildItem="clickChildItem"></ProvinceItem>
      </template>
      <div class="search-city" v-else>
        <div class="loading-box" v-if="cityName && !searchList.length">
          <van-loading type="spinner" color="#1989fa" />
        </div>
        <template  v-else>
          <ProvinceItem class="search-cont" :list="searchList" :selected="selected" @clickItem="clickProvince" @clickChildItem="clickChildItem"></ProvinceItem>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  // import area from './area.json';
  import { area } from './area.js';
  import { debounce } from '@/utils/tools';
  import ProvinceItem from './provinceItem/index';
  export default {
    name: 'citySearch',
    components: {
      ProvinceItem
    },
    props: {
      showSearch: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        // 定位成功的城市
        locationCity: '',
        // 输入的城市名称
        cityName: '',
        provinceList: area,
        // 选择的省份
        selected: '',
        // 搜素后的省份列表
        searchList: []
      };
    },
    mounted () {
      // 设置输入debounce函数
      this.debounceInput = debounce(() => {
        const cityName = this.cityName;
        const searchList = [];
        for (let i = 0; i < this.provinceList.length; i++) {
          const item = this.provinceList[i];
          if (item.label.includes(cityName)) {
            searchList.push(item);
            continue;
          }
          let flag = false;
          for (let childIndex = 0; childIndex < item.children.length; childIndex++) {
            const childItem = item.children[childIndex];
            if (childItem.label.includes(cityName)) {
              flag = true;
              break;
            }
          }
          if (flag) searchList.push(item);
        }
        console.log(this.searchList);
        this.searchList = searchList;
      }, 500);
    },
    methods: {
      // 点击省份
      clickProvince (item) {
        if (this.selected === item.value) {
          this.selected = '';
        } else {
          this.selected = item.value;
        }
      },
      // 点击市
      clickChildItem (childItem, item) {
        this.$emit('update:showSearch', false);
        this.$emit('selectedCity', childItem, item);
      },
      input (e) {
        this.debounceInput();
      },
      // 取消搜索
      cancel () {
        this.$emit('update:showSearch', false);
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../../styles/variables";
  .city-search-box {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #fff;
    z-index: 10;
    .search-box {
      width: 100%;
      height: toRem(186);
      padding: toRem(20) toRem(40) 0;
      box-sizing: border-box;
      .input-box {
        display: flex;
        align-items: center;
        .input {
          width: toRem(580);
          height: toRem(64);
          line-height: toRem(64);
          border-radius: toRem(32);
          background: #F5F5F5;
          text-indent: toRem(40);
          border: none;
        }
        .text {
          flex: 1;
          text-align: right;
          color: #333333;
          font-size: toRem(36);
        }
      }
      .current-city {
        height: toRem(102);
        display: flex;
        align-items: center;
        color: #9B9B9B;
        font-size: toRem(26);
        .location-city {
          color: #4497FD;
          font-size: toRem(32);
          margin-right: toRem(16);
        }
      }
    }
    .can-select-area {
      color: #A4A4A4;
      font-size: toRem(24);
      height: toRem(40);
      line-height: toRem(40);
      background: #F3F3F3;
      padding: 0 toRem(40);
      box-sizing: border-box;
    }
    .city-box {
      position: absolute;
      top: toRem(226);
      bottom: 0;
      left: 0;
      right: 0;
      overflow: auto;
    }
    .search-city {
      height: 100%;
      .loading-box {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .province-list {
      height: 100%;
    }
  }
</style>
