<template>
  <!--BP支付弹框-->
  <div class="payBp popbox">
    <el-dialog :visible="payBpDisplay" :before-close="handClose" close-on-press-escape close-on-click-modal lock-scroll
               :close-on-click-modal="showList" :close-on-press-escape="showList" size="large">
      <div slot="title" class="title">
        <span class="rander tc fl">3</span><span class="fl">下载</span>
      </div>
      <div class="choice clearfix">
        <p class="choice_title">选择模板</p>
        <div style="margin: 15px 0;border-top:1px solid #e0e6ed;width:1012px;"></div>
        <div class="demo_inner">
          <div class="img fl">
            <img v-lazy="bpBannerUrl">
          </div>
          <div class="txt fl">
            {{industry}}
          </div>
          <div class="txt fr">
            <i class="absolute">*优惠期间，模板免费下载</i>
            <s>RMB 199.00</s>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="prev" size="large">上一步</el-button>
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
  @import '../../assets/css/superBp.less';
</style>
