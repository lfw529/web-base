<template>
  <div class="box">
    <h2>Son1 子组件</h2>
    从vuex中获取的值: <label></label>
    <br>
    <button @click="handleAdd(1)">值 + 1</button>
    <button @click="handleAdd(5)">值 + 5</button>
    <button @click="handleAdd(10)">值 + 10</button>
    <button @click="setAsyncCount(666)">1秒后改成666</button>
    <br/>
    <div> {{ $store.state.list }} </div>
    <br/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SonOne',
  data () {
    return {
      count: 0
    }
  },
  methods: {
    handleAdd (n) {
      this.$store.commit('addCount', n)
    },
    // handleSetAsyncCount (num) {
    //   this.$store.dispatch('setAsyncCount', num)
    // }
    ...mapActions(['setAsyncCount'])
  }
}
</script>

<style lang="css" scoped>
.box{
  border: 3px solid #ccc;
  width: 400px;
  padding: 10px;
  margin: 20px;
}
h2 {
  margin-top: 10px;
}
</style>
