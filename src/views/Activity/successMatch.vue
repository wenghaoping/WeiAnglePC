<template>
  <!--赛事创建成功-->
  <div id="successActivity" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    <div class="createSuccessMatch position_center_auto relative">
      <div class="center position_center_auto">
        <div class="el-notification absolute">
          <i class="el-notification__icon el-icon-circle-check"></i>
        </div>
        <div class="message relative position_center_auto tc clearfix">
          {{match_title}}
        </div>
        <div class="innImg relative position_center_auto clearfix">
          <!--<span class="fl img" :class="{position_center_auto: has_activity}">-->
            <!--<img src="../../assets/images/weixin.jpg">-->
            <!--<span class="tc name inlineBlock">查看小程序</span>-->
          <!--</span>-->
          <span class="fl img" style="margin-left: 72px;" v-if="has_activity === true">
            <img v-if="url === '' || url === null" src="../../assets/images/morenIMG.png">
            <img :src="url" v-else>
            <span class="tc name inlineBlock">扫码分享</span>
          </span>
        </div>
        <div  class="btn relative position_center_auto">
          <el-button @click="goMyActivity">返回活动首页</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  export default {
    props: {},
    data () {
      return {
        loading: false,
        type: '',
        url: '',
        smallQcr: '', // 小程序分享二维码
        match_title: '赛事名称'
      };
    },
    methods: {
      goMyActivity () {
        this.$router.push({name: 'myMatch'});
      },
      // 获取id
      getCompetitionId () {
        this.url = this.$route.query.url;
        this.match_title = this.$route.query.match_title;
        this.has_activity = this.$route.query.has_activity;
      }
    },
    computed: {
      ...mapState({
        matchData: state => state.myMatch.matchData || {}
      })
    },
    created () {
      this.getCompetitionId();
    }
  };
</script>

<style lang="less">
  .createSuccessMatch {
    background: #ffffff;
    width: 880px;
    height: 601px;
    margin-top: 64px;
    .center{
      width: 270px;
    }
    .el-notification{
      position: absolute!important;
      top: 17px;
      width: 120px;
      box-shadow: none;
      .el-notification__content{
        font-size:16px;
        color:#1f2d3d;
      }
      .el-notification__icon{
        width: 115px;
        height: 115px;
        font-size: 80px;
      }
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
      top: 140px;
    }
    .innImg{
      top: 156px;
      margin-top: 50px;
      .img{
        width: 120px;
        height: 137px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .name{
        width: 120px;
      }
    }
  }
</style>
