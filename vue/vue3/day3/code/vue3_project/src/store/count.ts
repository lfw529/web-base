// 引入 defineStore 用于创建 store
import {defineStore} from 'pinia'

// 定义并暴露一个 store
export const useCountStore = defineStore('count',{
  // 动作
  actions: {},

  // 真正存储数据的地方
  state(){
    return {
      sum:6
    }
  },

  // 计算
  getters: {}
})