/**
 * Created by Admin on 2017/12/28.
 */

// 作为项目详情页的所有数据存储,包括所有弹框的数据交互(弹框从详情里取数据)

import * as types from '../mutation-types';
export default {
  state: {
    // 一键尽调存储数据
    searchCompany: {
      companyId: '', // 公司id
      companyName: '' // 公司名称
    },
    matchInvestorsData: {} // 点击买家图谱的数据.
  },
  mutations: {
    // 一键尽调存储数据
    [types.SET_SEARCH_COMPANY] (state, data) {
      state.searchCompany.companyId = data.companyId;
      state.searchCompany.companyName = data.companyName;
    },
    // 设置买家图谱数据
    [types.MATCH_INVESTORS_DATA] (state, data) {
      state.matchInvestorsData = data;
    }
  },
  actions: {
    setSearchCompany ({ commit }, data) {
      commit(types.SET_SEARCH_COMPANY, data);
    },
    setMatchInvestorsData ({ commit }, data) {
      commit(types.MATCH_INVESTORS_DATA, data);
    }
  }
};
