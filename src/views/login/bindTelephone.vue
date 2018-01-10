<template>
    <div id="bindTelephone">
      <div id="forgetPassword">
        <div class="title tc">微天使,帮您成交的项目管理工具</div>
        <div class="loginBox">
          <div class="loginBox-title">
            绑定手机
          </div>
          <input class="telephone" v-model="telephone" placeholder="请输入常用手机号码">
          <div class="codeFrame">
            <input class="code" v-model="captcha" placeholder="请输入验证码">
            <el-button type="text" @click="getCode" v-show="is_getCode==0">获取验证码</el-button>
            <el-button type="text" v-show="is_getCode!=0" :disabled="true">{{captchaNum}}s</el-button>
          </div>
          <el-button class="loginBtn tc" @click="certain">确定</el-button>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import * as validata from '@/utils/validata';
  import { error } from '@/utils/notification';
  export default {
    data () {
      return {
        telephone: '',
        captcha: '',
        // 是否点击过获取验证码标识
        is_getCode: 0,
        // 获取验证码的倒计时
        captchaNum: 60
      };
    },
    methods: {
      // 获取验证码
      getCode () {
        if (!validata.checkPhoneNumber(this.telephone)) {
          error('请正确输入手机号码');
        } else {
          this.$http.post(this.URL.authCaptcha, {
            user_mobile: this.telephone
          }).then(res => {
            if (res.data.status_code === 2000000) {
              this.is_getCode = 1;
              var timer = setInterval(() => {
                this.captchaNum--;
              }, 1000);
              setTimeout(() => {
                clearInterval(timer);
                this.captchaNum = 60;
                this.is_getCode = 0;
              }, 60000);
            } else {
              error(res.data.error_msg);
            }
          });
        }
      },
      // 设定手机号码
      certain () {
        if (this.telephone && this.captcha) {
          this.$http.post(this.URL.bindTelephone, {
            user_mobile: this.telephone,
            captcha: this.captcha,
            open_session: this.open_session
          }).then(res => {
            if (res.data.status_code === 2000000) {
              localStorage.user_career = res.data.user_career;
              localStorage.user_company = res.data.user_company;
              localStorage.user_email = res.data.user_email;
              localStorage.user_id = res.data.user_id;
              this.zgIdentify(res.data.user_id, {name: res.data.user_real_name});
              localStorage.user_real_name = res.data.user_real_name;
              localStorage.token = res.data.token;
              let obj = {
                user_id: res.data.user_id,
                user_real_name: res.data.user_real_name === '' ? '暂无姓名' : res.data.user_real_name,
                user_brand: res.data.user_brand,
                user_company_career: res.data.user_company_career,
                user_company_name: res.data.user_company_name
              };
              this.$store.dispatch('setLoginData', obj);
              // is_exist: 0:新用户;1:老用户;NaN:没有请求过验证码
              if (res.data.is_exist === 0) {
                this.$router.push({name: 'identityChoose'});
              } else if (res.data.is_exist === 1) {
                this.$router.push({name: localStorage.entrance});
              }
            } else {
              error(res.data.error_msg);
            }
          });
        } else {
          error('请正确填写手机号码和验证码');
        }
      }
    },
    created: function () {
      this.open_session = this.$route.query.open_session;
    }
  };
</script>

<style scoped lang="less">
  @import "../../assets/css/login.less";
</style>
