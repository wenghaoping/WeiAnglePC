<template>
  <!--推荐资源-->
  <div class="recommendResources" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="推荐项目" name="recommendProjects">
        <recommend-projects></recommend-projects>
      </el-tab-pane>
      <el-tab-pane label="推荐投资人" name="recommendInvestor">
        <recommend-investor></recommend-investor>
      </el-tab-pane>
    </el-tabs>
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
    },
    created () {},
    watch: {}
  };
</script>

<style lang="less">
.recommendResources{
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
  }
}
</style>
