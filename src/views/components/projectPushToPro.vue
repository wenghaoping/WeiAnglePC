<template>
  <!--项目推送项目入口，多选-->
  <div id="projectPush">
    <el-dialog :visible="projectPushToProDisplay" :before-close="handleClose"
               :close-on-press-escape="close" :close-on-click-modal="close" class="projectPushToProDialog">
      <!--弹窗头部-->
      <span slot="title" class="dialog-title clearfix">
        <div class="lines fl"></div>
        <div class="title fl">项目推送</div>
        <div class="lost fl">今日剩余推送<i>{{pushCount}}</i>次</div>
        <el-tooltip content="Top center" placement="top">
          <div slot="content">每天可以推送5次，1个项目推送给1个投资人计1次，1个项目推送给多个投资人计多次</div>
          <div class="img fl" style="cursor: pointer"><img src="../../assets/images/why.png"></div>
        </el-tooltip>
      </span>

      <!--推送项目名-->
      <div>
        <div class="text1">推送项目</div>
        <div class="text2">{{projectIntro}}</div>
      </div>

      <!--推送人脉-->
      <el-form :inline="true" class="demo-form-inline pushInvestor" label-position="top">
        <el-form-item label="推送人脉">
          <el-input
            style="width: 586px;"
            placeholder="请输入您要推送的投资人"
            icon="search"
            v-model="searchInput"
            :on-icon-click="handleIconClick"
            @keyup.native.enter="handleIconClick">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button style="margin-top: 25px;background: #40587A;border-color:#40587A;" type="primary" @click="customerAdd">自定义添加</el-button>
        </el-form-item>
      </el-form>

      <!--标签放置-->
      <div>
        <el-tag
          v-for="tag in pushTags"
          :key="tag.name"
          :closable="true"
          :close-transition="true"
          :type="tag.type"
          @close="tagDelete(tag)"
          style="margin-right: 10px;margin-bottom: 5px;">
          {{tag.name}}
        </el-tag>
      </div>

      <!--我的人脉tab页切换-->
      <el-tabs v-model="activeName" class="el_tab" style="position: relative;transition: all 0.5s">
        <!--我的人脉-->
        <el-tab-pane label="推荐投资人" name="myContacts">
          <div class="hiddenCheckAll"></div>
          <el-table
            v-loading="loadingMyCon"
            element-loading-text="拼命加载中"
            ref="myContactsTab"
            :data="myContacts"
            tooltip-effect="dark"
            style="width: 100%;font-size: 12px!important;"
            max-height="430"
            @select="myConSelect"
            :row-class-name="tableRowClassName">
            <el-table-column
              type="selection"
              width="35">
            </el-table-column>
            <!--姓名-->
            <el-table-column
              label="姓名"
              prop="investor_name"
              min-width="40">
              <template slot-scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.investor_name.length > 3 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.investor_name}}</div>
                  </div>
                  <div>
                    {{scope.row.investor_name | nullTo_}}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <!--职位-->
            <el-table-column
              label="职位"
              prop="investor_careerr"
              min-width="40">
              <template slot-scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.investor_career.length > 5 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.investor_career}}</div>
                  </div>
                  <div>
                    {{scope.row.investor_career | nullTo_}}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <!--公司-->
            <el-table-column
              label="公司"
              prop="investor_company"
              min-width="50">
              <template slot-scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.investor_company.length > 5 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.investor_company}}</div>
                  </div>
                  <div>
                    {{scope.row.investor_company | nullTo_}}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <!--相似度-->
            <el-table-column
              label="相似度"
              min-width="200">
              <template slot-scope="scope">
                <span>投资人关注领域匹配度（<i style="color: #FC703E">{{scope.row.wts_match_weight}}%</i>）、</span>
                <span>机构投资方向匹配度（<i style="color: #FC703E">{{scope.row.match_weight}}%</i>)</span>
                <span class="fr cursor" style="margin-top: 5px;"><img src="../../assets/images/zhaopian.png" @click="doMouseMove($event, scope.row)"></span>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagenav" v-if="myContotalData>10">
            <el-pagination
              small
              @current-change="getMyContacts"
              :current-page.sync="myConcurrentPage"
              :page-size="10"
              layout="total, prev, pager, next"
              :total="myContotalData">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>

      <!--标题和正文-->
      <el-form label-position="top" label-width="80px" ref="email" :model="email">
        <el-form-item label="标题"
                      prop="title"
                      :rules="[{max:100,message: '最大100个字符',trigger: 'blur'}]"
                      style="margin-top: 30px">
          <el-input v-model="email.title" placeholder="浙江安琪创投-投资VP-杜兴国推荐项目|微天使乐投平台—互联网化FA平台—AI驱动的智能云投行"></el-input>
        </el-form-item>
        <el-form-item label="正文" prop="body" :rules="[{max:500,message: '最大500个字符',trigger: 'blur'}]">
          <el-input type="textarea"
                    v-model="email.body"
                    placeholder="请输入简要项目介绍，作为邮件正文，便于投资人快速了解项目"
                    :autosize="{ minRows: 4, maxRows: 7}"></el-input>
        </el-form-item>
      </el-form>

      <!--按钮组-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="preview">预览</el-button>
        <el-button type="primary" @click="push">推送</el-button>
      </span>
    </el-dialog>

    <!--自定义添加弹框-->
    <el-dialog class="customerAddForm" title="自定义添加" :visible="customerAddFormDisplay" size="small"
               :close-on-click-modal="false" :show-close="false">
      <el-form :model="customerAddForm" ref="customerAddForm">
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email"
                      :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }]">
          <el-input v-model="customerAddForm.email" auto-complete="off" placeholder="请输入邮箱"
                    :rules="[{ required: false}]"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name"
                      :rules="[{required: true, message: '姓名不能为空', trigger: 'blur'},{min: 1, max:20,message: '最大20个字符'}]">
          <el-input v-model="customerAddForm.name" auto-complete="off"
                    placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="mobile" :rules="PhoneRule">
          <el-input v-model="customerAddForm.mobile" auto-complete="off" placeholder="请输入手机"
                    type="number"></el-input>
        </el-form-item>
        <el-form-item label="公司" :label-width="formLabelWidth" prop="company"
                      :rules="[{max:40,message: '最大40个字符',trigger: 'blur'}]">
          <el-input v-model="customerAddForm.company" auto-complete="off" placeholder="请输入公司"></el-input>
        </el-form-item>
        <el-form-item label="品牌" :label-width="formLabelWidth" prop="brand"
                      :rules="[{max:40,message: '最大40个字符',trigger: 'blur'}]">
          <el-input v-model="customerAddForm.brand" auto-complete="off"
                    placeholder="请输入品牌"></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth" prop="career"
                      :rules="[{max:40,message: '最大40个字符',trigger: 'blur'}]">
          <el-input v-model="customerAddForm.career" auto-complete="off"
                    placeholder="请输入职位"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="certainAdd">确 定</el-button>
      </div>
    </el-dialog>

    <!--推送点击弹框-->
    <move-dialog ref="moveDialog" :moveDisplay="moveDisplay" @closeMoveDisplay="closeMoveDisplay" :width="743">
      <div class="reason fl" style="margin-right: 15px;">
        <div class="title inlineBlock">投资人关注领域匹配度</div>
        <el-tooltip class="inlineBlock" effect="dark" placement="top">
          <div slot="content">投资人的投资方向与该项目的相似度</div>
          <span class="icon icon2"><img src="../../assets/images/why.png"/></span>
        </el-tooltip>
        <div class="reason_border" style="margin-top:44px;padding: 10px 17px 0" v-if="user_invest">
          <div class="height" v-if="contacts.user_invest_industry_string!=''">
            <span>投资领域：</span>
            <span v-for="(industry, index) in contacts.user_invest_industry"
                  :key="index" :class="{active_tag : industry.is_match === 1}">
                            {{industry.industry_name}}
                            <i v-if="index + 1 !== contacts.user_invest_industry.length">、</i>
                          </span>
          </div>
          <div class="height" v-if="contacts.user_invest_stage_string!=''">
            <span>投资轮次：</span>
            <span v-for="(stage, index) in contacts.user_invest_stage"
                  :key="index" :class="{active_tag : stage.is_match === 1}">
                            {{stage.stage_name}}
                            <i v-if="index + 1 !== contacts.user_invest_stage.length">、</i>
                          </span>
          </div>
          <div class="height">
            <span>投资地区：</span>
            <span v-for="(area, index) in contacts.user_invest_area"
                  :key="index" :class="{active_tag : area.is_match === 1}">
                            {{area.area_title}}
                            <i v-if="index + 1 !== contacts.user_invest_area.length">、</i>
                          </span>
          </div>
          <div class="height" v-if="contacts.user_invest_scale_string!=''">
            <span>投资金额：</span>
            <span v-for="(scale, index) in contacts.user_invest_scale"
                  :key="index" :class="{active_tag : scale.is_match === 1}">
                            {{scale.scale_money}}<i v-if="index + 1 !== contacts.user_invest_scale.length">、</i>
                          </span>
          </div>
        </div>
        <div class="reason_border" style="margin-top: 44px;" v-else>
          <img src="../../assets/images/zanwuneirong.jpg">
        </div>
      </div>
      <div class="reason fl">
        <div class="title inlineBlock">机构投资方向匹配度</div>
        <el-tooltip class="inlineBlock" effect="dark" placement="top">
          <div slot="content">投资人所属投资机构投过的案例与该项目的相似度</div>
          <span class="icon icon2" style="left: 133px;"><img src="../../assets/images/why.png"/></span>
        </el-tooltip>
        <el-progress :percentage="contacts.match_weight" class="el_pro isSuccess"></el-progress>
        <div class="reason_border" style="margin-top: 14px;">
          <img class="baseimg" :src="contacts.industry_map" v-if="contacts.industry_map !== ''">
          <img class="baseimg" src="../../assets/images/morenIMG.png" v-else>
        </div>
      </div>
    </move-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import * as validata from '@/utils/validata';
  import moveDialog from '@/components/moveDialog/moveDialog.vue';
  import * as formatData from '@/utils/formatData';
  import { error, success, warning } from '@/utils/notification';
  export default {
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
      return {
        searchInput: '', // 输入框搜索
        close: false, // 默认关闭
        loadingMyCon: false,
        // 自定义添加表单数据
        customerAddForm: {
          email: '',
          name: '',
          mobile: '',
          company: '',
          brand: '',
          career: ''
        },
        // 控制自定义添加显示和隐藏
        customerAddFormDisplay: false,
        // 当前激活的tab页
        activeName: 'myContacts',

        formLabelWidth: '74px',
        // 可用推送次数
        pushCount: 0,
        pushTagMyCon: [], // 处理后的我的人脉存放
        pushTagNetCon: [], // 处理后的全站人脉存放
        pushTagMyConCheckAll: [], // 我的人脉存放用于勾选,(所有)特殊标识存放,每次获取新数据时重置
        pushTagNetConCheckAll: [], // 全站人脉存放用于勾选,(所有)特殊标识存放,每次获取新数据时重置
        pushTagMyConCheck: [], // 我的人脉存放用于勾选,(选中)特殊标识存放,永远存在
        pushTagNetConCheck: [], // 全站人脉存放用于勾选,(选中)特殊标识存放,永远存在
        // 我的人脉数据原始数据
        myContacts: [
          {
            investor_career: '暂无数据',
            investor_company: '暂无数据',
            investor_email: '暂无数据',
            investor_id: '暂无数据',
            investor_name: '暂无数据',
            investor_source: 'card_id',
            match_weight: 0.2,
            original_id: '0',
            wts_match_weight: 100
          }
        ],
        myContotalData: 0, // 我的人脉总数
        myConcurrentPage: 1, // 我的人脉当前第几页
        // 邮件推送
        email: {
          title: '', // 邮件标题
          body: ''// 邮件正文
        },
        email2: {
          nameEmail: ''// 人脉的邮箱(一个)
        },
        pushbrand: '',
        user: {
          user_real_name: '',
          user_company_career: '',
          user_company_name: ''
        },
        user_company_name: '',
        user_brand: '',
        user_company_career: '',
        user_real_name: '',
        PhoneRule: { validator: checkPhoneNumber, trigger: 'blur' }, // 电话规则
        customerAddFormCheck: false, // 验证自定义添加人脉规则
        moveDisplay: false, // 移动组件用
        contacts: {
          card_id: '', // id
          user_id: '', // user_id
          user_real_name: '暂无数据', // 姓名
          user_nickname: '暂无数据', // 昵称
          user_mobile: '暂无数据', // 名片手机号
          user_email: '暂无数据', // 邮箱
          user_company_name: '暂无数据 ', // 公司名称
          import_user_name: '', // 来源
          user_brand: '暂无数据', // 品牌
          user_company_career: '暂无数据', // 职位
          user_invest_tag: [], // 人脉标签
          user_avatar_url: '', // 头像URL
          user_invest_industry_string: [], // 领域标签
          user_invest_stage_string: [], // 轮次
          user_invest_scale_string: [], // 投资金额
          user_invest_area: {
            area_id: '',
            area_title: '', // 市级
            pid: ''// 省级
          }, // 所属地区1省级单位
          user_intro: '', // 个人描述
          user_resource_give_string: [], // 提供的资源
          user_resource_find_string: [], // 寻求对接的资源
          user_invest_desc: '', // 投资需求描述
          user_resource_desc: '', // 资源需求描述
          project_case: [
            {
              case_deal_time: 1503936000, // 时间
              case_stage_name: '暂无数据', // 轮次
              case_name: '暂无数据', // 名称
              case_money: '0', // 钱
              has_many_industry: '暂无数据', // 金融,人工智能
              has_one_city: '暂无数据'// 地区
            }
          ]// 投资案例
        }, // 人脉参数
        user_invest: true // 投资需求
      };
    },
    methods: {
      // 搜索人脉
      handleIconClick () {
        this.getMyContacts();
      },
      // 获取可用推送次数
      getPushCount () {
        this.$http.post(this.URL.pushCount, {
          user_id: localStorage.user_id
        }).then(res => {
          if (res.data.status_code === 2000000) {
            this.pushCount = res.data.data.push_count.remain_times;
          }
        });
      },
      // 获取我的人脉数据
      getMyContacts (page = 1) {
        this.pushTagMyConCheckAll = [];
        this.loadingMyCon = true;
        this.$http.post(this.URL.getPushInvestors, {
          user_id: localStorage.user_id,
          project_id: this.projectId,
          search: this.searchInput,
          page: page
        }).then(res => {
          let data = res.data.data;
          if (res.data.status_code === 2000000) {
            this.myContacts = data;
            this.myContotalData = res.data.count;
            data.forEach(x => {
              this.pushTagMyConCheckAll.push(x.investor_id);
            });
          } else {
            error(res.data.error_msg);
          }
          this.loadingMyCon = false;
          setTimeout(() => { this.getMyConCheck(); }, 200);
        });
      },
      // 关闭弹框
      handleClose () {
        this.$store.dispatch('projectPushToProControl', false);
        this.$store.dispatch('clearMessage', false);
        this.$store.dispatch('clearProjectMessage', false);
      },
      // 删除标签
      tagDelete (tag) {
        let indexMyCon = this.pushTagMyCon.indexOf(tag);// 是不是我的人脉选中里的
        if (indexMyCon !== -1) {
          this.$refs.myContactsTab.toggleRowSelection(this.myContacts[this.pushTagMyConCheckAll.indexOf(tag.investor_id)]);// 取消勾选
          this.pushTagMyCon.splice(indexMyCon, 1);// 删除标签
          this.pushTagMyConCheck.splice(indexMyCon, 1);// 删除对应的唯一标识
        }
      },
      // 添加标签
      addTag (data) {
        let activeNameSelect = 'pushTagMyCon';
        let activeNameSelectCheck = 'pushTagMyConCheck';
        // 处理成我想要的数据
        let tag = {};
        tag.name = data.investor_name + ' ( ' + data.investor_email + ' ) ';
        tag.investor_name = data.investor_name;
        tag.investor_career = data.investor_career;
        tag.investor_company = data.investor_company;
        tag.type = 'primary';
        tag.investor_email = data.investor_email;
        tag.investor_id = data.investor_id;
        let checkIndex = this[activeNameSelectCheck].indexOf(data.investor_id);// 在各自的范围中查找
        checkIndex === -1 ? this[activeNameSelectCheck].push(data.investor_id) : this[activeNameSelectCheck].splice(checkIndex, 1);// 如果存在就删除,如果不存在就放进去
        checkIndex === -1 ? this[activeNameSelect].push(tag) : this[activeNameSelect].splice(checkIndex, 1);
      },
      // 我的人脉切换时勾选
      getMyConCheck () {
        let pushOnly = this.pushOnly;// 选中唯一标识合集
        pushOnly.forEach(x => {
          let indexMyCon = this.pushTagMyConCheckAll.indexOf(x);// 是不是我的人脉选中里的
          if (indexMyCon !== -1) {
            this.$refs.myContactsTab.toggleRowSelection(this.myContacts[indexMyCon]);
          }
        });
      },
      // 我的人脉选择selection数组,row单个
      myConSelect (selection, row) {
        this.addTag(row);
      },
      // 自定义添加人脉(跳出弹窗)
      customerAdd () {
        this.zgClick('自定义添加');
        this.customerAddFormDisplay = true;
      },
      // 控制列表颜色
      tableRowClassName (row, index) {
        if (index % 2 === 1) {
          return 'info-row';
        }
        return '';
      },
      // 取消添加自定义人脉
      cancelAdd () {
        this.$refs['customerAddForm'].resetFields();
        this.customerAddFormDisplay = false;
      },
      // 确认添加自定义人脉
      certainAdd () {
        let form = this.customerAddForm;
        this.submitForm('customerAddForm', 'customerAddFormCheck');
        if (!this.customerAddFormCheck) {
          this.$http.post(this.URL.createUserCard, {
            user_id: localStorage.user_id,
            user_email: form.email,
            user_real_name: form.name,
            user_mobile: form.mobile,
            user_company_name: form.company,
            user_company_career: form.career,
            user_brand: form.brand
          }).then(res => {
            if (res.data.status_code === 2000000) {
              // 处理成我想要的数据
              let tag = {};
              tag.name = form.name + ' ( ' + form.email + ' ) ';
              tag.type = 'primary';
              tag.id = res.data.card_id;
              tag.conType = 'card';
              tag.user_email = form.email;
              tag.investor_id = '';
              this.pushTagMyConCheck.push(tag.investor_id);
              this.pushTagMyCon.push(tag);
              success('人脉添加成功');
              this.$refs['customerAddForm'].resetFields();
              this.customerAddFormDisplay = false;
              this.getMyContacts(1);
            } else {
              error(res.data.error_msg);
              this.customerAddFormDisplay = false;
              this.getMyContacts(1);
            }
          });
        }
      },
      // 检查所有必填项目以及获取所有数据/true过.false不过
      submitForm (formName, checkName) {
        this.$refs[formName].validate((valid) => {
          this[checkName] = !valid;
        });
      },
      // 点击推送（项目入口）
      push () {
        let pushData = this.pushTags.map(item => item.investor_id);
        let pushCardData = this.pushTags.map(item => item.id);
        if (pushData.length === 0) {
          error('请选择推送人脉');
        } else if (pushData.length > this.pushCount) {
          error('推送人数不能超过今日剩余推送次数');
        } else if (this.email.title.length > 100) {
          error('标题不能大于100个字');
        } else if (this.email.body.length > 500) {
          error('正文不能大于500个字');
        } else {
          this.zgClick('推送');
          this.loading = true;
          this.$http.post(this.URL.pushProjectToUsers, {
            user_id: localStorage.user_id,
            project_id: this.projectId,
            title: this.email.title,
            body: this.email.body,
            receive_users: pushData,
            card_id: pushCardData
          }).then(res => {
            if (res.data.status_code === 2000000) {
              success('推送成功');
              this.loading = false;
              this.$store.dispatch('projectPushToProControl', false);
            } else {
              error(res.data.error_msg);
              this.loading = false;
            }
          })
            .catch(err => {
              console.log(err);
              this.loading = false;
            });
        }
      },
      // 预览
      preview () {
        console.log(this.pushTags);
        let pushData = this.pushTags.map(item => item.investor_id);
        let pushCardData = this.pushTags.map(item => item.id);
        if (this.email.title.length > 100) {
          error('标题不能大于100个字');
        } else if (this.email.body.length > 500) {
          error('正文不能大于500个字');
        } else if (pushData.length === 0) {
          error('请先选择推送人脉 ');
        } else if (pushData.length > this.pushCount) {
          error('推送人数不能超过今日剩余推送次数');
        } else {
          let targetUser = this.pushTags[0];
          let obj = {
            user_real_name: targetUser.investor_name,
            user_company_career: targetUser.investor_career,
            user_company_name: targetUser.investor_company,
            investor_id: targetUser.investor_id,
            investor_email: targetUser.investor_email
          };
          this.$store.dispatch('setUserMessage', obj);
          if (this.pushCount !== 0) {
            let obj = {
              email: this.email2.nameEmail,
              title: this.email.title,
              body: this.email.body,
              project_id: this.projectId,
              receive_users: pushData,
              card_id: pushCardData
            };
            this.$store.dispatch('setPushMessage', obj);
            this.$store.dispatch('projectPushPreviewControl', true);
          } else {
            warning('您今日的推送次数已用完');
          }
        }
      },
      pushTitle () {
        this.user_company_name = localStorage.user_company_name;
        this.user_brand = localStorage.user_brand;
        this.user_company_career = localStorage.user_company_career === '' ? '' : localStorage.user_company_career + '-';
        this.user_real_name = localStorage.user_real_name;
        if (!this.user_brand) {
          this.pushbrand = this.user_company_name === '' ? '' : this.user_company_name + '-';
        } else {
          this.pushbrand = this.user_brand === '' ? '' : this.user_brand + '-';
        }
        return this.pushbrand + this.user_company_career + this.user_real_name + '推荐项目 | 微天使乐投平台—互联网化FA平台—AI驱动的智能云投行';
      },
      doMouseMove (e, row) {
        this.getInvestorInfo(row);
        this.moveDisplay = true;
        this.$refs.moveDialog.doMouseMove(e);
      },
      closeMoveDisplay (e) {
        this.moveDisplay = e;
      },
      // 投资人详情 => 买家图谱需要的
      getInvestorInfo (row) {
        this.loading = true;
        this.$http.post(this.URL.getInvestorInfo, {user_id: localStorage.user_id, investor_id: row.investor_id, project_id: this.projectId})
          .then(res => {
            if (res.data.status_code === 2000000) {
              this.setUserInfo(res);
            } else {
              error(res.data.error_msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
        this.loading = false;
      },
      // 设置数据
      setUserInfo (res) {
        let data = res.data.data;
        data.user_invest_industry_string = formatData.setTagToString(data.user_invest_industry, 'industry_name');
        data.user_invest_stage_string = formatData.setTagToString(data.user_invest_stage, 'stage_name');
        data.user_invest_scale_string = formatData.setTagToString(data.user_invest_scale, 'scale_money');
        data.user_resource_find_string = formatData.setTagToString(data.user_resource_find, 'resource_name');
        data.user_resource_give_string = formatData.setTagToString(data.user_resource_give, 'resource_name');
        data.user_avatar_txt = formatData.setUrlChange(data.user_avatar_url, data.user_real_name);
        data.match_weight = Number.parseFloat(data.match_weight);
        // 数据组用户
        if (data.investor_source !== 'scrapy_id') {
          if (data.user_invest_industry_string === '' && data.user_invest_stage_string === '' && data.user_invest_scale_string === '' && data.user_invest_desc === '') {
            this.user_invest = false;// 投资需求
          } else {
            this.user_invest = true;// 投资需求
          }
        }
        this.contacts = data;
      }
    },
    computed: {
      // 推送总数合并完整数据
      pushTags () {
        return [...this.pushTagMyCon];
      },
      // 推送总数合并唯一标识
      pushOnly () {
        return [...this.pushTagMyConCheck];
      },
      ...mapState({
        projectPushToProDisplay: state => state.pushProject.projectPushToProDisplay,
        projectId: state => state.projectDetails.projectMessage.projectId,
        projectIntro: state => state.projectDetails.projectMessage.projectIntro,
        matchInvestorsData: state => state.projectDetails.matchInvestorsData
      })
    },
    components: {
      moveDialog
    },
    watch: {
      // 打开该弹框时
      projectPushToProDisplay: function (e) {
        if (e) {
          this.getCheckUserInfo(localStorage.user_id);
          setTimeout(() => { this.email.title = this.pushTitle(); }, 1000);
          this.getPushCount();
          this.getMyContacts(1);
        } else {
          this.$refs.myContactsTab.clearSelection(); // 清空所有勾选
          this.myContacts = [];
          this.pushTagMyCon = [];
          this.pushTagMyConCheckAll = [];
          this.pushTagMyConCheck = [];
          this.contacts = {};
          this.$store.dispatch('clearProjectMessage', true);
        }
      }
    }
  };
</script>

<style lang="less">
  @import '../../assets/css/projectPush';
  .popper {
    display: none;
  }
</style>
