// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import App from './Index';
import router from '../../router'; // 路由设置
import store from '../../store';
import Element from 'element-ui'; // element
import 'element-ui/lib/theme-default/index.css'; // element样式
import '../../utils/miXins.js';  // 全局函数
import axios from '../../api/api.js';// axios请求配置
import URL_ from '../../api/url.js';// URL请求地址汇总
import '../../otherUtil.js'; // 其他零碎工具
import '../../filters';// 过滤器
import global from '../../global/global.js';
Vue.prototype.$http = axios;
Vue.prototype.URL = URL_;
Vue.prototype.$global = global;
Vue.use(Element); // UI库

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
