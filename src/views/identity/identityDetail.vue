<template>
  <div id="identityDetail" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    <div class="title clearfix tc">
      创建您的投资名片?
      <div class="fr">
        <button class="skip btn1" type="text" @click="skip" style="color: rgb(0, 158, 255);cursor: pointer">跳过</button>
      </div>
    </div>
    <!--基本资料-->
    <div class="item-block" style="margin-top:0;margin-bottom: 16px;padding-bottom: 26px;">
      <div class="block-tt-line">
        <span class="b-title">基本资料</span>
        <span class="b-line"></span>
        <span class="b-hander" @click="baseInfo=!baseInfo" v-show="baseInfo">收起</span>
        <span class="b-hander" @click="baseInfo=!baseInfo" v-show="!baseInfo">展开</span>
      </div>
      <el-collapse-transition >
        <div v-show="baseInfo" >
          <!--名片-->
          <div class="block-info block-cc-file block-cc-pro clearfix" style="height: 149px;margin-top: 32px;">
            <span class="f-title fl">名片</span>
            <cardUpload :uploadCardAddress="uploadCardAddress"
                        :uploadDate="uploadDate" :cardplanList="CardplanList"
                        @delete="CardPlanRemove" @success="CardPlanuploadsuccess"
                        @changeUploadData="beforeUpload">
            </cardUpload>
          </div>
          <!--基本资料Form-->
          <el-form :model="auth_info" :rules="rule1" ref="auth_info" label-width="100px" class="demo-ruleForm"
                   label-position="top" style="height: 520px;margin-top: 22px;">
            <div class="flex">
              <el-form-item label="姓名" prop="iden_name" class="mr32 item">
                <el-input v-model="auth_info.iden_name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item
                label="公司名称"
                class="item"
                prop="iden_company_name">
                <el-autocomplete v-model="auth_info.iden_company_name"
                                 :fetch-suggestions="querySearchAsync"
                                 placeholder="请输入公司"
                                 @select="handleSelect" class="width360">
                </el-autocomplete>
              </el-form-item>
            </div>
            <div class="flex">
              <el-form-item label="职位" prop="iden_company_career" class="mr32 item">
                <el-input v-model="auth_info.iden_company_career" placeholder="请输入职位"></el-input>
              </el-form-item>
              <el-form-item class="item" label="邮箱" prop="iden_email">
                <el-input v-model="auth_info.iden_email" placeholder="请输入常用邮箱"></el-input>
              </el-form-item>
            </div>
            <div class="flex">
              <el-form-item label="微信" prop="iden_wx" class="mr32 item">
                <el-input v-model="auth_info.iden_wx" placeholder="请输入微信"></el-input>
              </el-form-item>
              <el-form-item class="item" label="品牌" prop="iden_brand">
                <el-input v-model="auth_info.iden_brand" placeholder="请输入品牌名 如：微天使"></el-input>
              </el-form-item>
            </div>
            <el-form-item label="个人描述" prop="iden_desc" class="desc item">
              <el-input type="textarea" v-model="auth_info.iden_desc" :rows="5" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-transition>
    </div>

    <!--投资偏好-->
    <div class="item-block" style="margin-top:0;margin-bottom: 16px;padding-bottom: 26px;">
      <div class="block-tt-line">
        <span class="b-title">投资偏好</span>
        <span class="b-line"></span>
        <span class="b-hander" @click="investPrefer=!investPrefer" v-show="investPrefer">收起</span>
        <span class="b-hander" @click="investPrefer=!investPrefer" v-show="!investPrefer">展开</span>
      </div>
      <el-collapse-transition>
        <div v-show="investPrefer">
          <!--投资偏好Form-->
          <el-form :model="investment" :rules="rule2" ref="investment" label-width="100px" class="demo-ruleForm"
                   label-position="top" style="margin-top: 18px;">
            <!--投资领域与轮次-->
            <div class="flex">
              <el-form-item label="投资领域" prop="industry" class="mr32 item" >
                <el-select v-model="investment.industry"
                           multiple filterable
                           :multiple-limit="multiplelimit"
                           placeholder="请添加(最多5个)"
                           class="width360">
                  <el-option v-for="item in industry"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="投资轮次" prop="stage">
                <el-select v-model="investment.stage"
                           multiple filterable
                           :multiple-limit="multiplelimit"
                           placeholder="请添加(最多5个)"
                           class="width360">
                  <el-option v-for="item in stage"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <!--投资金额和地区-->
            <div class="flex">
              <el-form-item label="投资金额" prop="scale" class="mr32 item">
                <el-select v-model="investment.scale"
                           multiple filterable
                           :multiple-limit="multiplelimit"
                           placeholder="请添加(最多5个)"
                           class="width360">
                  <el-option v-for="item in scale"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="item" label="投资地区" prop="area">
                <el-select v-model="investment.area"
                           multiple filterable
                           :multiple-limit="multiplelimit"
                           placeholder="请添加(最多5个)"
                           class="width360">
                  <el-option v-for="item in hotCity"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>

          </el-form>
        </div>
      </el-collapse-transition>
    </div>

    <!--=================================成功案例=================================-->
    <div class="item-block" style="margin-top:0;margin-bottom: 16px;padding-bottom: 26px;">
      <div class="block-tt-line">
        <span class="b-title">成功案例</span>
        <span class="b-line"></span>
        <span class="b-hander" @click="investCaseShow=!investCaseShow" v-show="investCaseShow">收起</span>
        <span class="b-hander" @click="investCaseShow=!investCaseShow" v-show="!investCaseShow">展开</span>
      </div>
      <el-collapse-transition>
        <div v-show="investCaseShow">
          <el-form :model="investCases" ref="investCases" label-width="100px" class="padding" label-position="top" style="padding-top: 32px;">
            <div v-for="(investCase, index) in investCases.investCase"
                 :key="investCase.index">
              <el-row :span="24" :gutter="32">
                <el-col :span="12">
                  <el-form-item
                    label="项目名称"
                    :prop="'investCase.' + index + '.case_name'"
                    :key="investCase.index"
                    :rules="[{required: true, max: 40, message: '长度不能大于40个字符', trigger: 'blur' }]">
                    <el-input v-model="investCase.case_name" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" >
                  <el-form-item
                    label="项目省级地区"
                    :prop="'investCase.' + index + '.case_province'"
                    :key="investCase.index"
                    :rules="[{required: true, message: '所属省级不能为空', trigger: 'change',type: 'number'}]" style="width: 170px;">
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
                    <el-input v-model="investCase.case_money" placeholder="请输入数值"></el-input>
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

    <!--=================================业务需求=================================-->
    <div class="item-block" style="margin-top:0;margin-bottom: 16px;padding-bottom: 26px;">
      <div class="block-tt-line">
        <span class="b-title">业务需求</span>
        <span class="b-line"></span>
        <span class="b-hander" @click="needShow=!needShow" v-show="needShow">收起</span>
        <span class="b-hander" @click="needShow=!needShow" v-show="!needShow">展开</span>
      </div>
      <el-collapse-transition>
        <div v-show="needShow">
          <el-form :model="auth_info" ref="auth_info" label-width="100px" class="demo-ruleForm"
                   label-position="top" style="margin-top: 22px;">
            <!--成功案例和新添单选项-->
            <div class="flex">
              <!--创业者身份-->
              <el-form-item v-if="group_id==3" class="item" label="是否需要财务顾问服务">
                <el-radio class="radio mr120" v-model="auth_info.is_financing" label="1">是</el-radio>
                <el-radio class="radio" v-model="auth_info.is_financing" label="0">否</el-radio>
              </el-form-item>
              <!--买方FA身份-->
              <el-form-item v-if="group_id==18" class="item" label="是否申请加入FA行业联盟">
                <el-radio class="radio mr120" v-model="auth_info.is_alliance" label="1">是</el-radio>
                <el-radio class="radio" v-model="auth_info.is_alliance" label="0">否</el-radio>
              </el-form-item>
              <!--卖方FA身份-->
              <el-form-item v-if="group_id==21" class="item" label="是否申请加入FA行业联盟">
                <el-radio class="radio mr120" v-model="auth_info.is_alliance" label="1">是</el-radio>
                <el-radio class="radio" v-model="auth_info.is_alliance" label="0">否</el-radio>
              </el-form-item>
              <!--投资方身份-->
              <el-form-item v-if="group_id==6" class="item" label="是否兼职FA业务">
                <el-radio class="radio mr120" v-model="auth_info.is_FA_part" label="1">是</el-radio>
                <el-radio class="radio" v-model="auth_info.is_FA_part" label="0">否</el-radio>
              </el-form-item>
              <!--其他身份-->
              <el-form-item v-if="group_id==8" class="item" label="是否兼职FA业务">
                <el-radio class="radio mr120" v-model="auth_info.is_FA_part" label="1">是</el-radio>
                <el-radio class="radio" v-model="auth_info.is_FA_part" label="0">否</el-radio>
              </el-form-item>
            </div>
            <!--新添单选项-买方FA身份-->
            <div class="flex" v-if="group_id==18">
              <el-form-item class="item mr32" label="是否申请试用为FA量身定制的sass系统">
                <el-radio class="radio mr120" v-model="auth_info.is_saas" label="1">是</el-radio>
                <el-radio class="radio" v-model="auth_info.is_saas" label="0">否</el-radio>
              </el-form-item>
              <el-form-item class="item" label="是否加入FA社群认证会员">
                <el-radio class="radio mr120" v-model="auth_info.is_identify_member" label="1">是</el-radio>
                <el-radio class="radio" v-model="auth_info.is_identify_member" label="0">否</el-radio>
              </el-form-item>
            </div>
            <!--新添单选项-卖方FA身份-->
            <div class="flex" v-if="group_id==21">
              <el-form-item class="item mr32" label="是否申请试用为FA量身定制的sass系统">
                <el-radio class="radio mr120" v-model="auth_info.is_saas" label="1">是</el-radio>
                <el-radio class="radio" v-model="auth_info.is_saas" label="0">否</el-radio>
              </el-form-item>
              <el-form-item class="item" label="是否加入FA社群认证会员">
                <el-radio class="radio mr120" v-model="auth_info.is_identify_member" label="1">是</el-radio>
                <el-radio class="radio" v-model="auth_info.is_identify_member" label="0">否</el-radio>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-collapse-transition>
    </div>
    <!--完成-->
    <div class="clearfix">
      <el-button class="fr next" @click="next" :disabled="submitButton">完成</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cardUpload from '@/components/upload/cardUpload.vue';
  import { error, success } from '@/utils/notification';
  import * as validata from '@/utils/validata';
  import * as formatData from '@/utils/formatData';
  import { getCity } from '@/utils/setSelect';
  export default {
    data () {
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
        loading: false, //
        uploadCardAddress: this.URL.weitianshiLine + this.URL.uploadCard + localStorage.token, // 上传地址
        BigNumberRule: [{ required: true, message: '请输入' }, { validator: checkBigNumber, trigger: 'blur' }], // 可以为空,必须为数字,数值不大于999999999999
//      身份认证所选择的身份的group_id
        group_id: '',
//      初始列表信息
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
        hotCity: '',
        // 控制展开收起
        baseInfo: true,
        investPrefer: false,
        investCaseShow: false, // 成功案例
        needShow: false,
        // 验证
        authInfoMust: false, // 个人信息验证
        investmentMust: false, // 投资需求
        investCasesMust: false, // 成功案例
//      多选数量设定
        multiplelimit: 5,
        // 个人信息
        auth_info: {
          authenticate_id: '',
          created_at: '2017-09-05 14:38:41',
          deleted_at: '',
          group_id: 18,
          iden_brand: '',
          iden_company_career: '',
          iden_company_name: '',
          iden_desc: '',
          iden_email: '',
          iden_image_id: '',
          iden_name: '',
          iden_wx: '',
          identify_status: 2, // 认证情况
          is_FA_part: 0,
          is_alliance: 0,
          is_financing: 0,
          is_identify_member: 0,
          is_saas: 0,
          message_board: '',
          updated_at: '2017-09-05 20:42:41',
          user_card_image: '',
          user_id: '8W1ERo3W'
        },
        // 投资需求
        investment: {
          industry: [], // 领域标签
          stage: [], // 轮次
          scale: [], // 投资金额
          area: [], // 所属地区1省级单位
          user_invest_desc: '' // 投资需求描述
        },
        // 成功案例数据
        investCases: {
          investCase: [{
            case_name: '', // 项目名称
            case_province: '', // 投资地区
            case_city: '', // 投资城市
            case_industry: '', // 项目领域
            case_money: '', // 投资金额
            case_deal_time: '', // 交易时间
            case_stage_name: '', // 项目轮次
            case_id: '' // 项目id
          }]
        },
//      表单验证规则
        rule1: {
          iden_name: [{ required: true, message: '请输入名称', trigger: 'blur' }, checkNull20],
          iden_company_name: [{ required: true, message: '请输入名称', trigger: 'blur' }, checkNull40],
          iden_company_career: [{ required: true, message: '请输入名称', trigger: 'blur' }, checkNull40],
          iden_wx: [
            {required: false, message: '请输入微信号码', trigger: 'blur'},
            {min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur'}
          ],
          iden_brand: [
            {required: false, message: '请输入品牌名称', trigger: 'blur'},
            {min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur'}
          ],
          iden_desc: [
            {required: false, message: '请输入个人描述', trigger: 'blur'},
            {min: 1, max: 1000, message: '长度在 1 到 1000 个字符', trigger: 'blur'}
          ]
        },
        rule2: {
          industry: [{type: 'array', required: false, message: '投资领域不能为空', trigger: 'change'}],
          stage: [{type: 'array', required: false, message: '投资轮次不能为空', trigger: 'change'}],
          scale: [{type: 'array', required: false, message: '投资金额不能为空', trigger: 'change'}],
          area: [{type: 'array', required: false, message: '投资地区不能为空', trigger: 'change'}]
        },
//      是否添加过成功案例
        hasSuccessCase: false,
//      上传图片成功的返回值
        authenticate_id: '',
//      成功案例数据
        investCaseData: [{
          case_name: '',
          case_deal_time: '',
          case_industry: '',
          case_stage: '',
          case_province: '',
          case_city: '',
          case_money: ''
        }],
        dialogImg: false, // 名片预览控制
        dialogImageUrl: '', // 图片预览路径
        CardUploadShow: {}, // 计划书上传列表,需要存数据啦
        submitButton: false, // 是否允许提交false允许/true不允许
        CardplanList: [
//                    {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
        ], // 名片上传列表
        cardPlanButton: true, // 控制上传按钮的显示
        uploadDate: {user_id: localStorage.user_id, authenticate_id: localStorage.authenticate_id} // 名片上传所带的额外的参数
      };
    },
    components: {
      cardUpload
    },
    methods: {
      // 跳过
      skip () {
        this.zgClick('跳过');
        if (localStorage.entrance === undefined) {
          this.$router.push({name: 'myProject'});
        } else {
          this.$router.push({name: localStorage.entrance});
        }
      },
      // 完成
      next () {
        var submit = () => {
          return new Promise((resolve, reject) => {
            // 做一些异步操作
            this.submitForm('auth_info', 'authInfoMust');
            this.submitForm('investment', 'investmentMust');
            this.submitForm('investCases', 'investCasesMust');
            resolve(true);
          });
        };
        var check = () => {
          return new Promise((resolve, reject) => {
            // 做一些异步操作
            setTimeout(() => {
              if (this.authInfoMust) {
                error('基本资料有误');
              } else if (this.investmentMust) {
                error('投资偏好有误');
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
              this.zgClick('提交投资名片');
              let allData = {};
              this.clone(allData, this.auth_info);
              this.clone(allData, this.investment);
              allData.project_case = this.investCases.investCase;
              allData.authenticate_id = localStorage.authenticate_id;
              allData.group_id = localStorage.group_id;
              allData.user_id = localStorage.user_id;
              formatData.setReallyTimeToTime(allData.project_case, 'case_deal_time', 'case_deal_time_stamp');
              this.$http.post(this.URL.saveUserIdentity, allData).then(res => {
                if (res.data.status_code === 2000000) {
                  this.getCheckUserInfo(localStorage.user_id);
                  this.getUserGroupByStatusName(localStorage.user_id);
                  if (localStorage.entrance === undefined) {
                    this.$router.push({name: 'myProject'});
                  } else {
                    this.$router.push({name: localStorage.entrance});
                  }
                } else {
                  error(res.data.error_msg);
                }
                this.loading = false;
              });
            }
          });
      },
      // 数据转化
      clone (data, obj) {
        for (let key in obj) {
          data[key] = obj[key];
        }
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
      // 公司搜索相关函数
      handleSelect (item) {
        this.companyTitle = item.company_name;
        this.$http.post(this.URL.getOneCompany, {user_id: localStorage.user_id, com_id: item.address})
          .then(res => {
            let data = res.data.data;
            this.queryData = data;
          })
          .catch(err => {
            this.alert('获取失败');
            console.log(err);
          });
        this.dialogVisible = true;
      },
      querySearchAsync (queryString, cb) {
        if (queryString.length > 2) {
          this.$http.post(this.URL.selectCompany, {user_id: localStorage.user_id, company_name: queryString})
            .then(res => {
              this.restaurants = [];
              let data = res.data.data;
              this.restaurants = this.loadData(data);
              if (queryString === '') this.restaurants = [];
              let restaurants = this.restaurants;
              this.timeout = setTimeout(() => {
                cb(restaurants);
              }, 200);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          let callback = [];
          cb(callback);
        }
      },

      loadData (arr) {
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
          let obj = {};
          obj.value = arr[i].project_name === '' ? arr[i].company_name : arr[i].company_name + ' ( ' + arr[i].project_name + ' ) ';
          obj.address = arr[i].com_id;
          obj.company_name = arr[i].company_name;
          newArr.push(obj);
        }
        return newArr;
      },
      // 获取下拉框数据
      getWxProjectCategory () {
        this.industry = this.$global.data.industry;
        this.scale = this.$global.data.scale;
        this.stage = this.$global.data.stage;
        this.hotCity = this.$global.data.hotCity;
        this.area = this.$global.data.area;// 设置城市1列表
      },
      // 获取认证个人详情
      getUserAuthenticateInfo () {
        this.loading = true;
        this.$http.post(this.URL.getUserAuthenticateInfo, {user_id: localStorage.user_id})
          .then(res => {
            let data = res.data;
            localStorage.authenticate_id = data.auth_info.authenticate_id;
            // 个人信息
            data.auth_info.is_FA_part = data.auth_info.is_FA_part.toString();
            data.auth_info.is_alliance = data.auth_info.is_alliance.toString();
            data.auth_info.is_financing = data.auth_info.is_financing.toString();
            data.auth_info.is_identify_member = data.auth_info.is_identify_member.toString();
            data.auth_info.is_saas = data.auth_info.is_saas.toString();
            data.auth_info.iden_image_id = data.auth_info.iden_image_id ? data.auth_info.iden_image_id : data.auth_info.user_card_image.image_id;
            this.auth_info = data.auth_info;
            this.setImage(data.auth_info.user_card_image, 'CardplanList', 'CardUploadShow');
            // 投资需求
            if (data.invest_info.length === 0) {
              data.invest_info = {};
              data.invest_info.industry = data.invest_info.industry = [];
              data.invest_info.stage = data.invest_info.stage = [];
              data.invest_info.scale = data.invest_info.scale = [];
              data.invest_info.area = data.invest_info.area = [];
            }
            data.invest_info.industry = formatData.setIdToArr(data.invest_info.industry, 'industry_id');
            data.invest_info.stage = formatData.setIdToArr(data.invest_info.stage, 'stage_id');
            data.invest_info.scale = formatData.setIdToArr(data.invest_info.scale, 'scale_id');
            data.invest_info.area = formatData.setIdToArr(data.invest_info.area, 'area_id');
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
            }, 200);
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
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
      // 点击预览名片
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url;
        this.dialogImg = true;
      },
      // 添加上传文件时,保存返回的数据
      addplan (imageId, uploadShow) {
        let object = {};
        object.image_id = imageId;
        this[uploadShow] = object;
        this.auth_info.iden_image_id = imageId;
      },
      // 上传前的验证
      beforeUpload (file) {
        this.uploadDate.user_id = localStorage.user_id;
        if (this.card_id === 'creat') this.card_id = 0;
        this.uploadDate.card_id = this.card_id;
        this.submitButton = true;
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
          if (this.card_id === 'creat') this.card_id = 0;
          this.$http.post(this.URL.deleteCard, {user_id: localStorage.user_id, image_id: this.CardUploadShow.image_id, authenticate_id: localStorage.authenticate_id})
            .then(res => {
              if (res.status === 200) {
                this.planList = [];
                this.loading = false;
                success('删除成功');
                this.auth_info.iden_image_id = '';
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
      // 上传失败
      uploaderror (err, file, fileList) {
        console.log(err);
        error('上传失败,请联系管理员');
      }
    },
    mounted () {
    },
    created () {
      this.$global.func.getWxProjectCategory()
        .then((data) => {
          return this.getWxProjectCategory();
        })
        .then((data) => {
          return this.getUserAuthenticateInfo();
        });

      this.group_id = localStorage.group_id;
    }
  };
</script>

<style lang="less">
  @import "../../assets/css/indentity.less";
  .el-input__inner {
    border-radius: 2px !important;
  }
</style>
