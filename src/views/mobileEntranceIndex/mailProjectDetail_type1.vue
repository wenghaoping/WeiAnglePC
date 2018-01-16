<template>
  <div id='mailProjectDetail_type1'  v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    <!--项目详情-->
    <div >
      <div class="projectMaid">
        <div class="white">
        <h1 style="font-size: 1rem;">{{projectDetail.pro_intro}}</h1>
        <!--项目标签-->
        <div class="flex industryList">
          <div class="industryItem" v-for=" industryItem in projectDetail.pro_industry">
            {{industryItem.industry_name}}
          </div>
        </div>
        <div class="flex tags">
          <div class="tag1">{{ projectDetail.pro_scale.scale_money }}&nbsp;·</div>
          <div class="tag1">{{ projectDetail.pro_stage.stage_name}}&nbsp;·</div>
          <div class="tag1">{{ projectDetail.pro_area.area_title}}</div>
        </div>
          <div class="xian"></div>
        <!--用户名片-->
        <div class='userCard flex'>
          <img :src = 'projectUser.user_avatar_url' alt="">
          <div class="userName" style="margin-top: 1rem;line-height: 20px;">
            <div class="name">{{projectUser.user_name}}</div>
            <div class="careerAndcompany size_12 color_6">{{projectUser.user_career}}·{{projectUser.user_company}}</div>
          </div>
        </div>
        </div>
        <div class="white1" v-if="projectDetail.pro_goodness.length !== 0" style="margin-top: 16px">
        <!--投资亮点-->
        <div class="textBlock size_14 color_3" >
          <div class="text_title weight">投资亮点</div>
          <div class="text_content" v-for="goodness in projectDetail.pro_goodness">
            <span class="goodness_title color_3">·&nbsp;{{goodness.goodness_title}} :</span>
            <span class="goodness_desc color_6">{{goodness.goodness_desc}}</span>
          </div>
        </div>
        <!--市场概况-->
        <div class="textBlock size_14 color_3" v-if="projectDetail.pro_market_genera.length !== 0">
          <div class="text_title weight">市场概况</div>
          <div class="text_content" v-for="marketGenera in projectDetail.pro_market_genera">
            <span class="goodness_title color_3">· &nbsp;{{marketGenera.goodness_title}} :</span>
            <span class="goodness_desc color_6">{{marketGenera.goodness_desc}}</span>
          </div>
        </div>
        <!--产品概况-->
        <div class="textBlock size_14 color_3" v-if="projectDetail.pro_service.length !== 0">
          <div class="text_title weight">产品概况</div>
          <div class="text_content" v-for="pro_service in projectDetail.pro_service">
            <span class="goodness_title color_3">· &nbsp;{{pro_service.goodness_title}} :</span>
            <span class="goodness_desc color_6">{{pro_service.goodness_desc}}</span>
          </div>
        </div>
        </div>
        <!--基本介绍-->
        <div class="white1" style="margin-top: 16px">
        <div class="project_intro">
          <div class="text_title">基本介绍</div>
          <div class="intro_tags flex" v-if='projectDetail.tag.length !== 0' style="margin-bottom: .625rem;">
            <div class="tag" style="margin-top: 0;" v-if="tag.type === 0" v-for="tag in projectDetail.tag">{{tag.tag_name}}</div>
          </div>
          <div class="intro_item" v-if="projectDetail.pro_name">
            <span class="color_9">项目名称</span>
            <span class="color_3">{{projectDetail.pro_name}}</span>
          </div>
          <div class="intro_item" v-if="projectDetail.pro_company_name">
            <span class="color_9">公司名称</span>
            <span class="color_3">{{projectDetail.pro_company_name}}</span>
          </div>
          <div class="intro_item" v-if="projectDetail.pro_status.status_name">
            <span class="color_9">运营状态</span>
            <span class="color_3">{{projectDetail.pro_status.status_name}}</span>
          </div>
          <div class="intro_item" v-if="projectDetail.pro_company_scale.comp_scale_value">
            <span class="color_9">公司规模</span>
            <span class="color_3">{{projectDetail.pro_company_scale.comp_scale_value}}</span>
          </div>
          <div class="intro_item" v-if="projectDetail.pro_website">
            <span class="color_9">产品链接</span>
            <span class="color_3">{{projectDetail.pro_website}}</span>
          </div>
        </div>
        </div>
        <!--产品-->
        <div class="white1" v-if="projectDetail.brand.length !== 0" style="margin-top: 16px">
        <div class="brandList" >
          <div class="main_title flex" >
            <div class="text_title" style="margin: 0;">产品</div>
            <div class="showAll" v-if="projectDetail.brand.length >3">全部&nbsp;({{projectDetail.brand.length}})</div>
          </div>
          <div class="brand flex" v-for="brand in projectDetail.brand">
            <img src="http://weitianshi-2017.oss-cn-shanghai.aliyuncs.com/image/banner/email/default-logo.jpg" alt="">
            <div style="width: 17.5rem;">
              <div>
                <div class="sb">
                  <div class="brand_name size_15">{{brand.brand_name}}</div>
                  <div class="brand_type size_12">微信公众号</div>
                </div>
                <div class="brand_desc size_12 color_6">{{brand.brand_desc}}</div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <!--历史融资-->
        <div class="white1" v-if="projectDetail.pro_history_finance.length !== 0" style="margin-top: 16px">
        <div class="financing" >
          <div class="main_title flex">
            <div class="text_title ">历史融资</div>
            <div class="showAll" v-if="projectDetail.pro_history_finance.length >3">全部&nbsp;({{projectDetail.pro_history_finance.length}})</div>
          </div>
          <div class="pro_history_finance" v-for="(finance, index) in projectDetail.pro_history_finance">
            <div class="flex size_14">
              <div class="finance_left color_6">{{finance.finance_time | timeToReallTime_pointType}}</div>
              <div class="finance_middle"><img src="../../assets/images/img-dianxx.png" alt=""></div>
              <div class="finance_right financingMoney">{{finance.pro_finance_scale}}</div>
            </div>
            <div class='flex' style="margin-top: 6px;">
              <div class="finance_left financingStage size_14 color_3 weight">{{finance.belongs_to_stage.stage_name}}</div>
              <div class="finance_middle"></div>
              <div class="finance_right financingTag flex">
                {{finance.pro_finance_investor}}
              </div>
              <!--<div class="finance_right financingTag flex">-->
                <!--<div class="tag size_14 color_3" v-for="tag in finance.investment_list">-->
                  <!--{{tag.investment_name}}-->
                <!--</div>-->
              <!--</div>-->
            </div>
          </div>
        </div>
        </div>
        <!--融资信息-->
        <div class="white1" style="margin-top: 16px">
        <div class="financingInfo">
          <div class="text_title">融资信息</div>
          <div class="financingDetail flex">
            <div class="financingDetailItem">
              <div class="size_11 color_6">期望融资</div>
              <div class="size_13" style="color: #f6a623;margin-top: .4rem;">{{projectDetail.pro_scale.scale_money||'暂未透露'}}</div>
            </div>
            <div class="financingDetailItem">
              <div class="size_11 color_6">投后股份</div>
              <div class="size_13" style="color: #f6a623;margin-top: .4rem;">{{projectDetail.pro_finance_stock_after||'暂未透露'}}</div>
            </div>
            <div class="financingDetailItem">
              <div class="size_11 color_6">估值</div>
              <div class="size_13" style="color: #f6a623;margin-top: .4rem;">{{projectDetail.pro_finance_value||'暂未透露'}}</div>
            </div>
          </div>
          <div class="text_title" style="margin-top: 2rem;" v-if="projectDetail.pro_finance_use">资金用途</div>
          <div class="financingUseFor size_14 color_6" v-if="projectDetail.pro_finance_use">
            {{projectDetail.pro_finance_use}}
          </div>
        </div>
        </div>
        <!--核心团队-->
        <div class="white1" v-if="projectDetail.core_users.length !== 0" style="margin-top: 16px">
        <div class="coreTeam" >
          <div class="main_title flex">
            <div class="text_title ">核心团队</div>
            <div class="showAll" v-if="projectDetail.core_users.length >3">全部&nbsp;({{projectDetail.core_users.length}})</div>
          </div>
          <div class="intro_tags flex">
            <div class="tag" v-if="tag.type === 1" v-for="tag in projectDetail.tag">{{tag.tag_name}}</div>
          </div>
          <div class="teamMember" v-for='member in projectDetail.core_users'>
            <div class="top flex">
              <!--<img class="left" src="" alt="">-->
              <div class="left " style="margin-right: .75rem;">
                <div class="headPic"> {{member.ct_member_name.substring(0,1)}}</div>
              </div>
              <div class="right">
                <div style="margin-bottom: .3rem;">
                  <span class="name size_15 ">{{member.ct_member_name}}</span>
                  <span class="career size_12 color_6">{{member.ct_member_career}}</span>
                </div>
                <div class="size_12">
                  <span class="stock_scaleText color_6">股权比例:</span>
                  <span class="stock_scale">{{member.stock_scale}}%</span>
                </div>
              </div>
            </div>
            <div class="bottom flex">
              <div class="left"  style="margin-right: .75rem;"></div>
              <div class="right size_13 color_6" style="padding: .75rem;background:#f5f5f5;border-radius:2px;margin-left: 3rem;">{{member.ct_member_intro}}</div>
            </div>
          </div>
        </div>
        </div>
        <!--里程碑-->
        <div class="white1" v-if="projectDetail.pro_develop.length !== 0" style="margin-top: 16px">
        <div class="milepost" >
          <div class="main_title flex">
            <div class="text_title ">里程碑</div>
            <div class="showAll" v-if="projectDetail.pro_develop.length >3">全部&nbsp;({{projectDetail.pro_develop.length}})</div>
          </div>
          <div class="pro_develop size_14 flex" v-for='item in projectDetail.pro_develop'>
            <div class='left size_14 color_6'>{{item.created_at | timeToReallTime_lineTopoint}}</div>
            <div class='middle'>
              <img src="../../assets/images/img-dianxx.png" alt="">
            </div>
            <div class='right size_14 color_3'>{{item.dh_event}}</div>
          </div>
        </div>
        </div>
        <!--留空div-->
        <div style='height: 4rem;background: #f3f4f8'></div>
      </div>
      <!--操作按钮-->
      <div class="btn_group size_15 flex">
        <button class="preview" @click= "previewBp">查看BP</button>
        <button class="contact"  @click="openDialog">联系项目方</button>
      </div>
    </div>
    <!--获取联系方式弹窗-->
    <getContact class="getContact" :dialogVisible = 'dialogVisible' :project_id = 'project_id' @closeGetContact = 'closeGetContact'></getContact>
    <!--查看BP方式选择-->
    <el-dialog
      title="请选择查看方式"
      :visible.sync="bpMethod"
      width="30%"
      :before-close="bpMethodClose">
      <div class="bpMethod" @click='preview'>预览</div>
      <div class="bpMethod" @click='inputEmail'>发送到邮箱</div>
    </el-dialog>
    <!--输入邮箱-->
    <el-dialog
      title="请输入邮箱"
      :visible.sync="getEmail"
      width="30%"
      :before-close="inputEmailClose">
      <div class="getEmail flex">
        <div>邮箱:</div>
        <input name="email" v-model="email" placeholder="请输入邮箱">
      </div>
      <el-button class="sumbmitEmail" type="primary" @click='sendBpEmail'>确定</el-button>
    </el-dialog>
  </div>
</template>


<script type="text/ecmascript-6">
  import * as validata from '@/utils/validata';
  import { success, warning } from '@/utils/notification';
  import getContact from './getContact';
  export default {
    data () {
      return {
        loading: true,
        dialogVisible: false,
        bpMethod: false,
        getEmail: false,
        email: '',
        user_id: 0,
        project_id: '',
        projectDetail: {
          brand: {},
          company_open_status: {},
          contact: {},
          core_users: {},
          count: {},
          follow_up: {},
          is_exclusive: {},
          open_status: {},
          pro_BP: {},
          pro_FA: {},
          pro_area: {},
          pro_business_model: {},
          pro_company_name: {},
          pro_company_scale: {},
          pro_develop: {},
          pro_file: {},
          pro_finance_scale: {},
          pro_finance_stock_after: {},
          pro_finance_use: {},
          pro_finance_value: {},
          pro_goodness: {},
          pro_history_finance: {},
          pro_industry: {},
          pro_intro: {},
          pro_market_genera: {},
          pro_name: {},
          pro_scale: {},
          pro_schedule: {},
          pro_service: {},
          pro_stage: {},
          pro_status: {},
          pro_total_score: {},
          pro_website: {},
          project_id: {},
          tag: {}
        },
        projectUser: ''
      };
    },
    components: {
      getContact
    },
    methods: {
      // 获取项目详情数据
      async getProjectDetail () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.$http.post(this.URL.mail_getProjectDetail, {
            user_id: localStorage.user_id || 0,
            project_id: this.project_id,
            scene: 'mobile'
          })
            .then(res => {
              if (res.data.status_code === 430004) {
                warning('找不到项目');
                this.loading = false;
                this.$router.push({name: 'index'});// 路由传参
              } else {
                let data = res.data.data;
                this.projectUser = res.data.user;
                this.projectDetail = data;
                this.loading = false;
              }
            })
            .catch(err => {
              console.log(err);
            });
        });
      },
      // 检查登录态
      checkLoginStatus (callBack) {
        if (localStorage.user_id === 0 || localStorage.user_id === undefined) {
          this.$router.push({name: 'mailProjectLogin'});
        } else {
          if (callBack) callBack();
        }
      },
      // 获取项目id
      getprojectId () {
        this.project_id = this.$route.query.project_id;
        this.activeFrom = this.$route.query.activeTo || 0;
        this.show = this.$route.query.show || 'detail';
      },
      // 打开弹窗_查看Bp
      previewBp () {
        this.checkLoginStatus(x => {
          if (this.projectDetail.pro_BP === '') {
            warning('该项目并没有上传BP');
          } else {
            this.bpMethod = true;
          }
        });
      },
      // 关闭弹窗_查看Bp
      bpMethodClose () {
        this.bpMethod = false;
      },
      // 打开弹窗_填写邮箱
      inputEmail () {
        this.getEmail = true;
      },
      // 关闭弹窗_填写邮箱
      inputEmailClose () {
        this.getEmail = false;
      },
      // 发送BP到邮箱
      sendBpEmail () {
        if (!validata.checkEmail(this.email)) {
          warning('邮箱格式不正确');
        } else {
          this.loading = true;
          this.$http.post(this.URL.mail_sendBp, {
            user_id: localStorage.user_id,
            project_id: this.project_id,
            email: this.email,
            type: 'email'
          }).then(res => {
            if (res.data.status_code === 2000000) {
              success('BP已成功发送至邮箱');
              this.getEmail = false;
              this.bpMethod = false;
              this.loading = false;
            } else {
              warning(res.data.error_msg);
              this.getEmail = false;
              this.bpMethod = false;
              this.loading = false;
            }
          });
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
            this.$http.post(this.URL.mail_createInterview, {
              user_id: localStorage.user_id,
              project_id: this.project_id,
              remark: text
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
      // BP预览
      preview () {
        window.location.href = this.projectDetail.pro_BP.file_url;
      }
    },
    created () {
      this.getprojectId();
      this.getProjectDetail();
    }
  };
</script>

<style  lang="less">
  @import '../../assets/css/mobileEntrance.less';
  .el-dialog--small{
    width: 75%;
  }
  #mailProjectDetail_type1{
    -webkit-max-width: 375px;
    max-width: 375px;
    margin: auto;
    /*padding: 1rem;*/
    /*margin: 0 auto;*/
    position: relative;
    background: #f3f4f8;
    .white{
      padding:1rem;
      background: white;
    }
    .white1{
      background: white;
    }
    .xian{
      width:100%;
      height:1px;
      background: #f0f0f0;
      margin-top: 10px;
    }
    .getEmail{
      padding: .5rem 0;
      align-items: center;
      div{
        flex: 2;
        height: 2rem;
        line-height: 2rem;
      }
      input{
        flex: 8;
        border: 1px solid #40587a;
        height: 2rem;
        padding-left: .5rem;
      }
    }
    .sumbmitEmail{
      margin-top: 1rem;
      width: 100%;
      background:#40587a;
      border-radius:3px;
    }
    .bpMethod{
      padding: 1rem;
      text-align: center;
      border: 1px solid #40587a;
      margin-bottom: 1rem;
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
    }
    .industryItem,.tag{
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      margin-right: 7/16rem;
      background-color:#f5f5f5;
      border-radius:2/16rem;
      color: #666;
    }
    .tag{
      background: white;
    }
    .industryItem,.tag1{

      font-size: 0.75rem;
      margin-top: 10/16rem;
      margin-right: 7/16rem;
      color: #666;
    }
    .userCard{
      img{
        border-radius: 50%;
        width: 2.25rem;
        height: 2.25rem;
        display: block;
        margin-right: .5rem;
        margin-top: 1rem;
      }
      .name{
        font-size: 14/16rem;
        color: #333;
      }
      .careerAndcompany {
        margin-top: 2/16rem;
        font-size: 12px;
        line-height: 17px;
      }
    }
    .textBlock{
      padding: 1rem;
      .text_title{
        font-size: 15/16rem;
        margin-bottom: 1rem;
      }
      .text_content{
        margin-bottom: .25rem;
        .goodness_title{
          font-weight: 400;
        }
      }
    }
    .project_intro{
      margin-top: 1rem;
      padding: 1rem;
      .intro_tags {
        margin-top: 1.25rem;
        margin-bottom: 1rem;
        flex-wrap:wrap;
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
      .intro_item{
        font-size: 14/16rem;
        margin-bottom: 1rem;
        span:first-child{
          margin-right: 1rem;
        }
      }
      .intro_item:last-child{
        margin-bottom: 0;
      }
    }
    .brandList{
      padding: 1rem;
      margin-top: 1rem;
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
        img{
          width: 52px;
          height: 52px;
          margin-right: 7/16rem;
        }
        .brand_name{

        }
        .brand_type{
          border:1px solid #293b55;
          border-radius:34px;
          padding: .25rem .5rem;
        }
        .brand_desc{
          margin-top: 7/16rem;
        }
      }
      .brand:last-child{
        margin-bottom: 0;
      }
    }
    .financing{
      padding: 1rem;
      margin-top: 1rem;
      .pro_history_finance {
        div{
          align-items: center;
        }
        margin-bottom: 26/16rem;
        .finance_left {
          width: 49/16rem;
          text-align: right;
        }
        .finance_middle {
          width: 36/18rem;
          img {
            display: block;
            width: 12/16rem;
            height: 12/16rem;
            margin: 0 auto;
          }
        }
        .finance_right {
          width: 70%;
          .financingMoney {
            color: #fc703e;
          }
          .tag {
            margin-right: 1rem;
            margin-bottom: .75rem;
          }
        }
        .financingMoney {
          color: #f6a623;
        }
      }
      .pro_history_finance:last-child{
        margin-bottom: 0;
      }
    }
    .financingInfo{
      padding:1rem;
      margin-top: 1rem;
      .size_15{
        margin-bottom: 1rem;
      };
      .financingDetail{
        padding: 9/8rem 0;
        border:1px solid #f0f0f0;
        border-radius:2px;
        text-align: center;
        .financingDetailItem{
          flex: 1;
        }
      }
    }
    .coreTeam{
      padding: 1rem;
      margin-top: 1rem;
      .intro_tags {
        margin-bottom: 20/16rem;
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
        margin-bottom: 32/16rem;
        img{
          display: block;
          border-radius: 50%;
        }
        .headPic{
          border-radius: 50%;
          background:#f5f5f5;
          text-align: center;
          width: 52/16rem;
          height: 52/16rem;
          line-height: 52/16rem;
          font-size: 20px;
          margin: auto;
        }
        .name{
          margin-right: 7/16rem;
        }
        .stock_scale{
          color: #F6A623;
          margin-left: .25rem;
        }
        .left{
          margin-right: 23/16rem;
        }
        .right{
          width: 70%;
        }
        .bottom{

        }
      }
      .teamMember:last-child{
        margin-bottom: 0;
      }
    }
    .milepost{
      padding: 1rem;
      .left{
        width: 3rem;
        padding-left: .5rem;
        text-align: right;
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
        line-height: 1.25rem;
      }
      .pro_develop{
        align-items: center;
        margin-bottom: 26/16rem;
      }
      .pre_develop:last-child{
        margin-bottom: 0;
      }
    }
    .btn_group{
      position: fixed;
      left: 50%;
      bottom: 0;
      padding:10/16rem 1rem;
      width: 343/16rem;
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
      .preview:hover{
        background: rgba(242,243,244,1);
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

