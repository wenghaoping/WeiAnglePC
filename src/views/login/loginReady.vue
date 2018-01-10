<template>
    <div id="loginReady" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        loading: false
      };
    },
    created () {
      this.loading = true;
      var a = '';
      if (localStorage.entrance) {
        a = localStorage.entrance;
      } else {
        a = 'myProject';
      }
      // 从URL中获取数据
      localStorage.user_id = this.$route.query.id;

      localStorage.user_real_name = this.$route.query.name;

      this.zgIdentify(localStorage.user_id, {name: localStorage.user_real_name});

      this.$store.state.logining.user_id = this.$route.query.id;
      this.$store.state.logining.user_real_name = this.$route.query.name;
      localStorage.token = this.$route.query.token || '';
      // 重新获取个人标签(因为获取个人标签必须要有user_id)
      this.$global.func.getWxProjectCategory();
      this.getCheckUserInfo(localStorage.user_id);
      setTimeout(() => {
        this.$router.push({name: a});
        this.loading = false;
      }, 200);
    }
  };
</script>

