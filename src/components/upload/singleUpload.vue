<template>
  <!--单个上传组件-->
  <div class="singleUpload">
    <span class="fl">
      <span class="fl">
        <el-upload class="planUpload"
                   ref="upload"
                   :name="fileName"
                   :action="uploadAddress"
                   :on-preview="planPreview"
                   :on-change="planChange"
                   :on-success="planuploadsuccess"
                   :on-error="uploaderror"
                   :on-remove="planRemove"
                   :before-upload="beforeUpload"
                   :file-list="planList"
                   :auto-upload="autoUpload"
                   :accept="uploadTypeAll"
                   :data="uploadDate">
          <el-button slot="trigger" :type="btnType" v-show="planButton" :plain="btnType !== 'primary'">
            <slot></slot>
          </el-button>
        </el-upload>
      </span>
      <span class="uploadImg fl" style="margin: 15px 0px 0px 10px;" v-show="uploadLoading"><img src="../../assets/images/loading.gif"></span>
      <span class="uploadImg fl" style="margin: 15px 0px 0px 10px;" v-show="!uploadLoading"></span>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { error, success } from '@/utils/notification';
  export default {
    props: {
      uploadDate: {
        type: Object
      },
      uploadAddress: {
        type: String,
        required: true
      },
      planList: {
        type: Array,
        default: function () {
          return [];
        }
      },
      autoUpload: {
        type: Boolean,
        default: true
      },
      fileName: {
        type: String,
        default: 'file'
      },
      uploadType: {
        type: Array,
        default: function () {
          return ['.doc', '.docx', '.ppt', '.pptx', '.pdf', '.zip', '.rar'];
        }
      },
      btnType: {
        type: String,
        default: 'primary'
      },
      size: {
        type: Number,
        default: 52428810
      }
    },
    computed: {
      uploadTypeAll () {
        return this.uploadType.join();
      }
    },
    data () {
      return {
        planButton: true, // 控制上传按钮的显示
        uploadLoading: false // BP上传动画
      };
    },
    methods: {
      // 点击下载
      planPreview (file) {
        this.$emit('planPreview', file);
      },
      // 上传前的验证
      beforeUpload (file) {
        this.$emit('changeUploadData', file);
        let filetypes = this.uploadType;
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
          this.$emit('unSupport', file);
          error(file.name + '是不支持的文件格式');
          return false;
        }
        if (parseInt(file.size) > parseInt(this.size)) {
          this.$emit('unSupport', file);
          error(`${file.name}超过${Number.parseInt(this.size / 1024) / 1024}M大小哦`);
          return false;
        };
        this.uploadLoading = true;
      },
      // 上传名片======================================================
      planChange (file, fileList) {
        this.$emit('planChange', file);
        if (file.status === 'fail') this.planButton = true;
        else this.planButton = false;
      },
      // 上传成功后添加字段
      planuploadsuccess (response, file, fileList) {
        this.$emit('success', response);
        success('上传成功');
        this.uploadLoading = false;
      },
      // 删除文件
      planRemove (file, fileList) {
        if (file.status === 'uploading') {
          this.planButton = true;
          this.uploadLoading = false;
          this.$refs.upload.abort(file); // 当没上传成功前，取消上传
          this.$emit('cancelUpload', true);
        } else {
          if (file) {
            if (fileList.length === 0) this.planButton = true;
            else this.planButton = true;
            this.$emit('delete', file);
          } else {
            this.planButton = true;
          }
        }
      },
      // 上传失败
      uploaderror (err, file, fileList) {
        console.log(err);
        error('上传失败,请联系管理员');
        this.uploadLoading = false;
        this.$emit('error', err);
      },
      // 当不自动上传时，调用函数启用上传
      submitUpload (e) {
        this.$refs.upload.submit();
      }
    },
    watch: {
      planList: function (e) {
        if (e.length === 0) {
          this.planButton = true;
        }
      }
    }
  };
</script>

<style lang="less">
  .singleUpload{
    .uploadImg{
      width: 15px;
      height: 15px;
      display: inline-block;
      img{
        width: 100%;
      }
    }
    .planUpload {
      .el-upload {
        display: block;
      }
      .el-upload-list__item {
        /*    width: 200px;*/
      }
      .el-upload-list__item-name {
        font-size: 14px;
        color: #475669;
        letter-spacing: 0;
        text-decoration: underline
      }
    }
  }
</style>
