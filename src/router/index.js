import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router);

// 测试页面
const checkone = r => require.ensure([], () => r(require('@/test/checkone.vue')), 'checkone');

// 配置路由
export default new Router({
  routes: [
    {
      path: '/workBench',
      component: _import('workBench/index'),
      children: [
        {
          path: '/workBench',
          component: _import('workBench/myProject/index'),
          children: [
            {path: 'myProject', component: _import('workBench/myProject/myproject'), name: 'myProject'},
            {path: 'myContacts', component: _import('workBench/myContacts/mycontacts'), name: 'myContacts'},
            {path: 'followup', component: _import('workBench/followUp/followup'), name: 'followUp'}
          ]
        },
        {path: 'projectDetails', component: _import('workBench/myProject/projectDetails'), name: 'projectDetails'}, // 项目详情
        {path: 'editproject', component: _import('workBench/myProject/editproject'), name: 'editproject'}, // 编辑项目
        {path: 'creatproject', component: _import('workBench/myProject/creatproject'), name: 'creatproject'}, // 创建项目
        {path: 'createContacts', component: _import('workBench/myContacts/createcontacts'), name: 'createContacts'}, // 创建人脉
        {path: 'contactsDetails', component: _import('workBench/myContacts/contactsDetails'), name: 'contactsDetails'}// 人脉详情
      ]
    },
    {
      path: '/', name: 'index', component: _import('index/index')
    },
    {
      path: '/qr', name: 'SmallRoutine', component: _import('SmallRoutine/index')
    },
    {
      path: '/login',
      component: _import('login/login'),
      children: [
        {path: '', name: 'telephoneLogin', component: _import('login/telephoneLogin')},
        {path: 'codeLogin', name: 'codeLogin', component: _import('login/codeLogin')}
      ]
    },
    {
      path: '/loginReady', name: 'loginReady', component: _import('login/loginReady')
    },
    {
      path: '/forgetPassword', name: 'forgetPassword', component: _import('login/forgetPassword')
    },
    {
      path: '/bindTelephone', name: 'bindTelephone', component: _import('login/bindTelephone')
    },
    {
      path: '/identityChoose', name: 'identityChoose', component: _import('identity/identityChoose')
    },
    {
      path: '/identityDetail', name: 'identityDetail', component: _import('identity/identityDetail')
    },
    {
      path: '/API/DD', name: 'onekeyResearchAlone', component: _import('onekeyResearchAlone/onekeyresearchAlone')
    },
    {
      path: '/onekeyResearch', name: 'onekeyResearch', component: _import('onekeyResearchAlone/onekeyresearch')
    },
    {
      path: '/aboutUs', name: 'aboutUs', component: _import('aboutUs/aboutUs')
    },
    {
      path: '/emailContact', name: 'emailContact', component: _import('emailContact/emailContact')
    },
    {
      path: '/addProject', name: 'addProject', component: _import('addProject/addProject')
    },
    {
      path: '/skipToPc', name: 'skipToPc', component: _import('skipToPc/skipToPc')
    },
    {
      path: '/personalInformation', name: 'personalInformation', component: _import('personalInformation/personalInformation')
    },
    {
      path: '/superBP', name: 'superBP', component: _import('superBp/index') // 超级BP
    },
    {
      path: '/customBp', name: 'customBp', component: _import('superBp/customBp') // BP问诊/定制
    },
    {
      path: '/creatActivity', name: 'creatActivity', component: _import('Activity/creatActivity') // 创建活动
    },
    {
      path: '/myActivity', name: 'myActivity', component: _import('Activity/myActivity') // 我的活动
    },
    {
      path: '/successActivity', name: 'successActivity', component: _import('Activity/successActivity') // 我的活动
    },
    {
      path: '/test', name: 'test', component: checkone
    }
  ]
});
