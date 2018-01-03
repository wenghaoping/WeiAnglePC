<template>
  <div id='mailProjectDetail_type1'>
    <div class="projectMaid">
      <h1 style="font-size: 1rem;">这里是项目的一句话介绍，这里是项目的一句话介绍</h1>
      <div class="flex industryList">
        <div class="industryItem" v-for=" industryItem in industryList">
          {{industryItem}}
        </div>
      </div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        msg: '',
        industryList: ['人工智能', '大数据', '理财', '企业服务商']
      };
    },
    methods: {},
    mounted () {
    },
    created () {
//      this.$http.post(this.URL.getProjectDetail, {user_id: localStorage.user_id, project_id: }).then(res => {
//        console.log(res);
//      });
    }
  };
</script>

<style scoped lang="less">
  @import '../../assets/css/mobileEntrance.less';

  #mailProjectDetail_type1 {
    padding: 1rem;
    margin: 0 auto;
    .flex {
      display: flex;
    }
  }
</style>

