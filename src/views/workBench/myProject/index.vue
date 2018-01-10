<template>
  <div id="myProjct">
    <!--顶部导航栏-->
    <top-nav></top-nav>

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
        activeName: 'first'
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
