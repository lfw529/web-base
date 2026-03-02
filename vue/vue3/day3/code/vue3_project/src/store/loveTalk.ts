// 引入defineStore用于创建store
import {defineStore} from 'pinia'

// 定义并暴露一个store
export const useTalkStore = defineStore('talk',{
  // 动作
  actions:{},

  // 真正存储数据的地方
  state(){
    return {
      talkList:[
        {id:'ftrfasdf01',title:'今天你有点怪，哪里怪？怪好看的！'},
        {id:'ftrfasdf02',title:'草莓、蓝莓、蔓越莓，今天想我了没？'},
        {id:'ftrfasdf03',title:'心里给你留了一块地，我的死心塌地'}
      ]
    }
  },

  // 计算
  getters:{}
})