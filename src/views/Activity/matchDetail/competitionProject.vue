<template>
  <!--参赛项目-->
  <div class="matchDetail" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
  参赛项目
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
