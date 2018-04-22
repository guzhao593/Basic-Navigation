import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home.vue'
import WebShow from 'components/web-show.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/javascript',
      component: Home,
      children: [
        {
          path: '/:className',
          name: 'web',
          component: WebShow
        }
      ]
    }
  ]
})

export default router
