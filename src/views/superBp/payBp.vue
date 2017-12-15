<template>
  <!--BP支付弹框-->
  <div class="payBp popbox">
    <el-dialog :visible="payBpDisplay" :before-close="handleClose" close-on-press-escape close-on-click-modal lock-scroll
               :close-on-click-modal="showList" :close-on-press-escape="showList" size="large" :show-close="showList">
      <div slot="title" class="title">
        <span class="rander tc fl">3</span><span class="fl">支付</span>
      </div>
      <div class="choice clearfix">
        <p class="choice_title">选择模板</p>
        <div style="margin: 15px 0;border-top:1px solid #e0e6ed;width:1012px;"></div>
        <div class="demo_inner">
          <div class="img fl">
            <img src="../../assets/images/demo_test.png">
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
  export default {
    props: {
      payBpDisplay: {
        type: Boolean,
        default: false,
        required: true
      }
    },
    data () {
      return {
        loading: false,
        showList: false
      };
    },
    computed: {},
    mounted () {},
    // 组件
    components: {},
    methods: {
      // 关闭
      handleClose (e) {
        this.$emit('closePayBp', false);
      },
      // 上一步
      prev () {
        this.$emit('PayBpPrev', false);
      },
      // 下一步
      next () {
        this.$emit('PayBpNext', false);
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
