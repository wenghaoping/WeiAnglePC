<template>
  <div id="samllRoutine" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <div class="titleTo">
    </div>
    <div class="scan">
      <p class="title">微天使，FA的智能工作站</p>
      <p class="samll">请用“微天使乐投平台”【小程序】扫一扫
        <span class="icon">
            <img src="../../assets/images/why.png"/>
          </span>
        <span class="saoma">
            <img src="../../assets/images/bigsaoma.png">
          </span>
      </p>
      <div class="img" v-html="qr" v-if="checkout" v-loading.body="loadIn">
        {{qr}}
      </div>
      <div class="img" v-if="!checkout">
        <br>
        <br>
        <el-button @click="reload" size="large" style="display: block;margin: 0 auto">超时,点击刷新页面</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { error } from '@/utils/notification';
  export default {
    data () {
      return {
        input: '',
        loading: false,
        timeout: null,
        num: 0,
        qr: '',
        close: false,
        checkout: false,
        loadIn: false
      };
    },
    methods: {
      reload () {
        window.location.reload();
      },
      getUserId () {
        this.num++;
        if (parseInt(this.num) > 45) {
          clearInterval(this.timeout);
        }
        this.$http.post(this.URL.ajaxPolling, {credential: localStorage.credential})
          .then(res => {
            let data = res.data;
            if (data.status_msg === 'success') {
              clearInterval(this.timeout);
              localStorage.token = res.data.token;
              localStorage.user_id = data.user_info.user_id;
              localStorage.user_real_name = data.user_info.user_real_name;
              this.$store.dispatch('setUserRealName', data.user_info.user_real_name);
              if (data.type === 'create') setTimeout(() => { this.$router.push({name: 'creatproject'}); }, 50);
              if (data.type === 'update') setTimeout(() => { this.$router.push({name: 'editproject', query: {project_id: data.project_id}}); }, 50);
            } else if (data.status_msg === 'timeout') {
              clearInterval(this.timeout);
              this.checkout = false;
            } else if (data.status_msg === 'continue') {
              console.log('等待登陆');
            }
          })
          .catch(err => {
            console.log(err);
          });
      }// 获取id
    },
    mounted () {
      this.checkout = true;
      this.loadIn = true;
      setTimeout(() => {
        this.$http.get(this.URL.returnQrCredential)
          .then(res => {
            let data = res.data;
            this.qr = data.qr;
            localStorage.credential = data.credential;
            this.loadIn = false;
          })
          .catch(err => {
            console.log(err);
            error('请刷新页面');
          });
        this.timeout = setInterval(() => {
          this.getUserId();
        }, 2000);
      }, 2000);
    }
  };
</script>

<style scoped lang="less">
  svg{width: 200px;height: 200px;}
  #samllRoutine{
    .saoma{
      width: 252px;
      height: 410px;
      position: absolute;
      top: -129px;
      right: -297px;
      display: none;
      img{
        width: 100%;
      }
    }
    .icon:hover + .saoma {
      display: block;
    }
    .icon{

      display: inline-block;
      cursor: pointer;
      width: 13px;
      height: 13px;
      margin-left: 8px;
      img{
        width: 100%;
      }

    }
    background: #f3f4f8;
    font-family:PingFangSC-Regular;
    padding-top: 156px;
    padding-bottom: 312px;
    .scan{
      box-shadow:0 4px 4px 0 rgba(64,88,122,0.10);
      border-radius:2px;
      width:410px;
      height:410px;
      text-align: center;
      /*    margin: 156px auto 0;*/
      margin:auto;
      background: #ffffff;
      .title{
        font-size:20px;
        color:#1f2d3d;
        line-height:20px;
        padding-top: 40px;
      }
      .samll{
        position: relative;
        font-size:14px;
        color:#5e6d82;
        line-height:13px;
        margin-top: 71px;
      }
      .samll2{
        font-size:14px;
        color:#5f6d81;
      }
      .img{
        width: 195px;
        height: 195px;
        display: block;
        margin: 24px auto 0;
      }
    }
    .titleTo{
      height: 60px;
      width: 90%;
      background: #40587a;
      position: fixed;
      top: 0px;
      left: 0px;
      margin-left: 136px;
      z-index: 9999;
    }

  }
</style>
