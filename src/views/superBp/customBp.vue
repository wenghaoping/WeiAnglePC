<template>
  <!--BP定制/BP问诊-->
  <div class="customBp" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    <div class="banner relative" :class="{banner2 : type === 'bpInquiry'}"></div>
    <div style="height: 60px;"></div>
    <div class="customBp_main relative position_center_auto">
      <el-form label-position="top" label-width="80px" :model="customBp" :rules="customBpRules" ref="customBp">
        <el-row :span="24" :gutter="32">
          <el-col :span="24">
            <el-form-item label="姓名" prop="user_name">
              <el-input v-model="customBp.user_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="手机号" prop="user_mobile">
              <el-input v-model="customBp.user_mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="微信" prop="user_wechat">
              <el-input v-model="customBp.user_wechat"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="type === 'bpInquiry'">
            <single-upload :uploadAddress="uploadAddress" :uploadDate="uploadDate"
                           :planList="planList" fileName="bp_file"
                           @delete="planRemove" @changeUploadData="changeUploadData"
                           @planChange="planChange" @cancelUpload="cancelUpload"
                           @success="planuploadsuccess" ref="singleUpload">
              <i class="el-icon-plus"></i>上传BP
            </single-upload>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div style="height: 76px;"></div>
    <div class="big_btn tc relative position_center_auto cursor big_btn2">
      <button class="cursor" @click="save">提交预约</button>
    </div>
    <div style="height: 76px;"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import * as validata from '@/utils/validata';
  import * as utils from '@/utils';
  import singleUpload from '@/components/upload/singleUpload.vue';
  import { error, success, warning } from '@/utils/notification';
  const checkPhoneNumber = (rule, value, callback) => {
    if (!validata.getNull(value)) {
      setTimeout(() => {
        if (!validata.checkNumber(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (!validata.checkPhoneNumber(value)) {
            callback(new Error('请输入正确的手机号'));
          } else {
            callback();
          }
        }
      }, 100);
    } else {
      callback();
    }
  };// 电话号码正则判断
  const checkNull = (rule, value, callback) => {
    if (validata.getNull(value)) {
      return callback(new Error('不能为空'));
    } else {
      if (value.length > 20) {
        callback(new Error('不超过20个字'));
      } else {
        callback();
      }
    }
  };// 不为空判断
  export default {
    props: [],
    data () {
      return {
        loading: false,
        type: 'bpCustom', // interrogation
        customBp: {
          user_name: '',
          user_mobile: '',
          user_wechat: ''
        },
        customBpRules: {
          user_name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { max: 20, message: '长度不能大于20个字符', trigger: 'blur' },
            { validator: checkNull, trigger: 'blur' }
          ],
          user_mobile: [
            {validator: checkPhoneNumber, trigger: 'blur', required: true},
            { validator: checkNull, trigger: 'blur' }
          ],
          user_wechat: [
            { max: 20, message: '长度不能大于20个字符', trigger: 'blur' }
          ]
        },
        customBpMust: false,
        uploadAddress: this.URL.weitianshiLine + this.URL.uploadInquiryFile + localStorage.token, // 上传地址
        uploadDate: {user_id: localStorage.user_id},
        planList: [], // 计划书上传展示列表
        uploadShow: [], // 计划书上传列表,需要存数据啦
        uploadShowid: {},
        submitButton: true // 默认true
      };
    },
    computed: {
      ...mapState({
        industryId: state => state.superBp.industryId,
        stageId: state => state.superBp.stageId
      })
    },
    // 组件
    components: {
      singleUpload
    },
    methods: {
      getType () {
        this.type = this.$route.query.type || 'bpCustom';
      },
      planuploadsuccess (res) {
        this.submitButton = true;
        this.addplan(res.inquiry_id);
      },
      // 取消上传
      cancelUpload (Boolean) {
        this.submitButton = true;
        this.uploadShow = [];
        this.uploadShowid = {};
      },
      addplan (inquiryId) {
        let object = {};
        object.inquiry_id = inquiryId;
        this.uploadShowid = object;
      }, // 添加上传文件时,保存返回的数据
      planRemove (file) {
        this.$http.post(this.URL.deleteInquiryFile, {user_id: localStorage.user_id, inquiry_id: this.uploadShowid.inquiry_id})
          .then(res => {
            this.loading = false;
            if (res.data.status_code === 2000000) {
              success('删除成功');
              this.uploadShow = [];
              this.uploadShowid = {};
            } else {
              this.submitButton = true;
              this.uploadShow = [];
              this.uploadShowid = {};
            }
          })
          .catch(err => {
            this.loading = false;
            error('提交失败');
            console.log(err);
          });
      },
      planChange (file) {
        this.uploadShow.push(file);
      },
      changeUploadData (e) {
        this.submitButton = false;
      },
      // 检查所有必填项目以及获取所有数据/true过.false不过
      submitForm (formName, checkName) {
        this.$refs[formName].validate((valid) => {
          this[checkName] = !valid;
        });
      },
      save () {
        const submit = () => {
          return new Promise((resolve, reject) => {
            // 做一些异步操作
            this.submitForm('customBp', 'customBpMust');
            resolve(true);
          });
        };
        const check = () => {
          return new Promise((resolve, reject) => {
            // 做一些异步操作
            setTimeout(() => {
              if (this.customBpMust) {} else {
                resolve(true);
              }
            }, 200);
          });
        };
        if (!this.submitButton) {
          warning('请等待上传完毕再提交');
        } else {
          submit()
            .then((data) => {
              return check();
            })
            .then((data) => {
              let allData = this.customBp;
              allData.user_id = localStorage.user_id;
              if (data) {
                this.loading = true;
                // bp定制
                if (this.type === 'bpCustom') {
                  this.getBpCustom(allData);
                } else if (this.type === 'bpInquiry') {
                  allData.inquiry_id = this.uploadShowid.inquiry_id;
                  this.getBpInquiry(allData);
                }
                this.loading = false;
              }
            });
        }
      },
      // 提交BP问诊
      getBpCustom (getData) {
        this.$http.post(this.URL.bpCustom, getData)
          .then(res => {
            this.loading = false;
            if (res.data.status_code === 2000000) {
              success('提交成功');
              this.$router.push({name: 'superBP'});// 路由传参
            } else {
              error(res.data.error_msg);
            }
          })
          .catch(err => {
            this.loading = false;
            error('提交失败');
            console.log(err);
          });
      },
      // 提交BP问诊
      getBpInquiry (getData) {
        if (this.uploadShow.length === 0) {
          warning('请上传BP');
        } else {
          this.$http.post(this.URL.bpInquiry, getData)
            .then(res => {
              this.loading = false;
              if (res.data.status_code === 2000000) {
                success('提交成功');
                this.$router.push({name: 'superBP'});// 路由传参
              } else {
                error(res.data.error_msg);
              }
            })
            .catch(err => {
              this.loading = false;
              error('提交失败');
              console.log(err);
            });
        }
      },
      // 设置初始数据
      setFirstData () {
        this.customBp.user_name = localStorage.user_real_name;
        this.customBp.user_mobile = localStorage.user_mobile;
        this.customBp.user_wechat = localStorage.user_wechat;
      }
    },
    // 当dom一创建时
    created () {
      utils.getTop();
      this.getType();
      this.setFirstData();
    }
  };
</script>

<style lang="less">
  @import '../../assets/css/superBp.less';
</style>
