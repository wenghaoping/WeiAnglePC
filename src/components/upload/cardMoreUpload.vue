<template>
  <!--名片上传组件，显示图片-->
  <div class="cardMoreUpload clearfix">
    <span>
      <el-upload class="uploadImg"
                 ref="upload"
                 :action="uploadAddress"
                 list-type="picture-card"
                 :on-preview="handlePicturePreview"
                 :on-change="PlanChange"
                 :on-success="Planuploadsuccess"
                 :on-remove="PlanRemove"
                 :on-error="uploaderror"
                 :file-list="planList"
                 multiple
                 accept=".jpg, .png, .jpeg"
                 :before-upload="beforeUpload"
                 :data="uploadDate">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog v-model="dialogImg" size="small">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { error, warning } from '@/utils/notification';
  export default {
    props: {
      uploadDate: {
        type: Object
      },
      uploadAddress: {
        type: String,
        required: true
      },
//      planList: {
//        type: Array,
//        default: []
//      },
      size: {
        type: Number,
        default: 1048580
      }
    },
    data () {
      return {
        dialogImg: false, // 预览显示
        dialogImageUrl: '', // 预览地址
        PlanButton: true, // 控制上传按钮的显示
        planList: [],
        uploadLenth: 0
      };
    },
    methods: {
      handlePicturePreview (file) {
        this.dialogImageUrl = file.url;
        this.dialogImg = true;
      },
      // 上传前的验证
      beforeUpload (file) {
        this.$emit('changeUploadData', file);
        let filetypes = ['.jpg', '.png', '.jpeg'];
        let name = file.name;
        let fileend = name.substring(name.lastIndexOf('.')).toLowerCase();
        let isnext = false;
        if (filetypes && filetypes.length > 0) {
          for (var i = 0; i < filetypes.length; i++) {
            if (filetypes[i] === fileend) {
              isnext = true;
              break;
            }
          }
        }
        this.loading = false;
        if (!isnext) {
          error(`${file.name}是不支持的文件格式`);
          this.$emit('unSupport', file);
          return false;
        }
        if (Number.parseInt(file.size) > Number.parseInt(this.size)) {
          error(`${file.name}超过${Number.parseInt(this.size / 1024) / 1024}M大小哦`);
          this.$emit('unSupport', file);
          return false;
        };
        if (this.uploadLenth > 20) {
          warning('当前最多上传20张');
          this.$emit('unSupport', file);
          return false;
        }
      },
      // 上传名片======================================================
      PlanChange (file, fileList) {
        this.uploadLenth = fileList.length;
        this.$emit('planChange', file);
        if (file.status === 'fail') this.PlanButton = true;
        else this.PlanButton = false;
      },
      // 上传成功后添加字段
      Planuploadsuccess (response, file, fileList) {
        this.$emit('success', {response: response, file: file});
      },
      // 删除文件
      PlanRemove (file, fileList) {
        if (file) {
          if (fileList.length === 0) this.PlanButton = true;
          else this.PlanButton = true;
          this.$emit('delete', file);
        } else {
          this.PlanButton = true;
        }
      },
      // 上传失败
      uploaderror (err, file, fileList) {
        console.log(err);
        error('上传失败,请联系管理员');
      },
      // 取消上传
      cancelUpload (file) {
        this.$refs.upload.abort(file);
      },
      setPlanList (e) {
        this.planList = e.slice(0);
      }
    }
  };
</script>

<style lang="less">
  .cardMoreUpload{
    .is-success{
      width: 240px;
      height: 120px;
    }
    .el-upload--picture-card{
      height: 120px;
      width: 240px;
    }
    .el-icon-plus{
      position: relative;
      top: -11px;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
    .el-dialog{
      top: 0px;
    }
  }
</style>
