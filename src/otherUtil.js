/**
 * Created by Admin on 2017/12/14.
 */
'use strict'
// 其他小工具
import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import router from './router';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条样式
import loading from '../static/images/loading_img.gif';
import error from '../static/images/error.gif';
// 全局进度条
router.beforeEach((to, from, next) => {
  if (to) {
    NProgress.start(); // 开启Progress
  }
  next();
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

// 懒加载图片

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: error,
  loading: loading,
  try: 3 // default 1
});
