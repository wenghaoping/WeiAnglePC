/**
 * Created by Admin on 2017/12/18.
 */
import * as types from '../mutation-types';
export default {
  state: {
    matchData: {}, // 详情数据
    macthSearch: '', // 我的赛事搜索
    matchPage: 1, // 赛事页码
    matchActive: 'matchDetail' // 切换默认设置
  },
  mutations: {
    // 设置搜索参数
    [types.SET_UP_MATCH_SEARCH] (state, obj) {
      state.macthSearch = obj.macthSearch;
      state.matchPage = obj.matchPage;
    },
    [types.GET_MATCH_DETAIL] (state, obj) {
      state.matchData = obj;
    },
    [types.SET_MATCH_ACTIVE] (state, obj) {
      state.matchActive = obj;
    }
  },
  actions: {
    // 设置搜索参数
    setUpMatchSearch ({ commit }, obj) {
      commit(types.SET_UP_MATCH_SEARCH, obj);
    },
    getMatchDetail ({ commit }, obj) {
      commit(types.GET_MATCH_DETAIL, obj);
    },
    setMatchActive ({ commit }, obj) {
      commit(types.SET_MATCH_ACTIVE, obj);
    }
  }
};
