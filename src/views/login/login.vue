<template>
  <div id="login">
    <div class="title tc">微天使，FA的智能工作站</div>
    <div class="loginBox flex">
      <div class="loginBox-left">
        <div class="flex">
          <div class="tab" @click="toggle(index)" v-for="(tab,index) in tabs">
            <router-link :to="tab.jump " class="tabIndex" :class="{border:active===index}" tag="div">
              {{tab.type}}
            </router-link>
          </div>
        </div>
        <router-view></router-view>
      </div>
      <div class="loginBox-right">
        <div class="wx-title tc">
          <img src="../../assets/images/saoma.png"/>
        </div>
        <div id="qrCode"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable */
  export default {
    data () {
      return {
        tabs: [{
          type: '验证码登录', jump: '/login'
        }, {
          type: '密码登录', jump: '/login/codeLogin'
        }],
        active: 0
      };
    },
    methods: {
      toggle (i) {
        this.active = i;
      },
      creatObj () {
        const time = Date.now();
        const obj = new WxLogin({
          id: 'qrCode',
          appid: 'wx9de571b0aa850c03',
          scope: 'snsapi_login',
          redirect_uri: 'https://www.weitianshi.cn/auth/weixin/callback',
          href: 'https://www.weitianshi.cn/static/css/qrCode.css',
          state: time
        });
      }
    },
    mounted () {
      this.creatObj();
    }
  };
</script>

<style scoped lang="less">
  @import "../../assets/css/login.less";
</style>
