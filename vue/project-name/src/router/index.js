import Vue from 'vue'
import VueRouter from "vue-router"
import LayoutPage from '@/views/Layout.vue'
import ArticleDetailPage from '@/views/ArticleDetail.vue' 
import ArticlePage from '@/views/Article.vue' 
import LikePage from '@/views/Like.vue'
import CollectPage from '@/views/Collect.vue'
import UserPage from '@/views/User.vue'


Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { 
      path: '/', 
      component: LayoutPage,
      children: [
        { path: '/article', component: ArticlePage },
        { path: '/like', component: LikePage },
        { path: '/collect', component: CollectPage },
        { path: '/user', component: UserPage },
      ]
    },
    { path: '/detail', component: ArticleDetailPage },
  ]
})

export default router