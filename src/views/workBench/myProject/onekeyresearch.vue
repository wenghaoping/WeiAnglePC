<template>
  <div id="research" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    <!--===========================================一键尽调弹窗=============================================-->
    <el-dialog :visible="searchDisplay" custom-class="dialog" :before-close="goToEdit"
               close-on-press-escape close-on-click-modal lock-scroll>
      <div class="contain-grid" style="width: 893px;">
        <div class="contain-position">
          <p>您要尽调的公司：<span>{{searchCompany.companyName}}</span><button class="fr button" @click="goToEdit">修改公司</button></p>
        </div>
        <div class="contain-inner">
          <div class="item-lists1">
            <!--项目信息-->
            <div class="item2">
              <div class="title">项目信息</div>
              <div v-for="project1 in project" class="clearfix" style="margin-bottom: 20px;">
                <div class="portrait fl">
                  <img src="../../../assets/images/logo.png" v-if="project1.project_logo==''">
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
                  <span class="tag-bottom" style="margin-right: 11px;" v-if="project1.project_label!=''"><img src="../../../assets/images/tag2.png"></span>
                  <span class="tag-bottom" v-if="project1.project_label!=''">{{project1.project_label}}</span>
                  <span class="url fr" v-if="project1.project_website!=''"><img src="../../../assets/images/tag3.png" >
                    <a :href="project1.project_website" target="_Blank">{{project1.project_website}}</a>
                  </span>
                </div>
              </div>
            </div>
            <!--公司信息-->
            <div class="item">
              <company-message :comp-name="searchCompany.companyName" :com-message="comMessage"></company-message>
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
                    <img src="../../../assets/images/logo.png" v-else>
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
                  <span class="date">{{milestone.milestone_time}}</span>
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
                  <span class="date">{{new1.project_news_time}}</span>
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
                <li class="table6"  style="line-height: 40px;">最近融资时间</li>
              </ul>
              <div v-for="compet in competing">
                <ul  class="ulfl m-table" style="cursor: pointer" @click="toNewOneKey(compet.company_name)">
                  <li class="table1">
                    <div class="img fl">
                      <img :src="compet.project_logo" v-if="compet.project_logo!=''">
                      <img src="../../../assets/images/logo.png" v-else>
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
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import companyMessage from '@/views/components/onkeyresearch/companyMessage.vue';
  import business from '@/views/components/onkeyresearch/business.vue';
  import downloadechart from '@/views/components/onkeyresearch/downloadEchart.vue';
  import { setTime } from '@/utils/formatData';
  import { error } from '@/utils/notification';
  export default {
    data () {
      return {
        conmanyName: '3',
        productMessage: '产品信息',
        recruitMessage: '招聘信息',
        recruitData: [{
          position: 'JAVA',
          money: '20-30K',
          experience: '1-2年',
          address: '北京',
          date: '2016-05-04'
        }, {
          position: 'IOS',
          money: '1-2K',
          experience: '1年',
          address: '北京',
          date: '2016-05-04'
        }],

        /* 项目信息 */
        project: [
          {
            project_id: 1,
            com_id: 4,
            company_name: '',
            project_name: '',
            project_industry: '',
            project_introduce: '',
            project_label: [],
            project_website: '',
            project_logo: '',
            project_score: ''
          }
        ],
        /* 产品新闻 */
        news: [
          /* {
           project_id: "",//产品ID
           project_news_time: "",//新闻时间
           project_news_label: "",//新闻标签
           project_news_title: "",//新闻标题
           source: ""//资源链接
           } */
        ],
        /* 竞品表 */
        competing: [
          /* {
           com_id: "",//
           project_id: "",//竞品ID
           competing_goods_name: "微天使平台",//竞品名字
           competing_goods_logo: "",//竞品LOGO
           competing_goods_industry: "医疗健康,医疗器械及硬件",//竞品行业
           competing_goods_Set_up: "2014-07",//竞品成立日期
           competing_goods_Financing_rounds: "战略投资",//竞品获投轮次
           competing_goods_region: "杭州",//竞品区域
           competing_goods_Financing_amount: "亿元及以上人民币",//竞品获投总额
           competing_goods_Financing_time: "2017-07",//竞品获投时间
           competing_goods_label: "",//竞品标签
           ranking_day: "",//行业内排名
           competing_founder: "",//竞品相似度
           } */
        ],
        /* 历史融资表 */
        history_finance: [
          /* {
           com_id: "",//公司id
           History_financing_time: "",//融资时间
           History_financing_rounds: "",//融资轮次
           History_financing_money: "",//融资金额
           History_financing_who: "",//融资方
           } */
        ],
        /* 里程碑信息表 */
        milestone_list: [
          /* {
           project_id: "",//产品ID
           milestone_event: "",//里程碑事件
           milestone_time: "",//里程碑时间
           } */
        ],
        /* 团队成员 */
        team: [
          /* {
           project_id: "",//产品ID
           team_member_introduce: "",//成员介绍
           team_member_photo: "",//成员头像
           team_member_name: "",//成员名字
           team_member_position: "",//成员职位
           } */
        ],
        loading: false,
        comMessage: {}, // 公司信息
        busData: {}, // 工商信息
        chartData: [], // 图标数据
        chartDataCheck: true// 图表判断

      };
    },
    methods: {
      toNewOneKey (data) {
        const oneUrl = this.URL.oneUrl;
        const data11 = encodeURI(data);
        const url = encodeURI(oneUrl + 'onekeyResearch?company=' + data11);
        window.open(url);
      }, // 跳转到新的一键尽调
      goToEdit () {
        this.$store.dispatch('searchControl', false);
        this.$store.dispatch('companySearchControl', true);
      },
      getCrawlerTeam () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.$http.post(this.URL.getCrawlerTeam, {
            user_id: localStorage.user_id,
            com_id: this.searchCompany.companyId
          })
            .then(res => {
              this.team = res.data.data;
              resolve(1);
            })
            .catch(err => {
              console.log(err);
              this.loading = false;
            });
        });
      }, // 获取核心成员
      getCrawlerHistoryFinance () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.$http.post(this.URL.getCrawlerHistoryFinance, {
            user_id: localStorage.user_id,
            com_id: this.searchCompany.companyId
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
            user_id: localStorage.user_id,
            com_id: this.searchCompany.companyId
          })
            .then(res => {
              let data = res.data.data;
              setTime(data, 'milestone_time');
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
            user_id: localStorage.user_id,
            com_id: this.searchCompany.companyId
          })
            .then(res => {
              let data = res.data.data;
              setTime(data, 'project_news_time');
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
            user_id: localStorage.user_id,
            com_id: this.searchCompany.companyId
          })
            .then(res => {
              let data = res.data.data;
              this.competing = this.setCrawlerCompeting(data);
              resolve(1);
            })
            .catch(err => {
              console.log(err);
              this.loading = false;
            });
        });
      }, // 获取竞品
      setCrawlerCompeting (arr) {
        let newArr = [];
        arr.forEach((x) => {
          let obj = {};
          obj.com_id = x.com_id || '';
          obj.company_name = x.company_name || '';
          obj.company_register_date = x.company_register_date || '';
          obj.history_financing_money = x.history_financing.history_financing_money || '';
          obj.history_financing_rounds = x.history_financing.history_financing_rounds || '';
          obj.history_financing_time = x.history_financing.history_financing_time || '';
          obj.history_financing_who = x.history_financing.history_financing_who || '';
          obj.project_industry = x.project_industry.split(',') || [];
          obj.project_introduce = x.project_introduce || '';
          obj.project_label = x.project_label || '';
          obj.project_logo = x.project_logo || '';
          obj.project_name = x.project_name || '';
          obj.project_website = x.project_website || '';
          obj.project_location = x.project_location || '';
          newArr.push(obj);
        });
        return newArr;
      }, // 设置竞品
      getCrawlerProjectChart (data) {
        if (data.length === 0) this.chartDataCheck = false;
        if (data[0].project_views !== '') {
          this.chartDataCheck = true;
        } else {
          this.chartDataCheck = false;
        }
      }, // 获取图表数据变成json
      getCrawlerProject () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.$http.post(this.URL.getCrawlerProject, {
            user_id: localStorage.user_id,
            com_id: this.searchCompany.companyId
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
          resolve(12);
        });
      }, // 获取项目
      getProjectIndustry (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].project_industry = data[i].project_industry.split(',');
        }
      }, // 设置数据
      getCrawlerCompany () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.$http.post(this.URL.getCrawlerCompany, {user_id: localStorage.user_id, company_name: this.searchCompany.companyName})
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
      }, // 查询公司名称公司id
      getCrawlerBrand () {
        return new Promise((resolve, reject) => {
          this.$http.post(this.URL.getCrawlerBrand, {
            user_id: localStorage.user_id,
            com_id: this.searchCompany.companyId
          })
            .then(res => {
              let data = res.data.data;
              this.busData = data;
              resolve(1);
            })
            .catch(err => {
              console.log(err);
            });
        });
      }// 获取商标信息
    },
    computed: {
      ...mapState({
        searchDisplay: state => state.dialogDisplay.searchDisplay,
        searchCompany: state => state.projectDetails.searchCompany
      })
    },
    components: {
      companyMessage,
      business,
      downloadechart
    },
    watch: {
      searchDisplay: function (e) {
        this.loading = true;
        this.getCrawlerCompany()
          .then((data) => {
            return this.getCrawlerTeam();
          })
          .then((data) => {
            return this.getCrawlerProject();
          })
          .then((data) => {
            return this.getCrawlerHistoryFinance();
          })
          .then((data) => {
            return this.getCrawlerBrand();
          })
          .then((data) => {
            return this.getCrawlerMilestone();
          })
          .then((data) => {
            return this.getCrawlerNews();
          })
          .then((data) => {
            this.loading = false;
            return this.getCrawlerCompeting();
          });
      } // 获取公司id
    }
  };
</script>

<style lang="less">
  @import '../../../assets/css/onekeyresearch';
  .el-carousel__item img {
    width: 100%;
  }
  #research{


    .el-tabs__item{
      font-size:18px;
      color:#8492a6;
      line-height:20px;
    }
    .el-tabs__item.is-active{
      color:#1f2d3d;
    }
    .el-tabs__header{
      border:none;
    }
    .el-tabs__active-bar{
      display: none;
    }
  }
</style>
