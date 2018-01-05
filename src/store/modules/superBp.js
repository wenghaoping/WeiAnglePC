/**
 * Created by Admin on 2017/12/18.
 */
import * as types from '../mutation-types';
export default {
  state: {
    industryDisplay: false, // 选择行业弹框控制
    choiceBpDisplay: false, // BP选择弹框控制
    bpPreviewDisplay: false, // BP预览
    payBpDisplay: false, // BP支付弹框
    industryId: [], // 行业id
    stageId: [], // 阶段id
    bpId: '', // bpId存放
    bpPage: 1, // Bp选择时候的当前页数
    bpBannerUrl: '', // 设置支付页面Bp图片
    type: false, // 搞一个参数控制是首页进入的，还是下载进入的
    industry: '' // 选择的行业
  },
  mutations: {
    // 改变行业弹框
    [types.INDUSTRY_CHANGE] (state, dispaly) {
      state.industryDisplay = dispaly;
    },
    // 改变BP选择
    [types.CHOICE_BP_CHANGE] (state, dispaly) {
      state.choiceBpDisplay = dispaly;
    },
    // 改变BP预览
    [types.BP_PREVIEW_CHANGE] (state, dispaly) {
      state.bpPreviewDisplay = dispaly;
    },
    // 改变BP支付弹框
    [types.PAY_BP_CHANGE] (state, dispaly) {
      state.payBpDisplay = dispaly;
    },
    // 控制关闭所有,切清空函数
    [types.ALL_CHANGE] (state, dispaly) {
      state.industryDisplay = dispaly;
      state.choiceBpDisplay = dispaly;
      state.bpPreviewDisplay = dispaly;
      state.payBpDisplay = dispaly;
      state.industryId = [];
      state.stageId = [];
      state.bpId = '';
      state.bpPage = 1;
      state.bpBannerUrl = '';
      state.type = false;
    },
    // 设置行业和阶段ID
    [types.SET_INDUSTRY_STAGE_ID] (state, obj) {
      state.industryId = obj.industry;
      state.stageId = obj.stage;
    },
    // 设置bp_id
    [types.SET_BP_ID] (state, id) {
      state.bpId = id;
    },
    // 设置bp_Page
    [types.SET_BP_PAGE] (state, page) {
      state.bpPage = page;
    },
    // 获取支付页面bp图片URL
    [types.GET_BP_BANNER] (state, url) {
      state.bpBannerUrl = url;
    },
    // 设置入口
    [types.SET_TYPE] (state, boolean) {
      state.type = boolean;
    },
    // 设置行业
    [types.SET_INDUSTRY] (state, industry) {
      state.industry = industry;
    }
  },
  actions: {
    // 改变行业弹框
    industryControl ({ commit }, dispaly) {
      commit(types.INDUSTRY_CHANGE, dispaly);
    },
    // 改变BP选择
    choiceBpControl ({ commit }, dispaly) {
      commit(types.CHOICE_BP_CHANGE, dispaly);
    },
    // 改变BP预览
    bpPreviewControl ({ commit }, dispaly) {
      commit(types.BP_PREVIEW_CHANGE, dispaly);
    },
    // 改变BP支付弹框
    payBpControl ({ commit }, dispaly) {
      commit(types.PAY_BP_CHANGE, dispaly);
    },
    // 控制关闭所有,切清空函数
    AllControl ({ commit }, dispaly) {
      commit(types.ALL_CHANGE, dispaly);
    },
    // 设置行业和阶段ID
    setIndustryStageId ({ commit }, industryId, stageId) {
      commit(types.SET_INDUSTRY_STAGE_ID, industryId, stageId);
    },
    // 设置bp_id
    setBpId ({ commit }, id) {
      commit(types.SET_BP_ID, id);
    },
    // 设置bp_Page
    setBpPage ({ commit }, page) {
      commit(types.SET_BP_PAGE, page);
    },
    // 获取支付页面bp图片URL
    setBpBannerUrl ({ commit }, url) {
      commit(types.GET_BP_BANNER, url);
    },
    // 设置入口
    setBpEnterType ({ commit }, boolean) {
      commit(types.SET_TYPE, boolean);
    },
    // 设置行业
    setIndestry ({ commit }, industry) {
      commit(types.SET_INDUSTRY, industry);
    }
  }
};
