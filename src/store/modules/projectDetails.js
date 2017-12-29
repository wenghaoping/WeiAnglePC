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
    // 人脉详情 / 添加更近弹框, 弹框所需要的Id
    contactDeatil: {
      cardId: '',
      userId: '' // 当前详情的人的id
    },
    // 写跟进弹框所需要的数据(所有需要项目详情数据的地方都存在这里)
    projectMessage: {
      projectId: '', // 项目id
      projectIntro: '' // 项目一句话介绍
    },
    // 跟进弹框所需要的数据
    followData: {
      followId: '' // 跟进弹框需要的id
    },
    matchInvestorsData: {} // 点击买家图谱的数据.
  },
  mutations: {
    // 一键尽调存储数据
    [types.SET_SEARCH_COMPANY] (state, data) {
      state.searchCompany.companyId = data.companyId;
      state.searchCompany.companyName = data.companyName;
    },
    // 人脉详情弹框存储数据
    [types.SET_CONTACT_DETAIL] (state, data) {
      state.contactDeatil.cardId = data.cardId;
      state.contactDeatil.userId = data.userId;
    },
    // 跟进弹框所需要的数据存储(所有需要项目数据的地方都存在这里)
    [types.SET_FOLLOW_UP_DATA] (state, data) {
      state.projectMessage.projectId = data.projectId;
      state.projectMessage.projectIntro = data.projectIntro;
    },
    // 跟进弹框所需要followid的数据存储
    [types.SET_FOLLOW_ID] (state, ID) {
      state.followData.followId = ID;
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
    setConnectDeatil ({ commit }, data) {
      commit(types.SET_CONTACT_DETAIL, data);
    },
    setFollowUp ({ commit }, data) {
      commit(types.SET_FOLLOW_UP_DATA, data);
    },
    setFollowId ({ commit }, ID) {
      commit(types.SET_FOLLOW_ID, ID);
    },
    setMatchInvestorsData ({ commit }, data) {
      commit(types.MATCH_INVESTORS_DATA, data);
    }
  }
};
