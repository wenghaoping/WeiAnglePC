<template>
  <!--超级BP首页-->
  <div class="indexBp">
    <div class="banner relative">
      <div class="absolute banner_button">
        <el-button type="primary" size="large" @click="closeIndustry">BP模板</el-button>
        <el-button type="primary" size="large" @click="goCustom('bpInquiry')">BP问诊</el-button>
        <el-button type="primary" size="large" @click="goCustom('bpCustom')">BP定制</el-button>
      </div>
    </div>

    <div class="main_bp">
      <p class="big_title tc">精美模板</p>
      <div class="choice_bp relative position_center_auto" style="min-height: 512px;" v-loading.body="loading" element-loading-text="拼命加载中">
        <!--首页BP选择-->
        <choice-bp :currentPage="currentPage" :bpData="bpData" :pageSize="9"></choice-bp>
      </div>
      <div class="big_btn tc relative position_center_auto cursor" @click="closeIndustry">
        <button class="cursor">BP模板</button>
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
    <select-bp-industry></select-bp-industry>

    <!--BP选择弹框-->
    <alert-choice-bp></alert-choice-bp>

    <!--BP预览-->
    <bp-preview></bp-preview>

    <!--BP支付弹框-->
    <pay-bp></pay-bp>
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
    data () {
      return {
        loading: false,
        bpData: [],
        currentPage: 1 // 当前第几页
      };
    },
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
        localStorage.entrance = 'superBP'; // superBP
        if (localStorage.user_id) {
          this.$router.push({name: 'customBp', query: {type: e}});
        } else {
          this.$router.push({name: 'telephoneLogin'});
        }
      },
      // 关闭选择行业
      closeIndustry (e) {
        localStorage.entrance = 'superBP'; // superBP
        if (localStorage.user_id) {
          this.$store.dispatch('industryControl', true);
          this.$store.dispatch('setBpEnterType', true); // 说明是正常进入的
        } else {
          this.$router.push({name: 'telephoneLogin'});
        }
      },
      // 获取精选BP
      getBpFileSelected () {
        this.loading = true;
        this.$http.post(this.URL.getBpFileSelected, {user_id: localStorage.user_id})
          .then(res => {
            this.loading = false;
            if (res.data.status_code === 2000000) {
              let data = res.data.data;
              this.bpData = data;
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
    }
  };
</script>

<style lang="less">
  @import '../../assets/css/superBp.less';
</style>
