<template>
  <div id="createcontacts" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    <div class="contain-center edit-page">
      <span class="back-tag" @click="goBack"><i class="el-icon-arrow-left"></i>返回</span>
      <div class="main-box" style="display: inline-block">
        <div class="left-wrap" ref="left" style="margin-top:24px;">
          <!--=================================基本资料=================================-->
          <div class="item-block" style="margin-top:0;margin-bottom: 16px; padding-bottom: 26px;">
            <div class="bigTitle">添加人脉</div>
            <div class="block-tt-line">
              <span class="b-title">基本资料</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('contactShow')" v-show="contactShow">收起</span>
              <span class="b-hander" @click="openDiv('contactShow')" v-show="!contactShow">展开</span>
            </div>
            <el-collapse-transition>
              <div v-show="contactShow">
                <div class="block-info block-cc-file clearfix" style="height: 149px;">
                  <span class="f-title fl">名片</span>
                  <cardUpload :uploadCardAddress="uploadAddress"
                              :uploadDate="uploadDate" :cardplanList="planList"
                              @delete="planRemove" @success="planuploadsuccess"
                              @changeUploadData="changeUploadData" style="margin-left: 20px;">
                  </cardUpload>
                </div>
                <el-form :model="contacts" ref="contacts" label-width="100px" class="padding" label-position="top">
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="姓名"
                        prop="user_real_name" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' },{max: 20, message: '长度不能大于20个字符', trigger: 'blur' },nullRule]">
                        <el-input v-model="contacts.user_real_name" placeholder="请输入姓名"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="昵称"
                        prop="user_nickname"
                        :rules="[{max: 20, message: '长度不能大于20个字符', trigger: 'blur' }]">
                        <el-input v-model="contacts.user_nickname" placeholder="请输入昵称"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="手机"
                        prop="user_mobile"
                        :rules="PhoneRule">
                        <el-input v-model.number="contacts.user_mobile" placeholder="请输入手机"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="邮箱"
                        prop="user_email"
                        :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }]">
                        <el-input v-model="contacts.user_email" placeholder="请输入邮箱"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="公司"
                        prop="user_company_name"
                        :rules="[{max: 40, message: '长度不能大于40个字符', trigger: 'blur' }]">
                        <el-autocomplete v-model="contacts.user_company_name" placeholder="请输入公司名称"
                                         :fetch-suggestions="querySearchAsync" class="width360">
                        </el-autocomplete>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="品牌"
                        prop="user_brand"
                        :rules="[{max: 40, message: '长度不能大于40个字符', trigger: 'blur' }]">
                        <el-input v-model="contacts.user_brand" placeholder="请输入品牌名、如：微天使"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="职位"
                        prop="user_company_career"
                        :rules="[{max: 40, message: '长度不能大于40个字符', trigger: 'blur' }]">
                        <el-input v-model="contacts.user_company_career" placeholder="请输入职位"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="人脉标签"
                        prop="user_invest_tag">
                        <el-select v-model="contacts.user_invest_tag"
                                   multiple placeholder="请添加" class="width360"
                                   :multiple-limit="multiplelimit"
                                   filterable allow-create
                                   default-first-option
                                   @change="addChangeTag">
                          <el-option
                            v-for="item in tags_con"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-collapse-transition>
          </div>

          <!--=================================投资需求=================================-->
          <div class="item-block" style="margin-top:0;margin-bottom: 16px;padding-bottom: 26px;">
            <div class="block-tt-line">
              <span class="b-title">投资需求</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('InvestmentShow')" v-show="InvestmentShow">收起</span>
              <span class="b-hander" @click="openDiv('InvestmentShow')" v-show="!InvestmentShow">展开</span>
            </div>
            <el-collapse-transition>
              <div v-show="InvestmentShow">
                <el-form :model="contacts" ref="contacts1" label-width="100px" class="padding" label-position="top">
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="投资领域"
                        prop="user_invest_industry">
                        <el-select
                          v-model="contacts.user_invest_industry"
                          multiple
                          :multiple-limit="multiplelimit"
                          placeholder="请选择(最多5个)" class="width360">
                          <el-option
                            v-for="item in industry"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="项目轮次"
                        prop="user_invest_stage">
                        <el-select v-model="contacts.user_invest_stage"
                                   multiple
                                   :multiple-limit="multiplelimit"
                                   placeholder="请选择(最多5个)" class="width360">
                          <el-option
                            v-for="item in stage"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="期望融资"
                        prop="user_invest_scale">
                        <el-select v-model="contacts.user_invest_scale"
                                   multiple
                                   :multiple-limit="multiplelimit"
                                   placeholder="请选择(最多5个)"
                                   class="width360">
                          <el-option
                            v-for="item in scale"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="投资地区"
                        prop="user_invest_area">
                        <el-select v-model="contacts.user_invest_area" multiple
                                   :multiple-limit="multiplelimit"
                                   placeholder="请选择(最多5个)"
                                   class="width360">
                          <el-option
                            v-for="item in area"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="24">
                      <el-form-item label="投资需求描述"
                                    prop="user_invest_desc"
                                    :rules="[{max: 500, message: '长度不能大于500个字符', trigger: 'blur' }]">
                        <el-input type="textarea"
                                  v-model="contacts.user_invest_desc"
                                  :autosize="{ minRows: 4, maxRows: 10}" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-collapse-transition>
          </div>

          <!--=================================资源需求=================================-->
          <div class="item-block" style="margin-top:0;margin-bottom: 16px;padding-bottom: 26px;">
            <div class="block-tt-line">
              <span class="b-title">资源需求</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('resourcesShow')" v-show="resourcesShow">收起</span>
              <span class="b-hander" @click="openDiv('resourcesShow')" v-show="!resourcesShow">展开</span>
            </div>
            <el-collapse-transition>
              <div v-show="resourcesShow">
                <el-form :model="contacts" ref="contacts2" label-width="100px" class="padding" label-position="top">
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="他能提供的资源"
                        prop="user_resource_give">
                        <el-select
                          v-model="contacts.user_resource_give"
                          multiple
                          :multiple-limit="multiplelimit"
                          placeholder="请选择(最多5个)" class="width360">
                          <el-option
                            v-for="item in giveTo"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="寻求对接的资源"
                        prop="user_resource_find">
                        <el-select v-model="contacts.user_resource_find"
                                   multiple
                                   :multiple-limit="multiplelimit"
                                   placeholder="请选择(最多5个)" class="width360">
                          <el-option
                            v-for="item in pushTo"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="24">
                      <el-form-item label="资源需求描述"
                                    prop="user_resource_desc"
                                    :rules="[{max: 500, message: '长度不能大于500个字符', trigger: 'blur' }]">
                        <el-input type="textarea"
                                  v-model="contacts.user_resource_desc"
                                  :autosize="{ minRows: 4, maxRows: 10}" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-collapse-transition>
          </div>

          <el-button type="primary" style="margin-top:15px;float: right;display: block;" @click="allSave">保存
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cardUpload from '@/components/upload/cardUpload.vue';
  import * as validata from '@/utils/validata';
  import { error, success, warning } from '@/utils/notification';
  import * as formatData from '@/utils/formatData';
  import { getTop } from '@/utils';
  export default {
    data () {
      var checkNull = (rule, value, callback) => {
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
      var checkPhoneNumber = (rule, value, callback) => {
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
      return {
        loading: false,
        uploadAddress: this.URL.weitianshiLine + this.URL.uploadConnectCard + localStorage.token, // 上传地址
        card_id: '', // 名片ID
        nullRule: { validator: checkNull, trigger: 'blur' },
        PhoneRule: { validator: checkPhoneNumber, trigger: 'blur' },
        multiplelimit: 5, // 一次最多选5个,下拉表
        dialogImg: false, // 名片预览控制
        dialogImageUrl: '', // 图片预览路径
        planList: [
          /*          {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'} */
        ], // 名片上传列表
        planButton: true, // 控制上传按钮的显示
        uploadShow: {}, // 计划书上传列表,需要存数据啦
        uploadDate: {user_id: localStorage.user_id}, // 商业计划书上传所带的额外的参数
        contacts: {
          card_id: '', // id
          user_id: '', // user_id
          user_real_name: '', // 姓名
          user_nickname: '', // 昵称
          user_mobile: '', // 名片手机号
          user_email: '', // 邮箱
          user_company_name: '', // 公司名称
          import_user_name: '', // 来源
          user_brand: '', // 品牌
          user_company_career: '', // 职位
          user_invest_tag: [], // 人脉标签
          user_avatar_url: '', // 头像URL
          user_invest_industry: [], // 领域标签
          user_invest_stage: [], // 轮次
          user_invest_scale: [], // 投资金额
          user_invest_area: [], // 所属地区1省级单位
          user_intro: '', // 个人描述
          user_resource_give: [], // 提供的资源
          user_resource_find: [], // 寻求对接的资源
          user_invest_desc: '', // 投资需求描述
          user_resource_desc: ''// 资源需求描述
        }, // 人脉参数

        tags_con: [], // 人脉标签选项
        industry: [], // 领域标签选项
        stage: [], // 轮次标签选项
        scale: [], // 投资金额100-500选项
        /* 所属地区1省级选项 */
        area: [],
        giveTo: [], // 能提供的资源
        pushTo: [], // 对接的资源
        contactShow: true, // 基本资料框
        InvestmentShow: false, // 投资需求框
        resourcesShow: false, // 资源需求框
        tags: {
          changecont: [], // 项目标签新增
          index: '', // 取数据保存的位置
          card_id: ''// 人脉id
        },
        contactsMust: false,
        contacts1Must: false,
        contacts2Must: false
      };
    },
    methods: {
      openDiv (v) {
        this[v] = true;
      },
      closeDiv (v) {
        this[v] = false;
      },
      goBack () { // 返回上一层
        this.$router.go(-1);
      },
      //* 商业计划书
      planuploadsuccess (response) {
        success('上传成功');
        this.addplan(response.image_id);
      }, // 上传成功后添加字段
      planRemove (file) {
        if (file) {
          if (this.card_id === 'creat') this.card_id = 0;
          this.$http.post(this.URL.deleteConnectCard, {user_id: localStorage.user_id, image_id: this.uploadShow.image_id, card_id: this.card_id})
            .then(res => {
              if (res.status === 200) {
                this.planList = [];
                this.loading = false;
                success('删除成功');
              }
            })
            .catch(err => {
              console.log(err);
              this.loading = false;
            });
        } else {
          this.planButton = true;
        }
      }, // 删除文件
      addplan (imageId) {
        let object = {};
        object.image_id = imageId;
        this.uploadShow = object;
      }, // 添加上传文件时,保存返回的数据
      changeUploadData (file) {
        this.uploadDate.user_id = localStorage.user_id;
        if (this.card_id === 'creat') this.card_id = 0;
        this.uploadDate.card_id = this.card_id;
      }, // 上传前的数据修改
      // 添加人脉标签
      addChangeTag (e) {
        let tagName = formatData.checkArr(e, this.tags_con);
        if (tagName !== undefined) {
          if (tagName.length > 40) {
            error('最多输入40个字');
            this.contacts.user_invest_tag.pop();
          } else {
            this.$http.post(this.URL.createCustomTag, {user_id: localStorage.user_id, type: 3, tag_name: tagName})
              .then(res => {
                let newState = {};
                newState.label = tagName;
                newState.value = res.data.tag_id;
                this.tags.changecont.push(newState);
//                this.$global.func.getWxProjectCategory();
              })
              .catch(err => {
                error('添加失败');
                console.log(err);
              });
          }
        }
      }, // 添加人脉标签
      checkPhoneNumber (value) {
        let check = false;
        if (!validata.getNull(value)) {
          if (!validata.checkNumber(value)) {
            error('请输入数字值');
            check = false;
          } else {
            if (!validata.checkPhoneNumber(value)) {
              error('请输入正确的手机号');
              check = false;
            } else {
              check = true;
            }
          }
        } else {
          check = true;
        }
        return check;
      }, // 验证手机号高级版
      checkEmail (value) {
        let check = false;
        if (!validata.getNull(value)) {
          if (!validata.checkEmail(value)) {
            error('请输入正确的邮箱');
            check = false;
          } else {
            check = true;
          }
        } else {
          check = true;
        }
        return check;
      }, // 邮箱验证高级版
      allSave () {
        const submit = () => {
          return new Promise((resolve, reject) => {
            // 做一些异步操作
            this.submitForm('contacts', 'contactsMust');
            this.submitForm('contacts1', 'contacts1Must');
            this.submitForm('contacts2', 'contacts2Must');
            resolve(true);
          });
        };

        const check = () => {
          return new Promise((resolve, reject) => {
            // 做一些异步操作
            setTimeout(() => {
              if (this.contactsMust) {
              } else if (this.contacts1Must) {
              } else if (this.contacts2Must) {
              } else {
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
              this.zgClick('提交人脉');
              this.loading = true;
              formatData.setTag(this.contacts.user_invest_tag, this.tags.changecont);
              let allData = {};
              allData = this.contacts;
              allData.user_id = localStorage.user_id;
              allData.card_id = this.contacts.card_id || '';
              allData.image_id = this.uploadShow.image_id || '';
              this.$http.post(this.URL.createUserCard, allData)
                .then(res => {
                  this.card_id = res.data.card_id;
                  this.loading = false;
                  this.open2('名片编辑成功', '是否返回', '查看详情', '返回人脉列表');
//              //路由传参
                })
                .catch(err => {
                  error('编辑失败');
                  console.log(err);
                  this.loading = false;
                });
            }
          });
      }, // 保存人脉
      // 公司搜索
      // 获取远程数据模拟
      loadData (arr) {
        var newArr = [];
        for (let i = 0; i < arr.length; i++) {
          let obj = {};
          obj.value = arr[i].project_name === '' ? arr[i].company_name : arr[i].company_name + '(' + arr[i].project_name + ')';
          obj.address = arr[i].com_id;
          obj.company_name = arr[i].company_name;
          newArr.push(obj);
        }
        return newArr;
      },
      // 自动搜索,接口写这里面
      querySearchAsync (queryString, cb) {
        if (queryString.length > 2) {
          this.$http.post(this.URL.selectCompany, {user_id: localStorage.user_id, company_name: queryString})
            .then(res => {
              this.restaurants = [];
              let data = res.data.data;
              this.restaurants = this.loadData(data);
              if (queryString === '') this.restaurants = [];
              let restaurants = this.restaurants;
              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => {
                cb(restaurants);
              }, 300);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          let callback = [];
          cb(callback);
        }
      },
      // 编辑成功弹窗
      open2 (title, main, confirm, cancel) {
        this.$confirm(main, title, {
          confirmButtonText: confirm,
          cancelButtonText: cancel,
          type: 'success'
        }).then(() => {
          this.$router.push({name: 'contactsDetails', query: {card_id: this.card_id, user_id: this.contacts.user_id}});
        }).catch(() => {
          this.$router.push({name: 'myContacts', query: {activeTo: 1}});
        });
      },
      // 检查所有必填项目以及获取所有数据/true过.false不过
      submitForm (formName, checkName) {
        this.$refs[formName].validate((valid) => {
          this[checkName] = !valid;
        });
      },
      getWxProjectCategory () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          setTimeout(() => {
            this.area = this.$global.data.hotCity;// 设置热门城市
            this.scale = this.$global.data.scale;// 设置期望融资
            this.stage = this.$global.data.stage;// 设置轮次信息
            this.industry = this.$global.data.industry;// 设置轮次信息
            this.tags.changecont = this.$global.data.tags_user;// 设置人脉标签
            this.tags_con = this.$global.data.tags_user;// 设置人脉标签
            this.giveTo = this.$global.data.resource;// 设置提供的资源和对接的资源
            this.pushTo = this.$global.data.resource;// 设置提供的资源和对接的资源
            resolve(2);
          }, 200);
        });
      }, // 获取所有下拉框的数据
      setImage (obj) {
        let obj1 = {};
        obj1.url = obj.image_src;
        this.planList.push(obj1);
        let object = {};
        object.image_id = obj.image_id;
        this.uploadShow = object;
      }, // 设置名片
      getOneUserInfo () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          if (this.card_id !== 'creat') {
            this.loading = true;
            this.$http.post(this.URL.getOneUserInfo, {user_id: localStorage.user_id, card_id: this.card_id})
              .then(res => {
                if (res.data.status_code === 420008) {
                  warning('这不是您的人脉,您无权查看');
                  this.loading = false;
                  this.$router.push({name: 'index'});// 路由传参
                } else {
                  let data = res.data.data;
                  data.user_invest_industry = formatData.setIdToArr(data.user_invest_industry, 'industry_id');
                  data.user_invest_stage = formatData.setIdToArr(data.user_invest_stage, 'stage_id');
                  data.user_invest_scale = formatData.setIdToArr(data.user_invest_scale, 'scale_id');
                  data.user_resource_find = formatData.setIdToArr(data.user_resource_find, 'resource_id');
                  data.user_resource_give = formatData.setIdToArr(data.user_resource_give, 'resource_id');
                  data.user_invest_area = formatData.setIdToArr(data.user_invest_area, 'area_id');
                  data.user_invest_tag = formatData.setIdToArr(data.user_invest_tag, 'tag_id');
                  this.setImage(data.user_image);
                  if (data.user_image.length === 0) { this.uploadShow = {}; this.planList = []; }
                  this.contacts = data;
                  this.tags_con = this.tags.changecont.slice(0);
                  this.loading = false;
                  if (this.planList.length !== 0) this.planButton = false;
                  else this.planButton = true;
                }
              })
              .catch(err => {
                this.loading = false;
                console.log(err);
              });
          }
          resolve(1);
        });
      }, // 获取个人详情
      getContactsId () {
        this.card_id = this.$route.query.card_id;
      }// 获取id
    },
    components: {
      cardUpload
    },
    created () {
      getTop();
      this.getContactsId();
      this.$global.func.getWxProjectCategory()
        .then((data) => {
          return this.getWxProjectCategory();
        })
        .then((data) => {
          return this.getOneUserInfo();
        });
    }
  };
</script>

<style lang="less">
  @import '../../../assets/css/edit.less';
   #createcontacts{
     .button{
       background:#40587a;
       border-radius:2px;
       height:37px;
       font-size:14px;
       color:#ffffff;
       cursor: pointer;
     }
     .save{
       width:88px;
       margin-bottom: 30px;
     }
     .bigTitle{
       font-size:22px;
       color:#1f2d3d;
       margin-bottom: 32px;
     }
    .el-upload__tip{
      margin-left: 16px;
      font-size:14px;
      color:#5e6d82;
      line-height: 18px;
    }
     .Upload {
       .el-upload-list__item {
         line-height: 1.8;
          margin-top: 0px;

       }
       .el-upload-list__item-name {
         font-size: 14px;
         color: #475669;
         letter-spacing: 0;
         text-decoration: underline
       }
       .el-upload-list__item:first-child{
          margin-top: 0px;
       }

     }
     .edit-page{
       background: none;
     }
   }
</style>
