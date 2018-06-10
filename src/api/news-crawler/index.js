import request from 'api'

const config = {
  getNews: {
    url: '/get-news',
    method: 'get'
  }
}
// 利用请求的参数再转给request, 做到解藕
export default function req (funcName, data, isCancel = true) {
  return request(config, funcName, data, isCancel)
}
