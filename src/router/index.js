import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
// 关闭进度环,调整进度条速度
import 'nprogress/nprogress.css'
// Progress 进度条样式
import Home from 'components/home.vue'
import Blank from 'components/blank.vue'
import WebShow from 'components/web-show/web-show.vue'
import UEditor from 'components/practice/ueditor.vue'
import Table from 'components/practice/table/table.vue'
import Echarts from 'components/practice/echarts.vue'
import NewCrawler from 'components/practice/news-crawler.vue'
NProgress.configure({ showSpinner: false, ease: 'ease', speed: 500 })

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
        }
      ]
    }
  ]
})
export const asyncRoutes = [
  {
    path: '/',
    name: '首页',
    redirect: '/website',
    component: Home,
    children: [
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
router.addRoutes(asyncRoutes)
router.beforeEach((to, from, next) => {
  if (to.name) document.title = to.name === 'web' ? to.params.className : to.name
  NProgress.start()
  next()
})
router.afterEach((to, from) => {
  NProgress.done()
})
export default router
