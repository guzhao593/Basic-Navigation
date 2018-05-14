import request from 'api'

const config = {
  getWebsite: {
    url: '/get-website',
    method: 'get'
  },
  deleteWeb: {
    url: '/delete-website',
    method: 'delete'
  },
  addWebsite: {
    url: '/add-website',
    method: 'post'
  },
  updateWebsite: {
    url: '/update-website',
    method: 'put'
  },
  updateWebsiteOrderNO: {
    url: '/update-website-orderNO',
    method: 'post'
  }
}
// 利用请求的参数再转给request, 做到解藕
export default function req (funcName, data, isCancel = true) {
  return request(config, funcName, data, isCancel)
}
