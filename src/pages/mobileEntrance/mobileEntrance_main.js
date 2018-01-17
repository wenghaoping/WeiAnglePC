// 第二入口main配置
import Vue from 'vue';
import App from './MobileEntrance';
import router from '../../router/mobileEntranceRouter.js'; // 路由设置
import store from '../../store';
import Element from 'element-ui'; // element
import 'element-ui/lib/theme-default/index.css'; // element样式
import '../../utils/miXins.js';  // 全局函数
import axios from '../../api/api.js';// axios请求配置
import URL_ from '../../api/url.js';// URL请求地址汇总
import global from '../../global/global';//
import '../../filters';// 过滤器

Vue.config.productionTip = false;
Vue.prototype.$global = global;
Vue.prototype.$http = axios;
Vue.prototype.URL = URL_;
Vue.use(Element); // UI库
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
