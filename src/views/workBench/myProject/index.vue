<template>
  <div id="myProjct">
    <!--顶部导航栏-->
    <top-nav :tabs="tabs"></top-nav>
    <!--下方主内容切换区-->
    <main class="clearfix">
      <transition name="fade"  mode="out-in">
        <router-view class="view">


        </router-view>
      </transition>
    </main>
  </div>
</template>
<script type="text/ecmascript-6">
  import topNav from '@/components/topNav.vue';
  export default {
    data () {
      return {
        tabs: [
          {type: '我的项目', jump: {name: 'myProject', query: {activeTo: 0}}},
          {type: '我的人脉', jump: {name: 'myContacts', query: {activeTo: 1}}},
          {type: '跟进记录', jump: {name: 'followUp', query: {activeTo: 2}}}
        ]
      };
    },
    components: {
      topNav
    }
  };
</script>

<style scoped>
#myProjct .search{width: 190px;position: absolute;left:300px;top:0px;}
#myProjct{
  position: relative;
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
