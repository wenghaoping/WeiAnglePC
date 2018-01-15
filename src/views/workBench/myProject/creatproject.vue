<template >
  <div class="creatproject" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    <div class="contain-center edit-page">
      <span class="back-tag" @click="goBack"><i class="el-icon-arrow-left"></i>返回</span>
      <div class="main-box">
        <div class="left-wrap">
          <!--=================================基本资料=================================-->
          <div class="item-block" style="margin-top:0;padding-bottom: 10px;">
            <div class="block-tt-line">
              <span class="b-title">基本资料</span>
              <span class="b-line" style="width: 624px;"></span>
            </div>
            <div class="block-info block-cc-file" style="margin-top: 48px;">
              <span class="f-title fl">商业计划书</span>
              <span style="margin-left: 20px;" class="fl">
                <el-upload class="Upload"
                           ref="upload"
                           :action="uploadAddress"
                           :on-change="planChange"
                           :on-success="planuploadsuccess"
                           :on-preview="planPreview"
                           :on-remove="planRemove"
                           :on-error="planuploaderror"
                           :file-list="planList"
                           :before-upload="beforeUpload"
                           accept=".doc, .ppt, .pdf, .zip, .rar, .docx, .pptx"
                           :data="uploadDate">
                  <el-button slot="trigger" type="primary" v-show="planButton" class="fl" @click="zgClick('上传BP')"><i class="el-icon-plus"></i>上传附件</el-button>
                  <div slot="tip" class="el-upload__tip fr" v-show="planButton"><i style="display: block">BP私密保护，投资人可通过申请查看来了解项目价值</i><i style="display: block">支持pdf、ppt、pptx、doc、docx、zip、rar文件格式，单个文件最大50M</i></div>
                </el-upload>
              </span>

            </div>
            <el-form :model="project" ref="project" label-width="100px" class="padding" label-position="top">
              <el-row :span="24" :gutter="32">
                <el-col :span="12">
                  <span class="justIlook">(仅自己可见)</span>
                  <el-form-item
                    label="项目名称"
                    prop="pro_name"
                    :rules="[{min: 1, max:40,message: '最大40个字符',trigger: 'blur'}]">
                    <el-input v-model="project.pro_name" placeholder="项目代号，快速识别"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <span class="justIlook2">(仅自己可见,IE浏览器暂不支持输入)</span>
                  <el-form-item
                    label="公司名称"
                    :rules="[{min: 1, max:40,message: '最大40个字符',trigger: 'blur'}]"
                    prop="pro_company_name">
                    <el-autocomplete v-model="project.pro_company_name"
                                     :fetch-suggestions="querySearchAsync"
                                     placeholder="公司全网检索，一键同步公司信息"
                                     @select="handleSelect" style="width:260px;">
                    </el-autocomplete>
                  </el-form-item>
                </el-col>
                <el-tooltip class="item" effect="dark" placement="top-end">
                  <div slot="content">从微天使创投数据库自动获取公司行业，融资轮次<br/>历史融资，核心团队及里程碑等项目信息</div>
                  <button class="tong" @click="syncOne">一键同步</button>
                </el-tooltip>
                <span class="ques">
                        <el-tooltip placement="bottom-end">
                            <div slot="content">
                              <div class="tips-txt">1、一键同步公司信息，快速创建项目</div>
                              <div class="tips-txt" style="margin-top:5px;">2、可在项目详情查看尽调报告</div>
                            </div>
                            <img src="../../../assets/images/why.png" alt=""/>
                        </el-tooltip>
                      </span>
              </el-row>
            </el-form>
          </div>
          <!--=================================项目介绍=================================-->
          <div class="item-block" style="margin-top:16px;padding-bottom: 10px;">
            <div class="block-tt-line" style="margin-bottom: 32px;">
              <span class="b-title">项目介绍</span>
              <span class="b-line" style="width: 624px;"></span>
            </div>
            <el-form :model="project" ref="project" label-width="100px" class="padding" label-position="top">
              <el-row :span="24" :gutter="32">
                <el-col :span="12">
                  <el-form-item
                    label="项目介绍"
                    prop="pro_intro"
                    :rules="[{required: true, message: '项目介绍不能为空', trigger: 'blur'},{min: 1, max:40,message: '长度不能大于40个字符', trigger: 'blur'}]">
                    <el-input v-model="project.pro_intro" placeholder="一句话介绍，如帮助FA成交的项目管理工具"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="项目领域"
                    prop="pro_industry"
                    :rules="[{type: 'array',required: true, message: '项目领域不能为空', trigger: 'change'}]">
                    <el-select
                      v-model="project.pro_industry"
                      multiple
                      filterable
                      :multiple-limit="multiplelimit"
                      placeholder="请添加(最多5个)" class="width360" >
                      <el-option
                        v-for="item in industry"
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
                    label="项目轮次"
                    prop="pro_stage.stage_id"
                    :rules="[{type:'number',required: true, message: '项目轮次不能为空', trigger: 'change'}]">
                    <el-select v-model="project.pro_stage.stage_id" placeholder="请选择" class="width360">
                      <el-option
                        v-for="item in stage"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6" >
                  <el-form-item
                    label="所属省级"
                    prop="pro_area.pid"
                    :rules="[{required: true, message: '所属省级不能为空', trigger: 'change',type: 'number'}]">
                    <el-select v-model="project.pro_area.pid" placeholder="请选择" @change="area1Change2">
                      <el-option
                        v-for="item in area"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6" style="padding-left: 5px;">
                  <el-form-item label="所属市级"
                                prop="pro_area.area_id"
                                :rules="[{required: true, message: '所属市级不能为空', trigger: 'change',type: 'number'}]">
                    <el-select v-model="project.pro_area.area_id" placeholder="请选择">
                      <el-option
                        v-for="item in area2"
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
                    prop="pro_scale.scale_id"
                    :rules="[{required: true, message: '期望融资不能为空', trigger: 'change',type: 'number'}]">
                    <el-select v-model="project.pro_scale.scale_id" placeholder="请选择" class="width360">
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
                    label="投后股份(%)"
                    :rules="NumberRule"
                    prop="pro_finance_stock_after">
                    <el-input v-model="project.pro_finance_stock_after" placeholder="请输入具体数值，如：10"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :span="24" :gutter="32">
                <el-col :span="12">
                  <el-form-item
                    label="私密设置"
                    prop="open_status">
                    <el-select v-model="project.open_status" placeholder="请选择" class="width360">
                      <el-option label="私密项目（仅自己／团队成员可查看编辑）" value="0"></el-option>
                      <el-option label="公开项目（投放到交易市场参与融资匹配，投资人可以申请查看bp，每日限公开一次）" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="是否独家"
                    prop="is_exclusive">
                    <el-radio class="radio" v-model="project.is_exclusive" :label=2>非独家FA签约</el-radio>
                    <el-radio class="radio" v-model="project.is_exclusive" :label=1>独家FA签约</el-radio>
                    <el-radio class="radio" v-model="project.is_exclusive" :label=0>其他</el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="goodness">
                <!--投资亮点-->
                <div style="margin-bottom: 15px">
                  <span style="font-size:16px;color:#5e6d82;">投资亮点</span>
                  <span style="font-size:14px;color:#99a9bf;">（是决定投资人是否查看项目详情的重要因素，以不超过3点为宜）</span></div>
                <el-row :span="24" :gutter="25">
                  <el-col :span="5">
                    <el-form-item
                      v-for="(domain, index) in project.goodness.pro_goodness"
                      :key="index.key"
                      :prop="'goodness.pro_goodness.' + index + '.goodness_title'"
                      :rules="[{min: 1, max:8,message: '最大8个字符'}]">
                      <el-input  v-model="domain.goodness_title" placeholder=""  @focus="focus(1)" @blur="blur(1)" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="18">
                    <div class="goodnessTag" :class="{goodnessTagBl:tagShow==1}" style="top: -100px;">
                      <img src="../../../assets/images/xiangmuliangdian.png">
                    </div>
                    <el-form-item
                      v-for="(domain, index) in project.goodness.pro_goodness"
                      :key="index.key"
                      :prop="'goodness.pro_goodness.' + index + '.goodness_desc'"
                      :rules="[{min: 1, max:1000,message: '最大1000个字符'}]">
                      <el-input  v-model="domain.goodness_desc"
                                 placeholder="" @focus="focus(1)" @blur="blur(1)"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1" >
                    <el-form-item label="　　"
                                  v-for="(domain, index) in project.goodness.pro_goodness"
                                  :key="index.key"
                                  style="margin-left: 40px;margin-top: -6px" class="clearfix " >
                      <span class="imgdele fr lin" @click.prevent="removegoodNess(domain)" >删除</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--</el-form>-->
                <div class="marginAuto" style="width:156px;">
                  <div class="addhover">
                    <i  class="addmemberimg"><img src="../../../assets/images/tianjia.png"></i>
                    <el-button type="text" @click="addgoodNess" class="addMember fl"> 添加条目</el-button></div>
                </div>

                <!--市场概况-->
                <div style="margin-bottom: 15px">
                  <span style="font-size:16px;color:#5e6d82;">市场概况</span>
                  <span style="font-size:14px;color:#99a9bf;">（市场规模和增速、竞争格局、政策等，以不超过3点为宜）</span></div>
                <el-row :span="24" :gutter="25">
                  <el-col :span="5">
                    <el-form-item
                      v-for="(domain, index) in project.goodness.pro_market_genera"
                      :key="index.key"
                      :prop="'goodness.pro_market_genera.' + index + '.goodness_title'"
                      :rules="[{min: 1, max:8,message: '最大8个字符'}]">
                      <el-input  v-model="domain.goodness_title" placeholder=""  @focus="focus(2)" @blur="blur(2)" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="18">
                    <div class="goodnessTag" :class="{goodnessTagBl:tagShow==2}"  style="top: -100px;">
                      <img src="../../../assets/images/shichanggaikuang.png">
                    </div>
                    <el-form-item
                      v-for="(domain, index) in project.goodness.pro_market_genera"
                      :key="index.key"
                      :prop="'goodness.pro_market_genera.' + index + '.goodness_desc'"
                      :rules="[{min: 1, max:1000,message: '最大1000个字符'}]">
                      <el-input  v-model="domain.goodness_desc"
                                 placeholder="" @focus="focus(2)" @blur="blur(2)"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1" >
                    <el-form-item label="　　"
                                  v-for="(domain, index) in project.goodness.pro_market_genera"
                                  :key="index.key"
                                  style="margin-left: 40px;margin-top: -6px" class="clearfix " >
                      <span class="imgdele fr lin" @click.prevent="removegoodNess1(domain)" >删除</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div class="marginAuto" style="width:156px;">
                  <div class="addhover">
                    <i  class="addmemberimg"><img src="../../../assets/images/tianjia.png"></i>
                    <el-button type="text" @click="addgoodNess1" class="addMember fl"> 添加条目</el-button></div>
                </div>
                <!--产品概况-->
                <div style="margin-bottom: 15px">
                  <span style="font-size:16px;color:#5e6d82;">产品概况</span>
                  <span style="font-size:14px;color:#99a9bf;">（选择项目产品或模式一种重点介绍即可，以不超过3点为宜）</span></div>
                <el-row :span="24" :gutter="25">
                  <el-col :span="5">
                    <el-form-item
                      v-for="(domain, index) in project.goodness.pro_service"
                      :key="index.key"
                      :prop="'goodness.pro_service.' + index + '.goodness_title'"
                      :rules="[{min: 1, max:8,message: '最大8个字符'}]">
                      <el-input  v-model="domain.goodness_title" placeholder=""  @focus="focus(3)" @blur="blur(3)" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="18">
                    <div class="goodnessTag" :class="{goodnessTagBl:tagShow==3}"  style="top: -65px;">
                      <img src="../../../assets/images/chanpiongaikuang.png">
                    </div>
                    <el-form-item
                      v-for="(domain, index) in project.goodness.pro_service"
                      :key="index.key"
                      :prop="'goodness.pro_service.' + index + '.goodness_desc'"
                      :rules="[{min: 1, max:1000,message: '最大1000个字符'}]">
                      <el-input  v-model="domain.goodness_desc"
                                 placeholder="" @focus="focus(3)" @blur="blur(3)"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1" >
                    <el-form-item label="　　"
                                  v-for="(domain, index) in project.goodness.pro_service"
                                  :key="index.key"
                                  style="margin-left: 40px;margin-top: -6px" class="clearfix " >
                      <span class="imgdele fr lin" @click.prevent="removegoodNess2(domain)" >删除</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div class="marginAuto" style="width:156px;">
                  <div class="addhover">
                    <i  class="addmemberimg"><img src="../../../assets/images/tianjia.png"></i>
                    <el-button type="text" @click="addgoodNess2" class="addMember fl"> 添加条目</el-button></div>
                </div>
                <!--商业模式-->
                <div style="margin-bottom: 15px">
                  <span style="font-size:16px;color:#5e6d82;">商业模式</span>
                  <span style="font-size:14px;color:#99a9bf;">（用来说明通过什么方式盈利）</span></div>
                <el-row :span="24" :gutter="25">
                  <el-col :span="5">
                    <el-form-item
                      v-for="(domain, index) in project.goodness.pro_business_model"
                      :key="index.key"
                      :prop="'goodness.pro_business_model.' + index + '.goodness_title'"
                      :rules="[{min: 1, max:8,message: '最大8个字符'}]">
                      <el-input  v-model="domain.goodness_title" placeholder=""  @focus="focus(4)" @blur="blur(4)" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="18">
                    <div class="goodnessTag" :class="{goodnessTagBl:tagShow==4}"  style="top: -65px;">
                      <img src="../../../assets/images/shangyemoshi.png">
                    </div>
                    <el-form-item
                      v-for="(domain, index) in project.goodness.pro_business_model"
                      :key="index.key"
                      :prop="'goodness.pro_business_model.' + index + '.goodness_desc'"
                      :rules="[{min: 1, max:1000,message: '最大1000个字符'}]">
                      <el-input  v-model="domain.goodness_desc"
                                 placeholder="" @focus="focus(4)" @blur="blur(4)"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1" >
                    <el-form-item label="　　"
                                  v-for="(domain, index) in project.goodness.pro_business_model"
                                  :key="index.key"
                                  style="margin-left: 40px;margin-top: -6px" class="clearfix " >
                      <span class="imgdele fr lin" @click.prevent="removegoodNess3(domain)" >删除</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div class="marginAuto" style="width:156px;">
                  <div class="addhover">
                    <i  class="addmemberimg"><img src="../../../assets/images/tianjia.png"></i>
                    <el-button type="text" @click="addgoodNess3" class="addMember fl"> 添加条目</el-button></div>
                </div>
              </div>
            </el-form>
          </div>
          <div class="toButton" style="padding-left: 0;z-index: 111">
            <el-button type="primary" size="large" style="margin-left:45%" @click="allSave">提交</el-button>
          </div>

          <div style="height: 50px;"></div>

        </div>
      </div>
    </div>


    <!--一键同步提示框-->
    <el-dialog
      :title="companyTitle"
      :visible.sync="dialogVisible"
      size="tiny"
      :show-close="close">
      <span>微天使为您找到相似公司，是否一键同步</span>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="sync">一键同步</el-button>
          </span>
    </el-dialog>

    <!--一键同步选择框-->
    <synccreatprojectdetail :sync-creat-project-detail-display="syncCreatProjectDetailDisplay" :companyid="this.companyid"
                       @changeSyncProjectDetail="changeSyncProjectDetail"
                       @syncCompanyData="syncCompanyData">

    </synccreatprojectdetail>
  </div>
</template>

<script type="text/ecmascript-6">
  import synccreatprojectdetail from '@/views/components/syncCreatProjectDetail.vue';
  import { getCity } from '@/utils/setSelect';
  import * as validata from '@/utils/validata';
  import { setIdToArr } from '@/utils/formatData';
  import { error, success, warning } from '@/utils/notification';
  import { getTop } from '@/utils';
  export default {
    data () {
      var checkHundred = (rule, value, callback) => {
        if (!validata.getNull(value)) {
          setTimeout(() => {
            if (validata.checkNumber(value)) {
              if (value > 100) {
                callback(new Error('请输入小于100的值'));
              } else {
                callback();
              }
            } else {
              callback(new Error('请输入数字'));
            }
          }, 100);
        } else {
          callback();
        }
      };// 可以为空,必须为数字,比例数值1-100判断
      return {
        projectMust: false,
        uploadAddress: this.URL.weitianshiLine + this.URL.projectUpload + localStorage.token, // 上传地址
        planList: [], // 商业计划书上传列表
        planButton: false, // 控制上传按钮的显示
        dialogVisible: false, // 是否同步弹窗
        uploadShow: {// 计划书上传列表,需要存数据啦

        },
        close: false,
        tagShow: 0, // 控制标签显示隐藏
        uploadDate: {user_id: localStorage.user_id}, // 商业计划书上传所带的额外的参数
        project: {
          project_id: '',
          pro_name: '', // 项目名称
          pro_company_name: '', // 公司名称
          pro_intro: '', // 项目介绍
          pro_industry: [], // 项目领域
          pro_stage: {
            sort: 4,
            stage_id: '',
            stage_name: 'A轮'
          }, // 轮次
          pro_area: {
            area_id: '',
            area_title: '', // 市级
            pid: ''// 省级
          }, // 所属地区1省级单位
          pro_scale: {
            scale_id: '',
            scale_money: ''
          }, // 规模多少钱
          pro_finance_stock_after: '', // 投后股分
          open_status: '1', // 私密设置
          goodness: {
            pro_business_model: [
              {
                goodness_desc: '', // 凉凉凉凉
                goodness_title: ''// 亮点亮点
              },
              {
                goodness_desc: '', // 凉凉凉凉
                goodness_title: ''// 亮点亮点
              },
              {
                goodness_desc: '', // 凉凉凉凉
                goodness_title: ''// 亮点亮点
              }
            ],
            pro_goodness: [
              {
                goodness_desc: '', // 凉凉凉凉
                goodness_title: ''// 亮点亮点
              },
              {
                goodness_desc: '', // 凉凉凉凉
                goodness_title: ''// 亮点亮点
              },
              {
                goodness_desc: '', // 凉凉凉凉
                goodness_title: ''// 亮点亮点
              }
            ],
            pro_market_genera: [
              {
                goodness_desc: '', // 凉凉凉凉
                goodness_title: ''// 亮点亮点
              },
              {
                goodness_desc: '', // 凉凉凉凉
                goodness_title: ''// 亮点亮点
              },
              {
                goodness_desc: '', // 凉凉凉凉
                goodness_title: ''// 亮点亮点
              }
            ],
            pro_service: [
              {
                goodness_desc: '', // 凉凉凉凉
                goodness_title: ''// 亮点亮点
              },
              {
                goodness_desc: '', // 凉凉凉凉
                goodness_title: ''// 亮点亮点
              },
              {
                goodness_desc: '', // 凉凉凉凉
                goodness_title: ''// 亮点亮点
              }
            ]
          }, // 亮点
          is_exclusive: 1// 0其他 1独家 2非独家
        }, // 项目介绍
        multiplelimit: 5,
        /* 公司远程搜索 */
        loading: false,
        restaurants: [],
        timeout: null,
        /* 所属地区1省级选项 */
        area: [],
        /* 所属地区2市级选项 */
        area2: [],
        /* 项目领域默认选项 */
        industry: [],
        /* 融资范围 */
        scale: [],
        /* 项目轮次选项 */
        stage: [],
        companyTitle: '', // 尽调搜索的公司的名称
        companyid: '', // 尽调搜索的公司的ID
        queryData: {},
        NumberRule: { validator: checkHundred, trigger: 'blur' },
        mustGo: true,
        syncCreatProjectDetailDisplay: false
      };
    },
    methods: {
      // 获得项目亮点焦点
      focus (e) {
        this.tagShow = e;
      },
      // 取消项目亮点焦点
      blur (e) {
        this.tagShow = 0;
      },
      // 获取列表各种数据
      // 获取所有下拉框的数据
      getWxProjectCategory () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.area = this.$global.data.area;// 设置人脉标签
          this.scale = this.$global.data.scale;// 设置期望融资
          this.stage = this.$global.data.stage;// 设置轮次信息
          this.industry = this.$global.data.industry;// 设置轮次信息
          resolve(1);
        });
      },
      // 设置二级城市下拉列表
      area1Change (data) {
        this.$http.post(this.URL.getArea, {user_id: localStorage.user_id, pid: data})// pid省
          .then(res => {
            let data = res.data.data;
            this.area2 = getCity(data);
          })
          .catch(err => {
            console.log(err);
          });
      }, // 设置二级城市下拉列表
      area1Change2 (data) {
        let newData = data;
        if (data !== '') {
          let pid = localStorage.pid;
          this.$http.post(this.URL.getArea, {user_id: localStorage.user_id, pid: data})// pid省
            .then(res => {
              let data = res.data.data;
              this.area2 = getCity(data);
              if (parseInt(newData) === parseInt(pid)) {
              } else {
                this.project.pro_area.area_id = '';
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }, // 设置二级城市下拉列表2
      // 商业计划书
      planChange (file, fileList) {
        this.planList = fileList;
        if (file.status === 'fail') this.planButton = true;
        else this.planButton = false;
      },
      // 上传成功后添加字段
      planuploadsuccess (response, file, fileList) {
        success('上传成功');
        let data = response.data;
        this.addplan(data.file_title, data.pro_intro, data.pro_name, data.project_id, data.file_id);
      },
      // 上传失败
      planuploaderror (err, file, fileList) {
        console.log(err);
        error('上传失败,请联系管理员');
      },
      // 删除文件
      planRemove (file, fileList) {
        if (file) {
          if (fileList.length === 0) this.planButton = true;
          else this.planButton = true;
          this.$http.post(this.URL.deleteAtUpload, {user_id: localStorage.user_id, project_id: this.uploadShow.project_id})
            .then(res => {
              if (res.data.status_code === 2000000) {
                this.loading = false;
                success('删除成功');
              }
            })
            .catch(err => {
              console.log(err);
              error('删除失败,请联系管理员');
            });
        }
      },
      // 添加上传文件时,保存返回的数据
      addplan (fileTitle, proIntro, proName, projectId, fileId) {
        let object = {};
        object.file_title = fileTitle;
        object.pro_intro = proIntro;
        object.pro_name = proName;
        object.project_id = projectId;
        object.file_id = fileId;
        this.uploadShow = object;
      },
      // 点击下载
      planPreview (file) {
        const url = this.URL.weitianshi + this.URL.download + '?user_id=' + localStorage.user_id + '&file_id=' + this.uploadShow.file_id;
        window.open(url);
      },
      // 上传前的验证
      beforeUpload (file) {
        let filetypes = ['.doc', '.ppt', '.pdf', '.zip', '.rar', '.docx', '.pptx'];
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
          error('不支持的文件格式');
          return false;
        }
        if (parseInt(file.size) > parseInt(52428810)) {
          error('暂不支持超过50m文件上传哦');
          return false;
        }
      },

      // 项目同步
      // 项目详情弹窗关闭函数
      changeSyncProjectDetail (msg) {
        this.syncCreatProjectDetailDisplay = msg;
        this.dialogVisible = false;
      },
      // 开始同步信息(是否覆盖信息)
      syncCompanyData (msg) {
        this.loading = true;
        this.dialogVisible = false;
        let syncDataCheck = this.$store.state.syncData;
        let syncData = syncDataCheck.data;
        let checkList = syncDataCheck.checkedSync;
        this.getWxProjectCategory()
          .then((data) => {
            syncDataFunc();
          });
        // 数据同步函数
        const syncDataFunc = () => {
          syncData.project.pro_industry = setIdToArr(syncData.project.pro_industry, 'industry_id');// 领域标签取出id
          syncData.project.open_status = syncData.project.open_status.toString();// 字符串化
          if (syncData.project.pro_stage.length === 0) {
            syncData.project.pro_stage = {};
            syncData.project.pro_stage = {stage_id: ''};
          } else {
//            syncData.project.pro_stage = syncData.project.pro_stage.stage_id;
          }
          if (syncData.project.pro_industry.length === 0) { syncData.project.pro_industry = []; }
          if (syncData.company.pro_company_scale === '') { syncData.company.pro_company_scale = {comp_scale_id: ''}; }
          // 数据格式化

          if (msg.cover) {
            // 覆盖的时候
            checkList.forEach((x) => {
              for (let index in syncData) { // 需要同步那些数据
                if (x === index) {
                  if (x === 'project' || x === 'company') {   // 因为不是数组,单独处理
                    for (let key in syncData[index]) {
                      if (key !== 'pro_area') {            // 后端都没有,跳过处理
                        this[x][key] = syncData[index][key];
                      } else {
                        this.project.pro_area.pid = syncData[index][key].pid;
                        this.area1Change(syncData[index][key].pid);
                        localStorage.pid = syncData[index][key].pid;
                        setTimeout(() => { this.project.pro_area.area_id = syncData[index][key].area_id; }, 100);
                      }
                    }
                  } else {
                    for (let key in syncData[index]) {
                      this[x][key] = syncData[index][key];
                    }
                  }
                }
              }
            });
          } else {
            // 不覆盖
            checkList.forEach((x) => {
              for (let index in syncData) {
                if (x === index) {
                  if (x === 'project' || x === 'company') {
                    for (let key in syncData[index]) {
                      if (key === 'pro_area') {
                        if (this.project.pro_area.pid === '') {
                          this.project.pro_area.pid = syncData[index][key].pid;
                          this.area1Change(syncData[index][key].pid);
                          localStorage.pid = syncData[index][key].pid;
                          setTimeout(() => { this.project.pro_area.area_id = syncData[index][key].area_id; }, 100);
                        }
                      } else if (key === 'pro_stage') {
                        if (this.project.pro_stage.stage_id === '') {
                          this[x][key] = syncData[index][key];
                        }
                      } else if (this[x][key] === '') {
                        this[x][key] = syncData[index][key];
                      }
                    }
                  } else {
                    for (let Arrkey in syncData[index]) {
                      if (validata.isArray(syncData[index][Arrkey])) {
                        if (Arrkey !== 'tag') {
                          this[x][Arrkey] = [...this[x][Arrkey], ...syncData[index][Arrkey]];// 数组合并
                        }
                      }
                    }
                  }
                }
              }
            });
          }
        };
        this.loading = false;
      },

      goBack () { // 返回上一层
        this.zgClick('退出创建项目');
        this.$router.go(-1);
      },

      // 检查所有必填项目以及获取所有数据
      submitForm (formName, checkName) {
        this.$refs[formName].validate((valid) => {
          this[checkName] = !valid;
        });
      },
      // 创建成功弹
      open2 (title, main, confirm, cancel) {
        this.$confirm(main, title, {
          confirmButtonText: confirm,
          cancelButtonText: cancel,
          type: 'success'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '继续完善'
          });
          this.$router.push({name: 'editproject', query: {project_id: this.project.project_id}});
        }).catch(() => {
          this.$router.push({name: 'myProject'});
        });
      },
      oneCheck (item) {
        var check = true;
        for (let i = 0; i < item.length; i++) {
          if (item[i].goodness_title !== '' && item[i].goodness_desc !== '') {
            check = false;
            return check;
          } else {
            check = true;
          }
        }
        return check;
      },
      // 全部保存按钮
      allSave () {
        var submit = () => {
          return new Promise((resolve, reject) => {
            // 做一些异步操作
            this.submitForm('project', 'projectMust');
            resolve(true);
          });
        };

        var check = () => {
          return new Promise((resolve, reject) => {
            // 做一些异步操作
            setTimeout(() => {
              if (this.projectMust) { error('项目介绍填写有误'); } else if (this.oneCheck(this.project.goodness.pro_goodness)) { error('投资亮点最少填写一条'); } else {
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
              this.zgClick('提交项目');
              this.loading = true;
              this.project.project_id = this.uploadShow.project_id;
              let allData = {};
              allData.project = validata.simpleClone(this.project);
              delete allData.project.tag;
              allData.pro_FA = {is_exclusive: this.project.is_exclusive};
              allData.user_id = localStorage.user_id;// 用户id
              this.$http.post(this.URL.editProject, allData)
                .then(res => {
                  let data = res.data;
                  this.project.project_id = data.project_id;
                  this.open2('创建成功', '完善项目资料，让投资人更全面得了解项目价值', '去完善', '跳过');
                  this.loading = false;
                })
                .catch(err => {
                  error('创建失败');
                  console.log(err);
                  this.loading = false;
                });
            }
          });
      },
      // 获取数据
      loadData (arr) {
        let newArr = [];
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
              error('加载失败');
              console.log(err);
            });
        } else {
          let callback = [];
          cb(callback);
        }
      },
      handleSelect (item) {
        this.companyTitle = item.company_name;
        this.companyid = item.address;
        this.project.pro_company_name = item.company_name;
      },
      // 添加投资亮点
      addgoodNess () {
        this.project.goodness.pro_goodness.push({
          goodness_desc: '',
          goodness_title: '',
          goodness_id: '',
          type: 'pro_goodness'
        });
      },
      // 删除投资亮点
      removegoodNess (item) {
        var index = this.project.goodness.pro_goodness.indexOf(item);
        if (index !== -1) {
          this.project.goodness.pro_goodness.splice(index, 1);
        }
      },
      // 添加市场概况
      addgoodNess1 () {
        this.project.goodness.pro_market_genera.push({
          goodness_desc: '',
          goodness_title: '',
          goodness_id: '',
          type: 'pro_market_genera'
        });
      },
      // 删除市场概况
      removegoodNess1 (item) {
        var index = this.project.goodness.pro_market_genera.indexOf(item);
        if (index !== -1) {
          this.project.goodness.pro_market_genera.splice(index, 1);
        }
      },
      // 添加产品概况pro_servicepro_business_model
      addgoodNess2 () {
        this.project.goodness.pro_service.push({
          goodness_desc: '',
          goodness_title: '',
          goodness_id: '',
          type: 'pro_service'
        });
      },
      // 删除产品概况
      removegoodNess2 (item) {
        var index = this.project.goodness.pro_service.indexOf(item);
        if (index !== -1) {
          this.project.goodness.pro_service.splice(index, 1);
        }
      },
      // 添加商业模式pro_business_model
      addgoodNess3 () {
        this.project.goodness.pro_business_model.push({
          goodness_desc: '',
          goodness_title: '',
          goodness_id: '',
          type: 'pro_business_model'
        });
      },
      // 删除商业模式
      removegoodNess3 (item) {
        var index = this.project.goodness.pro_business_model.indexOf(item);
        if (index !== -1) {
          this.project.goodness.pro_business_model.splice(index, 1);
        }
      },
      // 一键同步按钮
      syncOne () {
        this.companyTitle = this.project.pro_company_name;
        if (this.companyTitle === '') {
          warning('请先填写公司名称');
        } else {
          this.loading = true;
          this.$http.post(this.URL.getCrawlerCompany, {user_id: localStorage.user_id, company_name: this.companyTitle})
            .then(res => {
              let data = res.data.data;
              if (data.length !== 0) {
                this.companyid = data.company.com_id;
                this.dialogVisible = true;
              } else {
                warning('未查询到该公司信息，无法获取');
              }
              this.loading = false;
            })
            .catch(err => {
              error('获取失败');
              console.log(err);
              this.loading = false;
            });
        }
      },
      // 一键同步按钮
      sync () {
        this.dialogVisible = false;
        this.syncCreatProjectDetailDisplay = true;
      },
      getprojectId () {
        this.project.project_id = this.$route.query.project_id || '';
      },
      // 获取微信或者ios传过来的数据
      getWxosProjectData () {
        var getOneUserInfo = new Promise((resolve, reject) => {
          // 做一些异步操作
          if (localStorage.credential === undefined || localStorage.credential === '' || localStorage.credential == null) {
            resolve(1);
          } else {
            this.$http.post(this.URL.getWxosProjectData, {credential: localStorage.credential})
              .then(res => {
                let data = res.data.project;
                this.project.pro_area.pid = data.pro_area_province;
                localStorage.pid = data.pro_area_province;
                this.area1Change(data.pro_area_province);// 取到省级设置市级
                this.project.pro_area.area_id = data.pro_area_city;
                if (data.length !== 0) {
                  for (let i = 0; i < data.industry.length; i++) {
                    data.industry[i] = Number.parseInt(data.industry[i]);
                  }
                  this.project.pro_industry = data.industry;
                  if (data.is_exclusive === 4) data.is_exclusive = 0;
                  this.project.is_exclusive = Number.parseInt(data.is_exclusive);
                  if (data.pro_finance_scale === 0) this.project.pro_finance_scale = '';
                  else this.project.pro_scale.scale_id = data.pro_finance_scale;
                  if (data.pro_finance_stage === 0) this.project.pro_stage = {stage_id: ''};
                  else this.project.pro_stage.stage_id = data.pro_finance_stage;
//                  this.project.goodness = {
//                    pro_goodness: {goodness_title: '项目亮点', goodness_desc: data.pro_goodness},
//                    pro_market_genera: {goodness_title: '', goodness_desc: ''},
//                    pro_business_model: {goodness_title: '', goodness_desc: ''},
//                    pro_service: {goodness_title: '', goodness_desc: ''}
//                  };
                  this.project.pro_intro = data.pro_intro || '';
                  this.project.pro_name = data.pro_name || '';
                  this.project.pro_company_name = data.pro_company_name || '';
                  this.project.pro_finance_stock_after = data.pro_finance_stock_after || '';
                  localStorage.credential = '';
                }
                resolve(1);
              })
              .catch(err => {
                console.log(err);
              });
            return getOneUserInfo;
          }
        });
        // 微信进入的时候获取
      }
    },
    created () {
      getTop();
      this.loading = true;
      this.getprojectId();
      this.$global.func.getWxProjectCategory()
        .then((data) => {
          this.loading = false;
          return this.getWxProjectCategory();
        })
        .then((data) => {
          return this.getWxosProjectData();
        });
      if (this.planList.length !== 0) this.planButton = false;
      else this.planButton = true;
    },
    components: {
      synccreatprojectdetail
    }
  };
</script>

<style lang="less">
  @import '../../../assets/css/edit.less';
  .toButton{
    position: fixed;bottom:0px;left: 0px;
    background-color:rgba(255,255,255,0.2);
    box-shadow:0 -2px 4px 0 rgba(64,88,122,0.10);
    width:100%;
    height: 68px;
    display: inline-block;
    padding-top: 15px;
    padding-left: 270px;
  }
  .Upload{
    .el-upload{

    }
    .el-upload-list__item{
      /*    width: 200px;*/
    }
    .el-upload-list__item-name{
      font-size:14px;
      color:#475669;
      letter-spacing:0;
      text-decoration:underline
    }
    .el-upload__tip{
      width:539px;
      margin-left: 19px;
      height: 36px;
      font-size:12px;
      color:#5e6d82;
    }
    .el-upload__tip{
      margin-top: 0;
    }

  }
  .el-dialog--tiny{
    width: 390px;
  }
  .el-dialog__body{
    font-size:14px;
    color:#475669;
    letter-spacing:0;
    line-height:21px;
  }
  .el-upload-list__item:first-child{
    margin-top:0px;
  }
  .el-upload-list__item{
    margin-top:0px;
    line-height:1;
  }
  .el-radio{
    padding-right: 15px;
  }

  .edit-page .right-wrap{

  }
  .el-form-item{
    /*margin-bottom: 32px !important;*/
  }
  .lin{
    line-height: 16px!important;
  }
  .goodness .el-form-item__error{
    top:83%!important;
  }
  .goodness .el-input__inner{
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .marginAuto{
    display: block;
    margin: 0 auto;
    width: 246px;
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
</style>
