<template>
  <div id="researchAlone" class="clearfix" v-loading.fullscreen.lock="loading"
       element-loading-text="拼命加载中">
    <!--===========================================一键尽调单独页面=============================================-->
      <div class="contain-grid contain-center1 fl dialog" >
        <div class="contain-inner">
          <div class="item-lists1" v-if="!empty">
            <!--项目信息-->
            <div style="height: 24px;"></div>
            <div class="item2">
              <div class="title">项目信息</div>
              <div v-for="project1 in project" class="clearfix" style="margin-bottom: 20px;">
                <div class="portrait fl">
                  <img src="../../assets/images/logo.png" v-if="project1.project_logo==''">
                  <img :src="project1.project_logo" v-else>
                </div>
                <div class="portrait-right fl ">
                  <div class="block clearfix" style="display: block">
                    <span class="block-title fl">{{project1.project_name}}</span>
                    <span class="line1 fl"> | </span>
                    <span class="block-company fl">{{project1.company_name}}</span>
                    <span class="block-tag fl" v-if="project1.project_state!=null"><el-tag type="primary" v-if="project1.project_state!=''" >{{project1.project_state}}</el-tag><!--<el-tag type="success">{{project1.project_industry}}</el-tag>--></span>
                  </div>
                  <div class="block clearfix" style="margin-bottom: 20px;display: block">
                    <div class="doc fl">{{project1.project_introduce}}</div>
                  </div>
                  <div class="block clearfix" style="height: 24px;display: block">
                    <span class="mid-tag" v-for="pro in project1.project_industry" v-if="project1.project_industry!=''">{{pro}}</span>
                </div>
                </div>
                <div class="tag" style="padding-top: 20px;    display: inline-block;">
                  <span class="tag-bottom" style="margin-right: 11px;" v-if="project1.project_label!=''"><img src="../../assets/images/tag2.png"></span>
                  <span class="tag-bottom" v-if="project1.project_label!=''">{{project1.project_label}}</span>

                  <span class="url fr" v-if="project1.project_website!=''"><img src="../../assets/images/tag3.png" >
                    <a :href="project1.project_website" target="_Blank">{{project1.project_website}}</a>
                  </span>
                </div>
              </div>
            </div>
            <!--公司信息-->
            <div class="item">
              <company-message :com-message="comMessage"></company-message>
            </div>
            <!--工商信息-->
            <div class="item">
              <business style="position: relative" :bus-data="busData"></business>
            </div>
            <!--核心成员-->
            <div class="item clearfix" v-if="team.length!=0">
              <div class="clearfix">
                <div class="title">核心成员</div>
                <div class="border clearfix" v-for="teamin in team">
                  <div class="portrait fl clearfix">
                    <img :src="teamin.team_member_photo" v-if="teamin.team_member_photo!=''">
                    <img src="../../assets/images/logo.png" v-else>
                  </div>
                  <div class="portrait-right fl ">
                    <div class="block clearfix" style="display: block">
                      <span class="block-title fl clearfix">{{teamin.team_member_name}}</span>
                      <span class="block-company fl">{{teamin.team_member_position}}</span>
                    </div>
                    <div class="block" style="display: block">
                      <span class="doc fl">{{teamin.team_member_introduce}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!--历史融资-->
            <div class="item" v-if="history_finance.length!=0">
              <div class="title">历史融资</div>
              <div class="lists">
                <div class="list" v-for="history in history_finance">
                    <span class="radio_line fl">
                      <span class="radio"></span>
                      <!--<span class="l-line"></span>-->
                    </span>
                  <span class="date fl">{{history.history_financing_time | timeToReallTime}}</span>
                  <span class="blood fl">{{history.history_financing_money}}</span>
                  <span class="blood1 fl">{{history.history_financing_rounds}}</span>
                  <span class="main fl">{{history.history_financing_who}}</span>
                </div>
              </div>
            </div>
            <!--里程碑-->
            <div class="item"  v-if="milestone_list.length!=0">
              <div class="title">里程碑</div>
              <div class="lists">
                <div class="list" v-for="milestone in milestone_list">
                    <span class="radio_line">
                      <span class="radio"></span>
                    </span>
                  <span class="date">{{milestone.milestone_time | timeToReallTime}}</span>
                  <span class="blood blood2">

                    <el-tooltip placement="top" :disabled="milestone.milestone_event.length > 40 ? false:true">
                      <div slot="content">{{milestone.milestone_event}}</div>
                      <i>{{milestone.milestone_event}}</i>
                    </el-tooltip>
                  </span>
                </div>
              </div>
            </div>
            <!--新闻-->
            <div class="item" v-if="news.length!=0">
              <div class="title">新闻</div>
              <div class="lists">
                <div class="list" v-for="new1 in news">
                    <span class="radio_line">
                      <span class="radio"></span>
                    </span>
                  <span class="date">{{new1.project_news_time | timeToReallTime}}</span>
                  <span class="dateTag"><el-tag type="primary" style="margin-left: 5px;" v-if="new1.project_news_label">{{new1.project_news_label}}</el-tag></span>
                  <span class="blood blood3">{{new1.project_news_title}}</span>
                  <span class="mian2"><a :href="new1.source" target="_Blank">新闻链接</a></span>
                </div>
              </div>
            </div>
            <!--竞品-->
            <div class="item" v-if="competing.length!=0">
              <div class="title">相似公司</div>
              <ul class="ulfl h-table">
                <li class="table1">项目</li>
                <li class="table2" style="line-height: 40px;">行业</li>
                <li class="table7">成立时间</li>
                <li class="table4">地域</li>
                <li class="table5">最新融资轮次</li>
                <li class="table6" style="line-height: 40px;">最近融资时间</li>
              </ul>
              <div v-for="compet in competing">
                <ul  class="ulfl m-table" @click="toNewOneKey(compet)">
                  <li class="table1">
                    <div class="img fl">
                      <img :src="compet.project_logo" v-if="compet.project_logo!=''">
                      <img src="../../assets/images/logo.png" v-else>
                    </div>
                    <div class="clearfix" style="margin-left: 70px;">
                      <div class="title2">
                        {{compet.project_name}}
                      </div>
                      <div class="bo">
                        {{compet.project_introduce}}<!--介绍-->
                      </div>
                    </div>
                  </li>
                  <li class="table2" style="margin-top: 15px;" v-if="compet.project_industry.length!=0">
                    <div>
                      <i v-for="industr in compet.project_industry">{{industr}}</i>
                    </div>

                  </li>
                  <li class="table2" style="margin-top: 21px;" v-else>----</li>

                  <li class="table7" style="height: 101px;" v-if="compet.company_register_date!=''">{{compet.company_register_date | timeToReallTime}}</li>
                  <li class="table7" style="height: 101px;" v-else>----</li>

                  <li class="table4" style="height: 101px;" v-if="compet.project_location!=''">{{compet.project_location}}</li>
                  <li class="table4" style="height: 101px;" v-else>--</li>

                  <li class="table5" style="height: 101px;" v-if="compet.history_financing_rounds!=''">{{compet.history_financing_rounds}}</li>
                  <li class="table5" style="height: 101px;" v-else>--</li>

                  <li class="table6" style="height: 101px;">
                    <i style="margin-top: 16px;display: inline-block;">{{compet.history_financing_time | timeToReallTime}}</i>
                    <i style="margin-left: 10px;">{{compet.history_financing_money}}</i>
                    <i class="founder">{{compet.history_financing_who}}</i>
                  </li>
                </ul>
                <div class="line2"></div>
              </div>
            </div>
            <!--图表-->
            <div class="item" v-if="chartDataCheck">
              <downloadechart :chart-data="chartData"></downloadechart>
            </div>

          </div>
          <div class="empty fl" v-if="empty">
            <img src="../../assets/images/sorryKong.png">
          </div>
        </div>
      </div>
      <div class="contain-grid contain-right-1 fl"
         v-loading="loading"
         element-loading-text="拼命加载中"
        v-if="includeInvestorMap=='true'">
      <div class="main-box">
        <el-tabs v-model="activeName">
          <el-tab-pane name="1">
            <span slot="label">买家图谱
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content">根据微天使匹配算法从您的人脉库，全网人脉库算出<br/>该项目的意向投资人</div>
                <div class="img"><img src="../../assets/images/why.png"></div>
    </el-tooltip>
            </span>
                <div class="main_right main_left">
                  <div class="item_top">

                  </div>
                  <div class="item_lists">
                    <div class="item_list" v-for="projectMatchInvestor in ProjectMatchInvestors" v-if="ProjectMatchInvestors.length!=0">
                      <div class="list_header">
                        <span class="pipei">匹配度 : </span>
                        <span class="bili">{{projectMatchInvestor.match}}%</span>
                        <span class="pro fr" v-if="projectMatchInvestor.is_follow==1">我的人脉</span>
                        <span class="pro fr" v-if="projectMatchInvestor.is_follow==0">全网人脉</span>
                      </div>
                      <div class="list_main">
                        <div class="click">
                          <div class="block" style="width: 290px;">
                            <span class="name">{{projectMatchInvestor.user_real_name}}</span>
                            <span class="zhiwei">{{projectMatchInvestor.user_company_career}}</span>
                            <span class="imgs" v-if="projectMatchInvestor.user_group!=''"><img src="../../assets/images/renzhen.png"/></span>
                            <span class="ren">{{projectMatchInvestor.user_group}}</span>
                          </div>
                          <div class="block" style="margin-top: 5px;">
                            <span class="company">{{projectMatchInvestor.user_company_name}}</span>
                          </div>
                          <div class="block" style="margin-top: 42px;">
                            <span class="company ft13">投资领域：<i v-for="industry in projectMatchInvestor.user_invest_industry" :class="{ newColor: industry.is_match==1 }">{{industry.industry_name}}、</i></span>
                          </div>
                          <div class="block" style="margin-top: 5px;margin-bottom: 14px;">
                            <span class="company ft13">投资轮次：<i v-for="stage in projectMatchInvestor.user_invest_stage" :class="{ newColor: stage.is_match==1 }">{{stage.stage_name}}、</i></span>
                          </div>
                        </div>
                        <div class="img" v-if="projectMatchInvestor.user_avatar_url!=''"><img :src="projectMatchInvestor.user_avatar_url"></div>
                        <div class="img" v-else><span class="header">{{projectMatchInvestor.user_avatar_txt}}</span></div>
                      </div>
                    </div>
                    <div class="emptyImg" v-if="ProjectMatchInvestors.length==0">
                      <img src="../../assets/images/zanwushuju.png">
                    </div>
                    <el-pagination
                      class="pagination fr"
                      small
                      v-if="totalInvestors>5"
                      @current-change="filterChangeInvestors"
                      :current-page.sync="currentPageInvestors"
                      layout="prev, pager, next"
                      :page-size="5"
                      :total="totalInvestors">
                    </el-pagination>
                  </div>
                </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import companyMessage from '@/views/components/onkeyresearch/companyMessage.vue';
  import business from '@/views/components/onkeyresearch/business.vue';
  import downloadechart from '@/views/components/onkeyresearch/downloadEchart.vue';
  import { error } from '@/utils/notification';
  import * as formatData from '@/utils/formatData';
  import { getTop } from '@/utils';
  export default {
    data () {
      return {
        empty: false, // 是否查不到公司
        compName: '', // 一键尽调公司的名称
        com_id: 0, // 公司Id
        conmanyName: '3',
        productMessage: '产品信息',
        //* 项目信息
        project: [
          {
            project_id: 1,
            com_id: 4,
            company_name: '暂无信息',
            project_name: '暂无信息',
            project_industry: '暂无信息',
            project_introduce: '暂无信息',
            project_label: [],
            project_website: '暂无信息',
            project_logo: '',
            project_score: ''
          }
        ],
        //* 产品新闻
        news: [
          /*            {
           project_id: "",//产品ID
           project_news_time: "",//新闻时间
           project_news_label: "",//新闻标签
           project_news_title: "",//新闻标题
           source: ""//资源链接
           } */
        ],
        //* 竞品表
        competing: [
          /* {
           com_id: "",//
           company_name: "微观时空（北京）信息技术有限公司",
           project_id: "",//竞品ID
           project_name: "暂无信息",//竞品名字
           "project_industry": "文化娱乐,媒体及阅读",
           project_logo: "",//竞品LOGO
           "project_industry": "文化娱乐,媒体及阅读",
           company_register_date:'',//时间
           competing_goods_Set_up: "",//竞品成立日期
           history_financing_rounds: "暂无信息",//竞品获投轮次
           competing_goods_region: "暂无信息",//竞品区域
           competing_goods_Financing_amount: "暂无信息",//竞品获投总额
           competing_goods_Financing_time: "暂无信息",//竞品获投时间
           competing_goods_label: "",//竞品标签
           ranking_day: "",//行业内排名
           competing_founder: "",//竞品相似度
           },
           com_id:30900
           company_name:"深圳市蝶讯网科技股份有限公司"
           company_register_date:"1110816000"
           history_financing:{
           com_id:30900
           history_financing_money:"680万人民币"
           history_financing_rounds:"A轮"
           history_financing_time:"1431360000"
           history_financing_who:"力维投资"
           id:47022
           }
           project_date:""
           project_id:43532
           project_industry:"电子商务,垂直类电商,垂直类电商综合"
           project_introduce:"服装资讯图片网"
           project_label:"图片网,服装,资讯"
           project_location_first:""
           project_location_second:""
           project_logo:"http://7xnnx4.com2.z0.glb.qiniucdn.com/f3391e757c1035112b1af03ae5e01c49"
           project_name:"蝶讯网"
           project_score:"581"
           project_state:""
           project_views
           project_website:"http://www.sxxl.com/"
           */
        ],
        //* 历史融资表
        history_finance: [
          /* {
           com_id: "",//公司id
           History_financing_time: "",//融资时间
           History_financing_rounds: "暂无信息",//融资轮次
           History_financing_money: "暂无信息",//融资金额
           History_financing_who: "暂无信息",//融资方
           } */
        ],
        //* 里程碑信息表
        milestone_list: [
          /* {
           project_id: "",//产品ID
           milestone_event: "暂无信息",//里程碑事件
           milestone_time: "暂无信息",//里程碑时间
           } */
        ],
        //* 团队成员
        team: [
          /* {
           project_id: "",//产品ID
           team_member_introduce: "暂无信息",//成员介绍
           team_member_photo: "暂无信息",//成员头像
           team_member_name: "暂无信息",//成员名字
           team_member_position: "暂无信息",//成员职位
           } */
        ],
        loading: false,
        activeName: '1',
        isFollow: -1, // 人脉筛选绑定
        myAllCont: [{
          value: -1,
          label: '全部'
        }, {
          value: 0,
          label: '全网人脉'
        }, {
          value: 1,
          label: '我的人脉'
        }
        ], // 人脉筛选条件
        ProjectMatchInvestors: [
          /*            {
           follow_status:0,
           industry_tag:"暂无匹配",//领域
           investor_career:"暂无匹配",//职位
           investor_company:"暂无匹配",//公司
           investor_desc:"暂无匹配",//介绍
           investor_id:"0",//id
           investor_logo_text:"暂无匹配",//名片名字
           investor_logo_url:"",
           investor_name:"暂无匹配",//名字
           investor_type:2,
           stage_tag:"暂无匹配",//轮次
           user_id: "0",
           match:0,//匹配度
           } */
        ], // 买家图谱数据
        currentPageInvestors: 1, // 当前第几页(买家图谱)
        totalInvestors: 0, // 总数(买家图谱)
        getInvestors: {}, // 获取买家图谱请求参数
        comMessage: {}, // 公司信息
        chartData: [], // 图标数据
        busData: {}, // 工商信息
        chartDataCheck: true, // 图表判断
//        id:'NC81sv9XmvLTsIQ5g7PeHWD0iOySYBrtAHC5M5poeOlkITcTYTChn92kadP9Kau8',
        id: '',
        includeInvestorMap: false
      };
    },
    methods: {
      getCrawlerTeam () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.$http.post(this.URL.getCrawlerTeam, {
            com_id: this.com_id
          })
            .then(res => {
              this.team = res.data.data;
              resolve(1);
            })
            .catch(err => {
              console.log(err);
              this.loading = false;
              this.loading = false;
            });
        });
      }, // 获取核心成员
      getCrawlerHistoryFinance () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.$http.post(this.URL.getCrawlerHistoryFinance, {
            com_id: this.com_id
          })
            .then(res => {
              let data = res.data.data;
              this.history_finance = data;
              resolve(1);
            })
            .catch(err => {
              console.log(err);
              this.loading = false;
            });
        });
      }, // 获取历史融资
      getCrawlerMilestone () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.$http.post(this.URL.getCrawlerMilestone, {
            com_id: this.com_id
          })
            .then(res => {
              let data = res.data.data;
              this.milestone_list = data;
              resolve(1);
            })
            .catch(err => {
              console.log(err);
              this.loading = false;
            });
        });
      }, // 获取里程碑
      getCrawlerNews () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.$http.post(this.URL.getCrawlerNews, {
            com_id: this.com_id
          })
            .then(res => {
              let data = res.data.data;
              this.news = data;
              resolve(1);
            })
            .catch(err => {
              console.log(err);
              this.loading = false;
            });
        });
      }, // 获取新闻
      getCrawlerCompeting () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.$http.post(this.URL.getCrawlerCompeting, {
            com_id: this.com_id
          })
            .then(res => {
              let data = res.data.data;
              this.competing = this.setCrawlerCompeting(data);
              this.loading = false;
              resolve(1);
            })
            .catch(err => {
              console.log(err);
              this.loading = false;
            });
        });
      }, // 获取竞品

      getCrawlerCompany () {
        let compName = this.compName;
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.$http.post(this.URL.getCrawlerCompany, {
            company_name: compName})
            .then(res => {
              let data = res.data.data;
              if (data.length === 0) { // 搜索不到信息
                error('匹配不到当前公司');
              } else { // 搜索到了
                this.comMessage = data;
                resolve(1);
              }
            })
            .catch(err => {
              error('请求失败');
              console.log(err);
              this.loading = false;
            });
        });
      }, // 查询公司信息

      setCrawlerCompeting (arr) {
        let newArr = [];
        arr.forEach((x) => {
          let obj = {};
          obj.com_id = x.com_id;
          obj.company_name = x.company_name;
          obj.company_register_date = x.company_register_date;
          obj.history_financing_money = x.history_financing.history_financing_money || '';
          obj.history_financing_rounds = x.history_financing.history_financing_rounds || '';
          obj.history_financing_time = x.history_financing.history_financing_time || '';
          obj.history_financing_who = x.history_financing.history_financing_who || '';
          obj.project_industry = x.project_industry.split(',');
          obj.project_introduce = x.project_introduce;
          obj.project_label = x.project_label;
          obj.project_logo = x.project_logo;
          obj.project_name = x.project_name;
          obj.project_website = x.project_website;
          obj.project_location = x.project_location || '';
          newArr.push(obj);
        });
        return newArr;
      }, // 设置竞品
      getCrawlerProject () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.$http.post(this.URL.getCrawlerProject, {
            com_id: this.com_id
          })
            .then(res => {
              if (res.data.status_code === 2000000) {
                this.getProjectIndustry(res.data.data);
                this.project = res.data.data;
                this.chartData = res.data.data;
                this.getCrawlerProjectChart(res.data.data);
              } else {
                this.chartDataCheck = false;
              }
            })
            .catch(err => {
              console.log(err);
              this.loading = false;
            });
          resolve(1);
        });
      }, // 获取项目(和图表数据)
      getCrawlerProjectChart (data) {
        if (data.length === 0) this.chartDataCheck = false;
        if (data[0].project_views !== '') {
          this.chartDataCheck = true;
        } else {
          this.chartDataCheck = false;
        }
      }, // 判断图标数据为空吗
      getProjectIndustry (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].project_industry = data[i].project_industry.split(',');
        }
      }, // 设置数据

      // 买家图谱
      setProjectMatchInvestors (arr) {
        let newArr = [];
        arr.forEach((x) => {
          let obj = {};
          obj.match = x.match;
          obj.user_avatar_url = x.user_avatar_url;
          obj.user_avatar_txt = formatData.setUrlChange(x.user_avatar_url, x.user_real_name);
          obj.user_real_name = x.user_real_name;
          obj.user_company_career = x.user_company_career;
          obj.user_company_name = x.user_company_name;
          obj.user_invest_industry = x.user_invest_industry;
          obj.user_invest_stage = x.user_invest_stage;
          obj.user_group = formatData.setTagToString(x.user_group, 'group_title');
          newArr.push(obj);
        });
        return newArr;
      }, // 设置买家图谱列表
      getInvestorMatch () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          if (this.includeInvestorMap === 'true') {
            this.currentPageInvestors = 1;
            this.getInvestors.id = this.id;
            this.getInvestors.page = 1;
            this.getInvestors.company_name = this.compName;
            this.$http.post(this.URL.investorMatch, this.getInvestors)
              .then(res => {
                if (res.data.status_code === 2000000) {
                  let data = res.data.data;
                  this.ProjectMatchInvestors = this.setProjectMatchInvestors(data);
                  this.totalInvestors = res.data.count;
                  resolve(6);
                }
              })
              .catch(err => {
                console.log(err);
                this.loading = false;
              });
          }
        });
      }, // 买家图谱列表
      filterChangeInvestors (page) {
        getTop();
        this.loading = true;
        this.currentPageInvestors = page;
        this.getInvestors.id = this.id;
        this.getInvestors.page = page;
        this.getInvestors.company_name = this.compName;
        this.$http.post(this.URL.investorMatch, this.getInvestors)
          .then(res => {
            if (res.data.status_code === 2000000) {
              let data = res.data.data;
              this.ProjectMatchInvestors = this.setProjectMatchInvestors(data);
              this.totalInvestors = res.data.count;
            }
            this.loading = false;
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
            error('加载超时');
          });
      }, // 控制买家图谱页码

      getCrawlerBrand () {
        return new Promise((resolve, reject) => {
          this.$http.post(this.URL.getCrawlerBrand, {
            com_id: this.com_id
          })
            .then(res => {
              let data = res.data.data;
              this.busData = data;
              resolve(1);
            })
            .catch(err => {
              console.log(err);
              this.loading = false;
            });
        });
      }, // 获取商标信息

      toNewOneKey (data) {
        const companyName = data.company_name.toString();
        const openUrl = this.URL.openUrl;
        const url = encodeURI(openUrl + '?company=' + companyName + '&id=' + this.id + '&includeInvestorMap=' + this.includeInvestorMap);
        window.open(url);
      }, // 跳转到新的一键尽调
      getRouter () {
        return new Promise((resolve, reject) => {
          getTop();
          this.loading = true;
          const routerCompany = decodeURI(this.$route.query.company) || '';
          this.includeInvestorMap = decodeURI(this.$route.query.includeInvestorMap) || '';
          this.compName = decodeURI(this.$route.query.company) || '';
          this.id = this.$route.query.id || '';
          if (routerCompany === '') {
            error('请填写公司名称');
            this.empty = true;
            this.loading = false;
          } else {
            this.$http.post(this.URL.selectCompanyByName, {user_id: localStorage.user_id, company_name: routerCompany, id: this.id})
              .then(res => {
                let data = res.data.data;
//                console.log(res);
                if (res.data.status_code === 2000000) {
                  this.com_id = data[0].com_id;
                  this.empty = false;
                  resolve(1);
                } else {
                  error(res.data.error_msg);
                  this.empty = true;
                  this.loading = false;
                }
              })
              .catch(err => {
                error('请求失败');
                console.log(err);
                this.loading = false;
                this.empty = true;
              });
          }
        });
      }// 获取API请求的数据
    },
    computed: {},
    components: {
      companyMessage,
      business,
      downloadechart
    },
    created () {
      getTop();
      this.getRouter()
        .then((data) => {
          return this.getCrawlerProject();
        })
        .then((data) => {
          return this.getCrawlerCompany();
        })
        .then((data) => {
          return this.getCrawlerBrand();
        })
        .then((data) => {
          return this.getCrawlerHistoryFinance();
        })
        .then((data) => {
          return this.getCrawlerMilestone();
        })
        .then((data) => {
          return this.getCrawlerNews();
        })
        .then((data) => {
          return this.getCrawlerTeam();
        })
        .then((data) => {
          return this.getCrawlerCompeting();
        })
        .then((data) => {
          return this.getInvestorMatch();
        });
    }
  };
</script>

<style lang="less">
  @import '../../assets/css/onekeyresearchAlone.less';
  .el-carousel__item img {
    width: 100%;
  }

</style>
