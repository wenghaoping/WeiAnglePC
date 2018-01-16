<template>
  <div  id='mailProjectDetail_type2'  v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    <!--项目详情-->
    <div>
      <!--项目详情-->
      <div class="projectMaid">
        <!--项目卡片-->
        <div class="white">
        <div class="projectCard">
          <div class="mainCard flex">
            <div class="left">
              <img :src="projectDetail.info.project_logo" alt="">
            </div>
            <div class="right">
              <div class="pro_name">{{projectDetail.info.project_name}}</div>
              <div class="pro_intro size_12 color_9">{{projectDetail.info.project_intro}}</div>
              <div class="pro_industry flex">
                <div class="tag" v-for="(tag,index) in projectDetail.info.industry_list">
                  <span class="size_12 color_6 i_tag" style="color: #666;" >{{tag.industry_name}}</span>
                  <span :hidden='index + 1 === projectDetail.info.industry_list.length'>/</span>
                </div>
              </div>
              <div class="stageAndCity color_6" style="color: #666;">
                <span style="color: #666;">{{projectDetail.info.stage_name}}</span>
                &nbsp;·&nbsp;
                <span style="color: #666;">{{projectDetail.info.area_name}}</span>
              </div>
            </div>
          </div>
          <div class="xian123"></div>
          <div class="special_list flex">
            <div class="tag size_12" v-for="tag in projectDetail.info.special_list">
              {{tag.special_name}}
            </div>
          </div>
        </div>
        </div>
        <!--项目介绍-->
        <div class="white1" v-if="projectDetail.info.project_desc" style="margin-top: 16px">
        <div class="projectIntro" >
          <div class="size_15 ">项目介绍</div>
          <div class="projectIntroTitle size12 color_6">{{projectDetail.info.company_name}}</div>
          <div class="projectIntroContent size_14 color_6">
            <div class="content" v-if="moreOrless === '缩起'">{{projectDetail.info.project_desc}}</div>
            <div class="content" v-else>{{new_projectIntro}}</div>
            <div class="show_moreOrless" @click = 'textLengthChange' v-if = 'show_moreOrless'>{{moreOrless}}</div>
          </div>
        </div>
        </div>
        <!--主要产品-->
        <div class="white1" v-if="projectDetail.product_list.total_num !== 0" style="margin-top: 16px">
        <div class="brandList" >
          <div class="main_title flex">
            <div class="text_title ">主要产品</div>
            <div class="showAll" v-if="projectDetail.product_list.length >3">全部&nbsp;({{projectDetail.product_list.total_num}})</div>
          </div>
          <div class="brand flex" v-for="brand in projectDetail.product_list.list">
            <div class="left">
              <img :src="brand.product_logo" alt="">
            </div>
            <div class="right" style="width: 17.5rem;">
              <div>
                <div class="flex">
                  <div class="brand_name size_15">{{brand.product_name}}</div>
                  <div class="brand_type size_12">{{brand.product_type || '应用'}}</div>
                </div>
                <div class="brand_desc size_12 color_9">{{brand.product_introduce}}</div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <!--历史融资-->
        <div class="white1" v-if="projectDetail.history_finance.total_num !== 0" style="margin-top: 16px">
        <div class="financing" >
          <div class="main_title flex">
            <div class="text_title ">历史融资</div>
            <div class="showAll" v-if="projectDetail.history_finance.length >3">全部&nbsp;({{projectDetail.history_finance.total_num}})</div>
          </div>
          <div class="pro_history_finance"  v-for="( finance,index) in projectDetail.history_finance.list" :key = index>
            <div class="flex size_14" style="margin-bottom: .75rem;flex-wrap: nowrap;">
              <div class="finance_left finacingTime size_14 color_6">{{financingTime[index]}}</div>
              <div class="finance_middle"><img src="../../assets/images/img-dianxx.png" alt=""></div>
              <div class="finance_right finacingMoney size_14" style="color:#fc703e;">{{finance.finance_money}}</div>
            </div>
            <div class='flex' style="flex-wrap: nowrap;">
              <div class="finance_left financingStage size_14 color_3 weight">{{finance.stage_name}}</div>
              <div class="finance_middle"></div>
              <div class="finance_right financingTag flex">
                <div class="tag size_14 color_3" v-for="tag in finance.investment_list">
                  {{tag.investment_name}}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <!--核心团队-->
        <div class="white1" v-if="projectDetail.member_list.total_num !== 0" style="margin-top: 16px">
        <div class="coreTeam" >
          <div class="main_title flex">
            <div class="text_title " style="margin-bottom: 1.25rem;">核心团队</div>
            <div class="showAll" v-if="projectDetail.member_list.length >3">全部&nbsp;({{projectDetail.member_list.total_num}})</div>
          </div>
          <div class="teamMember" v-for='member in projectDetail.member_list.list'>
            <div class="top flex">
              <div class="left" v-if = 'member.member_avatar'>
                <img class="headPic"  :src="member.member_avatar" alt="">
              </div>
              <div class="left"  v-else>
                <div class="headPic">{{member.member_avatar_text}}</div>
              </div>
              <div class="right size_12 color_6">
                <div style="margin-bottom: .75rem;margin-top: .25rem;">
                  <span class="name size_15 ">{{member.member_name}}</span>
                  <span class="career size_12 color_6">{{member.member_position}}</span>
                </div>
                <div class="size_12 sb">
                  <div>
                    <span class="stock_scaleText size_12 color_6">股权比例:</span>
                    <span class="stock_scale" v-if="member.hold_rate">{{member.hold_rate}}</span>
                    <span class="stock_scale" v-if="!member.hold_rate">暂未透露</span>
                  </div>
                  <div>
                    <span class="company_numText">拥有公司:</span>
                    <span class="company_num">{{member.company_num}}家</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="bottom flex">
              <div class="left"></div>
              <div class="right size_12 color_9" style="line-height: 1rem;background: #fafafa;padding: .75rem;margin-left:4.2rem;">{{member.member_introduce}}</div>
            </div>
          </div>
        </div>
        </div>
        <!--里程碑-->
        <div class="white1" v-if="projectDetail.milestone_list.total_num !== 0" style="margin-top: 16px">
        <div class="milepost">
          <div class="main_title flex" >
            <div class="text_title ">里程碑</div>
            <div class="showAll"  v-if="projectDetail.milestone_list.length >3">全部&nbsp;({{projectDetail.milestone_list.total_num}})</div>
          </div>
          <div class="pro_develop size_14 flex" style="flex-wrap: nowrap;" v-for='(milestone,index) in projectDetail.milestone_list.list'>
            <div class='left color_6' style="margin-left: .5rem;">{{mileStomeTime[index]}}</div>
            <div class='middle'>
              <img src="../../assets/images/img-dianxx.png" alt="">
            </div>
            <div class='right'>{{milestone.milestone_event}}</div>
          </div>
        </div>
        </div>
        <!--相似项目-->
        <div class="white1" v-if="projectDetail.competition_company.total_num !== 0" style="margin-top: 16px">
        <div class="competition_company_list" >
          <div class="main_title flex">
            <div class="text_title" style="margin-bottom: 0;">相似项目</div>
            <div class="showAll" v-if="projectDetail.competition_company.length >3">全部&nbsp;({{projectDetail.competition_company.total_num}})</div>
          </div>
          <div class="competition_company flex" v-for="company in projectDetail.competition_company.list">
            <div class="left">
              <img :src="company.project_logo" alt="">
            </div>
            <div class="right">
              <div class="pro_name">
                <span style="max-width: 12rem;" class="pro_company">{{company.project_name}}</span>
                <span class="comSta">{{company.stage_name}}</span>
              </div>
              <div class="pro_intro size_12 color_9">{{company.project_intro}}</div>
              <div class="pro_industry flex">
                <div class="tag" v-for="(tag, index) in company.industry_list">
                  <span class="size_12 color_6">{{tag.industry_name}}</span>
                  <span :hidden='index + 1 === company.industry_list.length'>/</span>
                </div>
              </div>
              <div class="special_list" v-for = "(tag, index) in company.special_list">
                <span>{{tag.special_name}}</span>
                <span :hidden='index + 1 === company.special_list.length'>|</span>
              </div>
            </div>
          </div>
        </div>
        </div>
        <!--媒体报道-->
        <div class="white1" v-if="projectDetail.news_list.total_num !== 0" style="margin-top: 16px">
        <div class="new_list">
          <div class="main_title flex" >
            <div class="text_title" style="margin-bottom: 0;">媒体报道</div>
            <div class="showAll" v-if="projectDetail.news_list.length >3">全部&nbsp;({{projectDetail.news_list.total_num}})</div>
          </div>
          <div class="competition_company" v-for="(news, index) in projectDetail.news_list.list" :key = index>
            <div class="new_time">{{newTime[index]}}</div>
            <div class="new_content">{{news.news_title}}</div>
            <div class="new_tag flex">
              <div v-for="tag in mediaTag[index]">{{tag}}</div>
            </div>
          </div>
        </div>
        </div>
        <!--留空div-->
        <div style='height: 4rem;'></div>
      </div>
      <!--操作按钮-->
      <div class="btn_group size_15 flex">
        <button class="contact" @click="openDialog">获得联系方式</button>
      </div>
    </div>
    <!--获取联系方式弹窗-->
    <getContact class="getContact" :dialogVisible = 'dialogVisible' :project_id = 'project_id' @closeGetContact = 'closeGetContact'>

    </getContact>
  </div>
</template>


<script type="text/ecmascript-6">
  import { success, warning } from '@/utils/notification';
  import getContact from './getContact';
  export default {
    data () {
      return {
        loading: true,
        moreOrless: '更多',
        show_moreOrless: false,
        dialogVisible: false,
        user_id: 0,
        project_id: '53641',
        projectDetail: {
          competition_company: {},
          history_finance: {},
          info: {
            project_desc: ''
          },
          member_list: {
            list: {}
          },
          milestone_list: {},
          news_list: {},
          product_list: {}
        }
      };
    },
    computed: {
      financingTime () {
        let financingTime = [];
        this.projectDetail.history_finance.list.forEach(x => {
          let time = x.finance_time.substring(0, 4) + '.' + x.finance_time.substring(5, 7);
          financingTime.push(time);
        });
        return financingTime;
      },
      mileStomeTime () {
        let milestoneTime = [];
        this.projectDetail.milestone_list.list.forEach(x => {
          let time = x.milestone_time.substring(0, 4) + '.' + x.milestone_time.substring(5, 7);
          milestoneTime.push(time);
        });
        return milestoneTime;
      },
      newTime () {
        let newTime = [];
        this.projectDetail.news_list.list.forEach(x => {
          let time = x.news_time.substring(0, 11);
          newTime.push(time);
        });
        return newTime;
      },
      mediaTag () {
        let newTag = [];
        this.projectDetail.news_list.list.forEach(x => {
          newTag.push(x.news_label.split(','));
        });
        return newTag;
      },
      new_projectIntro () {
        let i = 100;
        if (this.projectDetail.info.project_desc.length > i) {
          this.show_moreOrless = true;
          return this.projectDetail.info.project_desc.substring(0, i) + '...';
        } else {
          return this.projectDetail.info.project_desc;
        }
      }
    },
    components: {
      getContact
    },
    methods: {
      // 获取项目详情数据
      async getProjectDetail () {
        return new Promise((resolve, reject) => {
          this.loading = true;
          // 做一些异步操作
          this.$http.post(this.URL.mail_getProjectDetail_scrapy, {user_id: localStorage.user_id, project_id: this.project_id, scene: 'mobile'})
            .then(res => {
              if (res.data.status_code === 430004) {
                warning('找不到项目');
                this.loading = false;
                this.$router.push({name: 'index'});// 路由传参
              } else {
                let data = res.data.data;
                console.log(data);
                this.projectDetail = data;
                this.loading = false;
              }
            })
            .catch(err => {
              console.log(err);
              this.loading = false;
            });
        });
      },
      // 获取项目id
      getprojectId () {
        this.project_id = this.$route.query.project_id;
        this.activeFrom = this.$route.query.activeTo || 0;
        this.show = this.$route.query.show || 'detail';
      },
      // 项目介绍展开缩起
      textLengthChange () {
        if (this.moreOrless === '更多') {
          this.moreOrless = '缩起';
        } else if (this.moreOrless === '缩起') {
          this.moreOrless = '更多';
        }
      },
      // 打开弹窗_获得联系方式
      openDialog () {
        this.checkLoginStatus(x => {
          this.dialogVisible = true;
        });
      },
      // 关闭弹窗_获得联系方式
      closeGetContact (text) {
        if (text !== 'close') {
          this.checkLoginStatus(x => {
            this.$http.post(this.URL.mail_createInterview2, {
              user_id: localStorage.user_id,
              project_id: this.projectDetail.info.project_id,
              content_desc: text
            }).then(res => {
              if (res.data.status_code === 2000000) {
                success('已进行预约,请耐心等待回复');
              } else {
                warning(res.data.error_msg);
              }
            });
            this.dialogVisible = false;
          });
        } else {
          this.dialogVisible = false;
        }
      },
      // 检查登录态
      checkLoginStatus (callBack) {
        if (localStorage.user_id === 0 || localStorage.user_id === undefined) {
          this.$router.push({name: 'mailProjectLogin'});
        } else {
          if (callBack) callBack();
        }
      }
    },
    created () {
      this.getprojectId();
      this.getProjectDetail();
    }
  };
</script>

<style scoped lang="less">
  @import '../../assets/css/mobileEntrance.less';
  #mailProjectDetail_type2 {
    width: 100%;
    -webkit-max-width: 375px;
    /*padding: 1rem;*/
    margin: 0 auto;
    position: relative;
    background: #f3f4f8;
    max-width: 375px;
    .getContact{
      .el-dialog{
        width: 286px;
      }
      .el-dialog__header,.el-dialog__footer{
        text-align: center;
      }
    }
    .xian123{
   width:90%;
   height:1px;
   background: #f0f0f0;
   margin-top: 1rem;
 }
    div,span{
      line-height: 1em;
      color: #333;
    }
    /*width: 343px;*/
    /*padding: 1rem;*/
    /*margin: 0 auto;*/
    position: relative;
    .white{
      padding:1rem;
      background: white;
    }
    .white1{
      padding:1rem;
      background: white;
    }
    .size_11{
      font-size:11/16rem;
    }
    .size_12{
      font-size: .75rem;
    }
    .size_13{
      font-size: 13/16rem;
    }
    .size_14{
      font-size: 14/16rem;
    }
    .size_15{
      font-size: 15/16rem;
      font-weight: bold;
    }
    .color_6{
      color: #666;
    }
    .color_3{
      color: #333;
    }
    .color_9{
      color: #999;
    }
    .weight{
      font-weight: bolder;
    }
    .sb{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .main_title{
      justify-content: space-between;
      align-items: baseline;
    }
    .text_title{
      font-size: 15/16rem;
      margin-bottom: 1rem;
      font-weight: bold;
    }
    .showAll{
      font-size: .75rem;
      color: #ccc;
    }
    .flex {
      display: flex;
      flex-wrap:wrap;
    }
    .projectCard{
      .left{
        img{
          width: 66/16rem;
          height: 66/16rem;
          display: block;
          background-color: black;
        }
      }
      .right{
        padding-left: .75rem;
        .pro_name{
          font-size: 1rem;
          font-weight: bold;
        }
        .pro_intro{
          margin-top: .75rem;
        }
        .pro_industry{
          margin-top: .75rem;
          .tag{
            line-height: 1rem;
            span:last-child{
              color: #999;
              font-size: .75rem;
            }
            /*border-right: 1px solid #999;*/
            margin-right: 7/16rem;
          }
          .tag:last-child{
            /*border-right: none;*/
            margin-right: 7/16rem;
          }
        }
        .stageAndCity{
          font-size: .75rem;
          margin-top: .75rem;
        }
      }
      .special_list{
        margin-top: 1rem;
        margin-bottom: .25rem;
        .tag{
          padding: 6/16rem;
          background:rgba(0,158,255,0.10);
          border:1px solid rgba(0,158,255,0.20);
          border-radius:2px;
          color:#009eff;
          margin-right: .75rem;
        }
      }
    }
    .projectIntro{
      /*margin-top: 1rem;*/
      /*padding: 1rem;*/
      .projectIntroTitle{
        margin-top: 1.25rem;
        padding:10/16rem .5rem;
        display: none;

      }
      .projectIntroContent{
        margin-top: 7/16rem;
        .content{
          line-height: 22/16rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: normal;
        }
        .show_moreOrless{
          margin-top: 1rem;
          text-align: center;
          font-size:12px;
          color:#009eff;
          height: 25/16rem;
        }
      }
    }
    .brandList{
      /*margin-top: 1rem;*/
      /*padding: 1rem;*/
      .brand_title{
        justify-content: space-between;
        align-items: baseline;
      }
      .text_title{
        font-size: 15/16rem;
        margin-bottom: 1rem;
      }
      .brand{
        /*margin-top: 1.25rem;*/
        margin-bottom: 1.25rem;
        flex-wrap: nowrap;
        .left{
          margin-right: 1rem;
          img{
            width: 52px;
            height: 52px;
            display: block;
          }
        }
        .right{
          width: 70%;
          align-items: center;
          .brand_type{
            font-size: .75rem;
            padding: 0 0.25rem;
            border:1px solid #40587a;
            border-radius:34px;
            line-height: 1rem;
            margin-left: .75rem;
          }
          .brand_desc{
            margin-top: 11/16rem;
            line-height: 4/3em;
          }
        }
      }
      .brand:last-child{
        margin-bottom: 0;
      }
    }
    .financing{
      /*padding: 1rem;*/
      .pro_history_finance {
        margin-bottom: 1.25rem;
        .finance_left {
          width: 60/16rem;
          text-align: right;
        }
        .finance_middle {
          width: 36/16rem;
          img {
            display: block;
            width: 12/16rem;
            height: 12/16rem;
            margin: 0 auto;
          }
        }
        .finance_right {
          width: 80%;
        }
        .tag {
          margin-right: 1rem;
          margin-bottom: .75rem;
        }
      }
      .pro_history_finance:last-child{
        margin-bottom: 0;
      }
    }
    .coreTeam{
      /*padding: 1rem;*/
      .intro_tags {
        margin-bottom: 25/16rem;
        flex-wrap: wrap;
        .tag{
          padding: .25rem .5rem;
          margin-right: .75rem;
          border: 1px solid #293b55;
          border-radius: 7/4rem;
          color: #293b55;
          font-size: 11/16rem;
          margin-bottom: .375rem;
        }
      }
      .teamMember{
        margin-bottom: 2rem;
        img{
          display: block;
        }
        .headPic{
          border-radius: 50%;
          text-align: center;
          width: 52/16rem;
          height: 52/16rem;
        }
        .name{
          margin-right: 7/16rem;
        }
        .stock_scale{
          color: #F6A623;
        }
        .left{
          margin-right: 1rem;
        }
        .right{
          padding-left: .75rem;
          .stock_scale,.company_num{
            color: #fc703e;
          }
        }
        .bottom{
        }
      }
      .teamMember:last-child{
        margin: 0;
      }
    }
    .milepost{
      /*padding: 1rem;*/
      .pro_develop{
        padding-bottom: 26/16rem;
      .left{
        width: 3rem;
        padding-left: .5rem;
      }
      .middle{
        width: 36/16rem;
        img{
          margin: 0 auto;
          display: block;
          width: .75rem;
          height: .75rem;
        }
      }
      .right{
        width: 70%;
        font-size:14px;
        color:#333333;
        line-height: 1.25rem;
        margin-top: -3px;
      }
      }
      .pro_develop:last-child{
        padding-bottom: 0;
      }
    }
    .competition_company_list{
      /*padding:1rem;*/
      .competition_company{
        padding: 1.5rem 0;
        border-bottom: 1px solid #e6e6e6;
      .left{
        margin-right: 1rem;
        img{
          width: 52px;
          height: 52px;
          display: block;
        }
      }
      .right{
        align-items: center;
        .comSta{
          font-size: .75rem;
          padding: 0 0.25rem;
          border:1px solid #40587a;
          border-radius:34px;
          line-height: 1rem;
          margin-left: .75rem;
        }
        .pro_company{
          font-size:15px;
          color:#333333;
          letter-spacing:0;
          line-height:15px;
          text-align:left;
        }
        .pro_intro{
          margin-top: 8/16rem;
          line-height: 4/3em;
          overflow:hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          max-width: 273px;
        }
        .pro_industry{
          margin-top: 10/16rem;
          .tag{
            span:last-child{
              color: #999;
              font-size: .75rem;
              margin-right: 7/16rem;
            }
          }
        }
        .special_list{
          margin-top: 2rem;
          margin-bottom: .25rem;
          .tag{
            padding: 6/16rem;
            background:rgba(0,158,255,0.10);
            border:1px solid rgba(0,158,255,0.20);
            border-radius:2px;
            color:#009eff;
            margin-right: .75rem;
          }
        }
      }
    }
      .competition_company:last-of-type{
        border:none;
        padding-bottom: 0;
      }
    }
    .new_list{
      .competition_company{
        padding:1rem 0;
      .new_time{
        font-size:12px;
        color:#fc703e;
      }
      .new_content{
        font-size:14px;
        color:#333333;
        letter-spacing:0;
        line-height:1.25rem;
        text-align:left;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin-top: 0.5rem;
      }
      }
      .competition_company:last-of-type{
        border:none;
        padding-bottom: 0;
      }
      .new_tag{
        font-size:10/16px;
        color:#999999;
        margin-top: .75rem;
        div{
          color:#999999;
          margin-right: 1rem;
        }
      }
   }
    .btn_group{
      position: fixed;
      left: 50%;
      bottom: 0;
      width: 100%;
      height: 44/16rem;
      text-align: center;
      background: white;
      transform: translateX(-50%);
      .preview{
        border:1px solid #293b55;
        border-radius:2px;
        color:#293b55 ;
        flex: 108;
        margin-right: 1rem;
      }
      .contact{
        flex: 219;
        color: white;
        background: #293b55;
        border-radius:2px;
      }
      .contact:hover{
        background: rgba(36,52,76,1);
      }
    }
  }
</style>

