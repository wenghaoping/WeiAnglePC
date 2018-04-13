<!--创建赛事-->
<template>
    <div class="creatActivity" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
      <div class="contain-center edit-page" style="margin-top: 24px;">
        <span class="back-tag" @click="goBack" ><i class="el-icon-arrow-left"></i>返回</span>
        <div class="main-box">
          <div class="left-wrap" ref="left" style="margin-top:24px;">
            <!--=================================基本资料=================================-->
            <div class="item-block" style="margin-top:0;margin-bottom: 16px; padding-bottom: 26px;">
              <div class="block-tt-line">
                <span class="b-title">基本信息</span>
                <span class="b-line"></span>
                <span class="b-hander" @click="activityShow = !activityShow" v-show="activityShow">收起</span>
                <span class="b-hander" @click="activityShow = !activityShow" v-show="!activityShow">展开</span>
              </div>
              <el-collapse-transition>
                <div v-show="activityShow">
                  <div class="block-info block-cc-file clearfix" style="height: 149px;">
                    <span class="f-title fl">活动主图</span>
                    <cardUpload :uploadCardAddress="uploadActiveAddress"
                                :uploadDate="uploadDate" :cardplanList="competition.has_one_theme_image_url"
                                @delete="planRemove" @success="HeadPlanuploadsuccess"
                                :size="2097160">
                    </cardUpload>
                  </div>
                  <span class="f-title" style="margin-left: 73px;">支持图片格式：jpg、png、jpeg，大小不超过2M，建议尺寸：750*556</span>
                  <el-form :model="competition" ref="activity1" label-width="100px" class="padding" label-position="top">
                    <el-row :span="24" :gutter="32">
                      <el-col :span="12">
                        <el-form-item
                          label="赛事标题"
                          :rules="[{required: true, message: '赛事标题不能为空', trigger: 'blur'}, {min:1, max:40,message: '最大40个字符'}]"
                          prop="competition_name">
                          <el-input placeholder="请输入活动主题" v-model="competition.competition_name"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :span="24" :gutter="32">
                      <el-col :span="12">
                        <el-form-item
                          label="赛事领域"
                          prop="morph_industry"
                          :rules="[{type: 'array', message: '赛事领域不能为空', trigger: 'change'}]">
                          <el-select
                            v-model="competition.morph_industry"
                            multiple filterable
                            :multiple-limit="multiplelimit"
                            placeholder="请添加领域（最多5个），支持检索" class="width360">
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
                          label="活动主办方"
                          :rules="[{max:40,message: '最大40个字符', trigger: 'blur'}]"
                          prop="competition_user">
                          <el-input placeholder="请输入主办方" v-model="competition.competition_user"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :span="24" :gutter="32">
                      <el-col :span="12">
                        <el-form-item
                          label="活动开始时间"
                          prop="start_time">
                          <el-date-picker
                            type="datetime"
                            style="width: 360px;"
                            :rules="[{ type: 'date', message: '请选择时间', trigger: 'change' }]"
                            v-model="competition.start_time"
                            placeholder="选择日期时间">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="活动结束时间"
                          :rules="ActiveDateRule"
                          prop="end_time">
                          <el-date-picker
                            type="datetime"
                            style="width: 360px;"
                            v-model="competition.end_time"
                            placeholder="选择日期时间">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <span class="absolute icon_">~</span>
                    </el-row>

                    <el-row :span="24" :gutter="32">
                      <el-col :span="4">
                        <el-form-item
                          label="活动地址"
                          prop="competition_area.area_id"
                          :rules="[{message: '所属省级有误', trigger: 'change',type: 'number'}]"
                          style="width: 112px;">
                          <el-select placeholder="省"
                                     v-model="competition.competition_province"
                                     @change="area1Change($event, 'province')">
                            <el-option
                              v-for="item in area"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item
                          label="　"
                          prop="competition_area.pid"
                          :rules="[{ message: '所属市级有误', trigger: 'change',type: 'number'}]"
                          style="width: 112px;">
                          <el-select placeholder="市"
                                     @change="area1Change($event, 'city')"
                                     v-model="competition.competition_city">
                            <el-option
                              v-for="item in area2"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item
                          prop="competition_area.pid2"
                          :rules="[{message: '所属区级有误', trigger: 'change',type: 'number'}]"
                          label="　">
                          <el-select placeholder="区"
                                     @change="area1Change($event, 'area')"
                                     v-model="competition.competition_area">
                            <el-option
                              v-for="item in area3"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="具体地址"
                          :rules="[{max:100,message: '最大100个字符'}]"
                          prop="competition_address">
                          <el-input placeholder="如文三路90号创新大厦一楼"
                                    v-model="competition.competition_address"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </div>
              </el-collapse-transition>
            </div>

            <!--=================================活动详情=================================-->
            <div class="item-block" style="margin-top:0;margin-bottom: 250px; padding-bottom: 26px;">
              <div class="block-tt-line">
                <span class="b-title">活动详情</span>
                <span class="b-line"></span>
                <span class="b-hander" @click="activityDeatilShow = !activityDeatilShow" v-show="activityDeatilShow">收起</span>
                <span class="b-hander" @click="activityDeatilShow = !activityDeatilShow" v-show="!activityDeatilShow">展开</span>
              </div>
              <el-collapse-transition>
                <div v-show="activityDeatilShow">
                  <el-form :model="competition" ref="activity2" label-width="100px" class="padding" label-position="top">
                    <el-row :span="24" v-for="(has_many_detail, index) in competition.has_many_details" :key="index">
                      <el-col :span="24">
                        <el-form-item
                          :prop="'has_many_details.' + index + '.detail_description'"
                          label="活动详情">
                          <el-input
                            type="textarea"
                            v-model="has_many_detail.detail_description"
                            :autosize="{ minRows: 5, maxRows: 10}"
                            placeholder="请具体描述活动内容">
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <span class="f-title">活动配图（支持图片格式：jpg、png、jpeg，大小不超过2M，建议尺寸：750*556）</span>
                        <card-more-upload :ref="'moreUpload' + index"
                                          :uploadAddress="uploadActiveAddress"
                                          :uploadDate="uploadDate"
                                          :size="2097160"
                                          :planList="has_many_detail.belongs_to_many_images_url"
                                          @changeUploadData="changeUploadData($event, index)"
                                          @unSupport="unSupport($event, index)"
                                          @delete="planRemove($event, index)" @success="planuploadsuccess($event, index)">
                        </card-more-upload>
                        <div style="height: 30px;"></div>
                      </el-col>
                    </el-row>
                  </el-form>
                </div>
              </el-collapse-transition>
            </div>
            <div class="ul-lists list tc"  style="padding:0">
              <div class="toButton" style="padding-left: 0;z-index: 111">
                <el-button type="primary" size="large" @click="allSave" :disabled="submitButton !== -1" style="margin: 0 auto">
                  发布
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import cardUpload from '@/components/upload/cardUpload.vue';
  import cardMoreUpload from '@/components/upload/cardMoreUpload.vue';
  import { success, error } from '@/utils/notification';
  import { getCity } from '@/utils/setSelect';
  import * as formatData from '@/utils/formatData';
  import * as validata from '@/utils/validata';
  export default {
    data () {
      var endDateRule = (rule, value, callback) => {
        if (!validata.getNull(value)) {
          setTimeout(() => {
            if (value < this.competition.start_time) {
              callback(new Error('结束时间必须晚于开始时间'));
            } else {
              callback();
            }
          }, 100);
        } else {
          callback();
        }
      };// 电话号码正则判断
      return {
        loading: false,
        multiplelimit: 5,
        //* 项目领域默认选项
        industry: [],
        competition_id: '', // 获取路由过来的数据
        activity1Must: false, // 验证
        activity2Must: false, // 验证
        activityShow: true, // 活动显示隐藏
        activityDeatilShow: true, // 活动详情显示隐藏
        uploadActiveAddress: this.URL.weitianshiLine + this.URL.uploadImage + localStorage.token, // 上传地址
        uploadDate: {user_id: localStorage.user_id}, // 名片上传所带的额外的参数
        competition_area: '', // 本页面地区，切换时参照
        competition_city: '', // 本页面城市，切换时参照
        competition_province: '', // 本页面省份，切换时参照
        competition: {
          competition_id: '', // 活动主键
          competition_name: '', // 活动标题
          competition_user: '', // 主办方
          competition_address: '', // 详细地址
          competition_area: '', // 地区
          competition_city: '', // 城市
          competition_province: '', // 省份
          // 活动封面图片id
          has_one_theme_image: {
            image_id: '',
            image_src: ''
          },
          // 修改的封面图片数据
          has_one_theme_image_url: [
//              {
//            image_id: '',
//            url: ''
//          }
          ],
          start_time: '', // 活动开始时间
          end_time: '', // 活动结束时间
          has_many_details: [
            {
              detail_description: '',
              belongs_to_many_images: [
//                {
//                  image_id: 5412,
//                  image_uid: 182190,
//                  image_src: 'http://cdn.weitianshi.cn/test_file/20171128/Zo8oCgCILYifRBP5RlOY1821905a1cd41de7212.jpg'
//                }
              ],
              belongs_to_many_images_url: [
//                {
//                  image_id: 5412,
//                  url: 'http://cdn.weitianshi.cn/test_file/20171128/Zo8oCgCILYifRBP5RlOY1821905a1cd41de7212.jpg'
//                }
              ]
            },
            {
              detail_description: '',
              belongs_to_many_images: [
//                {
//                  image_id: 5412,
//                  image_uid: 182190,
//                  image_src: 'http://cdn.weitianshi.cn/test_file/20171128/Zo8oCgCILYifRBP5RlOY1821905a1cd41de7212.jpg'
//                }
              ],
              belongs_to_many_images_url: [
//                {
//                  image_id: 5412,
//                  url: 'http://cdn.weitianshi.cn/test_file/20171128/Zo8oCgCILYifRBP5RlOY1821905a1cd41de7212.jpg'
//                }
              ]
            },
            {
              detail_description: '',
              belongs_to_many_images: [
//                {
//                  image_id: 5412,
//                  image_uid: 182190,
//                  image_src: 'http://cdn.weitianshi.cn/test_file/20171128/Zo8oCgCILYifRBP5RlOY1821905a1cd41de7212.jpg'
//                }
              ],
              belongs_to_many_images_url: [
//                {
//                  image_id: 5412,
//                  url: 'http://cdn.weitianshi.cn/test_file/20171128/Zo8oCgCILYifRBP5RlOY1821905a1cd41de7212.jpg'
//                }
              ]
            },
            {
              detail_description: '',
              belongs_to_many_images: [
//                {
//                  image_id: 5412,
//                  image_uid: 182190,
//                  image_src: 'http://cdn.weitianshi.cn/test_file/20171128/Zo8oCgCILYifRBP5RlOY1821905a1cd41de7212.jpg'
//                }
              ],
              belongs_to_many_images_url: [
//                {
//                  image_id: 5412,
//                  url: 'http://cdn.weitianshi.cn/test_file/20171128/Zo8oCgCILYifRBP5RlOY1821905a1cd41de7212.jpg'
//                }
              ]
            },
            {
              detail_description: '',
              belongs_to_many_images: [
//                {
//                  image_id: 5412,
//                  image_uid: 182190,
//                  image_src: 'http://cdn.weitianshi.cn/test_file/20171128/Zo8oCgCILYifRBP5RlOY1821905a1cd41de7212.jpg'
//                }
              ],
              belongs_to_many_images_url: [
//                {
//                  image_id: 5412,
//                  url: 'http://cdn.weitianshi.cn/test_file/20171128/Zo8oCgCILYifRBP5RlOY1821905a1cd41de7212.jpg'
//                }
              ]
            }
          ],
          morph_industry: []
        },
        //* 所属地区1省级选项
        area: [],
        //* 所属地区2市级选项
        area2: [],
        //* 所属地区区级
        area3: [],
        ActiveDateRule: [{ validator: endDateRule, trigger: 'change', type: 'date', message: '请输入正确的时间' }], // 活动结束时间判断
        saveControl: false
      };
    },
    // 组件
    components: {
      cardUpload,
      cardMoreUpload
    },
    computed: {
      // 是否允许提交false允许/true不允许
      submitButton () {
        let arr = this.competition.has_many_details.slice(0);
        let lastArr = [];
        arr.forEach(item => { item.belongs_to_many_images_url.map(v => lastArr.push(v.type)); });
        return lastArr.findIndex((value, index, arr) => value === false);
      }
    },
    methods: {
      // 获取详情
      getOneCompetition () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          if (this.competition_id !== 'creat') {
            this.loading = true;
            this.$http.post(this.URL.getOneCompetition, {user_id: localStorage.user_id, competition_id: this.competition_id})
              .then(res => {
                if (res.data.status_code === 2000000) {
                  let data = res.data.data;
                  this.$store.dispatch('getMatchDetail', data);
                  this.area1Change(data.competition_province, 'province');
                  this.area1Change(data.competition_city, 'city');
                  this.competition_area = data.competition_area;
                  this.competition_city = data.competition_city;
                  this.competition_province = data.competition_province;
                  formatData.setTimeToReallyTime1(data, 'start_time');
                  formatData.setTimeToReallyTime1(data, 'end_time');
                  data.has_one_theme_image_url = [];
                  if (!validata.isOwnEmpty(data.has_one_theme_image)) {
                    data.has_one_theme_image_url.push({image_id: data.has_one_theme_image.image_id || '', url: data.has_one_theme_image.image_src || ''});
                  } // 主图处理
                  data.has_many_details.forEach((v, index) => { // 详情的图片处理
                    v.belongs_to_many_images_url = [];
                    v.belongs_to_many_images.forEach(x => {
                      v.belongs_to_many_images_url.push({image_id: x.image_id, url: x.image_src, type: true});
                    });
                    this.$refs['moreUpload' + index][0].setPlanList(v.belongs_to_many_images_url);
                  });
                  data.morph_industry = data.morph_industry.map((item) => item.industry_id);
                  this.competition = data;
                  if (this.competition.has_many_details.length < 5) {
                    for (let i = 0; i < 6 - this.competition.has_many_details.length; i++) {
                      this.setActiveityFive();
                    }
                  }
                  this.loading = false;
                } else {
                  error(res.data.error_msg);
                }
              })
              .catch(err => {
                this.loading = false;
                console.log(err);
              });
          }
          resolve(1);
        });
      },
      // 强行5条数据
      setActiveityFive () {
        this.competition.has_many_details.push({
          detail_description: '',
          belongs_to_many_images_url: [],
          belongs_to_many_images: []
        });
      },
      // 保存
      allSave () {
        const submit = () => {
          return new Promise((resolve, reject) => {
            // 做一些异步操作
            this.submitForm('activity1', 'activity1Must');
            this.submitForm('activity2', 'activity2Must');
            resolve(true);
          });
        };

        const check = () => {
          return new Promise((resolve, reject) => {
            // 做一些异步操作
            setTimeout(() => {
              if (this.activity1Must) {
                resolve(false);
              } else if (this.activity2Must) {
                resolve(false);
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
            if (data && this.submitButton === -1) {
              this.loading = true;
              let allData = validata.simpleClone(this.competition);
              allData.user_id = localStorage.user_id;
              allData.competition_area = allData.competition_area === '' ? 0 : allData.competition_area;
              allData.competition_city = allData.competition_city === '' ? 0 : allData.competition_city;
              allData.competition_province = allData.competition_province === '' ? 0 : allData.competition_province;
              if (allData.has_one_theme_image_url.length !== 0) {
                allData.image_id = allData.has_one_theme_image_url[0].image_id; // 主图设置
              } else {
                allData.image_id = 0;
              }
              allData.has_many_details.forEach(item => {
                item.belongs_to_many_images = item.belongs_to_many_images_url.map(v => v.image_id).slice(0); // 主图设置
              });
              formatData.setReallyTimeToTime1(allData, 'start_time', 'start_time_stamp');// 标准时间转化为时间戳
              formatData.setReallyTimeToTime1(allData, 'end_time', 'end_time_stamp');// 标准时间转化为时间戳
              allData.morph_industry = this.competition.morph_industry.length === 0 ? [] : this.competition.morph_industry;
              this.$http.post(this.URL.editCompetition, allData)
                .then(res => {
                  if (res.data.status_code === 2000000) {
                    this.saveControl = true;
                    this.$router.push({name: 'successMatch', query: {match_title: allData.competition_name, url: res.data.data.activity_qr, has_activity: res.data.data.has_activity}});
                  } else {
                    error(res.data.error_msg);
                  }
                  this.loading = false;
                })
                .catch(err => {
                  this.loading = false;
                  error('编辑失败');
                  console.log(err);
                });
            }
          });
      },
      // 检查所有必填项目以及获取所有数据/true过.false不过
      submitForm (formName, checkName) {
        this.$refs[formName].validate((valid) => {
          this[checkName] = !valid;
        });
      },
      // 返回上一步
      goBack () {
        this.$router.go(-1);
      },
      // 设置二级城市下拉列表
      area1Change (data, type) {
        if (data !== '') {
          this.$http.post(this.URL.getArea, {user_id: localStorage.user_id, pid: data})// pid省
            .then(res => {
              let responseData = res.data.data;
              if (type === 'city') { // 切换城市，清空地区
                if (this.competition_city !== data) {
                  this.competition.competition_area = '';
                }
                this.area3 = getCity(responseData);
              } else if (type === 'province') { // 切换省，清空城市，地区
                if (this.competition_province !== data) {
                  this.competition.competition_city = '';
                  this.competition.competition_area = '';
                }
                this.area2 = getCity(responseData);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      // 上传成功后添加字段
      HeadPlanuploadsuccess (response) {
        success('上传成功');
//        this.submitButton = false;
        this.competition.has_one_theme_image_url[0] = {image_id: response.image_id, url: response.image_src};
      },
      // 删除活动配图
      planRemove (file, index) {
        this.$http.post(this.URL.deleteActivityImage, {user_id: localStorage.user_id, image_id: file.image_id})
          .then(res => {
            if (res.data.status_code === 2000000) {
              if (index !== undefined) {
                let arr = this.competition.has_many_details[index].belongs_to_many_images_url;
                arr.splice(arr.findIndex((value, index, arr) => value.image_id === file.image_id), 1);
              }
              this.loading = false;
              success('删除成功');
            }
          })
          .catch(err => {
            console.log(err);
            error('删除失败,请联系管理员');
          });
      },
      // 活动配图上传成功后
      planuploadsuccess (data, index) {
        this.competition.has_many_details[index].belongs_to_many_images_url.forEach(item => {
          if (item.uid === data.file.uid) {
            item.image_id = data.response.image_id;
            item.url = data.response.image_src;
            item.type = true;
          }
        });
      },
      unSupport (data, index) {
        this.competition.has_many_details[index].belongs_to_many_images_url.forEach(item => {
          if (item.uid === data.uid) {
            item.type = true;
          }
        });
      },
      changeUploadData (file, index) {
        this.competition.has_many_details[index].belongs_to_many_images_url.push({uid: file.uid, type: false});
      },
      // 获取所有下拉框的数据
      getWxProjectCategory () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          setTimeout(() => {
            this.area = this.$global.data.area;// 设置城市1列表
            this.industry = this.$global.data.industry;// 设置轮次信息
            resolve(2);
          }, 200);
        });
      },
      // 获取id
      getCompetitionId () {
        this.competition_id = this.$route.query.competition_id;
      }
    },
    // 当dom一创建时
    created () {
      this.getCompetitionId();
      this.$global.func.getWxProjectCategory()
        .then((data) => {
          return this.getWxProjectCategory();
        })
        .then((data) => {
          return this.getOneCompetition();
        });
    },
    beforeRouteLeave (to, from, next) {
      if (!localStorage.user_id) {
        next();
      } else {
        if (!this.saveControl) {
          this.$confirm('当前页面还未保存, 是否离开?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            next();
          }).catch(() => {

          });
        } else {
          next();
        }
      }
    }
  };
</script>

<style lang="less">
  @import '../../assets/css/edit.less';
  .creatActivity{
    width: 1200px;
    margin: 0 auto;
    .back-tag{
      position: absolute;
    }
    .main-box{
      width: 1150px;
    }
    .f-title{
      font-size:14px;
      color:#99a9bf;
    }
    .icon_{
      top: 30px;
      right: 386px;
    }
  }
</style>
