import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    comments: []
  },
  mutations: {
    LOAD_COMMENTS(state, res) {
      state.comments = res
    }
  },
  actions: {
    getComments(context) {
      return axios.get('https://jsonplaceholder.typicode.com/comments')
                  .then(response => context.commit('LOAD_COMMENTS', response.data))
    }
  },
  modules: {
  }
})
