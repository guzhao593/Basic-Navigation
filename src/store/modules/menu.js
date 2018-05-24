import req from 'api/menu'
import {jsonTree} from 'util'

export default {
  namespaced: 'menu',
  state: {
    menuData: [],
    isEditMenuStatus: false
  },
  getters: {},
  mutations: {
    GET_MENU (state, payload) {
      state.menuData = payload
    },
    CHANGE_EDIT_STATUS (state, payload) {
      state.isEditMenuStatus = !state.isEditMenuStatus
    }
  },
  actions: {
    GET_MENU ({commit}, payload) {
      req('getMenu')
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
