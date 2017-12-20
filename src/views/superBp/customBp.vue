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
                           :planList="planList" :autoUpload="false" fileName="bp_file"
                           @delete="planRemove" @changeUploadData="changeUploadData"
                           @success="planuploadsuccess" ref="singleUpload">
              <i class="el-icon-plus"></i>上传BP
            </single-upload>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div style="height: 76px;"></div>
    <div class="big_btn tc relative position_center_auto cursor big_btn2" @click="save">
      <button class="cursor">提交预约</button>
    </div>
    <div style="height: 76px;"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as validata from '@/utils/validata';
  import * as utils from '@/utils';
  import singleUpload from '@/components/upload/singleUpload.vue';
  import { error, success } from '@/utils/notification';
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
        uploadAddress: this.URL.weitianshiLine + this.URL.bpInquiry + localStorage.token, // 上传地址
        uploadDate: {user_id: localStorage.user_id},
        planList: [], // 计划书上传展示列表
        uploadShow: {} // 计划书上传列表,需要存数据啦
      };
    },
    computed: {},
    mounted () {},
    // 组件
    components: {
      singleUpload
    },
    methods: {
      getType () {
        this.type = this.$route.query.type || 'bpCustom';
      },
      planuploadsuccess (res) {
        success('上传成功');
        this.$router.push({name: 'superBP'});// 路由传参
      },
      addplan (imageId) {
        let object = {};
        object.image_id = imageId;
        this.uploadShow = object;
      }, // 添加上传文件时,保存返回的数据
      planRemove (file) {
        this.planList = [];
        this.uploadShow = {};
      },
      changeUploadData (e) {
        this.uploadDate.user_name = this.customBp.user_name;
        this.uploadDate.user_mobile = this.customBp.user_mobile;
        this.uploadDate.user_wechat = this.customBp.user_wechat;
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
        submit()
          .then((data) => {
            return check();
          })
          .then((data) => {
            if (data) {
              this.loading = true;
              // bp定制
              if (this.type === 'bpCustom') {
                let allData = this.customBp;
                allData.user_id = localStorage.user_id;
                this.$http.post(this.URL.bpCustom, allData)
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
              } else if (this.type === 'bpInquiry') {
                this.$refs.singleUpload.submitUpload();
                this.loading = false;
              }
            }
          });
      }
    },
    // 当dom一创建时
    created () {
      utils.getTop();
      this.getType();
    },
    watch: {}
  };
</script>

<style lang="less">
  @import '../../assets/css/superBp.less';
</style>
