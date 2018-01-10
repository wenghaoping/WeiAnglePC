/**
 * Created by Admin on 2017/12/20.
 */
import Vue from 'vue';
import Router from 'vue-router';

const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router);
/* 配置路由 */
export default new Router({
  routes: [
    {
      path: '/', name: 'index', component: _import('mobileEntranceIndex/mailProjectDetail_type1')
    },
    {
      path: '/mailProjectDetail_type1',
      name: 'mailProjectDetail_type1',
      component: _import('mobileEntranceIndex/mailProjectDetail_type1')
    },
    {
      path: '/mailProjectDetail_type2',
      name: 'mailProjectDetail_type2',
      component: _import('mobileEntranceIndex/mailProjectDetail_type2')
    },
    {
      path: '/login',
      name: 'mailProjectLogin',
      component: _import('mobileEntranceIndex/login')
    }
  ]
});
