<template>
  <div  id='getContact'>
    <el-dialog
      title="获取联系方式"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width = '90'
      :center = true>
      <textarea name="contactText" value="contactText"  id="" cols="30" rows="5" placeholder="请简要描述您意向的约谈时间、地点、方式"></textarea>
      <div class="text">微天使会在第一时间告诉你联系方式</div>
      <div class="text">或添加FA哥微信：weitianshicn</div>
      <span slot="footer" class="dialog-footer">
      <el-button class="certain" type="primary" @click = 'handleClose'>确 定</el-button>
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
      handleClose () {
        this.$emit('closeGetContact');
      }
    },
    mounted () {
    }
  };
</script>

<style scoped lang="less">
  @import '../../assets/css/mobileEntrance.less';
  #getContact{
    .el-dialog{
      width: 286px;
    }
    .text{
      text-align: center;
    }
    .certain{
      background:#40587a;
      border-radius:3px;
    }
  }
</style>
