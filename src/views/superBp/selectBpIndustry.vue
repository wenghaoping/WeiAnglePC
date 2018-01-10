<template>
  <!--BP选择行业弹框-->
  <div class="selectBpIndustry popbox" v-loading.body="loading" element-loading-text="拼命加载中">
    <el-dialog :visible="industryDisplay" :before-close="handleClose" close-on-press-escape close-on-click-modal lock-scroll
               :close-on-click-modal="showList" :close-on-press-escape="showList" size="large" :show-close="showList">
      <div slot="title" class="title">
        <span class="rander tc fl">1</span><span class="fl">选择行业和阶段</span>
      </div>

      <div class="choice">
        <p class="choice_title">选择行业（最多选择五个）</p>
        <div style="margin: 20px 0;"></div>
        <div class="check_box">
          <el-checkbox-group v-model="industry" size="large" :max="5" @change="industryChange">
            <el-checkbox-button v-for="industry in industrys" :label="industry.industry_id" :key="industry.industry_id">
              {{industry.industry_name}}
            </el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
      <div style="margin: 50px 0;"></div>
      <div class="choice">
        <p class="choice_title">选择阶段（单选）</p>
        <div style="margin: 20px 0;"></div>
        <div class="check_box">
          <el-checkbox-group v-model="stage" size="large" :max="1" @change="stageChange">
            <el-checkbox-button v-for="stage in stages" :label="stage.stage_id" :key="stage.stage_id">{{stage.stage_name}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="large">取 消</el-button>
        <el-button type="primary" @click="saveIndustryAndStage" size="large">下一步</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
    import { mapState } from 'vuex';
    import { error, warning } from '@/utils/notification';
    export default {
      data () {
        return {
          showList: false,
          loading: false,
          industry: [],
          stage: [],
          industrys: [],
          stages: []
        };
      },
      computed: {
        ...mapState({
          industryDisplay: state => state.superBp.industryDisplay,
          industryId: state => state.superBp.industryId,
          stageId: state => state.superBp.stageId
        })
      },
      methods: {
        // 关闭
        handleClose (e) {
          this.$store.dispatch('AllControl', false);
        },
        // 下一步
        next () {
          this.$store.dispatch('setIndustryStageId', {industry: this.industry, stage: this.stage});
          this.$store.dispatch('choiceBpControl', true);
          this.$store.dispatch('industryControl', false);
        },
        // 行业改变
        industryChange (e) {
//          console.log(e);
        },
        // 阶段改变
        stageChange (e) {
//          console.log(e);
        },
        getIndustryAndStage () {
          if (localStorage.user_id) {
            this.loading = true;
            this.$http.post(this.URL.getIndustryAndStage, {user_id: localStorage.user_id})
              .then(res => {
                if (res.data.status_code === 2000000) {
                  let data = res.data.data;
                  this.industrys = data.industry;
                  this.stages = data.stage;
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
        saveIndustryAndStage () {
          if (this.industry.length === 0) {
            warning('请选择行业标签');
          } else if (this.stage.length === 0) {
            warning('请选择阶段标签');
          } else {
            this.next();
          }
        }
      },
      // 当dom一创建时
      created () {
        this.getIndustryAndStage();
      },
      watch: {
        industryDisplay: function (e) {
          if (e) {
            this.industry = this.industryId || [];
            this.stage = this.stageId || [];
          } else {
            this.industry = [];
            this.stage = [];
          }
        }// 清空数据
      }
    };
</script>

<style lang="less">
  @import '../../assets/css/superBp.less';
</style>
