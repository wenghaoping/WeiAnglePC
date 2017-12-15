<template>
  <!--超级BP首页-->
  <div class="indexBp">
    <div class="banner relative">
      <div class="absolute banner_button">
        <el-button type="primary" size="large" @click="industryDisplay = true">下载BP</el-button>
        <el-button type="primary" size="large" @click="goCustom('bpInquiry')">BP问诊</el-button>
        <el-button type="primary" size="large" @click="goCustom('bpCustom')">BP定制</el-button>
      </div>
    </div>

    <div class="main_bp">
      <p class="big_title tc">精美模板</p>
      <div class="choice_bp relative position_center_auto">
        <!--首页BP选择-->
        <choice-bp :totalData="5" :currentPage="1" :pageSize="9" @bpPreviewOn="controlBpPreview(true)"></choice-bp>
      </div>
      <div class="big_btn tc relative position_center_auto cursor" @click="industryDisplay = true">
        <button class="cursor">下载BP</button>
      </div>
    </div>
    <div class="banner2 relative">
      <div class="big_btn tc absolute position_center_auto cursor big_btn2" @click="goCustom('bpInquiry')">
        <button class="cursor">BP问诊</button>
      </div>
    </div>
    <div class="banner3 relative">
      <div class="big_btn tc absolute position_center_auto cursor big_btn2" @click="goCustom('bpCustom')">
        <button class="cursor">BP定制服务</button>
      </div>
    </div>


    <!--选择行业弹框-->
    <select-bp-industry :industryDisplay="industryDisplay" @closeIndustry="closeIndustry" @industryNext="controlChoiceBp"></select-bp-industry>

    <!--BP选择弹框-->
    <alert-choice-bp :choiceBpDisplay="choiceBpDisplay" @closeChoiceBp="controlChoiceBp" @choiceBpPrev="controlChoiceBp" @choiceBpNext="controlBpPreview"></alert-choice-bp>

    <!--BP预览-->
    <bp-preview :bpPreviewDisplay="bpPreviewDisplay" @closeBpPreview="controlBpPreview" @bpPreviewPrev="controlBpPreview" @bpPreviewNext="controlPayBp"></bp-preview>

    <!--BP支付弹框-->
    <pay-bp :payBpDisplay="payBpDisplay" @closePayBp="controlPayBp" @PayBpPrev="controlPayBp" @PayBpNext="controlAllDisplay"></pay-bp>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as utils from '@/utils';
  import choiceBp from '@/views/components/superBp/choiceBp.vue';
  import selectBpIndustry from '@/views/superBp/selectBpIndustry.vue';
  import bpPreview from '@/views/components/superBp/bpPreview.vue';
  import alertChoiceBp from '@/views/superBp/alertChoiceBp.vue';
  import payBp from '@/views/superBp/payBp.vue';
  import { error } from '@/utils/notification';
  export default {
    props: [],
    data () {
      return {
        loading: false,
        industryDisplay: false,
        choiceBpDisplay: false,
        bpPreviewDisplay: false,
        payBpDisplay: false
      };
    },
    computed: {},
    mounted () {},
    // 组件
    components: {
      choiceBp,
      selectBpIndustry,
      alertChoiceBp,
      payBp,
      bpPreview
    },
    methods: {
      goCustom (e) {
        this.$router.push({name: 'customBp', query: {type: e}});
      },
      // 关闭选择行业
      closeIndustry (e) {
        this.industryDisplay = e;
      },
      // 所有的关闭都为覆盖，因为关闭后数据会清空，除了按X关闭
      // 打开或者关闭BP选择,选择完行业后,关闭选择行业
      controlChoiceBp (e) {
        this.choiceBpDisplay = e;
      },
      // 打开或者关闭预览
      controlBpPreview (e) {
        this.bpPreviewDisplay = e;
      },
      // 打开或者关闭支付
      controlPayBp (e) {
        this.payBpDisplay = e;
      },
      // 点击下载，关闭所有弹框
      controlAllDisplay () {
        this.closeIndustry(false);
        this.controlChoiceBp(false);
        this.controlBpPreview(false);
        this.controlPayBp(false);
      },
      // 获取精选BP
      getBpFileSelected () {
        this.$http.post(this.URL.getBpFileSelected, {user_id: localStorage.user_id})
          .then(res => {
            this.loading = false;
            if (res.data.status_code === 2000000) {
              console.log(res.data);
            } else {
              error(res.data.error_msg);
            }
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
          });
      }
    },
    // 当dom一创建时
    created () {
      utils.getTop();
      this.getBpFileSelected();
    },
    watch: {}
  };
</script>

<style lang="less">
  @import '../../assets/css/superBp.less';
</style>
