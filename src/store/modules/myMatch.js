/**
 * Created by Admin on 2017/12/18.
 */
import * as types from '../mutation-types';
export default {
  state: {
    memberDisplay: false, // 报名成员弹框
    importRegistrationDisplay: false, // 导入报名名单弹框
    qrCodeActivityDisplay: false, // 二维码弹框
    matchData: {
      matchId: '' // 活动id
    }
  },
  mutations: {
    // 改变报名成员弹框
    [types.MEMBER_CHANGE] (state, dispaly) {
      state.memberDisplay = dispaly;
    }
  },
  actions: {
    // 改变行业弹框
    memberControl ({ commit }, dispaly) {
      commit(types.MEMBER_CHANGE, dispaly);
    }
  }
};
