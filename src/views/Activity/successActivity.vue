<template>
  <div id="successActivity" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    <div class="createSuccessActivity position_center_auto relative">
      <div class="center position_center_auto">
        <div class="el-notification absolute">
          <i class="el-notification__icon el-icon-circle-check"></i>
        </div>
        <div class="message relative position_center_auto tc">
          {{activityTitle}}
        </div>
        <div class="img innImg relative position_center_auto">
          <img src="../../assets/images/weixin.jpg">
        </div>

        <div class="title relative position_center_auto">
          <p>微信扫一扫，体验微天使乐投平台小程序</p>
        </div>

        <div  class="btn relative position_center_auto">
          <el-button @click="goMyActivity">返回活动首页</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {},
    data () {
      return {
        loading: false,
        activityTitle: '互动名称'
      };
    },
    methods: {
      // 获取id
      getActivityId () {
        this.activityTitle = this.$route.query.activity_title;
      },
      goMyActivity () {
        this.$router.push({name: 'myActivity'});
      }
    },
    // 当dom一创建时
    created () {
      this.getActivityId();
    }
  };
</script>

<style lang="less">
  .createSuccessActivity {
    background: #ffffff;
    width: 880px;
    height: 601px;
    margin-top: 64px;
    .center{
      width: 260px;
    }
    .el-notification{
      position: absolute!important;
      top: 40px;
      width: 80px;
      box-shadow: none;
      .el-notification__content{
        font-size:16px;
        color:#1f2d3d;
      }
    }
    .img{
      width: 162px;
      height: 162px;
      top: 156px;
    }
    .title{
      font-size:14px;
      color:#5e6d82;
      top: 183px;
      font-family:PingFangSC-Regular;
    }
    .btn{
      top: 255px;
      left: 72px;
    }
    .message{
      top: 120px;
    }
  }
</style>
