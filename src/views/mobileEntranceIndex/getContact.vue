<template>
  <div  id='getContact'>
    <el-dialog
      title="获取联系方式"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width = '90'
      center = true>
      <el-input type="textarea" name="contactText" v-model='contactText' :cols=30 :rows = 3 resize='none' placeholder="请简要描述您意向的约谈时间、地点、方式"></el-input>
      <div class="text" style="margin-top: 1rem;">微天使会在第一时间告诉你联系方式</div>
      <div class="text">或添加FA哥微信：weitianshicn</div>
      <span slot="footer" class="dialog-footer">
      <el-button class="certain" type="primary" style="background:#40587a;border-radius:3px;" @click = 'handleClose(1)'>确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    props: [
      'dialogVisible', 'projectId'
    ],
    data () {
      return {
        contactText: '',
        project_id: ''
      };
    },
    methods: {
      handleClose (i) {
        if (i === 1) {
          this.$emit('closeGetContact', this.contactText);
        } else {
          this.$emit('closeGetContact', 'close');
        }
      }
    }
  };
</script>

<style  lang="less">
  @import '../../assets/css/mobileEntrance.less';
  #getContact{
    .el-dialog--small {
      width: 75%;
    }
    .text{
      text-align: center;
    }
  }
</style>
