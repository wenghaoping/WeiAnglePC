<template>
  <div id='mailProjectDetail_type2'>
    <!--项目详情-->
    <div class="projectMaid">
      <!--项目卡片-->
      <div class="projectCard">
        <div class="mainCard flex">
          <div class="left">
            <img src="projectDetail.info.project_logo" alt="">
          </div>
          <div class="right">
            <div class="pro_name">{{projectDetail.info.project_name}}</div>
            <div class="pro_intro size_12 color_9">{{projectDetail.info.project_intro}}</div>
            <div class="pro_industry flex">
              <div class="tag" v-for="(tag,index) in projectDetail.info.industry_list">
                <span class="size_12 color_6">{{tag.industry_name}}</span>
                <span :hidden='index + 1 === projectDetail.info.industry_list.length'>|</span>
              </div>
            </div>
            <div class="stageAndCity color_6">
              <span>{{projectDetail.info.stage_name}}</span>
              &nbsp;·&nbsp;
              <span>{{projectDetail.info.area_name}}</span>
            </div>
          </div>
        </div>
        <div class="special_list flex">
          <div class="tag size_12" v-for="tag in projectDetail.info.special_list">
            {{tag.special_name}}
          </div>
        </div>
      </div>
      <!--项目介绍-->
      <div class="projectIntro">
        <div class="size_15 ">项目介绍</div>
        <div class="projectIntroTitle size12 color_6">{{projectDetail.info.company_name}}</div>
        <div class="projectIntroContent size_14 color_6">
          <div>{{projectDetail.info.project_desc}}</div>
          <div>{{moreOrless}}</div>
        </div>
      </div>
      <!--主要产品-->
      <div class="brandList">
        <div class="main_title flex">
          <div class="text_title ">主要产品</div>
          <div class="showAll">全部&nbsp;({{projectDetail.product_list.total_num}})</div>
        </div>
        <div class="brand flex" v-for="brand in projectDetail.product_list.list">
          <div class="left">
            <img src="http://weitianshi-2017.oss-cn-shanghai.aliyuncs.com/image/banner/email/default-logo.jpg" alt="">
          </div>
          <div class="right" style="width: 17.5rem;">
            <div>
              <div class="flex">
                <div class="brand_name size_15">{{brand.product_name}}</div>
                <div class="brand_type size_12">{{brand.product_type || '应用'}}</div>
              </div>
              <div class="brand_desc size_12 color_6">{{brand.product_introduce}}</div>
            </div>
          </div>
        </div>
      </div>
      <!--历史融资-->
      <div class="financing">
        <div class="main_title flex">
          <div class="text_title ">历史融资</div>
          <div class="showAll">全部&nbsp;({{projectDetail.history_finance.total_num}})</div>
        </div>
        <div class="pro_history_finance" v-for="( finance,index) in projectDetail.history_finance.list" :key = index>
          <div class="flex size_14" style="margin-bottom: .75rem;">
            <div class="finance_left finacingTime size_14 color_6">{{financingTime[index]}}</div>
            <div class="finance_middle"><img src="" alt=""></div>
            <div class="finance_right finacingMoney size_14">{{finance.finance_money}}</div>
          </div>
          <div class='flex'>
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
      <!--核心团队-->
      <div class="coreTeam">
        <div class="main_title flex">
          <div class="text_title ">核心团队</div>
          <div class="showAll">全部&nbsp;({{projectDetail.member_list.total_num}})</div>
        </div>
        <div class="teamMember" v-for='member in projectDetail.member_list.list'>
          <div class="top flex">
            <img class="left headPic" v-if = 'member.member_avatar' src="member.member_avatar" alt="">
            <div class="left headPic" v-else>{{member.member_avatar_text}}</div>
            <div class="right size_12 color_6 ">
              <div style="margin-bottom: .75rem">
                <span class="name size_15 ">{{member.member_name}}</span>
                <span class="career size_12 color_6">{{member.member_position}}</span>
              </div>
              <div class="size_12 sb">
                <div>
                  <span class="stock_scaleText size_12 color_6">股权比例:</span>
                  <span class="stock_scale">{{member.hold_rate}}</span>
                </div>
                <div>
                  <span class="company_numText">拥有公司:</span>
                  <span class="company_num">{{member.company_num}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom flex">
            <div class="left"></div>
            <div class="right size_12 color_6" style="line-height: 1rem;">{{member.member_introduce}}</div>
          </div>
        </div>
      </div>
      <!--里程碑-->
      <div class="milepost">
        <div class="main_title flex">
          <div class="text_title ">里程碑</div>
          <div class="showAll">全部&nbsp;({{projectDetail.milestone_list.total_num}})</div>
        </div>
        <div class="pro_develop size_14 flex" v-for='(milestone,index) in projectDetail.milestone_list.list'>
          <div class='left'>{{mileStomeTime[index]}}</div>
          <div class='middle'>
            <img src="" alt="">
          </div>
          <div class='right'>{{milestone.milestone_event}}</div>
        </div>
      </div>
      <!--相似项目-->
      <div class="competition_company_list">
        <div class="main_title flex">
          <div class="text_title ">相似项目</div>
          <div class="showAll">全部&nbsp;({{projectDetail.competition_company.total_num}})</div>
        </div>
        <div class="competition_company flex" v-for="company in projectDetail.competition_company.list">
          <div class="left">
            <img src="company.project_logo" alt="">
          </div>
          <div class="right">
            <div class="pro_name">
              <span style="max-width: 12rem;">{{company.project_name}}</span>
              <span>{{company.stage_name}}</span>
            </div>
            <div class="pro_intro size_12 color_9">{{company.project_intro}}</div>
            <div class="pro_industry flex">
              <div class="tag" v-for="tag in company.industry_list">{{tag.industry_name}}</div>
            </div>
            <div class="special_list" v-for = "(tag , index) in company.special_list">
              <span>{{tag.special_name}}</span>
              <span :hidden='index + 1  === company.special_list.length'>|</span>
            </div>
          </div>
          </div>
      </div>
      <!--媒体报道-->
      <div class="new_list">
        <div class="main_title flex">
          <div class="text_title ">媒体报道</div>
          <div class="showAll">全部&nbsp;({{projectDetail.news_list.total_num}})</div>
        </div>
        <div class="competition_company flex" v-for="news in projectDetail.news_list.list">
          <div class="new_time">{{news.news_time}}</div>
          <div class="new_content">{{news.news_title}}</div>
          <div class="new_content">{{news.news_title}}</div>
          <div class="new_tag flex">
            <div v-for="tag in news.list"></div>
          </div>
        </div>
      </div>
      <!--留空div-->
      <div style='height: 4rem;'></div>
    </div>
    <!--操作按钮-->
    <div class="btn_group size_15 flex">
      <button class="contact">获得练习方式</button>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import { warning } from '@/utils/notification';
  export default {
    data () {
      return {
        loading: false,
        moreOrless: '更多',
        user_id: 0,
        project_id: '',
        projectDetail: {
          competition_company: {},
          history_finance: {},
          info: {},
          member_list: {},
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
      }
    },
    components: {

    },
    mounted () {},
    methods: {
      // 获取项目详情数据
      async getProjectDetail () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.$http.post(this.URL.mail_getProjectDetail_scrapy, {user_id: localStorage.user_id, project_id: '53641', scene: 'mobile'})
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
            });
        });
      },
      // 获取项目id
      getprojectId () {
        this.project_id = this.$route.query.project_id;
        this.activeFrom = this.$route.query.activeTo || 0;
        this.show = this.$route.query.show || 'detail';
      }
    },
    created () {
      this.getprojectId();
      this.getProjectDetail();
      localStorage.setItem('user_id', 'Np38mX9r');
      console.log(this);
    },
    watch: {

    }
  };
</script>

<style scoped lang="less">
  @import '../../assets/css/mobileEntrance.less';

  #mailProjectDetail_type2 {
    div,span{
      line-height: 1em;
      color: #333;
    }
    width: 343px;
    padding: 1rem;
    margin: 0 auto;
    position: relative;
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
    }
    .showAll{
      cursor: pointer;
      font-size: .75rem;
      color: #009eff;
    }
    .flex {
      display: flex;
      flex-wrap:wrap;
    }
    .projectCard{
      padding: 1rem;
      .left{
        flex:94;
        img{
          width: 66/16rem;
          height: 66/16rem;
          display: block;
          background-color: black;
        }
      }
      .right{
        flex: 293;
        padding-left: .75rem;
        .pro_name{
          font-size: 1rem;
        }
        .pro_intro{
          margin-top: .75rem;
        }
        .pro_industry{
          margin-top: .75rem;
          .tag{
            span:last-child{
              color: #999;
              font-size: .75rem;
              margin-right: 7/16rem;
            }
          }
        }
        .stageAndCity{
          font-size: .75rem;
          margin-top: .75rem;
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
    .projectIntro{
      margin-top: 1rem;
      padding: 1rem;
      .projectIntroTitle{
        margin-top: 1.25rem;
        padding:10/16rem .5rem;
        display: none;

      }
      .projectIntroContent{
        margin-top: 11/16rem;
        div:first-child{
          line-height: 22/16rem;
          text-overflow: ellipsis;
          overflow: hidden;
          height: 88/16rem;
          white-space: normal;
        }
        div:last-child{
          margin-top: 1rem;
          text-align: center;
          font-size:12px;
          color:#009eff;
          height: 25/16rem;
        }
      }
    }
    .brandList{
      margin-top: 1rem;
      padding: 1rem;
      .brand_title{
        justify-content: space-between;
        align-items: baseline;
      }
      .text_title{
        font-size: 15/16rem;
        margin-bottom: 1rem;
      }
      .brand{
        margin-top: 1.25rem;
        margin-bottom: 1.25rem;
        .left{
          flex:66;
          margin-right: 1rem;
          img{
            width: 52px;
            height: 52px;
            display: block;
          }
        }
        .right{
          flex: 276;
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
    }
    .financing{
      padding: 1rem;
      .pro_history_finance {
        margin-bottom: 1.25rem;
        .finance_left {
          flex: 56;
          text-align: center;
        }
        .finance_middle {
          flex: 33;
          img {
            display: block;
            width: 12/16rem;
            height: 12/16rem;
            background: red;
            margin: 0 auto;
          }
        }
        .finance_right {
          flex: 246;
          .financingMoney {
            color: #fc703e;
          }
          .tag {
            margin-right: 1rem;
            margin-bottom: .75rem;
          }
        }
      }
    }
    .coreTeam{
      padding: 1rem;
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
        margin-bottom: 42/16rem;
        img{
          display: block;
        }
        .headPic{
          border-radius: 50%;
          background:red;
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
          flex: 53;
        }
        .right{
          flex: 256;
          padding-left: .75rem;
          .stock_scale,.company_num{
            padding-left: .5rem;
            color: #fc703e;
          }
        }
        .bottom{
          margin-top: .5rem;
        }
      }
    }
    .milepost{
      padding: 1rem;
      .left{
        flex: 48;
      }
      .middle{
        flex: 36;
        img{
          display: block;
          width: .75rem;
          height: .75rem;
        }
      }
      .right{
        flex: 252;
      }
    }
    .btn_group{
      position: fixed;
      left: 50%;
      bottom: 0;
      padding: 10/16rem 1rem;
      width: 375/16rem;
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
    }
  }

</style>

