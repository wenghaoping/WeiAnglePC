/**
 * Created by Admin on 2017/12/28.
 */

// 作为全局通用弹框的设置

import * as types from '../mutation-types';
export default {
  state: {
    searchDisplay: false, // 项目详情 => 一键尽调弹框
    companySearchDisplay: false, // 项目详情 => 一键尽调(搜索)弹框
    recommendDisplay: false, // 项目详情 => 买家图谱 => 帮我引荐弹框
    contactDisplay: false, // 项目详情 / 跟进列表 => 人脉详情弹框
    followDisplay: false, // 项目详情 => 跟进弹框
    alertProjectDetailDisplay: false // 人脉详情 => 项目详情弹框
  },
  mutations: {
    // 改变一键尽调弹框
    [types.SEARCH_CHANGE] (state, dispaly) {
      state.searchDisplay = dispaly;
    },
    // 改变一键尽调(搜索)弹框
    [types.COMPANY_SEARCH_CHANGE] (state, dispaly) {
      state.companySearchDisplay = dispaly;
    },
    // 改变人脉详情弹框
    [types.CONTACT_CHANGE] (state, dispaly) {
      state.contactDisplay = dispaly;
    },
    // 改变人脉详情弹框
    [types.FOLLOWUP_CHANGE] (state, dispaly) {
      state.followDisplay = dispaly;
    },
    // 改变项目详情弹框
    [types.ALERT_PROJECT_CHANGE] (state, dispaly) {
      state.alertProjectDetailDisplay = dispaly;
    },
    // 改变帮我引荐弹框
    [types.RECOMMEND_CHANGE] (state, dispaly) {
      state.recommendDisplay = dispaly;
    }
  },
  actions: {
    searchControl ({ commit }, dispaly) {
      commit(types.SEARCH_CHANGE, dispaly);
    },
    companySearchControl ({ commit }, dispaly) {
      commit(types.COMPANY_SEARCH_CHANGE, dispaly);
    },
    contactControl ({ commit }, dispaly) {
      commit(types.CONTACT_CHANGE, dispaly);
    },
    followControl ({ commit }, dispaly) {
      commit(types.FOLLOWUP_CHANGE, dispaly);
    },
    alertProjectControl ({ commit }, dispaly) {
      commit(types.ALERT_PROJECT_CHANGE, dispaly);
    },
    recommendControl ({ commit }, dispaly) {
      commit(types.RECOMMEND_CHANGE, dispaly);
    }
  }
};
