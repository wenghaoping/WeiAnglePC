<template>
  <div class="mailLogin">
    <div class="form-signin" v-loading.body="loading" element-loading-text="拼命加载中" >
      <div class="mb-4">
        <p class="tc title topTitle">请核实您的身份信息</p>
        <p class="tc title bottomTitle">第一时间为您推送、约谈优质项目方</p>
        <div class="jumbotron">
          <div class="tc centerTitle">身份确认</div>
          <el-form ref="loginData" :model="loginData" label-width="3.75rem">
            <el-form-item label="姓名" :rules="NullRule20"
                          prop="user_real_name" style="margin-top: .5rem;">
              <el-input v-model="loginData.user_real_name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机" :rules="PhoneRule"
                          prop="user_mobile">
              <el-input v-model="loginData.user_mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="机构" :rules="NullRule20" prop="user_brand">
              <el-input v-model="loginData.user_brand" placeholder="请输入机构"></el-input>
            </el-form-item>
            <el-form-item label="职位" :rules="NullRule20" prop="user_company_career">
              <el-input v-model="loginData.user_company_career" placeholder="请输入职位"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="user_email"
                          :rules="[{required: true, message: '邮箱不能为空', trigger: 'blur'},{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }]">
              <el-input v-model="loginData.user_email" placeholder="请输入邮箱地址"></el-input>
            </el-form-item>
            <el-form-item label="身份" :rules="[{required: true, message: '不能为空', trigger: 'change'}]" prop="group_id">
              <el-select v-model="loginData.group_id" placeholder="请选择投资人">
                <el-option
                  v-for="item in identitys"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <button class="btn btn-lg btn-block btn-light btn-white" @click="confirm">确认</button>
        <p class="tc last-bottom">www.weitianshi.cn</p>
      </div>
    </div>

    <!--验证码弹框-->
    <el-dialog
      :visible.sync="getCodeChange" :close-on-click-modal="showList"
      :before-close="handleClose" class="position_center_auto">
      <div class="codeModel">
        <p class="tc title">请短信验证手机号：{{loginData.user_mobile}}</p>
        <el-form ref="captchaData" :model="captchaData">
          <el-form-item :rules="CaptchaCode"
                        prop="captcha">
            <el-input v-model="captchaData.captcha" placeholder="请输入验证码"></el-input>
            <el-button type="text" class="reloadCode absolute" v-show="is_getCode === 0" @click="getCode">获取验证码</el-button>
            <el-button type="text" class="reloadCode absolute" v-show="is_getCode !== 0" :disabled="true">{{captchaNum}}s</el-button>
          </el-form-item>
        </el-form>
        <button class="yes_btn cursor" @click="next">确定</button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as validata from '@/utils/validata';
  import { error, warning } from '@/utils/notification';
  export default {
    data () {
      const CaptchaCodeForElement = (rule, value, callback) => {
        if (!validata.getNull(value)) {
          setTimeout(() => {
            if (value.length !== 6) {
              callback(new Error('验证码是6位'));
            } else {
              if (this.checkCaptchaPost) {
                this.checkCaptchaPost = false;
                if (this.checkCaptcha) {
                  this.$http.post(this.URL.loginForCaptcha, {
                    user_mobile: this.loginData.user_mobile,
                    captcha: this.captchaData.captcha,
                    user_real_name: this.loginData.user_real_name,
                    user_brand: this.loginData.user_brand,
                    user_email: this.loginData.user_email,
                    group_id: this.loginData.group_id,
                    user_company_career: this.loginData.user_company_career
                  }).then(res => {
                    this.checkCaptchaPost = true;
                    if (res.data.status_code === 2000000) {
                      this.checkCaptcha = false;
                      localStorage.user_id = res.data.user_id;
                      localStorage.token = res.data.token;
                      this.getCheckUserInfo(localStorage.user_id);
                      this.zgIdentify(res.data.user_id, {name: res.data.user_real_name});
                      this.getUserGroupByStatusName(localStorage.user_id);
                      callback();
                    } else {
                      callback(new Error(res.data.error_msg));
                    }
                  });
                } else {
                  callback();
                }
              } else {
                callback();
              }
            }
          }, 100);
        } else {
          callback(new Error('不能为空'));
        }
      };// 不为空,20
      return {
        showList: false,
        getCodeChange: false,
        active: 0,
        is_getCode: 0,
        captchaNum: 60,
        captchaData: {
          captcha: ''
        },
        loading: false,
        PhoneRule: [{required: true, message: '电话不能为空', trigger: 'blur'}, { validator: validata.checkPhoneNumberForElement, trigger: 'blur' }],
        NullRule20: [{required: true, message: '不能为空', trigger: 'blur'}, { validator: validata.checkNull20ForElement, trigger: 'blur' }], // 不为空
        CaptchaCode: [{required: true, message: '验证码不能为空', trigger: 'blur'}, { validator: CaptchaCodeForElement, trigger: 'blur' }], // 不为空,20
        loginData: {
          user_real_name: '',
          user_mobile: '',
          user_brand: '',
          user_email: '',
          group_id: ''
        },
        identitys: [],
        loginDataMust: false,
        captchaDataMust: false,
        oldMobilePhone: '', // 存储初始电话
        userType: 'user_id',
        timer: null,
        checkCaptcha: true,
        checkCaptchaPost: true
      };
    },
    methods: {
      // 获取验证码
      getCode () {
        this.loading = true;
        this.$http.post(this.URL.authCaptcha, {
          user_mobile: this.loginData.user_mobile
        }).then(res => {
          if (res.data.status_code === 2000000) {
            this.is_getCode = 1;
            this.timer = setInterval(() => {
              this.captchaNum--;
            }, 1000);
            setTimeout(() => {
              clearInterval(this.timer);
              this.captchaNum = 60;
              this.is_getCode = 0;
            }, 60000);
          } else {
            error(res.data.error_msg);
          }
          this.loading = false;
        });
      },
      // 确定
      next () {
        const submit = () => {
          return new Promise((resolve, reject) => {
            // 做一些异步操作
            this.submitForm('captchaData', 'captchaDataMust');
            resolve(true);
          });
        };
        const check = () => {
          return new Promise((resolve, reject) => {
            // 做一些异步操作
            setTimeout(() => {
              if (this.captchaDataMust) {
              } else {
                resolve(true);
              }
            }, 200);
          });
        };
        submit()
          .then((data) => {
            return check();
          })
          .then((data) => {
            if (data) {
              localStorage.mobileEnter = 1;
              this.handleClose();
              setTimeout(() => {
                this.$router.push({name: this.$route.query.old_path, query: {investor_id: this.$route.query.investor_id, project_id: this.$route.query.project_id, user_id: localStorage.user_id}});// 路由传参
              }, 500);
            }
          });
      },
      // 确认
      confirm () {
        const submit = () => {
          return new Promise((resolve, reject) => {
            // 做一些异步操作
            this.submitForm('loginData', 'loginDataMust');
            resolve(true);
          });
        };
        const check = () => {
          return new Promise((resolve, reject) => {
            // 做一些异步操作
            setTimeout(() => {
              if (this.loginDataMust) {
              } else {
                resolve(true);
              }
            }, 200);
          });
        };
        submit()
          .then((data) => {
            return check();
          })
          .then((data) => {
            if (data) {
              if (this.loginData.user_mobile === this.oldMobilePhone) {
                if (this.userType === 'user_id') {
                  this.loginData.investor_id = this.$route.query.investor_id;
                  this.$http.post(this.URL.loginNonstop, this.loginData).then(res => {
                    if (res.data.status_code === 2000000) {
                      localStorage.token = res.data.token;
                      localStorage.user_id = res.data.user_id;
                      this.getCheckUserInfo(res.data.user_id);
                      this.getUserGroupByStatusName(res.data.user_id);
                      localStorage.mobileEnter = 1;
                      this.$router.go(-1);
                    } else {
                      warning(res.data.error_msg);
                    }
                  });
                } else {
                  this.getCodeChange = true;
                }
              } else {
                this.getCodeChange = true;
              }
            }
          });
      },
      // 检查所有必填项目以及获取所有数据/true过.false不过
      submitForm (formName, checkName) {
        this.$refs[formName].validate((valid) => {
          this[checkName] = !valid;
        });
      },
      handleClose () {
        clearInterval(this.timer);
        this.captchaNum = 60;
        this.is_getCode = 0;
        this.getCodeChange = false;
      },
      // 获取登陆信息
      checkUserByInteInvestorId () {
        if (!localStorage.investor_id) {
          this.loading = true;
          this.$http.post(this.URL.checkUserByInteInvestorId, {
            investor_id: this.$route.query.investor_id,
            user_id: this.$route.query.user_id,
            type: this.$route.query.type
          }).then(res => {
            if (res.data.status_code === 2000000) {
              let data = res.data.data;
              if (data.type === 'user_id') {
                localStorage.user_id = data.type_id;
              }
              this.userType = data.type;
              localStorage.user_real_name = data.user_real_name === '' ? '暂无姓名' : data.user_real_name;
              localStorage.user_brand = data.user_brand;
              data.group_id = data.group_id.toString() || '6';
              this.loginData = data;
              this.oldMobilePhone = data.user_mobile;
            } else {
              warning(res.data.error_msg);
            }
            this.loading = false;
          });
        } else {
          error('请重新进入');
        }
      },
      // 获取身份列表信息
      getIdentity () {
        this.$http.post(this.URL.getGroupIdentify).then(res => {
          let data = res.data.data;
          data.forEach((item) => {
            this.identitys.push({label: item.group_title, value: item.group_id.toString()});
          });
        });
      }
    },
    created () {
      this.getIdentity();
      this.checkUserByInteInvestorId();
    }
  };
</script>

<style lang="less">
body{
  background: #356a9e;
}
.form-signin{
  width: 100%;
  max-width: 420px;
  padding: 15px;
  margin: 0 auto;
}
.mailLogin{
  background: #356a9e;
  height: 100%;
  .title{
    font-size:1rem;
    color:#ffffff;
    line-height: 1.375rem;
  }
  .topTitle{
    padding-top: 3rem;
  }
  .bottomTitle{
    margin-bottom: 2rem;
  }

  .centerTitle{
    background:#f5f5f5;
    height:45/16rem;
    line-height:45/16rem;
    font-size:15/16rem;
    color:#1f2d3d;
    border-radius: .3rem .3rem 0 0;
    font-weight: bold;
  }
  .el-form{
    margin: 0 1rem;
  }
  .el-form-item{
    border-bottom: 1/16rem solid #e0e6ed;
    margin-bottom: 10/16rem;
  }
  .el-form-item__label{
    font-size:14/16rem;
    color:#99a9bf;
    text-align: left;
  }
  .el-input__inner{
    border: none;
  }
  .el-form-item__error{
    left: 10/16rem;
    top: 26/16rem;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:#99a9bf;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:#99a9bf;
  }

  input:-ms-input-placeholder{
    color:#99a9bf;
  }

  input::-webkit-input-placeholder{
    color:#99a9bf;
  }
  .btn-white{
    height:52/16rem;
  }
  .last-bottom{
    font-size:14/16rem;
    color:#ffffff;
    margin: 32/16rem 0 0 0;
  }



  .jumbotron{
    background: #ffffff;
    padding: 0;
  }
  .el-dialog{
    width:286/16rem!important;
  }
  /*.el-dialog__header{*/
    /*display: none;*/
  /*}*/
  .el-dialog__body{
    background:#ffffff;
    border-radius:4px;
    padding: 1.25rem 0 0;
  }
  .codeModel{
    .title{
      font-size:14px;
      color:#1f2d3d;
    }
    .reloadCode{
      top: 0rem;
      right: 0rem;
    }
    .el-form-item__error{
      top:2.4rem;
    }
    .yes_btn{
      width: 100%;
      height: 40/16rem;
      font-size:15/16rem;
      color:#333333;
      margin-top: 1rem;
      outline:none;
    }
  }
}
</style>
