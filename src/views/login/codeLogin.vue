<template>
  <div id="codeLogin" v-loading="loading"
       element-loading-text="正在登陆中">
    <input class="telephone" v-model="telephone" placeholder="请输入常用手机号码">
    <input class="code" @keyup.enter="login" type="password" v-model="password" placeholder="请输入密码">
    <div class="clearfix">
      <el-button class="fr" type="text" @click="forgetPassword" style="color: #40587a">忘记密码?</el-button>
    </div>
    <el-button class="loginBtn tc" @click="login">登录</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as validata from '@/utils/validata';
  import { error } from '@/utils/notification';
  export default {
    data () {
      return {
        telephone: '',
        password: '',
        loading: false
      };
    },
    methods: {
      // 忘记密码
      forgetPassword () {
        this.$router.push('/forgetPassword');
      },
      // 登录
      login () {
        if (!validata.checkPhoneNumber(this.telephone)) {
          error('请正确填写手机号码');
        } else if (validata.getNull(this.password)) {
          error('请正确填写密码');
        } else {
          this.loading = true;
          this.$http.post(this.URL.loginForPassword, {
            user_mobile: this.telephone,
            user_passwd: this.password
          }).then(res => {
            this.zgClick('密码登陆');
            if (res.data.status_code === 2000000) {
              // 将user_id存入sessionStorge并跳转
              localStorage.user_id = res.data.user_id;
              this.zgIdentify(res.data.user_id, {name: res.data.user_real_name});
              localStorage.user_real_name = res.data.user_real_name === '' ? '暂无姓名' : res.data.user_real_name;
              localStorage.user_brand = res.data.user_brand;
              localStorage.user_company_career = res.data.user_company_career;
              localStorage.user_company_name = res.data.user_company_name;
              this.getCheckUserInfo(localStorage.user_id);
              this.getUserGroupByStatusName(localStorage.user_id);
              localStorage.token = res.data.token;
              // 重新获取个人标签(因为获取个人标签必须要有user_id)
              this.$global.func.getWxProjectCategory();
              this.loading = false;
              if (localStorage.entrance === undefined) {
                this.$router.push({name: 'myProject'});
              } else {
                this.$router.push({name: localStorage.entrance});
              }
            } else {
              error(res.data.error_msg);
              this.loading = false;
            }
          });
        }
      }
    }
  };
</script>

<style scoped lang="less">
  @import "../../assets/css/login.less";
  ::-moz-placeholder { color: #99a9bf; }
  ::-webkit-input-placeholder { color:#99a9bf; }
  :-ms-input-placeholder { color:#99a9bf;}
</style>
