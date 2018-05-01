import req from 'api/web'

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
          commit('GET_MENU', data)
        })
        .catch(err => {
          console.log(err, 'err')
        })
    }
  }
}
