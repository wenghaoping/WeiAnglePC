<template>
  <!--推荐资源-->
  <div class="recommendResources" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="推荐项目" name="recommendProjects">
        <recommend-projects>
          <div class="recommendTips">微天使会以短信的方式通知项目方参加大赛报名（可免费邀请100次）</div>
        </recommend-projects>
      </el-tab-pane>
      <el-tab-pane label="推荐投资人" name="recommendInvestor">
        <recommend-investor></recommend-investor>
      </el-tab-pane>
    </el-tabs>
    <div class="recommendTips">微天使会以短信的方式通知项目方参加大赛报名（可免费邀请100次）</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import recommendInvestor from '@/views/Activity/matchDetail/recommendResources/recommendInvestor.vue';
  import recommendProjects from '@/views/Activity/matchDetail/recommendResources/recommendProjects.vue';
  export default {
    props: {},
    data () {
      return {
        loading: false,
        activeName: 'recommendProjects',
        competition_id: ''
      };
    },
    methods: {
      handleClick (tab, event) {}
    },
    components: {
      recommendInvestor,
      recommendProjects
    },
    computed: {
      ...mapState({
        activeSearch: state => state.myActivity.activeSearch || ''
      })
    }
  };
</script>

<style lang="less">
.recommendResources{
  .el-tabs{
    height: 104px;
  }
  .el-tabs__active-bar{
    display: none;
  }
  .el-tabs__item{
    height: 64px;
    line-height: 64px;
    font-size: 16px!important;
  }
  .el-tabs__item.is-active{
    color: #1F2D3D;
    font-weight: bolder;
  }
  .el-tabs__header{
    border: none;
  }
  .el-tabs__content{
    margin-top: -21px!important;
    overflow: unset;
    position: static;
  }
  .el-tabs__header{
    border: none;
  }
  .center_title{
    margin-top:24px;
  }
  .recommendTips{
    font-size: 14px;
    width:431px;
    height:80px;
    line-height: 80px;
    position: absolute;
    top: 22px;
    right:24px;
  }

}
</style>
