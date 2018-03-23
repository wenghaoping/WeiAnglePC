<template>
  <div class="matchActive">
    <!--顶部导航栏-->
    <div class="main-left clearfix">
      <top-nav :tabs="tabs"></top-nav>

      <transition name="fade"  mode="out-in">
        <router-view class="view">


        </router-view>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import topNav from '@/components/topNav.vue';
  export default {
    data () {
      return {
        tabs: [
          {type: '赛事管理', jump: {name: 'myMatch', query: {activeTo: 0}}},
          {type: '活动管理', jump: {name: 'myActivity', query: {activeTo: 1}}}
        ]
      };
    },
    components: {
      topNav
    }
  };
</script>
<style lang="less" scoped>
  .main-left{width: 1336px;
    margin: 0 auto;}
  .matchActive .search{width: 190px;position: absolute;left:300px;top:0px;}
  .matchActive {
    margin-top: 24px;
  }
  /* 路由切换动效 */
  .fade-enter-active, .fade-leave-active {
    transition: all .2s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
    transform: translateX(100px);
  }
</style>
