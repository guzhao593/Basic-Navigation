// axios 实例
import fetch from 'util/fetch.js'
import axios from 'axios'
// 取消请求构造函数
const CancelToken = axios.CancelToken
// 通过自执行函数返回一个函数, 目的是为了产生闭包,解决同一请求重复请求的问题
export default (function request () {
  // 外层函数定义:name,cancel, 直到请求结束后才能释放这两个变量
  let name = ''
  let cancel = null
  return function () {
    let agrs = Array.from(arguments)
    // 请求接口集
    const config = agrs[0]
    // 当前请求接口名称
    const funcName = agrs[1]
    // 请求参数
    const data = agrs[2]
    // 是否取消重复请求
    const isCancel = agrs[3]
    // 当name === funcname时,取消当前请求
    if (isCancel && (name === funcName)) {
      // 取消请求
      cancel(`请求${name}被阻断，请检查是否重复发送同一请求，如需取消重复请求阻断，请配置api中isCancel为false`)
    }
    // 将当前请求的名称赋给name
    name = funcName
    // 判断请求信息是否为object
    if (typeof config[funcName] !== 'object') {
      throw new Error('调用api函数函数错误，请检查函数名称是否错误')
    }
    // 深复制
    var newConfig = JSON.parse(JSON.stringify(config[funcName]))
    // 当前请求方法
    const method = newConfig.method.toLowerCase()
    if (data) {
      if (method === 'get' || method === 'delete' || method === undefined) {
        // 替换接口中有{}的地方
        newConfig.url = newConfig.url.replace(/\{([\d\w_]+)\}/g, (word, $1) => {
          let res = data[$1]
          // 删除data中的对应字段
          delete data[$1]
          return res
        })
        // get请求防止IE缓存
        if (method === 'get') {
          if (!data._t) {
            data._t = new Date().valueOf()
          } else {
            data.timestamp = new Date().valueOf()
          }
        }
        // params 是get,delete请求的请求数据的参数名  data 则是post, put 请求的请求数据的参数名
        newConfig.params = data
      } else {
        newConfig.url = newConfig.url.replace(/\{([\d\w_]+)\}/g, (word, $1) => {
          let res = data[$1]
          delete data[$1]
          return res
        })
        newConfig.data = data
      }
    }
    if (isCancel) {
      // 通过传递一个 executor 函数到 CancelToken 的构造函数来创建 cancel token
      newConfig.cancelToken = new CancelToken((c) => { cancel = c })
    }
    return fetch(newConfig)
  }
})()
