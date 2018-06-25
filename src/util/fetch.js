import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import { BASE_URL, TIMEOUT_MILLISECONDS, ERROR_MESSAGE } from 'config/api'

if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://localhost:593/api'
}
// 创建axios实例
let instance = axios.create({
  // baseURL:会跟请求路径拼接起来
  baseURL: BASE_URL,
  // 超时设置
  timeout: TIMEOUT_MILLISECONDS,
  // 请求头部信息
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求前拦截器
instance.interceptors.request.use((config) => {
  if (config.method === 'post' && config.headers['Content-Type'] !== 'application/json') {
    // 转换数据格式为 a&b&c
    config.data = qs.stringify(config.data)
  }
  return config
})

// 请求返回后拦截器
instance.interceptors.response.use(response => response.data, err => {
  // 如果err.response存在
  if (err.response) {
    const { status, data } = err.response
    // 服务器报错
    if (data.message && status >= 500) {
      let msg = /[\u4e00-\u9fa5]+?.*[\u4e00-\u9fa5]+?/.exec(data.message)
      if (msg && msg[0]) {
        Message({
          type: 'error',
          message: data.message
        })
      } else {
        Message({
          type: 'error',
          message: ERROR_MESSAGE
        })
      }
    }
    if (status === 401) window.location.href = '/'
    // if (status === 403) store.commit('SET_HASLOGIN', false)
    return Promise.reject(err.response.data)
  } else {
    // 没有err.response 意味着请求超时
    if (err.message === `timeout of ${TIMEOUT_MILLISECONDS}ms exceeded`) {
      Message({
        type: 'error',
        message: '请求超时'
      })
    }
    return Promise.reject(err)
  }
})

export default instance
