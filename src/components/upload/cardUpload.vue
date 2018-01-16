<template>
  <!--名片上传组件，显示图片-->
  <div class="cardUpload">
    <span style="margin-left: 20px;" class="fl">
      <el-upload class="uploadImg"
                 :style="{width: `${width}px`,height: `${height}px`}"
                 ref="upload"
                 :action="uploadCardAddress"
                 list-type="picture-card"
                 :on-preview="handlePictureCardPreview"
                 :on-change="CardPlanChange"
                 :on-success="CardPlanuploadsuccess"
                 :on-remove="CardPlanRemove"
                 :on-error="uploaderror"
                 :file-list="cardplanList"
                 accept=".jpg, .png, .jpeg"
                 :before-upload="beforeUpload"
                 :data="uploadDate">
        <i class="el-icon-plus" v-show="cardPlanButton"></i>
      </el-upload>
      <el-dialog v-model="dialogImg" size="small">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
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
      uploadCardAddress: {
        type: String,
        required: true
      },
      cardplanList: {
        type: Array,
        default: function () {
          return [];
        }
      },
      width: {
        type: Number,
        default: 308
      },
      height: {
        type: Number,
        default: 148
      },
      size: {
        type: Number,
        default: 1048580
      }
    },
    data () {
      return {
        dialogImg: false, // 预览显示
        dialogImageUrl: '', // 预览地址
        cardPlanButton: true // 控制上传按钮的显示
      };
    },
    methods: {
      handlePictureCardPreview (file) {
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
          error(file.name + '是不支持的文件格式');
          return false;
        }
        if (parseInt(file.size) > parseInt(this.size)) {
          error(`${file.name}超过${Number.parseInt(this.size / 1024) / 1024}M大小哦`);
          return false;
        };
      },
      // 上传名片======================================================
      CardPlanChange (file, fileList) {
        this.$emit('planChange', fileList);
        if (file.status === 'fail') this.cardPlanButton = true;
        else this.cardPlanButton = false;
      },
      // 上传成功后添加字段
      CardPlanuploadsuccess (response, file, fileList) {
        this.$emit('success', response);
        success('上传成功');
      },
      // 删除文件
      CardPlanRemove (file, fileList) {
        if (file) {
          if (fileList.length === 0) this.cardPlanButton = true;
          else this.cardPlanButton = true;
          this.$emit('delete', file);
        } else {
          this.cardPlanButton = true;
        }
      },
      // 上传失败
      uploaderror (err, file, fileList) {
        console.log(err);
        error('上传失败,请联系管理员');
      }
    }
  };
</script>

<style lang="less">
  .cardUpload{
    .is-success{
      width: 300px;
      height: 150px;
    }
    .uploadImg{
      /*height: 148px;*/
      /*width: 308px;*/
      overflow: hidden;
    }
  }
</style>
