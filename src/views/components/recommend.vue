<template>
  <!--帮您引荐-->
  <div class="recommended">
    <el-dialog :visible="recommendDisplay" :before-close="handleClose" close-on-press-escape close-on-click-modal lock-scroll
               :close-on-click-modal="showList" :close-on-press-escape="showList" size="tiny">
      <span slot="title" class="title">
        帮您引荐【{{matchInvestorsData.investor_name}}】
      </span>
      <div class="inner">
        <p class="push">今日剩余引荐<i>5</i>次</p>
        <el-input v-model="remark" placeholder="还可输入其他需要引荐的投资人"></el-input>
        <p class="phone" style="margin-top: 22px;">微天使会在48小时内与您联系，您也可咨询</p>
        <p class="phone">手机：18158415921、微信：vceggs</p>
      </div>
      <div slot="footer" class="footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import { error, success } from '@/utils/notification';
  export default {
    props: {},
    data () {
      return {
//        stageDisplay: false,
        showList: false,
        remark: ''
      };
    },
    computed: {
      ...mapState({
        matchInvestorsData: state => state.projectDetails.matchInvestorsData,
        projectMessage: state => state.projectDetails.projectMessage,
        recommendDisplay: state => state.dialogDisplay.recommendDisplay
      })
    },
    mounted () {},
    // 组件
    components: {},
    methods: {
      // 关闭
      handleClose (e) {
        this.$store.dispatch('recommendControl', false);
      },
      // 获取剩余引荐次数
      getRemomeTime () {
        this.$http.post(this.URL.recommendProject, {
          user_id: localStorage.user_id,
          investor_id: this.matchInvestorsData.investor_id
        })
          .then(res => {
            let data = res.data;
            if (data.status_code === 2000000) {
              success('引荐成功');
            } else {
              error(res.data.error_message);
            }
          })
          .catch(err => {
            console.log(err);
          });// 请求函数
      },
      // 引荐
      save () {
        this.$http.post(this.URL.recommendProject, {
          user_id: localStorage.user_id,
          project_id: this.projectMessage.projectId,
          investor_id: this.matchInvestorsData.investor_id,
          remark: this.remark
        })
          .then(res => {
            let data = res.data;
            if (data.status_code === 2000000) {
              success('引荐成功');
              this.handleClose();
            } else {
              error(res.data.error_message);
            }
          })
          .catch(err => {
            console.log(err);
          });// 请求函数
      }
    },
    // 当dom一创建时
    created () {},
    watch: {}
  };
</script>

<style lang="less">
  .recommended{
    .el-dialog__body{
      padding: 30px 20px 0
    }
    .el-dialog--tiny{
      width: 390px;
    }
    .title{
      font-size:16px;
      color:#1f2d3d;
      font-weight: bolder;
    }
    .inner{
      .push{
        font-size:14px;
        color:#475669;
        margin-bottom: 13px;
        i{
          color: #FC703E;
        }
      }
      .phone{
        font-size:12px;
        color:#5e6d82;
      }
    }
    .footer{
      padding-top: 16px;
      border-top: 1px solid #e0e6ed;
    }
  }
</style>
