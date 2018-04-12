/**
 * Created by Admin on 2017/12/28.
 */

// 作为人脉详情页的所有数据存储,包括所有弹框的数据交互(弹框从详情里取数据)

import * as types from '../mutation-types';
export default {
  state: {
    alertProjectMessage: {
      projectId: '', // 项目id
      userId: '', // 项目所属人id
      type: 'owner' // other   是否拥有此项目
    }
  },
  mutations: {
    // 项目详情弹框,设置id
    [types.SET_PROJECT_ID] (state, ID) {
      state.alertProjectMessage.projectId = ID;
    },
    // 项目详情弹框,设置对应人id
    [types.SET_PROJECT_USER_ID] (state, obj) {
      state.alertProjectMessage.userId = obj.userId;
      state.alertProjectMessage.type = obj.type;
    }
  },
  actions: {
    setProjectId ({ commit }, data) {
      commit(types.SET_PROJECT_ID, data);
    },
    setProjectUserId ({ commit }, data) {
      commit(types.SET_PROJECT_USER_ID, data);
    }
  }
};
