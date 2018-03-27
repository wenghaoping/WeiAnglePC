<template>
  <!--赛事详情汇总-->
  <div class="matchIndex" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    <div class="contain-center edit-page" style="margin-top: 24px;">
      <span class="back-tag" @click="goBack" ><i class="el-icon-arrow-left"></i>返回</span>
      <div class="main-box">
        <div class="left-wrap" ref="left" style="margin-top:24px;">
          <div class="title">
            <div class="titleTop">全国区块链大赛</div>
            <div class="titleMain">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="赛事详情" name="matchDetail">
                  <matchDetail></matchDetail>
                </el-tab-pane>
                <el-tab-pane label="赛事活动" name="matchActive">
                  <matchActive></matchActive>
                </el-tab-pane>
                <el-tab-pane label="参赛项目" name="competitionProject">
                  <competitionProject></competitionProject>
                </el-tab-pane>
                <el-tab-pane label="大赛评委" name="matchJudges">
                  <matchJudges></matchJudges>
                </el-tab-pane>
                <el-tab-pane label="推荐资源" name="recommendResources">
                  <recommendResources></recommendResources>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import matchDetail from '@/views/Activity/matchDetail/matchDetail.vue';
  import matchActive from '@/views/Activity/matchDetail/matchActive.vue';
  import competitionProject from '@/views/Activity/matchDetail/competitionProject.vue';
  import matchJudges from '@/views/Activity/matchDetail/matchJudges.vue';
  import recommendResources from '@/views/Activity/matchDetail/recommendResources.vue';
  export default {
    props: {},
    data () {
      return {
        loading: false,
        showList: false,
        activeName: 'matchActive',
        competition_id: ''
      };
    },
    components: {
      matchDetail,
      matchActive,
      competitionProject,
      matchJudges,
      recommendResources
    },
    methods: {
      // 获取id
      getCompetitionId () {
        this.competition_id = this.$route.query.competition_id;
      },
      // 返回上一步
      goBack () {
        this.$router.go(-1);
      },
      handleClick (tab, event) {
        this.activeName = tab.name;
      }
    },
    created () {},
    watch: {}
  };
</script>

<style lang="less">
  .matchIndex{
    width: 1336px;
    margin: 0 auto;
    .back-tag{
      font-size: 14px;
      color: #20a0ff;
      line-height: 14px;
      cursor: pointer;
      i{
        margin-right:6px;
        font-size: 10px;
      }
    }
    .title{
      background: #F9FAFC;
      .titleTop{
        padding: 0 24px;
        line-height: 95px;
        font-size: 36px;
        color: #1F2D3D;
        font-weight: bolder;
      }
      .el-tabs__item{
        font-size: 18px;
      }
      .el-tabs__active-bar{
        width: 98px;
      }
      .el-tabs__content{
        background: #ffffff;
        /*padding: 24px;*/
      }
      .el-tabs__header{
        margin: 0px;
        padding: 0 8px;
      }
    }
    .wrap-left{
      margin: 0!important;
    }
  }
</style>
