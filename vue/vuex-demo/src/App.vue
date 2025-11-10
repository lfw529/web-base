<template>
  <div id="app">
    <h1>根组件</h1>
    <h1>state的数据 - {{ count }}</h1>
    <input :value="count" @input="handleInput" type="text">
    <SonOne></SonOne>
    <hr>
    <SonTwo></SonTwo>
  </div>
</template>

<script>
import SonOne from './components/SonOne.vue'
import SonTwo from './components/SonTwo.vue'
import { mapState } from 'vuex'

export default {
  name: 'app',
  data: function () {
    return {

    }
  },
  methods: {
    handleInput (e) {
      // 1. 实时获取输入框的值
      const num = +e.target.value
      // 2. 提交mutation，调用mutation函数
      this.$store.commit('changeCount', num)
    }
  },
  computed: {
    ...mapState(['count'])
  },
  created () {
    console.log(this.$store)
  },
  components: {
    SonOne,
    SonTwo
  }
}
</script>

<style>
#app {
  width: 600px;
  margin: 20px auto;
  border: 3px solid #ccc;
  border-radius: 3px;
  padding: 10px;
}
</style>
