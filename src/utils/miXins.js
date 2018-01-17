/**
 * Created by Admin on 2017/9/25.
 */
// 全局函数
/* eslint-disable */
import Vue from 'vue';
// import { getIntervalTime, srtIntervalClearTime } from '@/utils';
import { error } from './notification';
let int = null;// 时间设置
let time = '';
// 时间控制数据
let Json = {
  'index': '官网',
  'myProject': '项目库',
  'myContacts': '我的人脉',
  'followUp': '跟进记录',
  'creatproject': '创建项目',
  'editproject': '编辑项目',
  'projectDetails': '项目详情',
  'createContacts': '添加人脉',
  'contactsDetails': '人脉详情',
  'login': '登陆',
  'bindTelephone': '登陆',
  'telephoneLogin': '登陆',
  'codeLogin': '登陆',
  'SmallRoutine': '小程序登陆',
  'identityChoose': '身份认证',
  'addProject': '加入项目库',
  'onekeyResearch': '一键尽调',
  'emailContact': '联系项目方',
  'aboutUs': '关于我们'
};

// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  methods: {
    /* 点击事件
    # name 事件   例:创建项目 String
    # event 参数  例:{'手机' : '小米4','价格' : 1799,'运营商' : '移动'}  Object
    //属性名称不能超过255个字符，属性值不能超过200个字符
    */
    zgClick (name, event = {}) {
      // zhuge.track(name, event);
    },

    /* 识别用户
    # userId 用户Id
     # event 参数  例:name: '翁浩平',
     //预定义属性
     avatar: '头像地址',
     //预定义属性
     '行业': '互联⽹网' //⾃自定义属性  Object
    */
    zgIdentify (userName, event = {}) {
      // zhuge.identify(userName, event);
    },

    // 路由进入计时
    zgTimeIn () {
      // int = setInterval(() => { time = getIntervalTime(); /* console.log(time) */; }, 2000);
    },

    // 路由出去时停止计时
    zgTimeOut (name) {
      // clearInterval(int);
      // let ReallyName = this.zgChangeString(name);
      // if (ReallyName) {
      //   this.zgClick(ReallyName, {time: time});
      // }
      // time = '';
      // srtIntervalClearTime();
    },

    zgChangeString (name) {
      // for (let key in Json) {
      //   if (name === key) {
      //     return Json[key];
      //   }
      // }
    },

    // 公用函数(设置登陆用户的所有信息)
    getCheckUserInfo (user_id = 0) {
      if (user_id !== 0) {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.$http.post(this.URL.checkUserInfo, {
            user_id: user_id
          }).then(res => {
            if (res.data.status_code === 2000000) {
              // 将user_id存入sessionStorge并跳转
              localStorage.user_real_name = res.data.user_real_name;
              localStorage.user_brand = res.data.user_brand;
              localStorage.user_company_career = res.data.user_company_career;
              localStorage.user_company_name = res.data.user_real_name === '' ? '暂无姓名' : res.data.user_real_name;
              localStorage.is_competition = res.data.is_competition;
              localStorage.user_wechat = res.data.user_wechat; // 微信
              localStorage.user_mobile = res.data.user_mobile; // 电话
              let obj = {
                user_id: res.data.user_id,
                user_real_name: res.data.user_real_name === '' ? '暂无姓名' : res.data.user_real_name,
                user_brand: res.data.user_brand,
                user_company_career: res.data.user_company_career,
                user_company_name: res.data.user_company_name
              };
              this.$store.dispatch('setLoginData', obj);
            }
            resolve(1);
          });
        });
      }
    },
    getUserGroupByStatusName (user_id = 0) {
      // 核对是否认证过身份
      let group_name = '';
      if (user_id !== 0) {
        this.$http.post(this.URL.getUserGroupByStatus, {
          user_id: user_id
        }).then(res => {
          if (res.data.status_code === 2000000) {
            if (res.data.status === 0) {
              group_name = '身份认证';
            } else if (res.data.status === 1) {
              group_name = '审核中';
            } else if (res.data.status === 3) {
              group_name = '审核未通过';
            } else if (res.data.status === 2) {
              group_name = res.data.group.group_title;
            }
            localStorage.group_name = group_name;
            this.$store.dispatch('setGroupName', group_name);
          } else {
            error('核对身份接口调用失败');
          }
        });
      }
    }

  }
});
