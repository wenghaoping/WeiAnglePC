/**
 * Created by Admin on 2017/8/9.
 */
export default {
  state: {
    projecy_id: '',
    user: {
      user_real_name: '',
      user_company_career: '',
      user_company_name: ''
    }, // 展示用的数据
    pushMessage: {
      user_id: '',
      card_id: '',
      email: '',
      title: '',
      body: '',
      project_ids: []
    }, // 推送的所有数据
    pro_intro: '', // 项目介绍
    email: {
      title: '', // 邮件标题
      body: ''// 邮件正文
    },

    // 推送项目-项目入口
    projectPush2: {
      myCheckList: {},
      netCheckList: {}
    }
  }
};
