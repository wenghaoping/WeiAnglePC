<template>
  <!--二维码-->
  <div class="qrCodeActivity">
    <el-dialog :visible="qrCodeActivityDisplay" :before-close="cancel" close-on-press-escape close-on-click-modal lock-scroll
               :close-on-click-modal="showList" :close-on-press-escape="showList" size="large">
      <div class="side fl">
        <div class="title">可放于签到处</div>
        <div class="title">让嘉宾自行扫码签到</div>
        <div class="img innImg">
          <img v-lazy="qrUrl" v-if="qrUrl !== ''">
          <img src="../../assets/images/weixin.jpg" v-else>
        </div>
      </div>
      <div class="side fl relative">
        <el-steps :space="100" direction="vertical">
          <el-step title="下载二维码"></el-step>
          <el-step title="嘉宾扫码，并填写报名时手机号"></el-step>
          <el-step title="报名成功，跳出“活动凭证”"></el-step>
        </el-steps>
        <div class="uploadsing absolute">
          <el-button type="primary" @click="downloadIng" size="large">下载</el-button>
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
  import { error } from '@/utils/notification';
  export default {
    data () {
      return {
        loading: false,
        showList: false,
        qrUrl: 'https://i.imgur.com/SgDpf8x.jpg'
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
        const url = this.URL.weitianshi + this.URL.superBpDownload + '?user_id=' + localStorage.user_id + '&activity_id=' + this.activityId + '&is_sign=' + this.isSign;
        window.open(url);
      },
      // 删除文件
      getQr () {
        this.$http.post(this.URL.deleteInquiryFile, {user_id: localStorage.user_id, activity_id: this.activityId, is_sign: this.isSign})
          .then(res => {
            this.loading = false;
            if (res.data.status_code === 2000000) {
              let data = res.data.data;
              this.qrUrl = data || '';
            }
          })
          .catch(err => {
            this.loading = false;
            error('提交失败');
            console.log(err);
          });
      }
    },
    watch: {
      importRegistrationDisplay: function (e) {
        if (e) {
//          this.getQr();
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
    height: 80px!important;
  }
  .uploadsing{
    top: 35px;
    left: 39px;
  }
  .icon{
    width: 15px;
    height: 15px;
    top: 170px;
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
