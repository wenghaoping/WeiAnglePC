import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import pushProject from './modules/pushProject.js';
import login from './modules/login.js';
import superBp from './modules/superBp.js';
import pageAndSelect from './modules/pageAndSelect.js';
import syncData from './modules/syncData.js';
Vue.use(Vuex);

const state = {
  // 全局初始化状态设定
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: { // 用前面的去访问
    pushProject: pushProject,
    logining: login,
    pageANDSelect: pageAndSelect,
    syncData: syncData,
    superBp: superBp
  }
});
