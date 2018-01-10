<template>
    <div id="addproject" v-loading.fullscreen="loading" element-loading-text="正在登陆中"></div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        loading: true,
        project_id: '',
        show: ''
      };
    },
    // 当dom一创建时
    created () {
      if (this.$route.path === '/skipToPc') {
        this.project_id = this.$route.query.project_id || '';
        this.active = this.$route.query.active || '';
        this.type = this.$route.query.type || '';
        localStorage.user_id = this.$route.query.user_id || '';
        localStorage.token = this.$route.query.token || '';
        this.getCheckUserInfo(this.$route.query.user_id)
          .then((data) => {
            // 跳转项目列表
            if (this.type === 'project_list') {
              return this.$router.push({name: 'myProject', query: {activeTo: 0}});
            // 跳转更近列表
            } else if (this.type === 'follow_up') {
              return this.$router.push({name: 'followUp', query: {activeTo: 2}});
            // 跳转个人信息
            } else if (this.type === 'user_detail') {
              return this.$router.push({name: 'personalInformation', query: {active: this.active}});
            // 跳转项目详情
            } else if (this.type === 'project_detail') {
              return this.$router.push({name: 'projectDetails', query: {project_id: this.project_id, show: this.active}});
            // 默认
            } else {
              return this.$router.push({name: 'index'});// 路由传参
            }
          });
      }
    }
  };
</script>
