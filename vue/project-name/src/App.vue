<template>
  <div>
    <MyTable :data="list">
      <template #default="obj">
        <button @click="del(obj.row.id)">
          删除
        </button>
      </template>
    </MyTable>

    <MyTable :data="list2">
      <template #default="{ row }">
        <button @click="show(row)">
          查看
        </button>
      </template>
    </MyTable>
  </div>
</template>

<script>
import MyTable from './components/MyTable.vue'
export default {
  data () {
    return {
      list:[
        {id:1, name:'张三', age:19},
        {id:2, name:'李四', age:20},
        {id:3, name:'王五', age:21},
      ],
      list2:[
        {id:1, name:'张三', age:19},
        {id:2, name:'李四', age:20},
        {id:3, name:'王五', age:21},
      ],
    }
  },
  methods: {
    del(id) {
      this.list = this.list.filter(item => item.id !== id)
    },
    show(row) {
      alert(`姓名：${row.name}，年龄：${row.age}`)
    }
  },
  components: {
    MyTable
  }
}
</script>

<style>
body {
  background-color: #b3b3b3;
}
</style>