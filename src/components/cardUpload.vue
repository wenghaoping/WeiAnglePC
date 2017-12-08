<template>
    <div id="cardUpload">
      <div class="cardFrame flex">
        <span class="card">名片</span>
        <el-upload
          class="upload-demo"
          :action="uploadAddress"
          :data="uploadData"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-error="handleError"
          :before-upload="beforeUpload"
          :file-list="fileList"
          accept=".jpg, .png, .jpeg"
          :on-success="uploadSuccess">
          <el-button size="small" type="primary" style="background:#40587a;border-color: #40587a" v-show="btnShow" >
            <i class="el-icon-plus"></i>
            点击上传
          </el-button>
          <div slot="tip" class="el-upload__tip">支持JPG、PNG、JPEG，且不超过1M</div>
        </el-upload>
      </div>
    </div>
</template>


<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        uploadAddress: this.URL.weitianshiLine + this.URL.uploadCard + localStorage.token, // 上传地址
        uploadData: {
          user_id: localStorage.user_id,
          authenticate_id: localStorage.authenticate_id
        },
        fileList: [],
        btnShow: true
      };
    },
    methods: {
      // 取消列表里的文件时触发
      handleRemove (file, fileList) {
        this.btnShow = true;
      },
      // 点击列表里的文件触发
      handlePreview (file) {},
      // 上传文件之前触发
      // 上传前的验证
      beforeUpload (file) {
//        this.uploadDate.user_id = localStorage.user_id;
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
          this.$tool.error(file.name + '是不支持的文件格式');
          return false;
        }
        if (parseInt(file.size) > parseInt(1048580)) {
          this.$tool.error(file.name + '超过1M大小哦');
          return false;
        };
        this.submitButton = true;
      },
      // 上传成功时触发
      uploadSuccess (response, file, fileList) {
        if (response.status_code === 2000000) {
          this.btnShow = false;
          localStorage.authenticate_id = response.authenticate_id;
          this.$emit('upLoadSuccess', response);
        } else {
          this.$tool.error('上传失败');
          return '上传失败';
        }
      },
      // 上传失败
      handleError () {
        this.btnShow = true;
      }
    },
    created () {
//          console.log(localStorage.user_id,localStorage.authenticate_id)
    }
  };
</script>

<style scoped lang="less">
  #cardUpload{
    vertical-align: baseline;
    margin-top: 32px;
    .card{
      margin-top: 5px;
      margin-right: 16px;
    }
    .el-upload__tip{
      display: inline-block;
      margin-left: 16px;
    }
  }
</style>
