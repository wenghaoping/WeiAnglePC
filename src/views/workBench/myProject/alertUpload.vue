<template>
  <div id="alertUpload" v-loading.body="loading" element-loading-text="提交中">
    <el-dialog title="批量上传创建项目" :visible="uploadDisplay" :before-close="handleClose"
               :show-close="showList" :close-on-click-modal="showList" :close-on-press-escape="showList">
      <div class="loadmodel">
        <el-upload
          class="upload-demo"
          ref="upload"
          size="large"
          :action="uploadAddress"
          :on-change="handleChange"
          :on-success="uploadsuccess"
          :on-progress="handleProgress"
          :on-error="uploaderror"
          :file-list="fileList"
          :data="uploadDate"
          :before-upload="beforeUpload"
          :show-file-list="showList"
          accept=".doc, .ppt, .pdf, .zip, .rar, .docx, .pptx"
          multiple>
          <div :class="{inner:isCheck}">
            <i class="el-icon-upload" v-show="isCheck"></i>
            <button slot="trigger" class="fr" :class="{ contentUpload2: isCheck, contentUpload: !isCheck }">
              <i>点击上传</i>
            </button>
            <div class="el-upload__tip" slot="tip" v-show="isCheck">
              <i style="margin-top: 10px;display: inline-block;color:#99A9BF">
                BP私密保护，认证投资人需要向您申请并得到同意后才能查看<br>支持pdf、ppt、pptx、doc、docx、zip、rar文件格式<br>单个文件最大50M
              </i>
          </div>
          </div>
        </el-upload>
        <div class="uploadForm" style="padding-top: 32px;">
          <el-form :model="dateForm" ref="dateForm" label-width="100px" class="demo-dynamic" label-position="top">
            <el-row :span="24" :gutter="10">
              <el-col :span="6">
                <el-form-item
                  label="项目名称"
                  :prop="'domains.' + index + '.pro_name'"
                  v-for="(domain, index) in dateForm.domains"
                  :key="domain.index"
                  :rules="[{required: true, message: '项目名称不能为空', trigger: 'blur'},
                            {max: 40, message: '不能大于40个汉字', trigger: 'blur' }]">
                  <el-input v-model="domain.pro_name" :disabled="domain.load"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="项目介绍"
                  :prop="'domains.' + index + '.pro_intro'"
                  v-for="(domain, index) in dateForm.domains"
                  :key="domain.index"
                  :rules="[{required: true, message: '项目介绍不能为空', trigger: 'blur'},
                        {max: 40, message: '不能大于40个汉字', trigger: 'blur' }]">
                  <el-input v-model="domain.pro_intro" :disabled="domain.load"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  label="商业计划书"
                  :prop="'domains.' + index + '.pro_name'"
                  v-for="(domain, index) in dateForm.domains"
                  :key="domain.index" style="padding-left: 15px;">
                  <i class="pro_name">{{domain.file_title}}</i>
                </el-form-item>

              </el-col>
              <el-col :span="2">
                <el-form-item
                  v-for="(domain, index) in dateForm.domains"
                  :key="domain.index"
                  style="padding-top: 23px;">
                  <span v-show="domain.load" class="uploadImg"><img src="../../../assets/images/loading.gif"></span>
                  <i v-show="!domain.load" class="delete" @click.prevent="removeDomain(domain)">删除</i>
                  <i v-show="domain.load" class="delete" @click.prevent="cancelUpload(domain)">取消</i>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer clearfix" style="padding-top: 40px;">
          <div class="fr">
            <el-button @click="cancel(2)" :disabled="submitButton" v-show="!isCheck">取 消</el-button>
            <el-button @click="cancel(1)" v-show="isCheck">取 消</el-button>
            <el-button type="primary" @click="submitUpload('dateForm',dateForm)" :disabled="submitButton" v-show="!isCheck" v-if="uploadLength">确 定</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { error, success } from '@/utils/notification';
  export default {
    props: ['uploadDisplay'],
    data () {
      return {
        uploadAddress: this.URL.weitianshiLine + this.URL.projectUpload + localStorage.token, // 上传地址
        num: 0, // 控制一次最多选择个数
        dialogUpload2Visible: false, // 第二个弹窗的控制
        status: '', // 状态success/exception
        percentage: 0, // 进度
        formLabelWidth: '880px',
        fileList: [
        ], // 上传文件的列表
        dateForm: {// 展示的列表
          domains: [
            /* {
             pro_intro: "其他",
             pro_name: 2476,
             file_title: "文件2.docx",
             project_id: 4,
             load:true,
             uid:1501837722250
             } */
          ]
        },
        loading: false,
        uploadDate: {user_id: localStorage.user_id}, // 上传所带的额外的参数
        loadingcheck: false,
        showList: false,
        alentTitle: '',
        submitButton: false, // 是否允许提交false允许/true不允许
        isCheck: true// 显示大上传
      };
    },
    methods: {
      // 1号添加文件后添加入上传列表,并且跳转到多次上传的列表
      handleChange (file, fileList) {
        this.isCheck = false;
      },
      uploadsuccess (response, file, fileList) {
        let data = response.data;
        if (response.status_code === 2000000) {
          this.deleteLoad(file.uid);
          this.addDomain(data.pro_intro, data.pro_name, data.file_title, data.project_id, false, file.uid);
          this.subButtonCheck(this.dateForm.domains);
        }
      },
      uploaderror (err, file, fileList) {
        console.log(err);
        error('上传失败');
      },
      beforeUpload (file) {
        this.num++;
        let filetypes = ['.doc', '.docx', '.ppt', '.pptx', '.pdf', '.zip', '.rar'];
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

        if (!isnext) {
          setTimeout(() => { error(file.name + '是不支持的文件格式'); }, 200);
          this.num = 0;
          return false;
        }
        if (parseInt(file.size) > parseInt(52428810)) {
          setTimeout(() => { error(file.name + '超过50m哦'); }, 200);
          this.num = 0;
          return false;
        }
        this.addDomain(file.name, file.name, file.name, 0, true, file.uid);
        this.subButtonCheck(this.dateForm.domains);
      },
      deleteLoad (uid) {
        let lists = this.dateForm.domains;// 所有的文件的数组
        for (let i = 0; i < lists.length; i++) {
          if (lists[i].uid === uid) {
            lists.splice(i, 1);
          }
        }
      }, // 剔除Load
      subButtonCheck (arr) {
        if (arr.length === 0) {
          this.submitButton = false;
          return false;
        }
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].load) {
            this.submitButton = true;
            return false;
          } else {
            this.submitButton = false;
          }
        }
      }, // 当文件没有全部上传完时,不能提交
      handleProgress (event, file, fileList) {
        this.percentage = parseInt(event.percent);
      },
      // 提交表单服务器时
      submitUpload (formName, formData) {
        this.loading = true;
        let obj = this.dateForm.domains;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const saveUploadURL = this.URL.saveUpload;
            this.$http.post(saveUploadURL, obj)
              .then(res => {
                if (res.status === 200) {
                  this.$emit('uploadDisplayChange', false);
                  this.$emit('reload', true);
                  this.dateForm.domains = [];
                  this.fileList = [];
                  success('批量上传成功');
                }
                this.loading = false;
              }).catch(err => {
                console.log(err);
              });
            this.$refs.upload.submit();
          } else {
            return false;
          }
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      // 删除当前上传文件
      removeDomain (item) {
        const deleteUpload = this.URL.deleteUpload;
        var index = this.dateForm.domains.indexOf(item);
        if (index !== -1) {
          this.dateForm.domains.splice(index, 1);
          this.fileList.splice(index, 1);
        }
        this.$http.post(deleteUpload, {user_id: localStorage.user_id, project_id: item.project_id})
          .then(res => {
            if (res.status === 200) {
              this.loading = false;
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 取消上传
      cancelUpload (file) {
        this.$refs.upload.abort(file);
        this.deleteLoad(file.uid);
        this.subButtonCheck(this.dateForm.domains);
      },
      // 添加上传文件时,加入显示列表
      addDomain (proIntro, proName, fileTitle, projectId, load, uid) {
        let object = {};
        object.pro_intro = proIntro;
        object.pro_name = proName;
        object.file_title = fileTitle;
        object.project_id = projectId;
        object.load = load;
        object.uid = uid;
        this.dateForm.domains.push(object);
      },
      // 当取消时,清空上传列表
      cancel (e) {
        if (e === 1) {
          this.$emit('uploadDisplayChange', false);
        } else {
          this.$confirm('确认关闭？关闭后所有数据清空?')
            .then(_ => {
              let arr = this.dateForm.domains;
              for (let i = 0; i < arr.length; i++) {
                this.$http.post(this.URL.deleteUpload, {user_id: localStorage.user_id, project_id: arr[i].project_id})
                  .then(res => {
                    if (res.status === 200) {
                      this.loading = false;
                      success('删除成功');
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }
              this.$emit('uploadDisplayChange', false);
              this.dialogUpload2Visible = false;
              this.dateForm.domains = [];
              this.$refs.upload.clearFiles();
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      handleClose () {
        this.$emit('uploadDisplayChange', false);
      }
    },
    computed: {
      //* 有上传中的文件吗
      uploadLength () {
        let length = this.dateForm.domains.length;
        if (length === 0) {
          return false;
        } else {
          return true;
        }
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      uploadDisplay: function (e) {
        if (e) {
          this.isCheck = true;
        }
      }
    }
  };
</script>

<style lang="less">
  @import '../../../assets/css/alertUpload.less';
</style>
