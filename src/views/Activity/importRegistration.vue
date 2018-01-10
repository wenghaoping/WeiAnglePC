<template>
  <!--BP支付弹框-->
  <div class="importRegistration">
    <el-dialog :visible="payBpDisplay" :before-close="handClose" close-on-press-escape close-on-click-modal lock-scroll
               :close-on-click-modal="showList" :close-on-press-escape="showList" size="large">
      <div slot="title" class="title">

      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" size="large">取消</el-button>
        <el-button type="primary" @click="next" size="large">立即下载</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  export default {
    data () {
      return {
        loading: false,
        showList: false
      };
    },
    computed: {
      ...mapState({
        payBpDisplay: state => state.superBp.payBpDisplay,
        bpBannerUrl: state => state.superBp.bpBannerUrl,
        bpId: state => state.superBp.bpId,
        industryId: state => state.superBp.industryId,
        stageId: state => state.superBp.stageId,
        industry: state => state.superBp.industry
      })
    },
    methods: {
      handClose () {
        this.$store.dispatch('AllControl', false);
      },
      // 上一步
      prev () {
        this.$store.dispatch('payBpControl', false);
        this.$store.dispatch('bpPreviewControl', true);
      },
      // 下一步
      next () {
        this.downloadIng();
        this.$store.dispatch('AllControl', false);
      },
      downloadIng () {
        const url = this.URL.weitianshi + this.URL.superBpDownload + '?user_id=' + localStorage.user_id + '&bp_id=' + this.bpId + '&industry=' + this.industryId + '&stage=' + this.stageId;
        window.open(url);
      }
    }
  };
</script>

<style lang="less">

</style>
