<!--
 * @Author: your name
 * @Date: 2020-12-30 22:01:35
 * @LastEditTime: 2021-01-20 13:58:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-cli-vue3\src\components\HelloWorld.vue
-->
<template>
  <h1>{{ msg }}</h1>
  <button @click="changeCount">count is: {{ count }}</button>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      count: 0
    };
  },
  methods: {
    changeCount() {
      this.count++;
      this.$emit("changeCount", this.count);
    }
  }
};
</script>
