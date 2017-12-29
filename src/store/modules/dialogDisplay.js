/**
 * Created by Admin on 2017/12/28.
 */

// 作为全局通用弹框的设置

import * as types from '../mutation-types';
export default {
  state: {
    searchDisplay: false, // 项目详情 => 一键尽调弹框
    companySearchDisplay: false, // 项目详情 => 一键尽调(搜索)弹框
    recommendDisplay: false // 项目详情 => 买家图谱 => 帮我引荐弹框
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
    // 改变帮我引荐弹框
    [types.RECOMMEND_CHANGE] (state, dispaly) {
      state.industryDisplay = dispaly;
    }
  },
  actions: {
    searchControl ({ commit }, dispaly) {
      commit(types.SEARCH_CHANGE, dispaly);
    },
    companySearchControl ({ commit }, dispaly) {
      commit(types.COMPANY_SEARCH_CHANGE, dispaly);
    },
    recommendControl ({ commit }, dispaly) {
      commit(types.RECOMMEND_CHANGE, dispaly);
    }
  }
};
