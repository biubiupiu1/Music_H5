import Vue from 'vue'
import Router from 'vue-router'
import NetEase from '../page/NetEase.vue'
import QQ from '../page/QQ.vue'
import XiaMi from '../page/XIaMi.vue'
import Search from '../page/Search.vue'
import Home from '../page/Home.vue'
import SongList from '../page/SongList.vue'
import Comments from '../page/Comments.vue'
import Test from '../page/Test.vue'

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/netease' },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'netease',
          name: 'NetEase',
          component: NetEase
        },
        {
          path: '/qq',
          name: 'QQ',
          component: QQ
        },
        {
          path: '/xiami',
          name: 'XiaMi',
          component: XiaMi
        },
        {
          path: '/search',
          name: 'Search',
          component: Search
        }
      ]
    },
    {
      path: '/songlist/:id',
      name: 'SongList',
      component: SongList,
    },
    {
      path: '/comments/:id',
      name: 'Comments',
      component: Comments,
    },
    {
      path: '/test',
      component: Test
    }
  ],
  // scrollBehavior (to, from, savedPosition) {
  //   console.log(savedPosition)
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // }
})
