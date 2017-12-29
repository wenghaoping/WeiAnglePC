/**
 * Created by Admin on 2017/12/28.
 */

// 作为人脉详情页的所有数据存储,包括所有弹框的数据交互(弹框从详情里取数据)

import * as types from '../mutation-types';
export default {
  state: {
    alertProjectMessage: {
      projectId: '' // 项目id
    }
  },
  mutations: {
    // 项目详情弹框,设置id
    [types.SET_PROJECT_ID] (state, ID) {
      state.alertProjectMessage.projectId = ID;
    }
  },
  actions: {
    setProjectId ({ commit }, data) {
      commit(types.SET_PROJECT_ID, data);
    }
  }
};
