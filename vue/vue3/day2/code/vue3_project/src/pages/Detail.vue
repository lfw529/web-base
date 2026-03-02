<template>
  <ul class="news-list">
    <!-- params 导航区 -->
    <!-- <li>编号：{{ route.params.id }}</li>
    <li>标题：{{ route.params.title }}</li>
    <li>内容：{{ route.params.content }}</li> -->

    <li>编号：{{ id }}</li>
    <li>标题：{{ title }}</li>
    <li>内容：{{ content }}</li>
  </ul>
</template>

<script setup lang="ts" name="About">
  // params / query 的写法
  // import { useRoute } from 'vue-router'
  // import { toRefs } from 'vue'
  
  // let route = useRoute()
  // let {query} = toRefs(route)
  // console.log(route)

  // props 写法
  defineProps(['id','title','content'])

</script>

<style scoped>
  .news-list {
    list-style: none;
    padding-left: 20px;
  }

  .news-list>li {
    line-height: 30px;
  }
</style>