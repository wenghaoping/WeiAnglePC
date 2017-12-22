// 第二入口main配置
import Vue from 'vue';
import App from './MobileEntrance';
import router from '../../router/mobileEntranceRouter.js'; // 路由设置
import Element from 'element-ui'; // element
import 'element-ui/lib/theme-default/index.css'; // element样式
import axios from '../../api/api.js';// axios请求配置
import URL_ from '../../api/url.js';// URL请求地址汇总

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.URL = URL_;
Vue.use(Element); // UI库
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
