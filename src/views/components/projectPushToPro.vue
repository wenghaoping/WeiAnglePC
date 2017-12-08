<template>
  <!--项目推送项目入口-->
  <div id="projectPush">
    <el-dialog :visible="projectPushShow2" :before-close="handleClose"
               :close-on-press-escape="close">
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
        <div class="text2">{{project_name}}</div>
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

      <!--我的人脉和全站人脉tab页切换-->
      <el-tabs v-model="activeName" class="el_tab" @tab-click="tabClick" style="position: relative;transition: all 0.5s">
        <!--我的人脉-->
        <el-tab-pane label="我的人脉" name="myContacts">
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
              width="55">
            </el-table-column>
            <!--姓名-->
            <el-table-column
              label="姓名"
              prop="card.user_real_name"
              min-width="100">
              <template slot-scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.card.user_real_name.length > 5 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.card.user_real_name}}</div>
                  </div>
                  <div>
                    {{scope.row.card.user_real_name}}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <!--职位-->
            <el-table-column
              label="职位"
              prop="card.user_company_career"
              min-width="100">
              <template slot-scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.card.user_company_career.length > 5 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.card.user_company_career}}</div>
                  </div>
                  <div>
                    {{scope.row.card.user_company_career}}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <!--公司-->
            <el-table-column
              label="公司"
              min-width="100">
              <template slot-scope="scope" >
                <el-tooltip placement="top" :disabled="scope.row.card.user_company_name.length > 5 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.card.user_company_name}}</div>
                  </div>
                  <div>
                    {{scope.row.card.user_company_name}}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <!--邮箱-->
            <el-table-column
              label="邮箱"
              min-width="100">
              <template slot-scope="scope" >
                <el-tooltip placement="top" :disabled="scope.row.card.user_email.length > 9 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.card.user_email}}</div>
                  </div>
                  <div>
                    {{scope.row.card.user_email}}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <!--领域-->
            <el-table-column
              label="领域"
              min-width="100">
              <template slot-scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.card.user_invest_industry_str.length > 9 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.card.user_invest_industry_str}}</div>
                  </div>
                  <div>
                    {{scope.row.card.user_invest_industry_str}}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <!--匹配度-->
            <el-table-column
              label="匹配度"
              min-width="100">
              <template slot-scope="scope">
                {{scope.row.match}}%
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

        <!--平台推荐投资人-->
        <el-tab-pane label="平台推荐投资人" name="netContacts">
          <div class="hiddenCheckAll"></div>
          <el-table
            ref="netContactsTab"
            :data="netContacts"
            v-loading="loadingNetCon"
            element-loading-text="拼命加载中"
            tooltip-effect="dark"
            style="width: 100%;font-size: 12px;"
            max-height="430"
            @select="netConSelect"
            :row-class-name="tableRowClassName">
            <el-table-column

              type="selection"
              width="55">
            </el-table-column>
            <!--姓名-->
            <el-table-column
              label="姓名"
              min-width="100">
              <template slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.card.user_real_name}}</div>
                  </div>
                  <div>
                    {{scope.row.card.user_real_name}}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <!--职位-->
            <el-table-column
              label="职位"
              min-width="100">
              <template slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.card.user_company_career}}</div>
                  </div>
                  <div>
                    {{scope.row.card.user_company_career}}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <!--公司-->
            <el-table-column
              label="公司"
              min-width="100">
              <template slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.card.user_company_name}}</div>
                  </div>
                  <div>
                    {{scope.row.card.user_company_name}}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <!--邮箱-->
            <el-table-column
              label="邮箱"
              min-width="100">
              <template slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.card.user_email}}</div>
                  </div>
                  <div>
                    {{scope.row.card.user_email}}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <!--领域-->
            <el-table-column
              label="领域"
              min-width="100">
              <template slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.card.user_invest_industry_str}}</div>
                  </div>
                  <div>{{scope.row.card.user_invest_industry_str}}</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <!--匹配度-->
            <el-table-column
              label="匹配度"
              min-width="100">
              <template slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">
                    <div class="tips-txt"  style="color:#FC703E">{{scope.row.match}}</div>
                  </div>
                  <div>
                    {{scope.row.match}}%
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagenav" v-if="netContotalData>10">
            <el-pagination
              small
              @current-change="getNetContacts"
              :current-page.sync="netConcurrentPage"
              :page-size="10"
              layout="total, prev, pager, next"
              :total="netContotalData">
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
        <el-form-item label="正文" prop="main" :rules="[{max:500,message: '最大500个字符',trigger: 'blur'}]">
          <el-input type="textarea"
                    v-model="email.main"
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
  </div>
</template>

<script type="text/ecmascript-6">
  import * as validata from '@/utils/validata';
  import { error, success, warning } from '@/utils/notification';
  export default {
    props: ['projectPushShow2', 'proid', 'proIntro', 'proName', 'emitPush'],
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
        loadingNetCon: false,
        project_name: '', // 项目名称
        project_id: '', // 项目id

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
//        myContactsTab:[],//我的人脉ref存值
//        netContactsTab:[],//全站人脉ref存值
        pushTagMyCon: [], // 处理后的我的人脉存放
        pushTagNetCon: [], // 处理后的全站人脉存放
        pushTagMyConCheckAll: [], // 我的人脉存放用于勾选,(所有)特殊标识存放,每次获取新数据时重置
        pushTagNetConCheckAll: [], // 全站人脉存放用于勾选,(所有)特殊标识存放,每次获取新数据时重置
        pushTagMyConCheck: [], // 我的人脉存放用于勾选,(选中)特殊标识存放,永远存在
        pushTagNetConCheck: [], // 全站人脉存放用于勾选,(选中)特殊标识存放,永远存在

        // 我的人脉数据原始数据
        myContacts: [
          /* {
           card:{
           card_id:"card_id",//
           user_id:"user_id",//
           user_real_name:"翁浩平1",//姓名
           user_company_career:"职位",//职位
           user_company_name:"公司",//公司
           user_email:"123",//邮箱
           user_invest_industry_str:"领域1",//领域
           },
           match:"12",//匹配度
           type:"card",//
           card_index:'1_a'
           } */
        ],
        myContotalData: 0, // 我的人脉总数
        myConcurrentPage: 1, // 我的人脉当前第几页

        // 全站人脉数据原始数据
        netContacts: [
          {
            card: {
              card_id: '', //
              user_id: '', //
              user_real_name: '翁浩平4', // 姓名
              user_company_career: '职位', // 职位
              user_company_name: '公司', // 公司
              user_email: '456', // 邮箱
              user_invest_industry_str: '领域'// 领域
            },
            match: '12', // 匹配度
            type: '', //
            card_index: '2_a'
          }
        ],
        netContotalData: 0, // 全站人脉总数
        netConcurrentPage: 1, // 全站人脉当前第几页

        pushData: [], // 推送的人脉需要的数据保存

        email: {
          title: '', // 邮件标题
          main: ''// 邮件正文
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
        customerAddFormCheck: false// 验证自定义添加人脉规则

      };
    },
    methods: {
      // 标签切换
      tabClick (e) {

      },
      // 搜索人脉
      handleIconClick () {
        this.activeName === 'myContacts' ? this.getMyContacts() : this.getNetContacts();
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
        this.$http.post(this.URL.getConnectUserSortByMatch, {
          user_id: localStorage.user_id,
          project_id: this.project_id,
          search: this.searchInput,
          page: page
        }).then(res => {
          let data = res.data.data;
          if (res.data.status_code === 2000000) {
            this.myContacts = data;
            this.myContotalData = res.data.count;
            data.forEach(x => {
              this.pushTagMyConCheckAll.push(x.card_index);
            });
          } else {
//          console.log(res.data.error_msg)
          }
          this.loadingMyCon = false;
          setTimeout(() => { this.getMyConCheck(); }, 200);
        });
      },
      // 获取全站人脉数据
      getNetContacts (page = 1) {
        this.pushTagNetConCheckAll = [];
        this.loadingNetCon = true;
        this.$http.post(this.URL.getAllConnectUserSortByMatch, {
          user_id: localStorage.user_id,
          project_id: this.project_id,
          search: this.searchInput,
          page: page
        }).then(res => {
          let data = res.data.data;
          if (res.data.status_code === 2000000) {
            this.netContacts = data;
            this.netContotalData = res.data.count;
            data.forEach(x => {
              this.pushTagNetConCheckAll.push(x.card_index);
            });
          }
          this.loadingNetCon = false;
          setTimeout(() => { this.getNetConCheck(); }, 200);
        });
      },
      // 关闭弹框
      handleClose () {
        this.$emit('closeProjectPush2', false);
      },
      // 删除标签
      tagDelete (tag) {
        let indexMyCon = this.pushTagMyCon.indexOf(tag);// 是不是我的人脉选中里的
        let indexNetCon = this.pushTagNetCon.indexOf(tag);// 是不是全网人脉选中里的
        if (indexMyCon !== -1) {
          this.$refs.myContactsTab.toggleRowSelection(this.myContacts[this.pushTagMyConCheckAll.indexOf(tag.card_index)]);// 取消勾选
          this.pushTagMyCon.splice(indexMyCon, 1);// 删除标签
          this.pushTagMyConCheck.splice(indexMyCon, 1);// 删除对应的唯一标识
        } else if (indexNetCon !== -1) {
          this.$refs.netContactsTab.toggleRowSelection(this.netContacts[this.pushTagNetConCheckAll.indexOf(tag.card_index)]);
          this.pushTagNetCon.splice(indexNetCon, 1);
          this.pushTagNetConCheck.splice(indexNetCon, 1);
        }
      },
      // 添加标签
      addTag (data) {
        let activeNameSelect = 'pushTagMyCon';
        let activeNameSelectCheck = 'pushTagMyConCheck';

        this.activeName === 'myContacts' ? activeNameSelect = 'pushTagMyCon' : activeNameSelect = 'pushTagNetCon';

        this.activeName === 'myContacts' ? activeNameSelectCheck = 'pushTagMyConCheck' : activeNameSelectCheck = 'pushTagNetConCheck';

        // 处理成我想要的数据
        let tag = {};
        tag.name = data.card.user_real_name + ' ( ' + data.card.user_email + ' ) ';
        tag.user_real_name = data.card.user_real_name;
        tag.user_company_career = data.card.user_company_career;
        tag.user_company_name = data.card.user_company_name;
        tag.type = 'primary';
        tag.id = (data.type === 'user' ? data.card.user_id : data.card.card_id);
        tag.conType = data.type;
        tag.user_email = data.card.user_email;
        tag.card_index = data.card_index;
        let checkIndex = this[activeNameSelectCheck].indexOf(data.card_index);// 在各自的范围中查找
        checkIndex === -1 ? this[activeNameSelectCheck].push(data.card_index) : this[activeNameSelectCheck].splice(checkIndex, 1);// 如果存在就删除,如果不存在就放进去
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
      // 全网人脉切换时勾选
      getNetConCheck () {
        let pushOnly = this.pushOnly;// 选中唯一标识合集
        pushOnly.forEach(x => {
          let indexNetCon = this.pushTagNetConCheckAll.indexOf(x);// 是不是全网人脉选中里的
          if (indexNetCon !== -1) {
            this.$refs.netContactsTab.toggleRowSelection(this.netContacts[indexNetCon]);
          }
        });
      },
      // 我的人脉选择selection数组,row单个
      myConSelect (selection, row) {
        this.addTag(row);
      },
      // 平台推荐投资人选择
      netConSelect (selection, row) {
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
            console.log(res.data.card_id);
            if (res.data.status_code === 2000000) {
              // 处理成我想要的数据
              let tag = {};
              tag.name = form.name + ' ( ' + form.email + ' ) ';
              tag.type = 'primary';
              tag.id = res.data.card_id;
              tag.conType = 'card';
              tag.user_email = form.email;
              tag.card_index = res.data.card_id + '-' + res.data.investor_id;
              this.pushTagMyConCheck.push(tag.card_index);
              this.pushTagMyCon.push(tag);
              success('人脉添加成功');
              this.$refs['customerAddForm'].resetFields();
              this.customerAddFormDisplay = false;
              this.getMyContacts(1);
            } else {
              error('添加失败');
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
      // 推送
      push () {
        this.pushData = [];// 推送人脉总数
        this.pushTags.forEach(x => {
          this.pushData.push([x.id, x.conType, x.user_email]);// 推送人脉单个参数
        });
        if (this.pushData.length === 0) {
          error('请选择推送人脉');
        } else if (this.pushData.length > this.pushCount) {
          error('推送人数不能超过今日剩余推送次数');
        } else if (this.email.title.length > 100) {
          error('标题不能大于100个字');
        } else if (this.email.main.length > 500) {
          error('正文不能大于500个字');
        } else {
          this.zgClick('推送');
          this.loading = true;
          this.$http.post(this.URL.pushProject, {
            user_id: localStorage.user_id,
            project_id: this.project_id,
            title: this.email.title,
            body: this.email.main,
            receives: this.pushData
          }).then(res => {
            if (res.data.status_code === 2000000) {
              success('推送成功');
              this.$emit('closePreviewANDProjectPush', false);
              this.$emit('openPreview', false);
              this.$emit('previewPush', false);
              this.loading = false;
              this.handleClose();
            } else {
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
        this.pushData = [];// 推送人脉总数
        this.pushTags.forEach(x => {
          this.pushData.push([x.id, x.conType, x.user_email]);// 推送人脉单个参数
        });
        if (this.email.title.length > 100) {
          error('标题不能大于100个字');
        } else if (this.email.main.length > 500) {
          error('正文不能大于500个字');
        } else if (this.pushData.length === 0) {
          error('请先选择推送人脉 ');
        } else if (this.pushData.length > this.pushCount) {
          error('推送人数不能超过今日剩余推送次数');
        } else {
          this.zgClick('预览');
          let targetUser = this.pushTags[0];
          let user = {
            user_real_name: targetUser.user_real_name,
            user_company_career: targetUser.user_company_career,
            user_company_name: targetUser.user_company_name
          };
          if (this.pushCount !== 0) {
            this.$store.state.pushProject.project_id = this.project_id;
            this.$store.state.pushProject.user = user;
            this.$store.state.pushProject.pushMessage.user_id = localStorage.user_id;
            this.$store.state.pushProject.pushMessage.card_id = user.card_id;
            this.$store.state.pushProject.pushMessage.investor_id = user.investor_id;
            this.$store.state.pushProject.pushMessage.email = this.email2.nameEmail;
            this.$store.state.pushProject.pushMessage.title = this.email.title;
            this.$store.state.pushProject.pushMessage.body = this.email.main;
            this.$store.state.pushProject.email.title = this.email.title;
            this.$store.state.pushProject.email.body = this.email.main;
            this.$emit('openPreview', true);
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
        return this.pushbrand + this.user_company_career + this.user_real_name + '推荐项目|微天使乐投平台—互联网化FA平台—AI驱动的智能云投行';
      }
    },
    computed: {
      // 推送总数合并完整数据
      pushTags () {
        return [...this.pushTagMyCon, ...this.pushTagNetCon];
      },
      // 推送总数合并唯一标识
      pushOnly () {
        return [...this.pushTagMyConCheck, ...this.pushTagNetConCheck];
      }
    },
    mounted () {

    },
    created () {

    },
    watch: {
      // 打开该弹框时
      projectPushShow2: function (e) {
        if (e) {
          this.getCheckUserInfo(localStorage.user_id);
          this.project_name = this.proIntro;
          this.project_id = this.proid;
          setTimeout(() => { this.email.title = this.pushTitle(); }, 1000);
          this.getPushCount();
          this.getMyContacts(1);
          setTimeout(() => { this.getNetContacts(1); }, 1000);
        } else {
          this.$refs.myContactsTab.clearSelection();
          this.$refs.netContactsTab.clearSelection();

          this.myContacts = [];
          this.netContacts = [];
          this.pushTagMyCon = [];
          this.pushTagNetCon = [];
          this.pushTagMyConCheckAll = [];
          this.pushTagNetConCheckAll = [];
          this.pushTagMyConCheck = [];
          this.pushTagNetConCheck = [];
        }
      },
      // 项目预览提交推送时,因为数据格式不同,所以回到本页面处理推送
      emitPush: function (e) {
        if (e) {
          this.push();
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
