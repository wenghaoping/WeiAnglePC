<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style="background-color: #293B55;">
      <a class="navbar-brand">
        <img src="../../assets/images/logoing.png" style="vertical-align:middle;">
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" :class="{'active' : activeName === 1}">
            <a class="nav-link" @click="jump(1)">首页</a>
          </li>
          <li class="nav-item" :class="{'active' : activeName === 2}">
            <a class="nav-link" @click="jump(2)">工作台</a>
          </li>
          <li class="nav-item" :class="{'active' : activeName === 3}">
            <a class="nav-link" @click="jump(3)">超级BP</a>
          </li>
        </ul>
      </div>
    </nav>
    <div style="height: 3.5rem;"></div>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        activeName: '',
        oldPath: ''
      };
    },
    methods: {
      // 切换tab
      jump (i) {
        const url = 'http://192.168.8.223:8090/#/';
//        const url = 'https://www.weitianshi.cn/workbench/#/';
        this.activeName = i;
        if (i === 1) {
          window.location.href = url;
        } else if (i === 2) {
          window.location.href = url + 'workBench/myProject';
        } else if (i === 3) {
          window.location.href = url + 'superBP';
        }
      },
      checkUser () {
        this.user_id = localStorage.user_id;
        if (!localStorage.user_id) {
          this.$router.push({name: 'login', query: {investor_id: this.$route.query.investor_id, project_id: this.$route.query.project_id, old_path: this.oldPath}});// 路由传参
        }
      }
    },
    created () {
//      console.log('先进入这里了user');
      console.log(this.$route.path);
      this.oldPath = this.$route.path.substring(1, this.$route.path.length);
      console.log(this.oldPath);
//      localStorage.investor_id = this.$route.query.investor_id;
//      localStorage.project_id = this.$route.query.project_id;
      this.checkUser();
    },
    watch: {
      '$route' (to, from) {
        this.checkUser();
      }
    }
  };
</script>
<style scoped lang="less">
  @import '../../assets/css/mobileEntrance.less';
</style>
