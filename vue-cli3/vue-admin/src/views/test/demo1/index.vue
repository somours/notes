<template>
  <div style="text-align: center">
    <TestRender level="3">
      <template v-slot="data">
        <span>12</span>
        {{ data }}
        老子是标题
      </template>
      <div slot="renderSlot" slot-scope="data1">
        <a href="#">
          {{ data1 }}
        </a>
        wo shi render slot
      </div>
    </TestRender>
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <FunctionComp id="func" style="color: #f00" :text="text" @fail="fail">
      <div>default</div>
      <!--      <div slot="test">test</div>-->
      <TestRender v-slot="data" level="3">
        <div>
          <span>{{ data }}</span>
          我是其他组件的slot
        </div>
      </TestRender>
    </FunctionComp>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import FunctionComp from './components/functionComp'
import TestRender from './components/render'
export default {
  name: 'App',
  components: {
    HelloWorld,
    FunctionComp,
    TestRender
  },
  data() {
    return {
      text: 1111
    }
  },
  provide() {
    return {
      a: () => this.text
    }
  },
  methods: {
    fail() {
      this.text = 2222
    }
  }
}
</script>

<style>
</style>
