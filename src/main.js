// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import routerConfig from './config/router_config.js';
import store from './store/';
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import zhuge from './global/zhuge.js';
import zhugeMiXins from './global/zhugeIoMiXins.js';
// 引入自己的CSS,格式化样式
import './assets/css/base.css';
import './assets/css/animate.css';
import tool from './global/tool.js';

import echarts from 'echarts';// echart封装
import axios from './config/api.js';//  axios请求配置
import URL_ from './global/url.js';// URL请求地址汇总
import './filters/index';// 过滤器
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import Vuex from 'vuex';
import global from './global/global.js';
Vue.prototype.$http = axios;

Vue.prototype.URL = URL_;

Vue.prototype.$echart = echarts;

Vue.prototype.$global= global;

Vue.use(Element);// UI库
Vue.use(tool);// 自己的库
Vue.use(Vuex);
Vue.use(zhuge);// 诸葛io

Vue.prototype.$store = store;

Vue.config.productionTip = false;
// 设置路由
Vue.use(VueRouter);
// 定义路由
const router = new VueRouter({
  routes: routerConfig
});
router.beforeEach((to, from, next) => {
  if (to) {
    NProgress.start() // 开启Progress
  }
  next()
})
router.afterEach(() => {
  NProgress.done() // 结束Progress
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
