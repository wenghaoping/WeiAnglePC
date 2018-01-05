<template>
  <!--评委设置-->
  <div id="judgeSetting">
    <el-dialog :visible="judgeDisplay" custom-class="dialogFollow" :before-close="handleClose" close-on-press-escape close-on-click-modal lock-scroll
               :close-on-click-modal="showList" :close-on-press-escape="showList" size="tiny" title="评委设置">

      <div class="main" v-loading.body="loading" element-loading-text="拼命加载中">
        <el-row :span="24" :gutter="55" style="margin-bottom: 25px;">
          <el-col :span="12">
            赛事评委
          </el-col>
          <el-col :span="12">
            <el-switch
              class="fr"
              v-model="judgeData.is_judge"
              on-text="是"
              off-text="否"
              on-value="是"
              off-value="否">
            </el-switch>
          </el-col>
        </el-row>
        <el-row :span="24" :gutter="55">
          <el-col :span="12">
            评分阶段
          </el-col>
          <el-col :span="12">
            <el-select v-model="judgeData.schedule_id" placeholder="请选择">
              <el-option
                v-for="item in schedule"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { error, success } from '@/utils/notification';
  export default {
    props: {
      judgeDisplay: {
        type: Boolean,
        default: false,
        required: true
      },
      judgeSet: {
        type: [Object, Array]
      }
    },
    data () {
      return {
        loading: false,
        showList: false,
        schedule: [],
        judgeData: {
          schedule_id: '',
          is_judge: '',
          card_id: ''
        }
      };
    },
    // 组件
    components: {},
    methods: {
      // 关闭
      handleClose (e) {
        this.$emit('closeJudge', false);
      },
      getWxProjectCategory () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.schedule = this.$global.data.schedule;// 设置人脉标签
          resolve(2);
        });
      },
      // 保存
      save () {
        let isJudge = this.judgeData.is_judge === '是' ? 1 : 0;
        this.$http.post(this.URL.setJudgeAuth, {user_id: localStorage.user_id, schedule_id: this.judgeData.schedule_id, is_judge: isJudge, judge_user_id: this.judgeData.user_id})
          .then(res => {
            if (res.data.status_code === 2000000) {
              success('设置成功');
              this.handleClose();
            } else {
              error(res.data.error_msg);
            }
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
            error('设置失败');
            console.log(err);
          });
      },
      // 获取数据
      getJudgeData () {
        let data = this.judgeSet;
        this.judgeData.schedule_id = data.schedule_id === '' ? this.schedule[0].value : data.schedule_id;// 评分阶段
        this.judgeData.is_judge = data.is_judge;
        this.judgeData.user_id = data.user_id;
      }
    },
    // 当dom一创建时
    created () {
      this.$global.func.getWxProjectCategory()
        .then((data) => {
          return this.getWxProjectCategory();
        });
    },
    watch: {
      judgeDisplay: function (e) {
        if (e) {
          this.getJudgeData();
        }
      }// 清空数据
    }
  };
</script>

<style lang="less">
#judgeSetting{
  .el-dialog .el-dialog__header{
    padding-left: 20px;
  }
  .el-dialog{
    width: 390px;
  }
}
</style>
