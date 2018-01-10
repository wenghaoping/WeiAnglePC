<template>
  <div id="personalInformation" v-loading.body="loading" element-loading-text="拼命加载中">
    <div class="contain-center edit-page">
      <div class="main-box" ref="left">
        <div class="left-wrap">
          <span class="back-tag" @click="goBack"><i class="el-icon-arrow-left"></i>返回</span>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="person">
            <el-tab-pane label="用户信息" name="person">
              <!--=================================基本资料================================-->
              <div class="d_jump"></div>
              <div class="item-block" style="margin-top:0;margin-bottom: 16px;padding-bottom: 26px;">
                <div class="bigTitle">个人信息</div>
                <div class="block-tt-line">
                  <span class="b-title">基本资料</span>
                  <span class="b-line"></span>
                  <span class="b-hander" @click="closeDiv('cardShow')" v-show="cardShow">收起</span>
                  <span class="b-hander" @click="openDiv('cardShow')" v-show="!cardShow">展开</span>
                </div>
                <el-collapse-transition>
                  <div v-show="cardShow">
                    <!--头像-->
                    <div class="block-info block-cc-file clearfix inlineBlock" style="width: 388px;">
                      <span class="f-title fl">头像</span>
                      <cardUpload :uploadCardAddress="uploadHeadAddress"
                                  :uploadDate="uploadDate" :cardplanList="HeadPlanList"
                                  @delete="HeadPlanRemove" @success="HeadPlanuploadsuccess"
                                  @changeUploadData="beforeUpload">
                      </cardUpload>
                    </div>
                    <!--名片-->
                    <div class="block-info block-cc-file clearfix inlineBlock" style="width: 360px;">
                      <span class="f-title fl">名片</span>
                      <cardUpload :uploadCardAddress="uploadCardAddress"
                                  :uploadDate="uploadDate" :cardplanList="CardplanList"
                                  @delete="CardPlanRemove" @success="CardPlanuploadsuccess"
                                  @changeUploadData="beforeUpload">
                      </cardUpload>
                    </div>

                    <el-form :model="user_info" ref="user_info" label-width="100px" class="padding" label-position="top">
                      <el-row :span="24" :gutter="32">
                        <el-col :span="12">
                          <el-form-item
                            label="姓名"
                            prop="user_real_name"
                            :rules="NullRule20">
                            <el-input v-model="user_info.user_real_name" placeholder="请输入真实姓名"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item
                            label="昵称"
                            :rules="[{max:20,message: '最大20个字符',trigger: 'blur'}]"
                            prop="user_nickname">
                            <el-input v-model="user_info.user_nickname" placeholder="请输入昵称"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :span="24" :gutter="32">
                        <el-col :span="12">
                          <el-form-item
                            label="手机"
                            prop="user_mobile"
                            :rules="PhoneRule">
                            <el-input v-model.number="user_info.user_mobile" placeholder="请输入手机" :disabled="true"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :span="24" :gutter="32">
                        <el-col :span="12">
                          <el-form-item
                            label="公司,IE暂不支持输入"
                            prop="user_company_name"
                            :rules="NullRule40">
                            <el-autocomplete v-model="user_info.user_company_name" placeholder="请输入公司名称"
                                             :fetch-suggestions="querySearchAsync" class="width360">
                            </el-autocomplete>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item
                            label="品牌"
                            prop="user_brand"
                            :rules="[{max: 40, message: '长度不能大于40个字符', trigger: 'blur' }]">
                            <el-input v-model="user_info.user_brand" placeholder="请输入品牌名、如：微天使"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :span="24" :gutter="32">
                        <el-col :span="12">
                          <el-form-item
                            label="职位"
                            prop="user_company_career"
                            :rules="NullRule40">
                            <el-input v-model="user_info.user_company_career" placeholder="请输入职位"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item
                            label="邮箱"
                            prop="user_email"
                            :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }]">
                            <el-input v-model="user_info.user_email" placeholder="请输入邮箱"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :span="24" :gutter="32">
                        <el-col :span="12">
                          <el-form-item
                            label="微信"
                            prop="user_wechat"
                            :rules="[{max: 40, message: '长度不能大于40个字符', trigger: 'blur' }]">
                            <el-input v-model="user_info.user_wechat" placeholder="请输入微信"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item
                            label="脉脉"
                            prop="user_maimai"
                            :rules="[{max: 40, message: '长度不能大于40个字符', trigger: 'blur' }]">
                            <el-input v-model="user_info.user_maimai" placeholder="请输入脉脉"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :span="24" :gutter="32">
                        <el-col :span="12">
                          <el-form-item
                            label="知乎"
                            prop="user_zhihu"
                            :rules="[{max: 40, message: '长度不能大于40个字符', trigger: 'blur' }]">
                            <el-input v-model="user_info.user_zhihu" placeholder="请输入知乎"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item
                            label="微博"
                            prop="user_weibo"
                            :rules="[{max: 40, message: '长度不能大于40个字符', trigger: 'blur' }]">
                            <el-input v-model="user_info.user_weibo" placeholder="请输入微博"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :span="24" :gutter="32">
                        <el-col :span="12">
                          <el-form-item
                            label="QQ"
                            prop="user_qq"
                            :rules="[{max: 40, message: '长度不能大于40个字符', trigger: 'blur' }]">
                            <el-input v-model="user_info.user_qq" placeholder="请输入QQ"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item
                            label="领英"
                            prop="user_linkedin"
                            :rules="[{max: 40, message: '长度不能大于40个字符', trigger: 'blur' }]">
                            <el-input v-model="user_info.user_linkedin" placeholder="请输入领英"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :span="24" :gutter="32">
                        <el-col :span="24">
                          <el-form-item label="个人描述"
                                        prop="user_intro"
                                        :rules="[{max: 1000, message: '长度不能大于1000个字符', trigger: 'blur' }]">
                            <el-input type="textarea"
                                      v-model="user_info.user_intro"
                                      :autosize="{ minRows: 4, maxRows: 10}" placeholder="请用简短的语言描述个人优势，可以从从业经历，成功案例等方面描述"></el-input>
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
                  <span class="b-hander" @click="closeDiv('investmentShow')" v-show="investmentShow">收起</span>
                  <span class="b-hander" @click="openDiv('investmentShow')" v-show="!investmentShow">展开</span>
                </div>
                <el-collapse-transition>
                  <div v-show="investmentShow">
                    <el-form :model="investment" ref="investment" label-width="100px" class="padding" label-position="top">
                      <el-row :span="24" :gutter="32">
                        <el-col :span="12">
                          <el-form-item
                            label="投资领域"
                            prop="user_invest_industry">
                            <el-select
                              v-model="investment.user_invest_industry"
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
                            <el-select v-model="investment.user_invest_stage"
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
                            <el-select v-model="investment.user_invest_scale"
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
                            <el-select v-model="investment.user_invest_area" multiple
                                       :multiple-limit="multiplelimit"
                                       placeholder="请选择(最多5个)"
                                       class="width360">
                              <el-option
                                v-for="item in hotCity"
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
                                      v-model="investment.user_invest_desc"
                                      :autosize="{ minRows: 4, maxRows: 10}" placeholder="请用具体描述您的投资偏好"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                  </div>
                </el-collapse-transition>
              </div>

              <!--=================================成功案例=================================-->
              <div class="item-block" style="margin-top:0;margin-bottom: 16px;padding-bottom: 26px;">
                <div class="block-tt-line">
                  <span class="b-title">成功案例</span>
                  <span class="b-line"></span>
                  <span class="b-hander" @click="closeDiv('investCaseShow')" v-show="investCaseShow">收起</span>
                  <span class="b-hander" @click="openDiv('investCaseShow')" v-show="!investCaseShow">展开</span>
                </div>
                <el-collapse-transition>
                  <div v-show="investCaseShow">
                    <el-form :model="investCases" ref="investCases" label-width="100px" class="padding" label-position="top">
                      <div v-for="(investCase, index) in investCases.investCase"
                           :key="investCase.index">
                        <el-row :span="24" :gutter="32">
                          <el-col :span="12">
                            <el-form-item
                              label="项目名称"
                              :prop="'investCase.' + index + '.case_name'"
                              :key="investCase.index"
                              :rules="NullRule40">
                              <el-input v-model="investCase.case_name" placeholder="请输入"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6" >
                            <el-form-item
                              label="项目省级地区"
                              :prop="'investCase.' + index + '.case_province'"
                              :key="investCase.index"
                              :rules="[{required: true, message: '所属省级不能为空', trigger: 'change',type: 'number'}]" style="width: 188px;">
                              <el-select v-model="investCase.case_province" placeholder="请选择" @change="area1Change2(investCase.case_province,index)">
                                <el-option
                                  v-for="item in area"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6" >
                            <el-form-item
                              label="项目市级地区"
                              :prop="'investCase.' + index + '.case_city'"
                              :key="investCase.index"
                              :rules="[{required: true, message: '所属市级不能为空', trigger: 'change',type: 'number'}]" style="width: 160px;">
                              <el-select v-model="investCase.case_city" placeholder="请选择">
                                <el-option
                                  v-for="item in investCase.area_data"
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
                              label="项目领域"

                              :prop="'investCase.' + index + '.case_industry'"
                              :key="investCase.index"
                              :rules="[{required: true, message: '项目领域不能为空', trigger: 'change',type: 'array'}]">
                              <el-select
                                v-model="investCase.case_industry"
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
                          <el-col :span="4">
                            <el-form-item
                              label="投资金额(万)"
                              :prop="'investCase.' + index + '.case_money'"
                              :key="investCase.index"
                              :rules="BigNumberRule">
                              <el-input v-model="investCase.case_money" placeholder="请输入数值" style="width: 123px;"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="4">
                            <el-form-item
                              label="交易时间"

                              :prop="'investCase.' + index + '.case_deal_time'"
                              :key="investCase.index"
                              :rules="[{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }]">
                              <el-date-picker
                                v-model="investCase.case_deal_time"
                                type="date"
                                placeholder="选择日期" style="width: 125px;">
                              </el-date-picker>
                            </el-form-item>
                          </el-col>
                          <el-col :span="4">
                            <el-form-item
                              label="项目轮次"

                              :prop="'investCase.' + index + '.case_stage'"
                              :key="investCase.index"
                              :rules="[{type:'number',required: true, message: '融资轮次不能为空', trigger: 'change'}]">
                              <el-select v-model="investCase.case_stage" placeholder="请选择">
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
                        <div class="clearfix">
                          <el-button type="text" class="fr" style="color: red;font-size: 16px;margin-bottom: 10px;" @click="removeinvestCase(investCase)">删除本条</el-button>
                        </div>
                      </div>
                    </el-form>
                    <div class="marginAuto">
                      <div class="addhover">
                        <i  class="addmemberimg"><img src="../../assets/images/tianjia.png"></i>
                        <el-button type="text" @click="addinvestCase" class="addMember fl">添加案例</el-button>
                      </div>
                    </div>
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
              <div style="height: 50px;"></div>

            </el-tab-pane>
            <el-tab-pane label="行为数据" name="behavior">
              <behavior></behavior>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cardUpload from '@/components/upload/cardUpload.vue';
  import behavior from './behavior.vue';
  import { getCity } from '@/utils/setSelect';
  import { error, success, warning } from '@/utils/notification';
  import * as formatData from '@/utils/formatData';
  import * as validata from '@/utils/validata';
  export default {
    props: [],
    data () {
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
      var checkBigNumber = (rule, value, callback) => {
        if (validata.getNull(value)) {
          callback(new Error('不能为空'));
        } else {
          setTimeout(() => {
            if (validata.checkNumber(value)) {
              if (value > 99999999) {
                callback(new Error('请输入小于99999999的值'));
              } else {
                callback();
              }
            } else {
              callback(new Error('请输入数字'));
            }
          }, 100);
        }
      };// 必须为数字,数值不大于999999999999
      var checkNull20 = (rule, value, callback) => {
        if (!validata.getNull(value)) {
          setTimeout(() => {
            if (value.length > 20) {
              callback(new Error('最大长度为20'));
            } else {
              callback();
            }
          }, 100);
        } else {
          callback(new Error('不能为空'));
        }
      };// 不为空,20
      var checkNull40 = (rule, value, callback) => {
        if (!validata.getNull(value)) {
          setTimeout(() => {
            if (value.length > 40) {
              callback(new Error('最大长度为40'));
            } else {
              callback();
            }
          }, 100);
        } else {
          callback(new Error('不能为空'));
        }
      };// 不为空,40
      return {
        loading: false,
        activeName: 'person',
        PhoneRule: { validator: checkPhoneNumber, trigger: 'blur' },
        BigNumberRule: [{ required: true, message: '请输入' }, { validator: checkBigNumber, trigger: 'blur' }], // 可以为空,必须为数字,数值不大于999999999999
        NullRule20: [{ required: true, message: '请输入名称' }, { validator: checkNull20, trigger: 'blur' }], // 不为空,20
        NullRule40: [{ required: true, message: '请输入名称' }, { validator: checkNull40, trigger: 'blur' }], // 不为空,40
        uploadHeadAddress: this.URL.weitianshiLine + this.URL.uploadUserImage + localStorage.token, // 上传地址
        uploadCardAddress: this.URL.weitianshiLine + this.URL.uploadUserCardImage + localStorage.token, // 上传地址
        uploadDate: {user_id: localStorage.user_id}, // 名片上传所带的额外的参数
        // 个人信息
        user_info: {
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
          user_avatar_url: '', // 头像URL
          user_invest_industry: [], // 领域标签
          user_invest_stage: [], // 轮次
          user_invest_scale: [], // 投资金额
          user_invest_area: [], // 所属地区1省级单位
          user_intro: '', // 个人描述
          user_wechat: '', // 微信
          user_maimai: '', // 脉脉
          user_zhihu: '', // 知乎
          user_weibo: '', // 微博
          user_qq: '', // QQ
          user_linkedin: '' // 领英
        },
        // 投资需求
        investment: {
          user_invest_industry: [], // 领域标签
          user_invest_stage: [], // 轮次
          user_invest_scale: [], // 投资金额
          user_invest_area: [], // 所属地区1省级单位
          user_invest_desc: '' // 投资需求描述
        },
        // 成功案例数据
        investCases: {
          investCase: [{
            case_name: '', // 项目名称
            case_province: '', // 投资地区
            case_city: '', // 投资城市
            case_industry: [], // 项目领域
            case_money: '', // 投资金额
            case_deal_time: '', // 交易时间
            case_stage: '', // 项目轮次
            case_id: '', // 项目id
            area_data: [] // 下拉框数据二级绑定
          }]
        },
        user_infoMust: false, // 个人信息验证
        investmentMust: false, // 投资需求
        investCasesMust: false, // 成功案例
        // 公司远程搜索
        states: [],
        // 所属地区1省级选项
        area: [],
        // 所属地区2市级选项
        area2: [],
        // 项目轮次选项
        stage: [],
        // 项目领域默认选项
        industry: [],
        // 投资金额100-500选项
        scale: [],
        // 热门地区
        hotCity: [],
        cardShow: true, // 基本资料展开
        investmentShow: true, // 投资需求展开
        investCaseShow: true, // 成功案例
        multiplelimit: 5,
        headPlanButton: true, // 控制上传按钮的显示
        cardPlanButton: true, // 控制上传按钮的显示
        HeadPlanList: [], // 头像上传列表
        CardplanList: [
//                    {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
        ], // 名片上传列表
        HeadUploadShow: {}, // 计划书上传列表,需要存数据啦
        CardUploadShow: {}, // 计划书上传列表,需要存数据啦
        submitButton: false, // 是否允许提交false允许/true不允许
        dialogImg: false, // 名片预览控制
        dialogImageUrl: '' // 图片预览路径
      };
    },
    computed: {},
    mounted () {

    },
    // 组件
    components: {
      behavior,
      cardUpload
    },
    methods: {
      openDiv (v) {
        this[v] = true;
      },
      closeDiv (v) {
        this[v] = false;
      },
      // 返回上一层
      goBack () {
        this.$router.go(-1);
      },
      // 标签点击
      handleClick (tab, event) {
        this.show = tab.name;
        if (tab.name === 'person') { };
        if (tab.name === 'behavior') { };
      },
      // 获取所有下拉框的数据
      getWxProjectCategory () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.area = this.$global.data.area;// 设置城市1列表
          this.scale = this.$global.data.scale;// 设置期望融资
          this.stage = this.$global.data.stage;// 设置轮次信息
          this.industry = this.$global.data.industry;// 设置轮次信息
          this.hotCity = this.$global.data.hotCity; // 热门地区
          resolve(2);
        });
      },
      // 设置二级城市下拉列表
      area1Change (data) {
        return new Promise((resolve, reject) => {
          data.forEach((x) => {
            this.$http.post(this.URL.getArea, {user_id: localStorage.user_id, pid: x.case_province})// pid省
              .then(res => {
                let data = res.data.data;
                x.area_data = getCity(data);
                resolve(true);
              })
              .catch(err => {
                console.log(err);
              });
          });
        });
      },
      // 设置二级城市下拉列表2
      area1Change2 (data, index) {
        let newData = data;
        if (this.investCases.investCase[index].oldProvince !== newData) {
          this.$http.post(this.URL.getArea, {user_id: localStorage.user_id, pid: newData})// pid省
            .then(res => {
              let data = res.data.data;
              this.investCases.investCase[index].case_city = '';
              this.investCases.investCase[index].area_data = getCity(data);
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      // 公司搜索
      // 获取远程数据模
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
      // 设置图片
      setImage (obj, planList, uploadShow) {
        if (obj === '' || obj.length === 0) {
          this[planList] = [];
          this[uploadShow] = {};
        } else {
          let obj1 = {};
          obj1.url = obj.image_src;
          this[planList].push(obj1);
          let object = {};
          object.image_id = obj.image_id;
          this[uploadShow] = object;
        }
      },
      // 获取认证个人详情
      getUserBasicInfo () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.loading = true;
          this.$http.post(this.URL.getUserBasicInfo, {user_id: localStorage.user_id})
            .then(res => {
              if (res.data.status_code === 420008) {
                warning('这不是您的个人信息,您无权查看');
                this.loading = false;
                this.$router.push({name: 'index'});// 路由传参
              } else {
                let data = res.data;
                // 头像名片设置
                this.setImage(data.user_info.user_avatar_url, 'HeadPlanList', 'HeadUploadShow');
                this.setImage(data.user_info.user_card_image, 'CardplanList', 'CardUploadShow');
                if (data.user_info.user_avatar_url.length === 0) { this.HeadUploadShow = {}; this.HeadPlanList = []; }
                if (data.user_info.user_card_image.length === 0) { this.CardUploadShow = {}; this.CardplanList = []; }
                // 基本信息
                this.user_info = data.user_info;
                // 投资需求处理
                if (data.invest_info.length === 0) {
                  data.invest_info = {};
                  data.invest_info.user_invest_industry = data.invest_info.user_invest_industry = [];
                  data.invest_info.user_invest_stage = data.invest_info.user_invest_stage = [];
                  data.invest_info.user_invest_scale = data.invest_info.user_invest_scale = [];
                  data.invest_info.user_invest_area = data.invest_info.user_invest_area = [];
                }
                data.invest_info.user_invest_industry = formatData.setIdToArr(data.invest_info.user_invest_industry, 'industry_id');
                data.invest_info.user_invest_stage = formatData.setIdToArr(data.invest_info.user_invest_stage, 'stage_id');
                data.invest_info.user_invest_scale = formatData.setIdToArr(data.invest_info.user_invest_scale, 'scale_id');
                data.invest_info.user_invest_area = formatData.setIdToArr(data.invest_info.user_invest_area, 'area_id');
                this.investment = data.invest_info;
                // 成功案例处理
                data.project_case.forEach((x) => {
                  x.case_industry = formatData.setIdToArr(x.case_industry, 'industry_id');
                  formatData.setTimeToReallyTime1(x, 'case_deal_time');
                  x.oldProvince = x.case_province;
                });
                this.area1Change(data.project_case);
                setTimeout(() => {
                  this.investCases.investCase = data.project_case; // 成功案例
                }, 500);
                this.loading = false;
              }
            })
            .catch(err => {
              this.loading = false;
              console.log(err);
            });
          resolve(1);
        });
      },
      // 上传成功后添加字段
      HeadPlanuploadsuccess (response) {
        success('上传成功');
        this.submitButton = false;
        this.addplan(response.image_id, 'HeadUploadShow');
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
      // 添加上传文件时,保存返回的数据
      addplan (imageId, uploadShow) {
        let object = {};
        object.image_id = imageId;
        this[uploadShow] = object;
      },
      // 上传前的验证
      beforeUpload (file) {
        this.uploadDate.user_id = localStorage.user_id;
        if (this.card_id === 'creat') this.card_id = 0;
        this.uploadDate.card_id = this.card_id;
      },
      // 上传成功后添加字段
      CardPlanuploadsuccess (response) {
        success('上传成功');
        this.submitButton = false;
        this.addplan(response.image_id, 'CardUploadShow');
      },
      // 删除文件
      CardPlanRemove (file) {
        if (file) {
          this.submitButton = false;
          this.$http.post(this.URL.deleteCardImage, {user_id: localStorage.user_id, image_id: this.CardUploadShow.image_id})
            .then(res => {
              if (res.status === 200) {
                this.CardplanList = [];
                this.loading = false;
                success('删除成功');
              }
            })
            .catch(err => {
              console.log(err);
              error('删除失败,请联系管理员');
            });
        } else {
          this.cardPlanButton = true;
        }
      },
      //* 检查所有必填项目以及获取所有数据/true过.false不过
      submitForm (formName, checkName) {
        this.$refs[formName].validate((valid) => {
          this[checkName] = !valid;
        });
      },
      // 保存
      allSave () {
        var submit = () => {
          return new Promise((resolve, reject) => {
            // 做一些异步操作
            this.submitForm('user_info', 'user_infoMust');
            this.submitForm('investment', 'investmentMust');
            this.submitForm('investCases', 'investCasesMust');
            resolve(true);
          });
        };
        var check = () => {
          return new Promise((resolve, reject) => {
            // 做一些异步操作
            setTimeout(() => {
              if (this.user_infoMust) {
                error('基本资料有误');
              } else if (this.investmentMust) {
                error('投资需求有误');
              } else if (this.investCasesMust) {
                error('成功案例有误');
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
              this.loading = true;
              this.zgClick('提交个人信息');
              let allData = {};
              allData.user_id = localStorage.user_id;
              allData.user_info = validata.simpleClone(this.user_info);
              allData.investment = validata.simpleClone(this.investment);
              allData.project_case = this.investCases.investCase;
              delete allData.user_info.user_avatar_url;
              delete allData.user_info.user_card_image;
              formatData.setReallyTimeToTime(allData.project_case, 'case_deal_time', 'case_deal_time_stamp');
              this.$http.post(this.URL.updateUserInfo, allData)
                .then(res => {
                  this.card_id = res.data.card_id;
                  this.loading = false;
                  this.getCheckUserInfo(localStorage.user_id);
                  this.open2('信息编辑成功', '是否返回', '继续编辑', '返回上一页');
                })
                .catch(err => {
                  error('编辑失败');
                  console.log(err);
                  this.loading = false;
                });
            }
          });
      },
      // 编辑成功弹窗
      open2 (title, main, confirm, cancel) {
        this.$confirm(main, title, {
          confirmButtonText: confirm,
          cancelButtonText: cancel,
          type: 'success'
        }).then(() => {
          this.getUserBasicInfo();
        }).catch(() => {
          this.$router.go(-1);
        });
      },
      //* 添加成功案例
      addinvestCase () {
        this.investCases.investCase.push({
          case_id: '',
          case_name: '', // 项目名称
          case_province: '', // 投资地区
          case_city: '', // 投资城市
          case_industry: [], // 项目领域
          case_money: '', // 投资金额
          case_deal_time: '', // 交易时间
          case_stage: '', // 项目轮次
          area_data: [] // 下拉框数据
        });
      },
      // 删除成功案例
      removeinvestCase (item) {
        let index = this.investCases.investCase.indexOf(item);
        if (index !== -1) {
          this.investCases.investCase.splice(index, 1);
        }
      },
      // 设置tab切换
      setTabChange () {
        this.activeName = this.$route.query.active || 'person';
      }
    },
    // 当dom一创建时
    created () {
      this.setTabChange();
      this.$global.func.getWxProjectCategory()
        .then((data) => {
          return this.getWxProjectCategory();
        })
        .then((data) => {
          return this.getUserBasicInfo();
        });
    },
    watch: {}
  };
</script>

<style lang="less">
  @import '../../assets/css/edit.less';
  .bigTitle{
    font-size:22px;
    color:#1f2d3d;
    margin-bottom: 32px;
    text-align: center;
  }
  #personalInformation{
    .el-tabs{
      margin-bottom: 4px;
    }
    .el-tabs__header{
      margin: 0px;
    }
    .contain-center{
      background: #ffffff;
    }
    width: 1200px;
    margin: 0 auto;
    .edit-page {
      .left-wrap{
        margin: 0px 160px 0px;
      }
    }
    .person{
      margin-top: 22px;
      .el-tabs__item {
        font-size: 14px;
        //color:#8492a6
      }
      .is-active {
        background: rgb(255, 255, 255);
      }
      .header_none{
        .el-tabs{
          .el-tabs__header{
            border-bottom: none;
          }
        }
      }
    }
    .marginAuto{
      display: block;
      margin: 0 auto;
      width: 90px;
      height: 32px;
      margin-bottom: 20px;
      .addhover{
        display: inline-block;
        position:relative;
      }
      .addhover:hover .addmemberimg{
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
      }
      .addMember {
        transition: all .5s;
        font-size:16px;
        color:#009eff;
      }
      /*.addmemberimg:hover i{*/
      /*transform: rotate(360deg);*/
      /*-webkit-transform: rotate(360deg);*/
      /*-moz-transform: rotate(360deg);*/
      /*-o-transform: rotate(360deg);*/
      /*-ms-transform: rotate(360deg);*/
      /*}*/
      .addMember2{
        margin-left: 22px;
      }
      .addmemberimg{
        transform:  rotate(0) ;
        display: inline-block;
        float: left;
        margin-top: 11px;
        width: 17px;
        height: 17px;
        margin-right: 7px;
        transition: all .5s;
        img{
          width:100%;
        }
      }
      .addmemberimg :hover{
        transform: rotate(360deg);
      }
    }
  }

</style>
