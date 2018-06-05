import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home.vue'
import Blank from 'components/blank.vue'
import WebShow from 'components/web-show/web-show.vue'
import UEditor from 'components/practice/ueditor.vue'
import Table from 'components/practice/table.vue'
import Echarts from 'components/practice/echarts.vue'
import NewCrawler from 'components/practice/news-crawler.vue'

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
          name: '收藏网址',
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
          name: '练习作品',
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
            },
            {
              path: 'echarts',
              name: 'echarts',
              component: Echarts
            },
            {
              path: 'news-crawler',
              name: '新闻爬虫',
              component: NewCrawler
            }
          ]
        }

      ]
    }
  ]
})

export default router
