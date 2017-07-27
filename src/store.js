import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let state = {
  showMenu: false,
  currentTag: -1,
  subMenuId: {id: 0, name:'首页'},
  toggleContentName: 'in'
};

let getters = {
  showMenu (state) {
    return state.showMenu;
  },
  getCurrentTag (state) {
    return state.currentTag;
  },
  getSubMenuId (state) {
    return state.subMenuId;
  },
  getToggleContent (state) {
    return state.toggleContentName;
  }
};

let mutations = {
  toggleMenu (state) {
    state.showMenu = !state.showMenu;
  },
  hideMenu (state) {
    state.showMenu = false;
  },
  setTag (state, tag) {
    state.currentTag = tag;
  },
  setSubMenuId (state, menu) {
    state.subMenuId = menu;
  },
  setToggleContent (state, name) {
    state.toggleContentName = name;
  }
};

let actions = {
  toggleMenu ({commit}) {
    commit('toggleMenu');
  },
  hideMenu ({commit}) {
    commit('hideMenu');
  },
  setTag ({commit}, {tag}) {
    commit('setTag', tag);
  },
  setSubMenuId ({commit}, {menu}) {
    commit('setSubMenuId', menu);
  },
  setToggleContent ({commit}, name) {
    commit('setToggleContent', name);
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
