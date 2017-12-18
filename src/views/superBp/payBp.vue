<template>
  <!--BP支付弹框-->
  <div class="payBp popbox">
    <el-dialog :visible="payBpDisplay" :before-close="prev" close-on-press-escape close-on-click-modal lock-scroll
               :close-on-click-modal="showList" :close-on-press-escape="showList" size="large" :show-close="showList">
      <div slot="title" class="title">
        <span class="rander tc fl">3</span><span class="fl">支付</span>
      </div>
      <div class="choice clearfix">
        <p class="choice_title">选择模板</p>
        <div style="margin: 15px 0;border-top:1px solid #e0e6ed;width:1012px;"></div>
        <div class="demo_inner">
          <div class="img fl">
            <img v-lazy="bpBannerUrl">
          </div>
          <div class="txt fl">
            企业服务模板
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
    props: {},
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
        bpId: state => state.superBp.bpId
      })
    },
    mounted () {},
    // 组件
    components: {},
    methods: {
      // 上一步
      prev () {
        this.$store.dispatch('payBpControl', false);
      },
      // 下一步
      next () {
        this.$store.dispatch('AllControl', false);
        this.downloadIng();
      },
      downloadIng () {
        const url = this.URL.weitianshi + this.URL.superBpDownload + '?user_id=' + localStorage.user_id + '&bp_id=' + this.bpId;
        window.open(url);
      }
    },
    // 当dom一创建时
    created () {},
    watch: {}
  };
</script>

<style lang="less">
  @import '../../assets/css/superBp.less';
</style>
