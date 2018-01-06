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
                                :uploadDate="uploadDate" :cardplanList="activePlanList"
                                @delete="HeadPlanRemove" @success="HeadPlanuploadsuccess"
                                @changeUploadData="beforeUpload" :size="2097160">
                    </cardUpload>
                  </div>
                  <span class="f-title">支持图片格式：jpg、png、jpeg，大小不超过2M，建议尺寸：162</span>


                  <el-form :model="active" ref="active" label-width="100px" class="padding" label-position="top">
                    <el-row :span="24" :gutter="32">
                      <el-col :span="12">
                        <el-form-item
                          label="活动主题"
                          prop="user_real_name">
                          <el-input placeholder="请输入活动主题"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="活动主办方"
                          prop="user_real_name">
                          <el-input placeholder="请输入主办方"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :span="24" :gutter="32">
                      <el-col :span="12">
                        <el-form-item
                          label="活动开始时间"
                          prop="user_real_name">
                          <el-date-picker
                            type="datetime"
                            style="width: 360px;"
                            placeholder="选择日期时间">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="活动结束时间"
                          prop="user_real_name">
                          <el-date-picker
                            type="datetime"
                            style="width: 360px;"
                            placeholder="选择日期时间">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :span="24" :gutter="32">
                      <el-col :span="4">
                        <el-form-item
                          label="活动地址"
                          style="width: 112px;">
                          <el-select placeholder="省" @change="area1Change2">
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
                          style="width: 112px;">
                          <el-select placeholder="市" @change="area1Change2">
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
                          label="　">
                          <el-select placeholder="区" @change="area1Change2">
                            <el-option
                              v-for="item in area"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="具体地址">
                          <el-input placeholder="具体地址：如文三路90号创新大厦一楼"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </div>
              </el-collapse-transition>
            </div>

            <!--=================================基本资料=================================-->
            <div class="item-block" style="margin-top:0;margin-bottom: 16px; padding-bottom: 26px;">
              <div class="block-tt-line">
                <span class="b-title">活动详情</span>
                <span class="b-line"></span>
                <span class="b-hander" @click="activityShow = !activityShow" v-show="activityShow">收起</span>
                <span class="b-hander" @click="activityShow = !activityShow" v-show="!activityShow">展开</span>
              </div>
              <el-collapse-transition>
                <div v-show="activityShow">
                  <div class="block-info block-cc-file clearfix" style="height: 149px;">
                    <span class="f-title fl">活动主图</span>
                    <cardUpload :uploadCardAddress="uploadActiveAddress"
                                :uploadDate="uploadDate" :cardplanList="activePlanList"
                                @delete="HeadPlanRemove" @success="HeadPlanuploadsuccess"
                                @changeUploadData="beforeUpload" :size="2097160">
                    </cardUpload>
                  </div>
                  <span class="f-title">支持图片格式：jpg、png、jpeg，大小不超过2M，建议尺寸：162</span>


                  <el-form :model="active" ref="active" label-width="100px" class="padding" label-position="top">
                    <el-row :span="24" :gutter="32">
                      <el-col :span="12">
                        <el-form-item
                          label="活动主题"
                          prop="user_real_name">
                          <el-input placeholder="请输入活动主题"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="活动主办方"
                          prop="user_real_name">
                          <el-input placeholder="请输入主办方"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :span="24" :gutter="32">
                      <el-col :span="12">
                        <el-form-item
                          label="活动开始时间"
                          prop="user_real_name">
                          <el-date-picker
                            type="datetime"
                            style="width: 360px;"
                            placeholder="选择日期时间">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="活动结束时间"
                          prop="user_real_name">
                          <el-date-picker
                            type="datetime"
                            style="width: 360px;"
                            placeholder="选择日期时间">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :span="24" :gutter="32">
                      <el-col :span="4">
                        <el-form-item
                          label="活动地址"
                          style="width: 112px;">
                          <el-select placeholder="省" @change="area1Change2">
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
                          style="width: 112px;">
                          <el-select placeholder="市" @change="area1Change2">
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
                          label="　">
                          <el-select placeholder="区" @change="area1Change2">
                            <el-option
                              v-for="item in area"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="具体地址">
                          <el-input placeholder="具体地址：如文三路90号创新大厦一楼"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </div>
              </el-collapse-transition>
            </div>
            <div class="ul-lists list tc"  style="padding:0">
              <div class="toButton" style="padding-left: 0;z-index: 111">
                <el-button type="primary" size="large" @click="allSave" :disabled="submitButton" style="margin: 0 auto">
                  保存
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
  import { success, error } from '@/utils/notification';
  export default {
    data () {
      return {
        loading: false,
        activityShow: true, // 活动显示隐藏
        submitButton: false, // 是否允许提交false允许/true不允许
        uploadActiveAddress: this.URL.weitianshiLine + this.URL.uploadUserImage + localStorage.token, // 上传地址
        uploadDate: {user_id: localStorage.user_id}, // 名片上传所带的额外的参数
        activePlanList: [
//                    {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
        ] // 名片上传列表
      };
    },
    computed: {},
    mounted () {

    },
    // 组件
    components: {
      cardUpload
    },
    methods: {
      // 保存
      allSave () {
        console.log(123);
      },
      goBack () {
        console.log(123);
      },
      // 删除文件
      HeadPlanRemove (file) {
        if (file) {
          this.$http.post(this.URL.deleteImage, {user_id: localStorage.user_id, image_id: this.HeadUploadShow.image_id})
            .then(res => {
              if (res.status === 200) {
                this.HeadPlanList = [];
                this.loading = false;
                success('删除成功');
              }
            })
            .catch(err => {
              console.log(err);
              error('删除失败,请联系管理员');
            });
        } else {
          this.headPlanButton = true;
        }
      },
      // 上传成功后添加字段
      HeadPlanuploadsuccess (response) {
        success('上传成功');
        this.submitButton = false;
        this.addplan(response.image_id, 'HeadUploadShow');
      },
      // 上传前的验证
      beforeUpload (file) {
        this.uploadDate.user_id = localStorage.user_id;
        if (this.card_id === 'creat') this.card_id = 0;
        this.uploadDate.card_id = this.card_id;
      }
    },
    // 当dom一创建时
    created () {

    },
    watch: {}
  };
</script>

<style lang="less">
  @import '../../assets/css/edit.less';
  .creatActivity{
    width: 1200px;
    margin: 0 auto;
    .f-title{
      font-size:14px;
      color:#99a9bf;
    }
  }
</style>
