<template>
  <!--BP选择弹框-->
  <div class="choiceBp popbox" >
    <el-dialog :visible="choiceBpDisplay" :before-close="prev" close-on-press-escape close-on-click-modal lock-scroll
               :close-on-click-modal="showList" :close-on-press-escape="showList" :show-close="showList" size="large">
      <div slot="title" class="title">
        <span class="rander tc fl">2</span><span class="fl">选择模板</span>
      </div>
      <choice-bp :totalData="totalData" :pageSize="6" :bpData="bpData"
                 @changeCurrent="getBpByIndustryAndStage" style="min-height: 572px;"
                 v-loading.body="loading" element-loading-text="拼命加载中"></choice-bp>
      <div slot="footer" class="dialog-footer">
        <el-button @click="prev" size="large">上一步</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import { error } from '@/utils/notification';
  import choiceBp from '@/views/components/superBp/choiceBp.vue';
  export default {
    props: {},
    data () {
      return {
        loading: false,
        showList: false,
        totalData: 0, // 总数据条数
        bpData: []
      };
    },
    computed: {
      ...mapState({
        choiceBpDisplay: state => state.superBp.choiceBpDisplay,
        industryId: state => state.superBp.industryId,
        stageId: state => state.superBp.stageId
      })
    },
    mounted () {},
    // 组件
    components: {
      choiceBp
    },
    methods: {
      // 上一步
      prev () {
        this.$store.dispatch('choiceBpControl', false);
      },
      // 通过领域和阶段筛选BP模板
      getBpByIndustryAndStage (e = 1) {
        this.loading = true;
        this.$http.post(this.URL.getBpByIndustryAndStage, {user_id: localStorage.user_id, industry: this.industryId, stage: this.stageId, page: e})
          .then(res => {
            if (res.data.status_code === 2000000) {
              let data = res.data.data;
              this.bpData = data;
              this.totalData = res.data.count;
            } else {
              error(res.data.error_msg);
            }
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
          });
      }
    },
    // 当dom一创建时
    created () {},
    watch: {
      choiceBpDisplay: function (e) {
        if (e) {
          this.getBpByIndustryAndStage();
        }
      }
    }
  };
</script>

<style lang="less">
  @import '../../assets/css/superBp.less';
</style>
