<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    :action="uploadAddress"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="uploadsuccess"
    :on-progress="progress"
    :file-list="fileList"
    :before-upload="beforeUpload"
    :data="uploadDate"
    :auto-upload="false" multiple>
    <input type="hidden" name="PHP_SESSION_UPLOAD_PROGRESS" value="test"/>
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="abort">终止</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="clearFiles">清空</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="fileListLook(fileList)">查看fileList</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>


    <div v-for="list in fileList" @click="abort(list)" style="margin: 10px;">
      <p>{{list.name}}</p>
      <p>{{list.status}}</p>
      <p>{{list.uid}}</p>
      <p>{{list.url}}</p>
    </div>
  </el-upload>
</template>
<script>
  export default {
    data () {
      return {
        fileList: [],
        uploadAddress: this.URL.weitianshiLine + 'api/v/project/projectUpload', // 上传地址
        uploadDate: {user_id: localStorage.user_id}, // 上传所带的额外的参数
        timeout: null,
        check: false
      };
    },
    methods: {
      beforeUpload (file) {
        console.log(file);
        let arr = {};
        arr.uid = file.uid;
        console.log(arr);
        this.fileList.push(arr);
        console.log(this.fileList);
        this.uploadProgress();
      },
      submitUpload () {
        this.$refs.upload.submit();
      },
      handleRemove (file, fileList) {
//        console.log(file, fileList);
      },
      handlePreview (file) {
        console.log(file);
        this.$refs.upload.abort(file);
      },
      uploadsuccess (response, file, fileList) {
        console.log(response);
        this.check = false;
      },
      progress (event, file, fileList) {
//        console.log(event)

      },
      abort (file) {
        console.log(file);
        this.$refs.upload.abort(file);
      },
      clearFiles () {
        this.$refs.upload.clearFiles();
      },
      fileListLook (e) {

      },
      uploadProgress () {
        /*        this.timeout = setInterval(()=>{
         this.$http.get(this.URL.uploadProgress,{params: {
         'PHP_SESSION_UPLOAD_PROGRESS' : 'test'}
         })
         .then(res => {
         let data=res.data.data;
         console.log(res);
         })
         .catch(err => {
         this.$tool.console(err);
         })//请求函数
         },1000)
         setTimeout(()=>{clearInterval(this.timeout);},10000) */
      }

    },
    mounted () {

    }
  };
</script>

<style scoped lang="less">
  .el-upload__tip{
    text-align: center;
  }
.uploadProjec{
  width: 360px;
  height: 180px;
  position: absolute;
  right: 0px;
  top:0px;
  left: 0px;
  bottom: 0px;
  margin: auto;
  .el-upload-dragger{
    background-color:#f9fafc!important;
    font-size: 40px;
  }
}
.bp{
  display: inline-block;
  width: 549px;
  font-size:12px;
  color:#5e6d82;
  letter-spacing:0;
  line-height: 36px;
  padding-left: 10px;
}
</style>
