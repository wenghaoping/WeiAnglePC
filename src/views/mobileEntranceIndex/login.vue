<template>
  <div id='mailLogin'>
    <div class="flex">
      <!--登录头部-->
      <div class="tab" @click="toggle(index)" v-for="(tab,index) in tabs">
        <div class="tabIndex" :class="{border:active===index}">
          {{tab.type}}
        </div>
      </div>
    </div>
    <!--验证码登录-->
    <div class="login_tel" v-if="active === 0">
      <div class="inputFrame">
        <input class="telephone" v-model="telephone" placeholder="请输入常用手机号">
      </div>
      <div class="inputFrame flex" style="justify-content: space-between;">
        <input class="captcha" v-model="captcha" placeholder="请输入验证码">
        <el-button class="getCaptcha" type="text" @click="getCode" v-show="is_getCode==0">获取验证码</el-button>
        <el-button class="getCaptcha " type="text" v-show="is_getCode!=0" :disabled="true">{{captchaNum}}s</el-button>
      </div>
      <el-button @click='login' class="loginBtn">登录/注册</el-button>
    </div>
    <!--密码登录-->
    <div class="login_code" v-else>
      <div class="inputFrame">
        <input class="telephone" v-model="telephone" placeholder="请输入常用手机号">
      </div>
      <div class="inputFrame">
        <input class="password" type="password"  v-model="password" placeholder="请输入密码">
      </div>
      <el-button @click='login' class="loginBtn">登录</el-button>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import * as validata from '@/utils/validata';
  import { error } from '@/utils/notification';
  export default {
    data () {
      return {
        tabs: [{
          type: '验证码登录', jump: '/login'
        }, {
          type: '密码登录', jump: '/login/codeLogin'
        }],
        active: 0,
        is_getCode: 0,
        captchaNum: 60,
        telephone: '',
        captcha: '',
        password: ''
      };
    },
    methods: {
      // 切换tab
      toggle (i) {
        this.active = i;
      },
      //    获取验证码
      getCode () {
        if (!validata.checkPhoneNumber(this.telephone)) {
          error('请正确输入手机号码');
        } else {
          this.loading = true;
          this.$http.post(this.URL.authCaptcha, {
            user_mobile: this.telephone
          }).then(res => {
            console.log('获取验证码');
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
            this.loading = false;
          });
        }
      },
      //    注册或者登录
      login () {
        if (this.active === 0) {
          if (this.telephone && this.captcha) {
            this.loading = true;
            this.$http.post(this.URL.loginForCaptcha, {
              user_mobile: this.telephone,
              captcha: this.captcha
            }).then(res => {
              console.log('登陆');
              if (res.data.status_code === 2000000) {
                console.log(localStorage.user_id);
                localStorage.user_id = res.data.user_id;
                localStorage.user_real_name = res.data.user_real_name === '' ? '暂无姓名' : res.data.user_real_name;
                localStorage.user_brand = res.data.user_brand;
                localStorage.user_company_career = res.data.user_company_career;
                localStorage.user_company_name = res.data.user_company_name;
                this.zgIdentify(res.data.user_id, {name: res.data.user_real_name});
                localStorage.token = res.data.token;
                // 重新获取个人标签(因为获取个人标签必须要有user_id)
                this.$global.func.getWxProjectCategory();
                this.getUserGroupByStatusName(localStorage.user_id);
                this.getCheckUserInfo(localStorage.user_id);
                // is_exist: 0:新用户;1:老用户;NaN:没有请求过验证码
                this.loading = false;
                this.$router.go(-1);
              } else {
                error(res.data.error_msg);
                this.loading = false;
              }
            });
          } else {
            error('请正确填写手机号码和验证码');
          }
        } else {
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
              console.log('密码登陆');
              if (res.data.status_code === 2000000) {
                // 将user_id存入sessionStorge并跳转
                localStorage.user_id = res.data.user_id;
                console.log(localStorage.user_id);
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
                this.$router.go(-1);
              } else {
                error(res.data.error_msg);
                this.loading = false;
              }
            });
          }
        }
      }
    }
  };
</script>

<style scoped lang="less">
  @import '../../assets/css/mobileEntrance.less';
  #mailLogin{
    width: 288/16rem;
    margin: 94/16rem auto;
    ::-moz-placeholder { color: #99a9bf; }
    ::-webkit-input-placeholder { color:#99a9bf; }
    :-ms-input-placeholder { color:#99a9bf;}
    div,span,button,input{
      padding: 0;
      line-height: 1em;
    }
    .tab{
      color:#99a9bf;
      margin-bottom: 49/16rem;
      font-size: 1rem;
      line-height: 1rem;
      cursor: pointer;
      div:first-child{
        margin-right: 1.5rem;
      }
    }
    .border{
      color:#009eff;
    }
    .inputFrame{
      padding: .75rem 0;
      border-bottom: 1px solid #e0e6ed;
      margin-bottom: 19/16rem;
    }
    .loginBtn{
      margin-top: 35/16 rem;
      background:#40587a;
      border-radius:4px;
      text-align: center;
      color: white;
      width: 100%;
      height:46/16rem;
    }
    .login_tel{
      .captcha{}
    }
  }
</style>
