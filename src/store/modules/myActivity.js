/**
 * Created by Admin on 2017/12/18.
 */
import * as types from '../mutation-types';
export default {
  state: {
    memberDisplay: false, // 报名成员弹框
    activityData: {
      activityId: '', // 活动id
      isSign: 1 // 1代表签到成员
    }
  },
  mutations: {
    // 改变行业弹框
    [types.MEMBER_CHANGE] (state, dispaly) {
      state.memberDisplay = dispaly;
    },
    // 控制关闭所有,切清空函数
    [types.ALL_CHANGE] (state, dispaly) {
      state.activityId = '';
      state.isSign = 1;
    }
  },
  actions: {
    // 改变行业弹框
    memberControl ({ commit }, dispaly) {
      commit(types.MEMBER_CHANGE, dispaly);
    },
    // 控制关闭所有,切清空函数
    AllMemberControl ({ commit }, dispaly) {
      commit(types.ALL_CHANGE, dispaly);
    }
  }
};
