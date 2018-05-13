import request from 'api'

const config = {
  web: {
    url: '/index.php',
    method: 'get'
  },
  menu: {
    url: '/get-menu',
    method: 'get'
  },
  addMenu: {
    url: '/add-menu',
    method: 'post'
  },
  deleteWeb: {
    url: '/index.php',
    method: 'get'
  }
}
// 利用请求的参数再转给request, 做到解藕
export default function req (funcName, data, isCancel = true) {
  return request(config, funcName, data, isCancel)
}
