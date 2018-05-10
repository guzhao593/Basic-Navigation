import req from 'api/web'
import {jsonTree} from 'util'

export default {
  namespaced: 'menu',
  state: {
    menuData: []
  },
  getters: {},
  mutations: {
    GET_MENU (state, payload) {
      state.menuData = payload
    }
  },
  actions: {
    GET_MENU ({commit}, payload) {
      req('menu', {menu: 'all'})
        .then(data => {
          let newData = jsonTree(data, {
            id: 'selfId',
            pid: 'parentId'
          })
          commit('GET_MENU', newData)
        })
        .catch(err => {
          console.log(err, 'err')
        })
    }
  }
}
