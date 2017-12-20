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
      path: '/', name: 'index', component: _import('mobileEntranceIndex/index')
    }
  ]
});
