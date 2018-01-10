<template>
    <div id="addproject" v-loading.fullscreen="loading" element-loading-text="正在加入项目库中"></div>
</template>

<script type="text/ecmascript-6">
  import { error, success, warning } from '@/utils/notification';
  export default {
    data () {
      return {
        loading: true
      };
    },
    // 当dom一创建时
    created () {
      if (this.$route.path === '/addProject' && this.$route.query.flog === 'mail') {
        sessionStorage.projectId = this.$route.query.project_id || '';// 加入项目库的项目id
        sessionStorage.flog = this.$route.query.flog || '';// 是否是邮箱加入项目库
        sessionStorage.type = this.$route.query.type || '';
        sessionStorage.userId = this.$route.query.user_id || '';// 邮箱推送者id
      }
      if (!localStorage.user_id) {
        // 没有登录的人去登录
        this.$router.push({path: 'login'});
        this.loading = false;
      } else if ((sessionStorage.userId === localStorage.user_id) && (sessionStorage.flog === 'mail') && (sessionStorage.type === 'user')) {
        // 当分享者正确时,且是加入项目的时候
        this.$http.post(this.URL.importProject, {user_id: sessionStorage.userId, project_id: sessionStorage.projectId})
          .then(res => {
            if (res.data.status_code === 2000000) {
              success('项目导入成功');
              sessionStorage.flog = '';// 把默认值清空;
              setTimeout(() => { this.$router.push({name: 'myProject', query: {activeTo: 0}}); }, 50);
            }
          })
          .catch(err => {
            console.log(err);
            error('项目导入失败');
            sessionStorage.flog = '';// 把默认值清空;
            setTimeout(() => { this.$router.push({name: 'myProject', query: {activeTo: 0}}); }, 50);
          });
        this.loading = false;
      } else if (sessionStorage.userId !== localStorage.user_id) {
        // 推送者和接受者是不是一人时
        warning('此链接不是分享给您的,请进入正确的链接');
        sessionStorage.clear();// 把默认值清空;
        setTimeout(() => { this.$router.push({name: 'myProject', query: {activeTo: 0}}); }, 50);
      }
    }
  };
</script>
