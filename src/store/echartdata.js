/*
 * @Author: Lvhz
 * @Date: 2021-08-18 09:39:57
 * @Description: Description
 */
const state = {

};

const getters = {
};

//! js中使用
// console.log(store.commit('m_token', 1));
// console.log(store.state.token);
//! vue文件中
// import { mapGetters, mapMutations } from "vuex";
// 在method中
// ...mapMutations("user", ["m_token"]),
// 在computed中
// ...mapGetters('user', ['token']),
const mutations = {

};

const actions = {
  // import { useStore } from 'vuex'
  // const store = useStore();
  // store.dispatch('echartdata/getColumnData', 123)
  getColumnData: async({state, commit}, data) => {
    console.log(state, commit);
    console.log(data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
