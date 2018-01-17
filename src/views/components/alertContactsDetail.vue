<template>
  <div id="alertContactsDetail" >
    <!--===========================================人脉详情弹窗=============================================-->
    <el-dialog :visible="contactDisplay" custom-class="dialogCon" :before-close="closeContact" close-on-press-escape :close-on-click-modal="close"
               v-loading="loading"
               element-loading-text="拼命加载中">
      <div class="contain-grid contain-center3 fl">
        <div class="main-box clearfix">
          <div class="item-lists clearfix">
            <div class="item-list item-lists-top clearfix">
              <div class="item">
                <div class="name fl">{{contacts.user_real_name}}</div>
                <div class="career fl">{{contacts.user_company_career}}</div>
              </div>
              <div class="item">
                <div class="nick fl">{{contacts.user_nickname}}</div>
              </div>
              <div class="item" style="margin-bottom: 55px;">
                <div class="title">{{contacts.card_nickname}}</div>
              </div>
              <div class="header fr" v-if="contacts.user_avatar_url!=''">
                <img :src="contacts.user_avatar_url">
              </div>
              <div class="header fr" v-else>
                <span class="change">{{contacts.user_avatar_txt}}</span>
              </div>
              <div class="item com"><img src="../../assets/images/company.png">{{contacts.user_company_name}} | {{contacts.user_brand}}</div>
              <div class="item com"><img src="../../assets/images/phone.png">{{contacts.user_mobile}}</div>
              <div class="item com" style="width: 780px;">
                <img src="../../assets/images/email.png">{{contacts.user_email}}
                <!--<div class="fr" v-if="contacts.import_user_name !== ''" style="color: #8492A6">-->
                  <!--来源: {{contacts.import_user_name}}-->
                <!--</div>-->
              </div>
            </div>
            <div class="item-list item-list-main">
              <!--个人标签-->
              <div class="item" v-if="contacts.user_invest_tag.length !==0 ">
                <div class="block clearfix" style="margin-bottom: 33px;">
                  <span class="title fl"><img class="img1" src="../../assets/images/tag.png">个人标签</span>
                </div>
                <div class="block">
                  <div class="tag" style="margin-top: 12px" v-for="tag in contacts.user_invest_tag">{{tag.tag_name}}</div>
                </div>
              </div>
              <!--项目库-->
              <div class="item" v-if="projectLists.length !==0 ">
                <div class="block clearfix" style="margin-bottom: 33px;">
                  <span class="title fl"><img class="img1" src="../../assets/images/projectColl.png">项目库</span>
                </div>
                <div class="ul_lists clearfix" v-loading.body="loading1" element-loading-text="拼命加载中">
                  <div class="list" v-for="projectList in projectLists" >
                    <div class="li title" style="line-height: 24px;width: 292px;">{{projectList.pro_intro}}</div>
                    <div class="img" v-show="projectList.is_exclusive=='独家'"><img src="../../assets/images/dujia.png"></div>
                    <div class="img" v-show="projectList.is_exclusive=='非独家'"><img src="../../assets/images/feidujia.png"></div>
                    <div class="li">
                      <span class="tags" v-for="industry in projectList.pro_industry">{{industry}}</span>
                    </div>
                    <div class="li" style="margin-top: 16px;">
                      <span class="big-tag" v-show="projectList.pro_scale!='-'">{{projectList.pro_scale}}</span><span class="split"  v-show="projectList.pro_scale!='-'">｜</span>
                      <span class="big-tag" v-show="projectList.pro_finance_stock_after!='-'">{{projectList.pro_finance_stock_after}}%</span><span class="split" v-show="projectList.pro_finance_stock_after!='-'">｜</span>
                      <span class="big-tag" v-show="projectList.pro_stage!='-'">{{projectList.pro_stage}}</span><span class="split" v-show="projectList.pro_stage!='-'">｜</span>
                      <span class="big-tag" v-show="projectList.pro_area!='-'">{{projectList.pro_area}}</span>
                    </div>
                  </div>
                </div>
                <el-pagination
                  class="pagination fr"
                  small
                  @current-change="filterChangeCurrent"
                  :current-page.sync="currentPage"
                  layout="prev, pager, next"
                  :page-size="10"
                  :total="totalData"
                  v-show="listShow">
                </el-pagination>
                <span class="b-hander" @click="closeDiv('listShow')" v-show="listShow">收起</span>
                <span class="b-hander" @click="openDiv('listShow')" v-show="!listShow">展开</span>
              </div>
              <!--投资案例-->
              <div class="item" v-if="contacts.project_case.length !==0 ">
                <div class="block clearfix" style="margin-bottom: 33px;">
                  <span class="title fl"><img class="img1" src="../../assets/images/anli.png">投资案例</span>
                </div>
                <div class="block lh" v-for="cased in contacts.project_case">
                  <span class="radio" style=" line-height: 14px;"><img src="../../assets/images/radioTag.png"></span>
                  <span class="time" style="margin-left: 15px">{{cased.case_deal_time | timeToReallTime}}</span>
                  <span class="tag_To">{{cased.case_stage_name}}</span>
                  <span class="title1">{{cased.case_name}}</span>
                  <span class="title2">{{cased.case_money}}万元</span>
                  <span class="tags_To">{{cased.has_many_industry}}</span>
                  <span class="address">{{cased.has_one_city}}</span>
                </div>
              </div>
              <!--个人描述-->
              <div class="item" v-if="contacts.user_intro !== ''">
                <div class="block clearfix" style="margin-bottom: 33px;">
                  <span class="title fl"><img class="img1" src="../../assets/images/miaoshu.png">个人描述</span>
                </div>
                <div class="block">
                  <div class="main">
                    {{contacts.user_intro}}
                  </div>
                </div>
              </div>
              <!--推荐理由-->
              <div class="item" v-if="contactDeatil.type !== 'userInfo'">
                <div class="block clearfix" style="margin-bottom: 33px;">
                  <span class="title fl"><img class="img1" src="../../assets/images/tag.png">推荐理由</span>
                </div>
                <div class="block clearfix">
                  <div class="main reason_padd clearfix">
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
                  </div>
                </div>
              </div>
              <!--投资需求-->
              <div class="item" v-if="user_invest">
                <div class="block clearfix" style="margin-bottom: 33px;">
                  <span class="title fl"><img class="img1" src="../../assets/images/money2.png">投资需求</span>
                </div>
                <div class="block tit clearfix" v-if="contacts.user_invest_industry_string!=''">
                  <div class="tit_left fl">投资领域 ： </div>
                  <div class="tit_right fl">{{contacts.user_invest_industry_string}}</div>
                </div>
                <div class="block tit clearfix" v-if="contacts.user_invest_stage_string!=''">
                  <div class="tit_left fl">投资轮次 ： </div>
                  <div class="tit_right fl">{{contacts.user_invest_stage_string}}</div>
                </div>
                <div class="block tit clearfix" v-if="contacts.user_invest_scale_string!=''">
                  <div class="tit_left fl">投资金额 ： </div>
                  <div class="tit_right fl">{{contacts.user_invest_scale_string}}</div>
                </div>
                <div class="block tit clearfix" v-if="contacts.user_invest_desc!=''">
                  <div class="tit_left fl">具体描述 ： </div>
                </div>
                <div class="block" v-if="contacts.user_invest_desc!=''">
                  <div class="tit_mian">{{contacts.user_invest_desc}}</div>
                </div>
              </div>
              <!--资源需求-->
              <div class="item" v-if="user_resource">
                <div class="block clearfix" style="margin-bottom: 33px;">
                  <span class="title fl"><img class="img1" src="../../assets/images/ziyuan.png">资源需求</span>
                </div>
                <div class="block tit clearfix" v-if="contacts.user_resource_give_string!=''">
                  <div class="tit_left fl">拥有的资源 ： </div>
                  <div class="tit_right fl">{{contacts.user_resource_give_string}}</div>
                </div>
                <div class="block tit clearfix" v-if="contacts.user_resource_find_string!=''">
                  <div class="tit_left fl">寻求的资源 ： </div>
                  <div class="tit_right fl">{{contacts.user_resource_find_string}}</div>
                </div>
                <div class="block tit clearfix" v-if="contacts.user_resource_desc!=''">
                  <div class="tit_left fl">具体描述 ： </div>
                </div>
                <div class="block" v-if="contacts.user_resource_desc!=''">
                  <div class="tit_mian">{{contacts.user_resource_desc}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import * as formatData from '@/utils/formatData';
  import { isArray } from '@/utils/validata';
  import { error } from '@/utils/notification';
  export default {
    data () {
      return {
        close: false,
        loading: false, // 加载动画
        loading1: false, // 加载动画2
        listShow: true, // 项目库
        currentPage: 1, // 当前第几页
        totalData: 0, // 总数
        tags: {
          changecont: [], // 项目标签新增
          index: '', // 取数据保存的位置
          card_id: ''// 人脉id
        },
        contacts: {
          card_id: '', // id
          user_id: '', // user_id
          user_real_name: '暂无数据', // 姓名
          user_nickname: '暂无数据', // 昵称
          user_mobile: '暂无数据', // 名片手机号
          user_email: '暂无数据', // 邮箱
          user_company_name: '暂无数据 ', // 公司名称
          import_user_name: '暂无数据', // 来源
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
              case_money: '暂无数据', // 钱
              has_many_industry: '暂无数据', // 金融,人工智能
              has_one_city: '暂无数据'// 地区
            }
          ]// 投资案例
        }, // 人脉参数
        projectLists: [
          {
            pro_intro: '暂无数据',
            is_exclusive: '',
            pro_industry: [],
            pro_scale: '暂无数据',
            pro_area: '暂无数据',
            pro_stage: '暂无数据',
            pro_finance_stock_after: '暂无数据'
          }
        ], // 项目列表
        projectListsSmall: [], // 默认2个的表
        projectListsAll: [], // 默认全部的表
        getPra: {}, // 获取项目的请求参数
        user_invest: true, // 投资需求
        user_resource: true// 资源需求

      };
    },
    methods: {
      // 关闭
      closeContact () {
        this.$store.dispatch('contactControl', false);
      },
      openDiv (v) {
        this[v] = true;
        this.projectLists = this.projectListsAll.slice(0);
      },
      closeDiv (v) {
        this[v] = false;
        this.projectLists = this.projectListsSmall.slice(0);
      },
      // 控制项目页码1
      filterChangeCurrent (page) {
        this.getProjectList(page);
      },
      // 设置项目库函数
      setProjectList (data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {};
          obj.pro_intro = data[i].pro_intro || '暂无信息';// 项目介绍
          obj.is_exclusive = data[i].is_exclusive;// 独家/非独家
          obj.pro_industry = formatData.setIdToArr(data[i].pro_industry, 'industry_name') || [];// 项目标签
          obj.pro_stage = formatData.setTagToString(data[i].pro_stage, 'stage_name');

          obj.pro_area = formatData.setTagToString(data[i].pro_area, 'area_title');
          obj.pro_scale = formatData.setTagToString(data[i].pro_scale, 'scale_money');
          if (obj.pro_stage === '') obj.pro_stage = '-';
          if (obj.pro_area === '') obj.pro_area = '-';
          if (obj.pro_scale === '') obj.pro_scale = '-';
          obj.pro_finance_stock_after = data[i].pro_finance_stock_after || '-';// 股权
          arr.push(obj);
        }
        return arr;
      },
      // 获取项目列表
      getProjectList (page) {
        this.loading1 = true;
        this.getPra.user_id = this.contacts.user_id;
        this.currentPage = page;
        this.getPra.page = page;
        if (this.contacts.user_id === 0 || this.contacts.user_id === '') {
          this.projectLists = [];
        } else {
          this.$http.post(this.URL.getProjectList, this.getPra)
            .then(res => {
              let data = res.data.data;
              this.projectListsAll = this.setProjectList(data);
              this.projectListsSmall = this.setProjectList(data).slice(0, 2);
              if (this.listShow) this.projectLists = this.projectListsAll.slice(0);
              else this.projectLists = this.projectListsSmall.slice(0);
              this.totalData = res.data.count;
            })
            .catch(err => {
              console.log(err);
            });
          this.loading1 = false;
        }
      },
      // 设置投资案例
      setProjectCase (arr) {
        let newArr = [];
        if (isArray(arr)) {
          arr.forEach((x) => {
            let obj = {};
            obj.case_deal_time = x.case_deal_time;
            obj.case_stage_name = x.case_stage_name;
            obj.case_name = x.case_name;
            obj.case_money = x.case_money;
            obj.has_many_industry = formatData.setTagToString(x.has_many_industry, 'industry_name');
            obj.has_one_city = x.has_one_city.area_title;
            newArr.push(obj);
          });
        };
        return newArr;
      },
      // 获取个人详情
      getOneUserInfo () {
        this.loading = true;
        this.$http.post(this.URL.getOneUserInfo, {
          user_id: localStorage.user_id,
          card_id: this.contactDeatil.cardId,
          investor_user_id: this.contactDeatil.userId,
          type: this.contactDeatil.userType})
          .then(res => {
            let data = res.data.data;
            if (res.data.status_code === 2000000) {
              this.setUserInfo(data);
            } else {
              error(res.data.error_msg);
              this.$store.dispatch('contactControl', false);
            }
          })
          .catch(err => {
            console.log(err);
          });
        this.loading = false;
      },
      // 投资人详情 => 买家图谱需要的
      getInvestorInfo () {
        this.loading = true;
        this.$http.post(this.URL.getInvestorInfo, {
          user_id: localStorage.user_id,
          investor_id: this.matchInvestorsData.investor_id,
          project_id: this.projectMessage.projectId})
          .then(res => {
            let data = res.data.data;
            if (res.data.status_code === 2000000) {
              this.setUserInfo(data);
            } else {
              error(res.data.error_msg);
              this.$store.dispatch('contactControl', false);
            }
          })
          .catch(err => {
            console.log(err);
          });
        this.loading = false;
      },
      // 设置数据
      setUserInfo (data) {
        data.user_invest_industry_string = formatData.setTagToString(data.user_invest_industry, 'industry_name');
        data.user_invest_stage_string = formatData.setTagToString(data.user_invest_stage, 'stage_name');
        data.user_invest_scale_string = formatData.setTagToString(data.user_invest_scale, 'scale_money');
        data.user_resource_find_string = formatData.setTagToString(data.user_resource_find, 'resource_name');
        data.user_resource_give_string = formatData.setTagToString(data.user_resource_give, 'resource_name');
        data.user_avatar_txt = formatData.setUrlChange(data.user_avatar_url, data.user_real_name);
        data.match_weight = Number.parseFloat(data.match_weight) || 0;
        // 数据组用户
        if (data.investor_source === 'member_id') {
          this.user_invest = false;// 投资需求
          this.user_resource = false;// 投资需求
          data.project_case = []; // 投资案例
          data.projectLists = []; // 投资案例
          data.user_invest_industry = [];
          data.user_invest_stage = [];
          data.user_invest_scale = [];
          data.user_resource_find = [];
          data.user_resource_give = [];
          data.user_invest_tag = [];
          data.user_intro = '';
          data.import_user_name = '';
        } else {
          data.project_case = this.setProjectCase(data.project_case);
          if (data.user_invest_industry_string === '' && data.user_invest_stage_string === '' && data.user_invest_scale_string === '' && data.user_invest_desc === '') {
            this.user_invest = false;// 投资需求
          } else {
            this.user_invest = true;// 投资需求
          }
          if (data.user_resource_give_string === '' && data.user_resource_find_string === '' && data.user_resource_desc === '') {
            this.user_resource = false;// 资源需求
          } else {
            this.user_resource = true;// 投资需求
          }
          data.import_user_name = data.import_user_name === undefined ? '' : data.import_user_name;
          this.tagsValue = formatData.setIdToArr(data.user_invest_tag, 'tag_id');
          this.tags.changecont = formatData.setIdToArr(data.user_invest_tag, 'tag_id');
        }
        this.contacts = data;
      }
    },
    computed: {
      ...mapState({
        contactDeatil: state => state.projectDetails.contactDeatil,
        contactDisplay: state => state.dialogDisplay.contactDisplay,
        projectMessage: state => state.projectDetails.projectMessage,
        matchInvestorsData: state => state.projectDetails.matchInvestorsData
      })
    },
    watch: {
      contactDisplay: function (e) {
        if (e) {
          if (this.contactDeatil.type === 'InvestorInfo') {
            this.getInvestorInfo();
          } else {
            this.getOneUserInfo();
          }
          this.getProjectList(1);
        } else {
          for (let key in this.contacts) {
            if (isArray(this.contacts[key])) {
              this.contacts[key] = [];
            } else {
              this.contacts[key] = '';
              this.contacts['match_weight'] = 0;
            }
          }
        }
      }
    }
  };
</script>

<style lang="less">
  @import '../../assets/css/alertContactsDetail';
</style>

