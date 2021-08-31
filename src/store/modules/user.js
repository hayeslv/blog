/*
 * @Author: Lvhz
 * @Date: 2021-08-30 16:40:01
 * @Description: Description
 */
import { setToken } from '@/utils/auth'
const state = {
  _id: '',
  email: '',
  token: ''
};

const getters = {
  _id: state => state._id,
  email: state => state.email,
  token: state => state.token
};

// js中使用
// console.log(store.commit('m_token', 1));
// console.log(store.state.token);

// import { mapGetters, mapMutations } from "vuex";
// 在method中
// ...mapMutations("user", ["m_token"]),
// 在computed中
// ...mapGetters('user', ['token']),
const mutations = {
  m_user(state, user = {}) {
    state._id = user.id;
    state.email = user.email;
  },
  m_token(state, token) {
    state.token = token;
  }
};

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    console.log(username, password);
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      commit('m_token', 'my-token')
      setToken('my-token')
      resolve()
      // login({ username: username.trim(), password: password }).then(response => {
      //   const { data } = response
      //   commit('SET_TOKEN', data.token)
      //   setToken(data.token)
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },
  // detail: async({ state, commit }, data) => {
  //   const res = await http.get('/user/info');
  //   if (res.code === 0) {
  //     commit('m_user', res.data);
  //     return res;
  //   }
  // }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

