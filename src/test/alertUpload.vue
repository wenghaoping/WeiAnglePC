<template>
  <div id="alertUpload">
      <el-button type="text" @click="dialogUploadVisible = true">打开嵌套表格的 Dialog</el-button>

    <el-dialog title="批量上传创建项目" :visible.sync="dialogUploadVisible">
      <div style="height:250px;"></div><!--老子就是一个占位的-->
        <el-upload class="uploadProjec"
                   action="/api/upload"
                   :auto-upload="false"
                   :on-success="uploadsuccess"
                   :on-change="handleChange"
                   :file-list="fileList"
                   ref="upload"
                   drag multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip" >BP私密保护，投资人可通过申请查看来了解项目价值<br>支持pdf、ppt、doc、png，jpg，jpeg文件格式</div>
        </el-upload>

      <div slot="footer" class="dialog-footer" style="padding-top: 40px;">
        <el-button @click="dialogUploadVisible = false">取 消</el-button>
      </div>
    </el-dialog>


    <el-dialog title="批量上传创建项目" :visible.sync="dialogUpload2Visible">
      <el-upload
        class="upload-demo"
        ref="upload"
        action="/api/upload"
        :on-preview="handlePreview"
        :on-change="handleChange2"
        :on-success="uploadsuccess"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
        :data="uploadDate"
        multiple>
        <div class="inner">
          <el-button slot="trigger" type="primary" class="fl"><i class="el-icon-plus"></i>上传附件</el-button>
          <p class="bp fl">BP私密保护，投资人可通过申请查看来了解项目价值支持pdf、ppt、doc、png，jpg，jpeg文件格式</p>
        </div>

      </el-upload>
      <div class="uploadForm" style="padding-top: 32px;">
        <el-form :model="dateForm" ref="dateForm" label-width="100px" class="demo-dynamic" label-position="top">
          <el-row :span="24" :gutter="10">
            <el-col :span="6">
              <el-form-item
                label="项目名称"
                :prop="'domains.' + index + '.projectName'"
                v-for="(domain, index) in dateForm.domains"
                :key="domain.index"
                :rules="[{required: true, message: '项目名称不能为空', trigger: 'blur'}]">
                <el-input v-model="domain.projectName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="项目介绍"
                :prop="'domains.' + index + '.projectDetails'"
                v-for="(domain, index) in dateForm.domains"
                :key="domain.index"
                :rules="[{required: true, message: '项目介绍不能为空', trigger: 'blur'}]">
                <el-input v-model="domain.projectDetails"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item
                label="商业计划书"
                :prop="'domains.' + index + '.prospectus'"
                v-for="(domain, index) in dateForm.domains"
                :key="domain.index">
                <el-input v-model="domain.prospectus" :disabled="true"></el-input>
              </el-form-item>

            </el-col>
            <el-col :span="2" >
              <el-form-item
                v-for="(domain, index) in dateForm.domains"
                :key="domain.index"
                style="padding-top: 23px;">
                <el-button @click.prevent="removeDomain(domain)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <br>
        <el-button @click="resetForm('dateForm')">重置</el-button>
        <el-button type="primary" @click="submitUpload('dateForm',dateForm)">提交</el-button>
      </div>
      <div slot="footer" class="dialog-footer" style="padding-top: 40px;">
        <el-button @click="cancel">取 消</el-button>
        <!--<el-button type="primary" @click="submitUpload('dateForm',dateForm)">确 定</el-button>-->
        <el-button type="primary" @click="submitUpload('dateForm',dateForm)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'hello',
    data () {
      return {
        dialogUploadVisible: true, // 第一个弹窗的控制
        dialogUpload2Visible: false, // 第二个弹窗的控制
        formLabelWidth: '880px',
        fileList: [
        ], // 上传文件的列表
        dateForm: {// 展示的列表
          domains: []
        },
        uploadDate: {}// 上传所带的额外的参数

      };
    },
    methods: {
      // 1号添加文件后添加入上传列表,并且跳转到多次上传的列表
      handleChange (file, fileList) {
        this.dialogUploadVisible = false;
        this.dialogUpload2Visible = true;
        if (file.status === 'ready') {
          this.addDomain(file.name, file.name, file.name);
        }
        this.fileList.push(file);
      },
      // 2号当添加文件时,添加入上传列表
      handleChange2 (file, fileList) {
        if (file.status === 'ready') {
          this.addDomain(file.name, file.name, file.name);
        }
      },
      uploadsuccess (response, file, fileList) {
        console.log(response);
      },
      handleRemove (file, fileList) {
        console.log(file, fileList);
      },
      handlePreview (file) {
        console.log(file);
      },
      // 上传到服务器时
      submitUpload (formName, formData) {
        let obj = formData.domains;
        for (let i = 0; i < obj.length; i++) {
          this.uploadDate = obj[i];
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs.upload.submit();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      // 删除当前上传文件
      removeDomain (item) {
        console.log(this.fileList);
        var index = this.dateForm.domains.indexOf(item);
        if (index !== -1) {
          this.dateForm.domains.splice(index, 1);
          this.fileList.splice(index, 1);
        }
      },
      // 添加上传文件时,加入显示列表
      addDomain (projectName, projectDetails, prospectus, url, status) {
        let object = {};
        object.projectName = projectName;
        object.projectDetails = projectDetails;
        object.prospectus = prospectus;
        this.dateForm.domains.push(object);
      },
      // 当取消时,清空上传列表
      cancel () {
        this.dialogUpload2Visible = false;
        this.dateForm.domains.splice(0, this.dateForm.domains.length);
      }
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
