/**
 * Created by Admin on 2017/8/9.
 */
import * as types from '../mutation-types';
export default {
  state: {
    projectPushToProDisplay: false, // 项目推送项目入口（多选）
    projectPushToConDisplay: false, // 项目推送人脉入口（单选）
    projectPushPreviewDisplay: false, // 项目推送预览弹框
    // 推送的所有数据
    pushMessage: {
      user_id: localStorage.user_id,
      receive_users: [], // 投资人id
      email: '', // 邮箱地址
      title: '', // 邮箱标题
      body: '', // 邮箱内容
      project_id: '', // 推送的项目id集合
      card_id: []
    },
    // 邮件
    email: {
      title: '', // 邮件标题
      body: ''// 邮件正文
    },
    // (买家图谱)推送的数据/ 展示用的数据
    userMessage: {
      user_real_name: '', // 名字
      user_company_career: '', // 职位
      user_company_name: '', // 公司名称
      investor_id: '', // 投资人id
      investor_email: '', // 邮箱
      card_id: ''
    }
  },
  mutations: {
    // 改变项目推送项目入口（多选）
    [types.PROJECT_PUSH_TO_PRO_CHANGE] (state, dispaly) {
      state.projectPushToProDisplay = dispaly;
    },
    // 项目推送人脉入口（单选）
    [types.PROJECT_PUSH_TO_CON_CHANGE] (state, dispaly) {
      state.projectPushToConDisplay = dispaly;
    },
    // 项目推送预览弹框
    [types.PROJECT_PUSH_PREVIEW_CHANGE] (state, dispaly) {
      state.projectPushPreviewDisplay = dispaly;
    },
    // 买家图谱推送所需要的人数据
    [types.SET_USER_MESSAGE] (state, obj) {
      state.userMessage.user_real_name = obj.user_real_name;
      state.userMessage.user_company_career = obj.user_company_career;
      state.userMessage.user_company_name = obj.user_company_name;
      state.userMessage.investor_id = obj.investor_id;
      state.userMessage.investor_email = obj.investor_email;
      state.userMessage.card_id = obj.card_id;
    },
    // 设置推送的数据
    [types.SET_PUSH_MESSAGE] (state, obj) {
      state.pushMessage.receive_users = obj.receive_users;
      state.pushMessage.email = obj.email;
      state.pushMessage.title = obj.title;
      state.pushMessage.body = obj.body;
      state.pushMessage.project_id = obj.project_id;
      state.pushMessage.card_id = obj.card_id;
    },
    // 清空所有数据
    [types.CLEAR_MESSAGE] (state, clear) {
      state.userMessage.user_real_name = '';
      state.userMessage.user_company_career = '';
      state.userMessage.user_company_name = '';
      state.userMessage.investor_id = '';
      state.userMessage.investor_email = '';
      state.userMessage.card_id = '';
      state.pushMessage.receive_users = [];
      state.pushMessage.email = '';
      state.pushMessage.title = '';
      state.pushMessage.body = '';
      state.pushMessage.project_id = '';
      state.pushMessage.card_id = '';
    }
  },
  actions: {
    // 改变项目推送项目入口（多选）
    projectPushToProControl ({ commit }, dispaly) {
      commit(types.PROJECT_PUSH_TO_PRO_CHANGE, dispaly);
    },
    // 项目推送人脉入口（单选）
    projectPushToConControl ({ commit }, dispaly) {
      commit(types.PROJECT_PUSH_TO_CON_CHANGE, dispaly);
    },
    // 项目推送预览弹框
    projectPushPreviewControl ({ commit }, dispaly) {
      commit(types.PROJECT_PUSH_PREVIEW_CHANGE, dispaly);
    },
    // 项目推送预览弹框
    setUserMessage ({ commit }, obj) {
      commit(types.SET_USER_MESSAGE, obj);
    },
    // 项目推送预览弹框
    setPushMessage ({ commit }, obj) {
      commit(types.SET_PUSH_MESSAGE, obj);
    },
    // 清空所有数据
    clearMessage ({ commit }, clear) {
      commit(types.CLEAR_MESSAGE, clear);
    }
  }
};
