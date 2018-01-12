/**
 * Created by Admin on 2017/12/18.
 */
import * as types from '../mutation-types';
export default {
  state: {
    memberDisplay: false, // 报名成员弹框
    importRegistrationDisplay: false, // 导入报名名单弹框
    qrCodeActivityDisplay: false, // 二维码弹框
    activityData: {
      activityId: '', // 活动id
      isSign: 1 // 1代表签到成员
    },
    activeSearch: '', // 搜索参数
    activeCurrentPage: 1 // 当前页数
  },
  mutations: {
    // 改变报名成员弹框
    [types.MEMBER_CHANGE] (state, dispaly) {
      state.memberDisplay = dispaly;
    },
    // 控制关闭所有,切清空函数
    [types.ALL_CHANGE] (state, dispaly) {
      state.activityData.activityId = '';
      state.activityData.isSign = 1;
    },
    // 控制关闭所有,切清空函数
    [types.SER_ACTIVITY_DATA] (state, obj) {
      state.activityData.activityId = obj.activityId;
      state.activityData.isSign = obj.isSign;
    },
    // 改变报名名单弹框
    [types.IMPORT_REGISTRATION_CHANGE] (state, dispaly) {
      state.importRegistrationDisplay = dispaly;
    },
    // 二维码弹框
    [types.QR_CODE_ACTIVITY_CHANGE] (state, dispaly) {
      state.qrCodeActivityDisplay = dispaly;
    },
    // 设置跳转前参数
    [types.SET_UP_SEARCH] (state, obj) {
      state.activeSearch = obj.activeSearch;
      state.activeCurrentPage = obj.activeCurrentPage;
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
    },
    setActivityData ({ commit }, obj) {
      commit(types.SER_ACTIVITY_DATA, obj);
    },
    // 改变报名名单弹框
    importRegistrationControl ({ commit }, dispaly) {
      commit(types.IMPORT_REGISTRATION_CHANGE, dispaly);
    },
    // 二维码弹框
    qrCodeActivityControl ({ commit }, dispaly) {
      commit(types.QR_CODE_ACTIVITY_CHANGE, dispaly);
    },
    // 设置搜索参数
    setUpSearch ({ commit }, obj) {
      commit(types.SET_UP_SEARCH, obj);
    }
  }
};
