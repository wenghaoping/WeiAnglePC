<template>
  <!--二维码-->
  <div class="qrCodeActivity">
    <el-dialog :visible="qrCodeActivityDisplay" :before-close="cancel" close-on-press-escape close-on-click-modal lock-scroll
               :close-on-click-modal="showList" :close-on-press-escape="showList" size="large">
      <div class="side fl">
        <div class="title">可放于签到处</div>
        <div class="title">让嘉宾自行扫码签到</div>
        <div class="img innImg" v-loading.body="loading"
             element-loading-text="拼命加载中">
          <img :src="qrUrl" v-if="qrUrl !== ''">
          <img src="../../assets/images/zanwuerweima.jpg" v-else>
        </div>
      </div>
      <div class="side fl relative">
        <el-steps :space="100" direction="vertical">
          <el-step title="下载二维码"></el-step>
          <el-step title="嘉宾扫码，并填写报名时手机号"></el-step>
          <el-step title="报名成功，跳出“活动凭证”"></el-step>
        </el-steps>
        <div class="uploadsing absolute">
          <el-button @click="downloadIng" size="large">下载</el-button>
        </div>
        <div class="icon innImg absolute cursor">
          <img src="../../assets/images/why.png"/>
        </div>
        <div class="pingzheng innImg absolute">
          <img src="../../assets/images/pingzheng.png"/>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
//  import { error } from '@/utils/notification';
  export default {
    data () {
      return {
        loading: false,
        showList: false,
        qrUrl: ''
      };
    },
    computed: {
      ...mapState({
        qrCodeActivityDisplay: state => state.myActivity.qrCodeActivityDisplay,
        activityId: state => state.myActivity.activityData.activityId,
        isSign: state => state.myActivity.activityData.isSign
      })
    },
    methods: {
      // 上一步
      cancel () {
        this.$store.dispatch('qrCodeActivityControl', false);
      },
      downloadIng () {
        const url = this.URL.weitianshi + this.URL.downloadQrCode + '?user_id=' + localStorage.user_id + '&activity_id=' + this.activityId; //  + '&is_sign=' + this.isSign
        window.open(url);
      },
      // 获取二维码
      getQr () {
        this.loading = true;
        this.$http.post(this.URL.getSignQrCode, {user_id: localStorage.user_id, activity_id: this.activityId}) // , is_sign: this.isSign
          .then(res => {
            if (res.data.status_code === 2000000) {
              let data = res.data.data || '';
              this.qrUrl = data || '';
            }
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
          });
      }
    },
    watch: {
      qrCodeActivityDisplay: function (e) {
        if (e) {
          this.getQr();
        } else {
          this.$store.dispatch('AllMemberControl', false);
        }
      }
    }
  };
</script>

<style lang="less">
.qrCodeActivity{
  .el-dialog{
    width:514px;
  }
  .side{
    margin: 0 15px;
  }
  .title{
    font-size:14px;
    color:#475669;
  }
  .img{
    width: 156px;
    height: 156px;
    margin-top: 12px;
  }
  .el-step__line.is-vertical{
    top: 28px;
    left: 13px;
  }
  .el-step__title.is-wait{
    font-size:14px;
    color:#475669;
  }
  .el-step{
    height: 93px!important;
  }
  .el-step__line.is-vertical{
    top: 20px;
    left: 10px;
    background: #EFF2F7;
    width: 1px;
  }
  .el-step__head.is-text.is-wait{
    background:#e6e0ed;
    width:20px;
    height:20px;
    border: none;
  }
  .el-step__icon{
    line-height: 20px;
    font-size:12px;
    color:#475669;
  }
  .el-step__title.is-wait{
    font-size:14px;
    color:#475669!important;
    line-height: 20px;
  }
  .uploadsing{
    top: 29px;
    left: 33px;
  }
  .icon{
    width: 15px;
    height: 15px;
    top: 187px;
    left: 217px;
    &:hover + .pingzheng{
      opacity: 1;
    }
  }
  .pingzheng{
    width: 244px;
    height: 311px;
    top: 16px;
    left: 305px;
    opacity: 0;
    transition: all .5s;
  }
}
</style>
