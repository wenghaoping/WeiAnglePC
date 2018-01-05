<template>
  <div id="alertProjectDetail" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    <el-dialog :visible="alertProjectDetailDisplay"  :before-close="handleClose" close-on-press-escape close-on-click-modal>
      <!--弹窗上半部分-->
      <div class="up-floor item-lists item-lists-top clearfix" style="background: white;">
        <div class="item-lists-inner-left">
          <div class="item height" style="vertical-align: middle;">
            <el-tag type="success" v-if="project.open_status==1">公开</el-tag>
            <el-tag type="primary" v-else>私密</el-tag>
            <span class="projectIntro" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{project.pro_intro}}</span>
          </div>
          <div class="item height" style="margin-top:18px;">
            <span class="mid-tag" v-for="industry in project.pro_industry">{{industry.industry_name}}</span>
          </div>
          <div class="item height" style="margin-top:18px;">
            <span class="big-tag">{{project.pro_scale.scale_money}}</span><span class="split">｜</span>
            <span class="big-tag">{{project.pro_area.area_title}}</span><span class="split">｜</span>
            <span class="big-tag">{{project.pro_finance_stock_after}}%</span><span class="split">｜</span>
            <span class="big-tag">{{project.pro_stage.stage_name}}</span>
          </div>
          <div class="item height" style="background:#f9fafc;margin-top:18px">
            <span class="projectProcess">
              <div class="item progress height">
                <div class="txt begin"  :class="{ scheduleColor: project.pro_schedule.schedule_id==1}">项目线索</div>
                <div class="progress-bar">
                   <span class="circle circle-s" style=" display: inline-block;
      vertical-align: middle;"></span>
                  <span class="bar-bg1" style=" display: inline-block;
      vertical-align: middle;">&nbsp;</span>
                  <span  class="txt state" style="left:50px;"  v-if="project.pro_schedule.schedule_id==2">约谈</span>
                  <span  class="txt state" style="left:100px;"  v-if="project.pro_schedule.schedule_id==3">考察</span>
                  <span  class="txt state" style="left:184px;" v-if="project.pro_schedule.schedule_id==4">签署FA协议</span>
                  <span  class="txt state" style="left:310px;" v-if="project.pro_schedule.schedule_id==5">引荐投资方</span>
                  <span  class="txt state" style="left:350px;" v-if="project.pro_schedule.schedule_id==6">投资协议</span>
                  <span  class="txt state" style="left:450px;" v-if="project.pro_schedule.schedule_id==7">交割</span>
                  <span  class="txt state" style="left:550px;" v-if="project.pro_schedule.schedule_id==8">待收佣金</span>
                  <span class="circle circle-e" style=" display: inline-block;
      vertical-align: middle;">&nbsp;</span>
                </div>
                <div class="txt end"  :class="{ scheduleColor: project.pro_schedule.schedule_id==9}">佣金收讫</div>
             </div>
            </span>
          </div>
          <div class="onlyone">
            <img v-if="project.is_exclusive==1" src="../../assets/images/onlyonedark.png"/>
            <img v-if="project.is_exclusive==2" src="../../assets/images/onlyonelight.png"/>
          </div>
        </div>
      </div>
      <!--弹窗中间部分-->
      <div class="mid-floor" style="opacity:0.5;background:#000000;height: 16px;"></div>
      <!--弹窗下半部分-->
      <div class="down-floor">
        <!--项目资料-->
        <div class="ul-lists" style="background:#f9fafc;padding:20px;">
          <div class="item">
            <span class="title"><img class="img" src="../../assets/images/projectIntroduce.png">项目资料</span>
            <span class="flower" v-show="project.follow_user!=''">跟进人 : {{project.follow_user}}</span>
          </div>
          <div class="item" style="margin-top:33px;">
            <span class="person-tag" v-for="tag in project.tag" v-if="tag.type==0">{{tag.tag_name}}</span>
          </div>
          <div class="item"  style="margin-top:24px;background:#ffffff;height: 49px;line-height: 49px;" >
              <img class="img" style="padding-left: 16px;" src="../../assets/images/paper.png">
              <span class="pt"  v-if="file.pro_BP.file_title!==''">{{file.pro_BP.file_title}}</span>
          </div>
          <div class="line"></div>
          <div class="ul-lists" style="margin-top:16px;padding: 0">
            <div class="item" >
              <div  v-show="project.goodness.pro_goodness.length!=0"  style="margin-bottom: 20px">
                <div class="title" style="font-size:16px;color:#475669;">投资亮点</div>
                <div class="prod-doc" style="font-size: 13px;"v-for=" (goodness1,index) in project.goodness.pro_goodness">
                       <span style="line-height: 23px; color:#8492a6">
                         <span style="color:#475669;margin-top: -4px">{{goodness1.goodness_title}}&nbsp;:&nbsp;</span>
                      {{goodness1.goodness_desc}}
                       </span>
                </div>
              </div>
              <div  v-show="project.goodness.pro_market_genera.length!=0" style="margin-bottom: 20px">
                <div class="title" style="font-size:16px;color:#475669;">市场概况</div>
                <div class="prod-doc" style="font-size: 13px;"   v-for="goodness2 in project.goodness.pro_market_genera">
                       <span style="line-height: 23px; color:#8492a6">
                         <span style="color:#475669;margin-top: -4px">{{goodness2.goodness_title}}&nbsp;:&nbsp;</span>
                      {{goodness2.goodness_desc}}
                       </span>
                </div>
              </div>
              <div v-show="project.goodness.pro_business_model.length!=0" style="margin-bottom: 20px">
                <div class="title" style="font-size:16px;color:#475669;">商业模式</div>
                <div class="prod-doc" style="font-size: 13px;"  v-for="goodness3 in project.goodness.pro_business_model">
                       <span style="line-height: 23px; color:#8492a6">
                         <span style="color:#475669;margin-top: -4px">{{goodness3.goodness_title}}</span>&nbsp;:&nbsp;
                      {{goodness3.goodness_desc}}
                       </span>
                </div>
              </div>
              <div v-if="project.goodness.pro_service.length!=0"  style="margin-bottom: 20px">
                <div class="title" style="font-size:16px;color:#475669;">产品概况</div>
                <div class="prod-doc" style="font-size: 13px;" v-for="goodness4 in project.goodness.pro_service">
                       <span style="line-height: 23px; color:#8492a6">
                         <span style="color:#475669;margin-top: -4px">{{goodness4.goodness_title}}&nbsp;:&nbsp;</span>
                      {{goodness4.goodness_desc}}
                       </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--核心团队-->
        <div class="ul-lists" style="margin-top: 16px;background: rgb(249, 250, 252); padding: 20px;" v-show="team.core_users!='' || team.tag!=''">
          <div class="item">
            <span class="title"><img class="img" src="../../assets/images/team.png">核心团队</span>
          </div>
          <div class="item" style="margin-top:33px;" v-show="team.tag!=''">
            <span class="person-tag" style="padding: 0 12px;" v-for="tag in team.tag" v-if="tag.type==1">{{tag.tag_name}}</span>
          </div>
          <div style="margin-top:32px;"></div>
          <div class="item" v-for="teamm in team.core_users" style="margin-top:10px;" v-show="team.core_users!=''">
            <span class="p-name" style="text-align:left;line-height: 44px;width: 90px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{teamm.ct_member_name}}</span>
            <span class="p-mg" style="text-align:left;line-height: 44px;width: 300px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{teamm.ct_member_career}}</span>
            <div class="p-gf">股权占比 : <span>{{teamm.stock_scale}}%</span></div>
            <div class="p-doc">{{teamm.ct_member_intro}}</div>
            <div class="line"></div>
          </div>

        </div>

        <!--公司运营-->
        <div class="ul-lists" style="margin-top:16px;background: rgb(249, 250, 252); padding: 20px;" v-show="company.pro_status.status_name!=''||company.pro_website!=''||company.pro_company_scale.comp_scale_value!=''">
          <div class="item">
            <span class="title"><img class="img" :src="yunying" style="width: 37px;">公司运营</span>
            <div class="rz-details">
              <div class="rz-detail"  v-show="company.pro_status!=''">
                <p class="det-title">运营状态</p>
                <p class="det-info">{{company.pro_status.status_name}}</p>
              </div>
              <div class="rz-detail" v-show="company.pro_website!=''">
                <p class="det-title">公司官网</p>
                  <p  class="del-info"  style="font-size:22px;color:#20a0ff;text-align:center;line-height: 44px;cursor: pointer;width: 200px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{company.pro_website}}</p>
              </div>
              <div class="rz-detail"  v-show="company.pro_company_scale!=''" >
                <p class="det-title">公司规模</p>
                <p class="det-info">
                  <span>{{company.pro_company_scale.comp_scale_value}}</span>
                 <span v-show="company.pro_company_scale!=''">人</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <!--产品-->
        <div class="ul-lists" style="margin-top: 16px;background: rgb(249, 250, 252); padding: 20px;" v-show="brands.brand!=''">
          <div class="item">
            <span class="title"><img class="img" :src="pinpai" style="width: 37px;">产品</span>
            <div class="brand">
              <div class="brand1" v-for="brandd in brands.brand">
                  <span style="font-size:16px;color:#4e4563;width: 200px; white-space: nowrap; overflow: hidden;text-overflow: ellipsis;">{{brandd.brand_name}}</span>
                <span class="brand1_lei" v-if="brandd.brand_id==1" >网站</span>
                <span class="brand1_lei" v-if="brandd.brand_id==2" >app</span>
                <span class="brand1_lei" v-if="brandd.brand_id==3" >软件</span>
                <span class="brand1_lei" v-if="brandd.brand_id==4" >游戏</span>
                <span class="brand1_lei" v-if="brandd.brand_id==5" >小程序</span>
                <span class="brand1_lei" v-if="brandd.brand_id==6" >硬件</span>
                <span class="brand1_lei" v-if="brandd.brand_id==7" >HTML5</span>
                <span class="brand1_lei" v-if="brandd.brand_id==8" >微信公众号</span>
                <span class="brand1_lei" v-if="brandd.brand_id==9" >其他</span>
                  <div class="brand1_introduce" style="white-space: normal;word-break: break-all;">{{brandd.brand_desc}}</div>
              </div>
              <div class="clear"></div>
            </div>
          </div>
        </div>
        <!--融资信息-->
        <div class="ul-lists" style="margin-top:16px;background: rgb(249, 250, 252); padding: 20px;">
          <div class="item">
            <span class="title"><img class="img" src="../../assets/images/money.png">融资信息</span>
            <div class="rz-details">
              <div class="rz-detail" v-show="project.pro_scale.scale_money!=''">
                <p class="det-title">期望融资</p>
                <p class="det-info">{{project.pro_scale.scale_money}}</p>
              </div>
              <div class="rz-detail" v-show="project.pro_finance_stock_after!=''">
                <p class="det-title">投后股份</p>
                <p class="det-info">{{project.pro_finance_stock_after}}%</p>
              </div>
              <div class="rz-detail" v-show="project.pro_finance_value!=''">
                <p class="det-title">估值</p>
                <p class="det-info">{{project.pro_finance_value}}万</p>
              </div>
            </div>
          </div>
          <div class="item" style="margin-top:35px;" v-show="financing.pro_finance_use!=''">
            <span class="sec-title" >资金用途</span>
            <div class="yt-doc">
              {{financing.pro_finance_use}}
            </div>
          </div>
          <div class="item" style="margin-top:6px;">
            <div>
              <span class="sec-title" style="margin-top: 20px">历史融资</span>
              <div class="v-progress-table" style="padding-left: 10px">
                <div class="v-progress-txt" v-for="finance in financing.pro_history_finance">
                  <img :src="cirIcon" alt="" style="width: 12px;height: 12px;">
                  <span class="pro-txt-1">{{finance.finance_time  | timeToReallTime}}</span>
                  <span class="pro-txt-2">{{finance.pro_finance_scale}}</span>
                  <span class="pro-txt-3" style="width: 68px;">{{finance.belongs_to_stage.stage_name}}</span>
                  <el-tooltip class="item" effect="dark"  placement="top" >
                    <div slot="content">
                      <div class="tips-txt">{{finance.pro_finance_investor}}</div>
                    </div>
                    <span class="pro-txt-4" style="width:230px;max-width:230px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;display:inline-block;margin-left: 73px">{{finance.pro_finance_investor}}</span>
                  </el-tooltip>
                  <div class="line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--里程碑-->
        <div class="ul-lists" style="margin-top:16px;background: rgb(249, 250, 252); padding: 20px;" v-show="milepost.pro_develop!=''">
          <div class="item">
            <span class="title"><img class="img" src="../../assets/images/Milepost.png">里程碑</span>
          </div>
          <div class="item" style="margin-top:6px;">
            <div>
              <div class="v-progress-table">
                <div class="v-progress-txt" v-for="develop in milepost.pro_develop">
                  <img :src="cirIcon" alt="" style="width: 12px;height: 12px;">
                  <span class="pro-txt-1">
                      {{develop.dh_start_time | timeToReallTime}}
                    </span>
                  <span class="pro-txt-2"  style="color:#5e6d82;white-space: normal;word-break: break-all;width: 546px;line-height: 20px">
                      {{develop.dh_event}}
                    </span>
                  <div class="line"></div>
                </div>
              </div>
            </div>

          </div>

        </div>
        <!--FA签约协议-->
        <div class="ul-lists" style="margin-top:16px;margin-bottom: 10px;background: rgb(249, 250, 252); padding: 20px;">
          <div class="item">
            <span class="title"><img class="img" src="../../assets/images/money.png">FA业务</span>
            <div class="item" style="margin-top:33px;" v-show="private.pro_source!=''">
              <span style="font-size:14px;color:#8492a6;">项目来源:&nbsp;&nbsp;</span>
              <span class="person-tag" v-for="source in private.pro_source"> {{source.tag_name}}</span>
            </div>
            <div class="rz-details" v-show="private.commission!=''&&private.stock_right!==''" >
              <div class="rz-detail" style="width: 50%" v-show="private.commission!=''">
                <p class="det-title">签约佣金</p>
                <p class="det-info">{{private.commission}}%</p>
              </div>
              <div class="rz-detail" style="width: 50%" v-show="private.stock_right!=''">
                <p class="det-title">股权赠与</p>
                <p class="det-info">{{private.stock_right}}%</p>
              </div>
            </div>
            <div class="item"   style="margin-top:24px;height: 49px;">
              <div class="bot-det" v-show="private.contact_user_name!=''">
                <span class="det-title">项目联系人:</span>
                <span class="del-info">{{private.contact_user_name}}</span>
              </div>
              <div class="bot-det" style="margin-left:170px;" v-show="private.contact_user_career!=''">
                <span class="det-title">职位:</span>
                <span class="del-info">{{private.contact_user_career}}</span>
              </div>
              <div class="bot-det" style="float:right;" v-show="private.contact_user_mobile!=''">
                <span class="det-title">手机号:</span>
                <span class="del-info">{{private.contact_user_mobile}}</span>
              </div>
            </div>
            <div class="bot-det" style="float: none" v-show="private.stock_follow!=''">
              <span class="det-title">跟投权:</span>
              <span class="del-info">{{private.stock_follow}}</span>
            </div>
            <div class="bot-det" style="float: none;margin-top: 8px" v-show="private.stock_other!=''">
              <span class="det-title">其他权益:</span>
              <span class="del-info">{{private.stock_other}}</span>
            </div>
            <div class="bot-det" style="float: none;margin-top: 8px" v-show="private.pro_remark!=''">
              <span class="det-title">项目备注:</span>
              <span class="del-info">{{private.pro_remark}}</span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import cirIcon from '../../../static/images/circle.png';
  import pinpai from '../../../static/images/icon-pinpa.png';
  import yunying from '../../../static/images/icon-yunying.png';
  export default {
    computed: {
      ...mapState({
        alertProjectDetailDisplay: state => state.dialogDisplay.alertProjectDetailDisplay,
        projectId: state => state.contactsDetails.alertProjectMessage.projectId
      })
    },
    data () {
      return {
        yunying: yunying,
        pinpai: pinpai,
        cirIcon: cirIcon,
        loading: false, // 加载动画
        file: {
          pro_BP: {
            created_at: '', // 2017-08-30 10:51:15
            deleted_at: null,
            file_ext: '', // docx
            file_id: '', // 3530
            file_title: '', // 微天使PC端开发文档1
            file_url: '', /// test_file/20170830/egKaSAxsZ7UNshhkCIuvbpjqNzDW59a628010b3d0.docx
            follow_id: '', // 0
            project_id: '', // 8215
            type: '', // 1
            updated_at: '', // 2017-08-30 10:51:15
            user_id: ''// 182510
          }

        },
        team: {
          core_users: {
            ct_member_career: '', // 技术
            ct_member_intro: '', // 亮点亮点亮点亮点亮点亮点亮点亮点
            ct_member_name: '', // 张三
            stock_scale: ''// 10

          },
          tag: {
            tag_name: ''// 大海
          }
        },
        financing: {
          pro_finance_use: '', // 用途
          pro_history_finance: [
            {
              finance_time: '', // 1503331200
              pro_finance_investor: '', // aS财经asaS财经asaS财经asaS财saSasaSS财经asaS
              pro_finance_scale: '', // 10000
              belongs_to_stage: {
                sort: '', // 5
                stage_id: '', // 18
                stage_name: '' // A+轮
              }
            }
          ]
        },
        company: {
          pro_status: {
            status_name: ''// 上线1
          },
          pro_company_scale: {
            comp_scale_value: ''// 1-20
          },
          pro_website: ''// baidu.com
        },
        pro: {
          is_exclusive: ''// 1
        },
        milepost: {
          pro_develop: [
            {
              dh_start_time: '', // 1503331200
              dh_event: ''// 事件
            }
          ]

        },
        brands: {},
        private: {
          commission: '', // 10
          contact_user_career: '', // 技术
          stock_follow: '', // 12
          stock_other: '', // 22
          stock_right: '', // 12
          user_mobile: '', // 18745852123
          user_name: '', // 张三
          pro_source: {
            tag_name: ''// baidu
          }
        },
        project: {
          pro_industry: {
            industry_name: ''// 轮次
          },
          follow_user: '', // 张小五
          open_status: '', // 1
          pro_company_name: '', // aaa
          pro_intro: '', // 微天使PC端开发文档
          pro_name: '', // 微天使PC端开发文档
          pro_schedule: '', // 10
          pro_total_score: '', // 94
          pro_area: {
            area_title: ''// 北京市
          },
          goodness: {
            pro_business_model: [{
              goodness_desc: '', // 凉凉凉凉
              goodness_title: ''// 亮点亮点
            }],
            pro_goodness: [{
              goodness_desc: '', // 凉凉凉凉
              goodness_title: ''// 亮点亮点
            }],
            pro_market_genera: [{
              goodness_desc: '', // 凉凉凉凉
              goodness_title: ''// 亮点亮点
            }],
            pro_service: [{
              goodness_desc: '', // 凉凉凉凉
              goodness_title: ''// 亮点亮点
            }]
          },
          pro_scale: {
            scale_money: ''// 1001W-200W
          },
          pro_stage: {
            stage_name: ''// 天使论
          }
        },
        status_name: ''// 一键尽调边上那个按钮线里的字
      };
    },
    methods: {
      // 关闭弹窗
      handleClose () {
        this.$store.dispatch('alertProjectControl', false);
      },
      // 获取项目详情数据
      getProjectDetail () {
        this.$http.post(this.URL.getProjectDetail, {user_id: localStorage.user_id, project_id: this.projectId})
          .then(res => {
            this.loading = false;
            let data = res.data.data;
            if (data.project.pro_scale === '') { data.project.pro_scale = {}; data.project.pro_scale.scale_money = '-'; }
            if (data.project.pro_area === '') { data.project.pro_area = {}; data.project.pro_area.area_title = '-'; }
            if (data.project.pro_stage === '') { data.project.pro_stage = {}; data.project.pro_stage.stage_name = '-'; }
            if (data.project.pro_finance_stock_after === '') { data.project.pro_finance_stock_after = {}; data.project.pro_finance_stock_after = '-'; }
            if (data.project.pro_intro === '') { data.project.pro_intro = {}; data.project.pro_intro = '-'; }
            if (data.project.pro_industry === '') { data.project.pro_industry = {}; data.project.pro_industry.industry_name = '-'; }
            this.project = data.project;
            // 项目文件
            this.file.pro_BP.file_title = data.file.pro_BP.file_title + '.' + data.file.pro_BP.file_ext;
            this.file = data.file;
            // 团队
            this.team = data.team;
            // 公司运营
            this.company = data.company;
            // 融资信息
            this.financing = data.financing;
            // 里程碑
            this.milepost = data.milepost;
            // FA业务
            this.private = data.private;
            // is_exclusive
            this.pro = data.pro_FA;
            // brand
            this.brands = data.brands;
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
          });
      }
    },
    watch: {
      alertProjectDetailDisplay: function (e) {
        if (e) {
          this.getProjectDetail();
        }
      }
    }
  };
</script>
<style lang="less">
  #alertProjectDetail{
    /*组件自带格式修改*/
    .el-dialog__body{
      padding: 0 !important;;
    }
    .el-dialog__header{
      padding-top: 0;
      .el-dialog__headerbtn{
        width: 30px;
        height: 30px;
        margin-right: -60px;
        i{
          width: 100%;
          height: 100%;
          font-size: 20px;
        }
      }
    }
    .el-dialog--small{
      width: 881px;
      margin: 0 auto;
      .item-lists{
        .item-lists-inner-left{
          position: relative;
          width: 100%;
        }
        .item-lists-inner-right{
          position: relative;
          .text{
            width: 88px;
            height: 108px;
            margin: 36px 0px 0 55px;
            img{
              width: 100%;
            }
          }
          .icon2{
            position: absolute;
            right: -30px;
            bottom: 12px;
            width: 16px;
            height: 16px;
            img{
              width: 100%;
            }
          }
          .button-float{
            float:right;
            background:#40587a;
            border-radius:2px;
            width:88px;
            height:36px;
            line-height: 36px;
            box-sizing: border-box;
            font-size:14px;
            color:#ffffff;
            text-align:center;
            margin-top: 45px;
          }
        }
        .onlyone{
          width:64px;
          height: 64px;
          position: absolute;
          right: -34px;
          top: -25px;
        }
        .height{
          //height: 26px;
        }
      }
    }
    /*上层弹框*/

    #projectPreview .contain-center1 .item-lists .item span{
      display: inline-block;
      vertical-align: middle;
    }
    .up-floor{
      padding: 20px 30px;
      background: white;
      .projectIntro{
        font-size:18px;
        color:#4e4563;
        line-height:18px;
        display: inline-block;
        margin-left: 6px;
        overflow: hidden;
        word-break:keep-all;
        white-space:nowrap;
        text-overflow:ellipsis;
        width: 700px;
      }
      .projectProcess{
        width: 100%;
        height: 36px;
        margin-top:18px;
        line-height: 36px;
        .progress{
          position: relative;
          .begin,.end{
            display: inline-block;
            padding-left: 8px;
            padding-right:8px;
          }
          .txt{
            font-size:13px;
            color:#99a9bf;
            letter-spacing:0;
            line-height:12px;
            position: relative;
          }
          .end{
            color:#99a9bf;
          }
          .img{
            width: 36px;
            height: 36px;
            display: inline-block;
            cursor: pointer;
            img{
              width: 50%;
              vertical-align: middle;
              line-height: 36px;
            }
          }
          .progress-bar{
            position: relative;
            display: inline-block;

            // margin:0 5px;
            .circle{
              position: absolute;
              background:#ffffff;
              border:1px solid #c0ccda;
              border-radius:20px;
              width:8px;
              height:8px;
              top:15.5px;
              z-index: 3;
            }
            .circle-s{
              left:0;
            }
            .circle-c{
              left:30px
            }
            .circle-e{
              left:calc(~"100% - 5px");
            }
            .bar-bg1{
              width:675px;
              height: 1px;
              background: #c0ccda;
            }
            .bar-bg2{
              width:80px;
              height: 2px;
              background: #c0ccda;
            }
            .bar-fg{
              position: absolute;
              z-index: 2;
              width: 30px;
              height: 2px;
              background: #20a0ff;
              left: 0px;
              top: 11px;
            }
            .state{
              position: absolute;
              z-index: 333;
              top:12px;

              font-size:14px;
              color:#20a0ff;
              letter-spacing:0;
              line-height:14px;
              margin: 0 5px;
              height: 17px;
              background: #f9fafc;
              text-align: center;
            }
          }
        }
      }
    }
    /*中层弹框*/
    .mid-floor{
      height: 16px;
      opacity:0.5;
    }
    .mid-tag{
      border:1px solid #e6e0ed;
      border-radius:20px;
      height:24px;
      line-height: 22px;
      box-sizing: border-box;
      margin-right:11px;
      text-align: center;
      padding:0 10px;
      font-size: 12px;
      color: #8492a6;
    }
    /*下层弹框*/
    .down-floor{
      padding: 27px 24px;
      background: white;
      .title{
        font-size:20px;
        color:#4e4563;
        line-height:20px;
        text-align:left;
        padding-right: 5px;
        vertical-align: bottom;
        .img{
          padding-right: 16px;
          vertical-align: bottom;
        }
      }
      .person-info{
        float:right;
        font-family:PingFangSC-Regular;
        font-size:14px;
        color:#475669;
        line-height:16px;
        text-align:right;
        margin-top: 8px;
      }
      .paper{
        height:54px;
        line-height: 54px;
        text-align: left;
        background: #ffffff;
        margin: 5px;
        .pt{
          width: 626px;
          font-size:16px;
          color:#333333;
          line-height:16px;
          text-align:left;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .bot-det{
        float:left;
        .det-title{
          font-size:14px;
          color:#475669;
          line-height:14px;
        }
        .del-info{
          font-size:14px;
          color: #475669;
          line-height:16px;
          a{
            color:#009eff;
          }
        }
      }
      .item{
        margin:0;
        span{
          display: inline-block;
          vertical-align: middle;
        }

        .icon{
          padding-right: 5px;
          cursor: pointer;
          width: 16px;
          height: 16px;
          img{
            width: 100%;
          }

        }
        .sec-title{
          font-family:MicrosoftYaHei;
          font-size:18px;
          color:#475669;
          line-height:16px;
          text-align:left;
          margin-left: 5px;
        }
        .small-tag{
          background:rgba(32,160,255,0.10);
          border:1px solid rgba(32,160,255,0.20);
          border-radius:4px;
          width:40px;
          line-height: 18px;
          box-sizing: border-box;
          font-size:12px;
          color:#20a0ff;
          text-align: center;
          margin:0 6px 0 2px;
        }
        .company{
          font-size:16px;
          color:#475669;
          line-height:18px;
          text-align:left;
          vertical-align:bottom;
        }
        .resource{
          float: right;
          font-size:16px;
          color:#475669;
          text-align:right;
          margin-top: 3px;
        }

        .flower{
          float: right;
          font-size:14px;
          color:#8492a6;
          text-align:right;
          padding-right: 15px;
        }
        .flower2{
          float: left;
          font-size:14px;
          color:#8492a6;
          text-align:right;
          padding-right: 15px;
        }

        .big-tag{
          font-size:14px;
          color:#8492a6;
          text-align:left;
        }
        .split{
          height: 14px;
          line-height: 14px;
          color:#e0e6ed;
          //margin:0 10px;
        }

        .person-tag{
          background:rgba(32,160,255,0.10);
          border-radius:4px;
          height:34px;
          font-size:14px;
          color:#20a0ff;
          text-align: center;
          line-height: 34px;
          box-sizing: border-box;
          padding:0 12px;
          margin-right: 15px;
          margin-bottom: 10px;
        }




        .p-name{
          font-size:18px;
          color:#1f2d3d;
        }
        .p-mg{
          font-size:16px;
          color:#475669;
          margin-left:18px;
        }
        .p-gf{
          float: right;
          color:#5e6d82;
          span{
            vertical-align: top;
            font-size:16px;
          }
        }
        .p-doc{
          font-size:13px;
          color:#8492a6;
          margin-top: 5px;
          margin-bottom: 11px;
          line-height:26px;
        }
        .prod-doc{
          margin-top: 16px;
          font-size:14px;
          color:#5e6d82;
          line-height:28px;
        }
        .rz-details{
          margin-top: 36px;
          background: #fff;
          border: 1px solid #e0e6ed;
          border-radius:3px;
          height:112px;
          .rz-detail{
            float:left;
            width:33.3%;
            text-align: center;
            padding-top:30px;
          }

          .det-title{
            font-size:16px;
            color:#475669;
            line-height:16px;
          }
          .det-info{
            font-size:22px;
            margin-top: 12px;
            color:#1f2d3d;
            line-height:22px;
          }
        }
        .yt-doc{
          margin-top: 12px;
          font-size:13px;
          color:#5e6d82;
          line-height:28px;
          margin-left: 5px;
        }
        .v-progress{
          display: inline-block;
          position: relative;
          width: 12px;
          span{
            position: absolute;
          }
          .circle{
            border:1px solid #c0ccda;
            border-radius:20px;
            width:12px;
            z-index: 2;
            background: #f9fafc;
            height:12px;
          }
          .circle-s{
            top:25px;
            left:0;
          }
          .circle-c{
            top:89px;
          }
          .circle-e{
            bottom: 19px;
            left:0;
          }
          .v-line{
            height: 54px;
            z-index: 1;
            width:1px;
            background: #e0e6ed;
            left:5.5px;
          }
          .v-line-1{
            top:37px;
          }
          .v-line-2{
            top:101px;
          }
        }
        .v-progress-table{
          display: inline-block;
          width: 732px;
          vertical-align: top;
          /*        margin-left:30px;*/
          line-height: 60px;
          .v-progress-txt{
            font-size:14px;
          }
          .pro-txt-1{
            color:#99a9bf;
            margin-left: 12px;
          }
          .pro-txt-2{
            color:#1f2d3d;
            margin-left: 53px;
            width: 79px;
           white-space: normal;word-break: break-all;line-height: 20px
          }
          .pro-txt-3{
            color:#1f2d3d;
            margin-left: 24px;
          }
          .pro-txt-4{
            color:#5e6d82;
            margin-left: 140px;
          }
        }
      }
    }
    .ul-lists{
      .brand{
        margin-top: 36px;
        .clear{
          clear: both;
        }
        .brand1{
          width:48%;
          height:126px;
          background: #ffffff;
          margin-bottom: 16px;
          padding:20px 16px;
          .brand1_lei{
            display: inline-block;
            border: 1px solid rgb(230, 224, 237);
            border-radius: 20px;
            /*width: 46px;*/
            padding:0 10px;
            height: 22px;
            font-size: 13px;
            color: rgb(132, 146, 166);
            text-align: center;
            line-height: 22px;
            float: right;
          }
          .brand1_introduce{
            height:53px;
            overflow: hidden;
            font-size:14px;
            color:#8492a6;
            line-height:27px;
            margin-top: 20px;
          }
        }
        .brand1:nth-child(odd){
          float: left;
        }
        .brand1:nth-child(even){
          float: right;
        }
      }
    }
  }
  .scheduleColor{
    color:#20a0ff!important;
  }
  .brand{
    margin-top: 36px;
    .clear{
      clear: both;
    }
    .brand1{
      width:48%;
      height:126px;
      background: #ffffff;
      margin-bottom: 16px;
      padding:20px 16px;
      .brand1_lei{
        display: inline-block;
        border: 1px solid rgb(230, 224, 237);
        border-radius: 20px;
        //width: 46px;
        padding:0 15px;
        height: 22px;
        font-size: 13px;
        color: rgb(132, 146, 166);
        text-align: center;
        line-height: 22px;
        float: right;
      }
      .brand1_introduce{
        font-size:14px;
        color:#8492a6;
        line-height:18px;
        margin-top: 20px;
      }
    }
    .brand1:nth-child(odd){
      float: left;
    }
    .brand1:nth-child(even){
      float: right;
    }
  }
</style>

