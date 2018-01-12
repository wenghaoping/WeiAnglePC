<template>
  <!--名单导入-->
  <div class="importRegistration">
    <el-dialog :visible="importRegistrationDisplay" :before-close="cancel" close-on-press-escape close-on-click-modal lock-scroll
               :close-on-click-modal="showList" :close-on-press-escape="showList" size="large" :show-close="showList">
      <div slot="title" class="title">导入报名名单</div>
      <div class="smalTitle">仅支持excel格式文件</div>
      <el-steps :space="100" direction="vertical">
        <el-step title="下载报名名单的模板"></el-step>
        <el-step title="在模板里填写相关信息"></el-step>
        <el-step title="上传表格"></el-step>
      </el-steps>
      <div class="uploadsing absolute">
        <el-button type="primary" @click="downloadIng">下载模板</el-button>
      </div>
      <div style="margin-left: 40px;">
        <single-Upload :uploadType="['.xls', '.xlsx', '.xlsm', '.xlt', '.xltx', '.xltm']"
                       :uploadAddress="uploadAddress" :uploadDate="uploadDate"
                       :planList="planList"
                       @delete="planRemove" @changeUploadData="changeUploadData"
                       @cancelUpload="cancelUpload"
                       @success="planuploadsuccess" @error="cancelUpload">
          我有模板，直接上传
        </single-Upload>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancel" size="large">完成</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import singleUpload from '@/components/upload/singleUpload.vue';
  import { error, success, warning } from '@/utils/notification';
  export default {
    data () {
      return {
        loading: false,
        showList: false,
        uploadAddress: this.URL.weitianshiLine + this.URL.importApplyUser + localStorage.token, // 上传地址
        uploadDate: {user_id: localStorage.user_id},
        planList: [], // 计划书上传展示列表
        uploadShow: [], // 计划书上传列表,需要存数据啦
        submitButton: true // 默认true
      };
    },
    // 组件
    components: {
      singleUpload
    },
    computed: {
      ...mapState({
        importRegistrationDisplay: state => state.myActivity.importRegistrationDisplay,
        activityId: state => state.myActivity.activityData.activityId
      })
    },
    methods: {
      // 上一步
      cancel () {
        if (!this.submitButton) {
          warning('请等待上传完毕再取消或者取消上传');
        } else {
          this.$store.dispatch('importRegistrationControl', false);
        }
      },
      // 下一步
      next () {
        if (!this.submitButton) {
          warning('请等待上传完毕再提交');
        } else if (this.uploadShow.length === 0) {
          warning('请上传名单');
        } else {
          alert('过');
        }
      },
      downloadIng () {
        const url = this.URL.weitianshi + this.URL.exportApplyUser + '?user_id=' + localStorage.user_id + '&activity_id=' + this.activityId;
        window.open(url);
      },
      // 删除文件
      planRemove (file) {
        this.$http.post(this.URL.deleteInquiryFile, {user_id: localStorage.user_id, inquiry_id: this.uploadShow[0].inquiry_id})
          .then(res => {
            this.loading = false;
            if (res.data.status_code === 2000000) {
              success('删除成功');
              this.uploadShow = [];
            } else {
              this.submitButton = true;
              this.uploadShow = [];
            }
          })
          .catch(err => {
            this.loading = false;
            error('提交失败');
            console.log(err);
          });
      },
      // 上传前更改上传数据
      changeUploadData (e) {
        this.submitButton = false;
        this.uploadDate.activity_id = this.activityId;
      },
      // 取消上传
      cancelUpload (Boolean) {
        this.submitButton = true;
        this.uploadShow = [];
      },
      // 上传成功
      planuploadsuccess (res) {
        this.submitButton = true;
        this.uploadShow.push({inquiry_id: res.inquiry_id});
      }
    },
    watch: {
      importRegistrationDisplay: function (e) {
        if (e) {
//          this.filterChangeCurrent(1);
        } else {
          this.$store.dispatch('AllMemberControl', false);
          this.planList = [];
        }
      }
    }
  };
</script>

<style lang="less">
.importRegistration{
  .el-dialog{
    width: 488px;
  }
  .title{
    font-size:20px;
    color:#1f2d3d;
  }
  .smalTitle{
    font-size:14px;
    color:#8492a6;
    margin-bottom: 48px;
  }
  .uploadsing{
    top: 180px;
    left: 61px;
  }
  .el-step__line.is-vertical{
    top: 28px;
    left: 13px;
  }
}
</style>
