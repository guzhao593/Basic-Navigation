// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

/* eslint-disable */

import Vue from 'vue'

import App from './App'

import router from 'router'

import store from 'store'

import ElementUI from 'element-ui'

// 加快编译速度：将element-ui的index.css复制到src中
import 'style/element-theme/index.css'

import 'style/public.scss'

import 'assets/fonts/iconfont.css'

import 'assets/fonts/iconfont.js'

Vue.config.productionTip = false

Vue.use(ElementUI)



new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
