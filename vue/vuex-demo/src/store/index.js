import Vue from 'vue'
import Vuex from 'vuex'

// 插件安装
Vue.use(Vuex)

// 创建仓库
const store = new Vuex.Store({
  // 开启严格模式
  strict: true,

  // 通过 state 可以提供数据
  state: {
    count: 101,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  getters: {
    // getters函数的第一个参数是 state
    // 必须要有返回值
    filterList: state => state.list.filter(item => item > 5)
  },
  mutations: {
    addCount (state, n) {
      state.count += n
    },
    subCount (state, n) {
      state.count -= n
    },
    changeCount (state, n) {
      state.count = n
    }
  },
  actions: {
    setAsyncCount (context, num) {
      // 一秒后，给一个数，去修改 num
      setTimeout(() => {
        context.commit('changeCount', num)
      }, 1000)
    }
  },
  modules: {
  }
})

// 导出仓库
export default store
