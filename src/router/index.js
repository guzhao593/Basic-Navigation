import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home.vue'
import Blank from 'components/blank.vue'
import WebShow from 'components/web-show/web-show.vue'
import UEditor from 'components/ueditor.vue'
import Table from 'components/table.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      redirect: '/website',
      component: Home,
      children: [
        {
          path: 'website',
          name: 'website',
          redirect: '/website/javascript',
          component: Blank,
          children: [
            {
              path: ':className',
              name: 'web',
              component: WebShow
            }
          ]
        },
        {
          path: 'practice',
          name: 'practice',
          redirect: '/practice/table',
          component: Blank,
          children: [
            {
              path: 'ueditor',
              name: 'ueditor',
              component: UEditor
            },
            {
              path: 'table',
              name: 'table',
              component: Table
            }
          ]
        }

      ]
    }
  ]
})

export default router
