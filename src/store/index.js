import Vue from 'vue';
import Vuex from 'vuex';

import pushProject from './modules/pushProject.js'; // 项目推送控制
import login from './modules/login.js'; // 登陆数据存储
import superBp from './modules/superBp.js'; // 超级BP控制
import pageAndSelect from './modules/pageAndSelect.js'; // 列表页筛选控制
import dialogDisplay from './modules/dialogDisplay.js'; // 全局公用弹框控制
import projectDetails from './modules/projectDetails.js'; // 项目详情页面所有数据集合
import contactsDetails from './modules/contactsDetails.js'; // 人脉详情页面
import syncData from './modules/syncData.js'; // 同步数据使用的
import myActivity from './modules/myActivity.js'; // 我的活动使用
Vue.use(Vuex);

const state = {
  // 全局初始化状态设定
};

export default new Vuex.Store({
  state,
  modules: { // 用前面的去访问
    pushProject: pushProject,
    logining: login,
    pageANDSelect: pageAndSelect,
    syncData: syncData,
    superBp: superBp,
    dialogDisplay: dialogDisplay,
    projectDetails: projectDetails,
    contactsDetails: contactsDetails,
    myActivity: myActivity
  }
});
