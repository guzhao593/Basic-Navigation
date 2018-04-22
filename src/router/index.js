import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home.vue'
import WebShow from 'components/web-show.vue'
import OtherShow from 'components/other-show.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/weixin',
          name: 'weixin',
          component: OtherShow
        },
        {
          path: '/:className',
          name: 'web',
          component: WebShow
        }
      ]
    }
  ]
})
