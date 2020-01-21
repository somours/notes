<template>
  <template>
    <div class="province-list">
      <div class="province-item" v-for="(item,index) in list" :key="item.value">
        <div class="parent" @click="clickItem(item,index)">
          <span class="name">{{item.label}}</span>
          <em class="arrow" :class="{'down': item.children.length, 'up': item.children.length && selected === item.value}"></em>
        </div>
        <div class="children" v-if="selected === item.value" >
          <div class="child-item"
               v-for="childItem in item.children"
               :key="childItem.value"
               @click="clickChildItem(childItem)"
          >{{childItem.label}}</div>
        </div>
      </div>
    </div>
  </template>

  <script>
    export default {
      name: 'provinceItem',
      props: {
        list: {
          type: Array,
          default: () => []
        },
        selected: {
          type: String,
          default: ''
        }
      },
      methods: {
        clickItem (item, index) {
          this.$emit('clickItem', item, index);
        },
        clickChildItem (childItem, item) {
          this.$emit('clickChildItem', childItem, item);
        }
      }
    };
  </script>

  <style scoped lang="scss">
    @import "../../../../../styles/variables";
    .province-list {
      height: 100%;
    }
    .province-item{
      font-size: toRem(28);
      color: #4A4A4A;
      .parent {
        height: toRem(80);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #F2F2F2;
        padding: 0 toRem(40);
        .arrow {
          display: block;
          width: toRem(28);
          height: toRem(16);
        }
        .down {
          background: url("../../../../../assets/rob/chevron-down.png") no-repeat center;
          background-size: 100% 100%;
        }
        .up {
          background: url("../../../../../assets/rob/chevron-up.png") no-repeat center;
          background-size: 100% 100%;
        }
      }
      .children {
        overflow: hidden;
        background: #F2F2F2;
        padding: 0 toRem(40);
        .child-item {
          height: toRem(82);
          line-height: toRem(82);
          border-bottom: 1px solid #E6E6E6;
        }
      }
    }
  </style>

</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>

</style>
