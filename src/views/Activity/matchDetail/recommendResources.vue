<template>
  <!--大赛评委-->
  <div class="recommendResources" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    推荐资源
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  export default {
    props: {},
    data () {
      return {
        loading: false,
        competition_id: ''
      };
    },
    methods: {

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
.matchDetail{

}
</style>
