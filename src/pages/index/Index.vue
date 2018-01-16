<template>
  <div id="app">
    <!--<el-row>-->
    <a href="mobileEntrance.html" style="display: none">login</a>
      <top-header @identityopen="closeIdentity"></top-header>
      <div style="height: 60px;"></div>
      <!--下方主内容切换区-->
      <main style="width: 100%;" class="clearfix">
        <transition name="fade" mode="out-in">
          <router-view class="view">
          </router-view>
        </transition>
      </main>
    <!--</el-row>-->
    <alert-identity :identityDisplay="identityDisplay" @closeIdentity="closeIdentity"></alert-identity>
  </div>
</template>

<script type="text/ecmascript-6">
  import alertIdentity from '@/views/identity/alertIdentity.vue';
  import topHeader from '@/components/topHeader.vue';
  import { IEVersion, success, warning, error } from '@/utils/notification';
  import { getTop } from '@/utils';
  export default {
    data () {
      return {
        routerName: '',
        identityDisplay: false // 显示认证弹框
      };
    },
    methods: {
      // 检查localStorage.user_id
      checkUser () {
        this.user_id = localStorage.user_id;
        // 头部导航下标不对应问题解决
        if (this.$route.path === '/workBench' || this.$route.path === '/workBench/') {
          this.active = 1;
        }
        // 看是否需要加入项目库
        this.addProject();
        // 未登录状态下拦截
        if (!localStorage.user_id && this.$route.path !== '/' &&
          this.$route.path !== '/login' && this.$route.path !== '/login/codeLogin' &&
          this.$route.path !== '/login/telephoneLogin' && this.$route.path !== '/forgetPassword' &&
          this.$route.path !== '/loginReady' && this.$route.path !== '/login/' &&
          this.$route.path !== '/bindTelephone' && this.$route.path !== '/qr' &&
          this.$route.path !== '/API/DD' && this.$route.path !== '/aboutUs' &&
          this.$route.path !== '/onekeyResearch' && this.$route.path !== '/emailContact' &&
          this.$route.path !== '/addProject' && this.$route.path !== '/iosBanner' &&
          this.$route.path !== '/skipToPc' && this.$route.path !== '/superBP') {
          this.$router.push({name: 'index'});
          this.$store.dispatch('setUserRealName', '');
        }
        // 十二小时不动后退出登录
        setTimeout(function () {
          localStorage.clear();
          sessionStorage.clear();
        }, 43200000);
      },

      // 加入项目库
      addProject () {
        // 如果是加入项目库操作的
        if (sessionStorage.flog === 'mail') {
          if (!localStorage.user_id) {
            // 没有登录的人去登录

          } else if (sessionStorage.userId !== localStorage.user_id) {
            // 推送者和接受者是不是一人时
            warning('此链接不是分享给您的,请进入正确的链接');
            sessionStorage.clear();// 把默认值清空;
            setTimeout(() => { this.$router.push({name: 'myProject', query: {activeTo: 0}}); }, 1000);
          } else if ((sessionStorage.userId === localStorage.user_id) && (sessionStorage.flog === 'mail') && (sessionStorage.type === 'user')) {
            // 当是同一人时,且是加入项目的时候
            this.$http.post(this.URL.importProject, {user_id: sessionStorage.userId, project_id: sessionStorage.projectId})
              .then(res => {
                if (res.data.status_code === 2000000) {
                  success('项目导入成功');
                  sessionStorage.clear();// 把默认值清空;
                  setTimeout(() => { this.$router.push({name: 'myProject', query: {activeTo: 0}}); }, 1000);
                }
              })
              .catch(err => {
                error('项目导入失败');
                console.log(err);
                sessionStorage.clear();// 把默认值清空;
                setTimeout(() => { this.$router.push({name: 'myProject', query: {activeTo: 0}}); }, 1000);
              });
          }
        }
      },
      // 关闭认证信息
      closeIdentity (e) {
        this.identityDisplay = e;
      }
    },
    // 当dom一创建时
    created () {
      this.user_name = localStorage.user_real_name;
//      this.zgIdentify(localStorage.user_id, {name: localStorage.user_real_name});
      this.getCheckUserInfo(localStorage.user_id);
      this.getUserGroupByStatusName(localStorage.user_id);
      if (IEVersion() !== -1) { alert('请不要使用IE浏览器，建议使用谷歌浏览器及其他浏览器，以获得更好体验'); };
    },
    components: {
      alertIdentity,
      topHeader
    },
    watch: {
      '$route' (to, from) {
        this.checkUser();
        getTop();
        if (from.name === this.routerName) {
          this.zgTimeOut(from.name);
        }
        this.routerName = to.name;
        this.zgTimeIn();
      }
    }
  };
</script>

<style lang="less">
  @import '../../assets/css/base.css'; // 引入自己的CSS,格式化样式
  .width350 .el-input{
    font-size: 12px!important;
  }
  .width350{
    width:26%;
    display: inline-block;
    position: relative;
    top: 12px!important;
    right: 4%!important;
  }
  .el-select-dropdown__list{
    padding: 0!important;
  }
  .el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover, .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background-color: #ffffff;
  }
.el-select-dropdown__item{
  font-size: 14px;
  padding: 0px 10px!important;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #48576a;
  height: 33px!important;
  line-height: 33px!important;
  box-sizing: border-box;
  cursor: pointer;
  }
  .sss{
    width:30px;
    height:30px;
    background: red;
  }

  .el-table-filter__content{
    max-height: 250px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Microsoft YaHei", "微软雅黑";

  }
  body {
    margin: 0;
    position: relative;
    padding:0!important;
  }
  .newColor{
    color:#40587A!important;
  }

   #app {
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
    background: #f3f4f8;
    main {
      min-height: 864px;
    }
    font-family: "He`lvetica Neue", "PingFang SC", Arial, sans-serif;
    header {
      width: 100%;
      background: #40587a;
      height: 60px;
      position: fixed;
      z-index: 300;
    }
    .select {
      cursor: pointer;
      color: #ffffff;
      letter-spacing: 0;
      line-height: 16px;
      height: 60px;
      li {
        margin-right: 50px;
        height: 50px;
        line-height: 50px;
        a {
          text-align: center;
          height: 50px;
          display: block;
          color: #fff;
          font-size: 16px;
          width: 70px;
        }

      }
      li:hover{
        color: white;
        opacity: 0.5;
      }
      .border {
        border-bottom: 1px white solid;
        a {
          color: #fff;
        }
      }
    }
  }
  @media screen and(max-width: 1353px){
    #app{
    width: 100% !important;
    el-row{
      width:100%!important;
    }
  }
  }
  @media screen and(max-width: 500px){
    #header{
      display: none!important;
    }

  }


  /* 路由切换动效 */
  .fade-enter-active, .fade-leave-active {
    transition: all .2s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .el-notification {
    top: 300px;
    left: 0;
    right: 0;
    margin: auto;
  }
  .login{
    float: right !important;
    margin-right: 6% !important;
    @media screen and(max-width: 1400px){
      margin-right: 6% !important;
    }
  }
  .btn1{
    margin-left: 16px;
  }

</style>
