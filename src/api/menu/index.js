import request from 'api'

const config = {
  getMenu: {
    url: '/get-menu',
    method: 'get'
  },
  addMenu: {
    url: '/add-menu',
    method: 'post'
  },
  deleteMenu: {
    url: '/delete-menu',
    method: 'delete'
  },
  updateMenu: {
    url: '/update-menu',
    method: 'put'
  }
}
// 利用请求的参数再转给request, 做到解藕
export default function req (funcName, data, isCancel = true) {
  return request(config, funcName, data, isCancel)
}
