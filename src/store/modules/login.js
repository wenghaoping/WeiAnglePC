/**
 * Created by Admin on 2017/7/28.
 */
import * as types from '../mutation-types';
export default {
  state: {
    user_id: '', // 用户id
    user_real_name: '', // 用户真实姓名
    user_brand: '', // 品牌
    user_company_career: '', // 职位
    user_company_name: '', // 公司名称
    group_name: '' // 身份认证
  },
  mutations: {
    // 设置登陆获取的信息
    [types.SET_LOGIN_DATA] (state, obj) {
      state.user_id = obj.user_id;
      state.user_real_name = obj.user_real_name;
      state.user_brand = obj.user_brand;
      state.user_company_career = obj.user_company_career;
      state.user_company_name = obj.user_company_name;
    },
    // 设置身份认证
    [types.SET_GROUP_NAME] (state, name) {
      state.group_name = name;
    },
    // 设置真实名字（退出登陆的时候需要清空数据）
    [types.SET_USER_REAL_NAME] (state, name) {
      state.user_real_name = name;
    }
  },
  actions: {
    setLoginData ({ commit }, obj) {
      commit(types.SET_LOGIN_DATA, obj);
    },
    setGroupName ({ commit }, name) {
      commit(types.SET_GROUP_NAME, name);
    },
    setUserRealName ({ commit }, name) {
      commit(types.SET_USER_REAL_NAME, name);
    }
  }
};
