<template>
  <div id="projectPreview" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <!--===========================================项目推送预览弹框=============================================-->
    <el-dialog :visible="projectPushPreviewDisplay" :show-close="close"
               custom-class="dialogCon" :before-close="closePreview"
               close-on-press-escape close-on-click-modal>
      <div class="top_pro">
        <p style="line-height: 42px;">{{pushMessage.title}}</p><!--用户写的标题-->
        <p style="line-height: 42px;">尊敬的:　{{userMessage.user_real_name}}</p><!--尊敬的翁浩平/被推送的人-->

        <p style="font-size:18px;color:#fc703e;font-weight: bolder;line-height: 28px;">
          <i v-if="userData.user_brand!=''">{{userData.user_brand}}－</i>
          <i v-else>{{userData.user_real_name}}<i v-if="userData.user_real_name==''">－</i></i>
          <i v-if="userData.user_company_career!=''">{{userData.user_company_career}}－</i>
          <i v-if="userData.user_real_name!=''">{{userData.user_real_name}}</i>
        </p>
        <p style="line-height: 24px;">通过<i style="color:#1F2D3D;font-weight: bolder">
          微天使乐投平台(www.weitianshi.cn)</i>向您推荐了一个投资项目，您可以
          <i style="color:#009eff">注册/登录</i>
          微天使乐投平台，找到更多FA精选优质项目</p>
        <p style="line-height: 20px;">{{pushMessage.body}}</p>
      </div>

      <div class="contain-grid contain-center2 fl">
        <div class="main-box clearfix">
          <div class="item-lists item-lists-top clearfix">
            <div class="item-lists-inner-left fl">
              <div class="item height">
                <span class="title">{{project.pro_intro}}</span>
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
              <div class="item" style="width: 824px;">
              </div>
            </div>
          </div>
          <div class="item-lists clearfix" style="">
            <div class="ul-lists">
              <div class="item">
                <span class="title"><img class="img" src="../../assets/images/projectIntroduce.png">项目介绍</span>
                <span class="flower" v-show="project.follow_user!=''">跟进人 : {{project.follow_user}}</span>
              </div>
              <div class="item" style="margin-top:33px;">
                <span class="person-tag" v-for="tag in project.tag" v-if="tag.type==0">{{tag.tag_name}}</span>
              </div>
              <div class="item" style="margin-top:24px;">
                <div class="paper" v-if="file.pro_BP.length!=0">
                  <img class="img" style="padding-left: 16px;" src="../../assets/images/paper.png">
                  <span class="pt">{{file.pro_BP.file_title}}</span>

                </div>
              </div>
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
            <div class="ul-lists" style="margin-top:16px;" v-show="team.core_users!=''||team.tag!=''" >
              <div class="item">
                <span class="title"><img class="img" src="../../assets/images/team.png">核心团队</span>
              </div>
              <div class="item" v-show="team.tag!=''" style="margin-top:33px;">
                <span class="person-tag" v-for="tag1 in team.tag">{{tag1.tag_name}}</span>
              </div>
              <div style="margin-top:32px;"></div>
              <div class="item" v-show="team.core_users!=''" v-for="bili in team.core_users" style="margin-top:10px;">
                <el-tooltip class="item" effect="dark"  placement="top" >
                  <div slot="content">
                    <div class="tips-txt">{{bili.ct_member_name}}</div>
                  </div>
                  <span class="p-name" style="text-align:center;line-height: 44px;width: 90px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{bili.ct_member_name}}</span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark"  placement="top">
                  <div slot="content">
                    <div class="tips-txt">{{bili.ct_member_career}}</div>
                  </div>
                  <span class="p-mg" style="text-align:center;line-height: 44px;width: 120px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{bili.ct_member_career}}</span>
                </el-tooltip>
                <div class="p-gf">股权占比 : <span>{{bili.stock_scale}}%</span></div>
                <div class="p-doc">{{bili.ct_member_intro}}</div>
              </div>

            </div>
            <!--公司运营-->
            <div class="ul-lists" style="margin-top:16px;" v-show="company.pro_company_scale!=''||company.pro_status!=''||company.pro_website!==''" >
              <div class="item">
                <span class="title"><img class="img" :src="yunying" style="width: 37px;">公司运营</span>
                <div class="rz-details">
                  <div class="rz-detail">
                    <span class="det-title" style="width: 100%;line-height: 21px">运营状态</span>
                    <span class="del-info" style="font-size:22px;color:#1f2d3d;text-align:center;line-height: 44px">{{company.pro_status.status_name}}</span>
                  </div>
                  <div class="rz-detail">
                    <span class="det-title" style="width: 100%;line-height: 21px">公司官网</span>

                    <el-tooltip class="item" effect="dark"  placement="top" >
                      <div slot="content">
                        <div class="tips-txt">{{company.pro_website}}</div>
                      </div>
                      <span  class="del-info"  style="font-size:22px;color:#20a0ff;text-align:center;line-height: 44px;cursor: pointer;width: 200px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-decoration: underline!important" @click="urlOpen(company.pro_website)">{{company.pro_website | nullTo_}}</span>
                    </el-tooltip>
                  </div>
                  <div class="rz-detail">
                    <span class="det-title"style="width: 100%;line-height: 21px">公司规模</span>
                    <span class="del-info"  style="font-size:22px;color:#1f2d3d;text-align:center;line-height: 44px">{{company.pro_company_scale.comp_scale_value | nullTo_}} </span>
                    <span v-show="company.pro_company_scale.comp_scale_value!='-'">人</span>
                  </div>
                </div>
              </div>
            </div>
            <!--产品-->
            <div class="ul-lists" style="margin-top:16px;" v-show="brands.brand!=''">
              <div class="item">
                <span class="title"><img class="img" :src="pinpai" style="width: 37px;">产品</span>
                <div class="brand">
                  <div class="brand1" v-for="brandd in brands.brand">
                    <el-tooltip class="item" effect="dark"  placement="top" >
                      <div slot="content">
                        <div class="tips-txt">{{brandd.brand_name}}</div>
                      </div>
                      <span style="font-size:16px;color:#4e4563;width: 200px; white-space: nowrap; overflow: hidden;text-overflow: ellipsis;">{{brandd.brand_name}}</span>
                    </el-tooltip>
                    <span class="brand1_lei" v-if="brandd.type_id==1" >网站</span>
                    <span class="brand1_lei" v-if="brandd.type_id==2" >app</span>
                    <span class="brand1_lei" v-if="brandd.type_id==3" >软件</span>
                    <span class="brand1_lei" v-if="brandd.type_id==4" >游戏</span>
                    <span class="brand1_lei" v-if="brandd.type_id==5" >小程序</span>
                    <span class="brand1_lei" v-if="brandd.type_id==6" >硬件</span>
                    <span class="brand1_lei" v-if="brandd.type_id==7" >HTML5</span>
                    <span class="brand1_lei" v-if="brandd.type_id==8" >微信公众号</span>
                    <span class="brand1_lei" v-if="brandd.type_id==9" >其他</span>
                    <el-tooltip class="item" effect="dark"  placement="top">
                      <div slot="content">
                        <div class="tips-txt">{{brandd.brand_desc}}</div>
                      </div>
                      <div class="brand1_introduce" style="white-space: normal;word-break: break-all;margin-top: 15px;">{{brandd.brand_desc}}</div>
                    </el-tooltip>
                  </div>
                  <div class="clear"></div>
                </div>
              </div>
            </div>
            <!--融资信息-->
            <div class="ul-lists" v-show="financing.pro_finance_use!=''||financing.pro_history_finance.length!=0" style="margin-top:16px;">
              <div class="item">
                <span class="title"><img class="img" src="../../assets/images/money.png">融资信息</span>
                <div class="rz-details">
                  <div class="rz-detail">
                    <p class="det-title">期望融资</p>
                    <p class="det-info">{{project.pro_scale.scale_money | nullTo_}}</p>
                  </div>
                  <div class="rz-detail">
                    <p class="det-title">投后股份</p>
                    <p class="det-info">{{project.pro_finance_stock_after | nullTo_}}%</p>
                  </div>
                  <div class="rz-detail">
                    <p class="det-title">估值</p>
                    <p class="det-info">{{project.pro_finance_value | nullTo_}}万</p>
                  </div>
                </div>
              </div>
              <div class="item" style="margin-top:35px;" v-show="financing.pro_finance_use!=''">
                <span class="sec-title" >资金用途</span>
                <div class="yt-doc">
                  {{financing.pro_finance_use}}
                </div>
              </div>
              <div class="item" style="margin-top:18px;" v-show="financing.pro_history_finance.length!=0">
                <div>
                  <span class="sec-title">历史融资</span>
                  <div class="v-progress-table">
                    <div class="v-progress-txt" style="height: 45px;" v-for="finance in financing.pro_history_finance">
                      <img :src="cirIcon" alt="" style="width: 12px;height: 12px;">
                      <span class="pro-txt-1">{{finance.finance_time | timeToReallTime}}</span>
                      <span class="pro-txt-2">{{finance.pro_finance_scale}}</span>
                      <span class="pro-txt-3" style="width: 68px;">{{finance.belongs_to_stage.stage_name}}</span>
                      <el-tooltip class="item" effect="dark"  placement="top" >
                        <div slot="content">
                          <div class="tips-txt">{{finance.pro_finance_investor}}</div>
                        </div>
                        <span class="pro-txt-4" style="width:244px;max-width:244px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;display:inline-block;margin-left: 73px">{{finance.pro_finance_investor}}</span>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--里程碑-->
            <div class="ul-lists" style="margin-top:16px;margin-bottom: 30px" v-show="milepost.pro_develop!=''" >
              <div class="item">
                <span class="title"><img class="img" src="../../assets/images/Milepost.png">里程碑</span>
              </div>
              <div class="item" style="margin-top:6px;">
                <div>
                  <div class="v-progress-table">
                    <div class="v-progress-txt" style="height: 45px;" v-for="develop in milepost.pro_develop">
                      <img :src="cirIcon" alt="" style="width: 12px;height: 12px;">
                      <span class="pro-txt-1">
                        {{develop.dh_start_time | timeToReallTime}}
                      </span>
                      <span class="pro-txt-2"  style="color:#5e6d82;white-space: normal;word-break: break-all;width: 546px;line-height: 20px">
                        {{develop.dh_event}}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="ul-lists list tc" >
              <div class="toButton" style="padding-left: 0">
                <button  @click="closePreview" class="btn1">返回</button>
                <button  @click="pushProject" class="btn1">推送</button>
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
  import yichu from '../../assets/images/icon-yichu.png';
  import xiaochengxu from '../../../static/images/xiaochengxu.png';
  import pinpai from '../../../static/images/icon-pinpa.png';
  import yunying from '../../../static/images/icon-yunying.png';
  import cirIcon from '../../../static/images/circle.png';
  import { success, error } from '@/utils/notification';
  export default {
    data () {
      return {
        yichu: yichu,
        yunying: yunying,
        pinpai: pinpai,
        cirIcon: cirIcon,
        xiaochengxu: xiaochengxu,
        close: false, // 默认关闭
        loading: false, // 加载动画
        show: 'detail',
        styleObject: {
          color: ''
        },
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
          pro_develop: {
            dh_start_time: '', // 1503331200
            dh_event: ''// 事件
          }

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
          pro_scale: {
            scale_money: ''// 1001W-200W
          },
          pro_stage: {
            stage_name: ''// 天使论
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
          }
        }
      };
    },
    methods: {
      // 项目来源编辑
      getteam_tag (arr) {
        return arr.filter(v => v.type === 1).map(item => item.tag_name);
      },
      // 关闭当前弹窗
      closePreview () {
        this.$store.dispatch('projectPushPreviewControl', false);
      },
      // 项目来源编辑
      getProjectTag (arr) {
        let str = '';
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].type === 2) {
            str += arr[i].tag_name + '.';
          }
        }
        return str;
      },
      // 获取项目详情数据
      getProjectDetail () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.$http.post(this.URL.getProjectDetail, {user_id: localStorage.user_id, project_id: this.projectId})
            .then(res => {
              let data = res.data.data;
              // 项目介绍
              if (data.project.pro_scale === '') { data.project.pro_scale = {}; data.project.pro_scale.scale_money = ' '; }
              if (data.project.pro_area === '') { data.project.pro_area = {}; data.project.pro_area.area_title = ' '; }
              if (data.project.pro_stage === '') { data.project.pro_stage = {}; data.project.pro_stage.stage_name = ' '; }
              if (data.project.pro_finance_stock_after === '') { data.project.pro_finance_stock_after = {}; data.project.pro_finance_stock_after = ' '; }
              if (data.project.pro_intro === '') { data.project.pro_intro = {}; data.project.pro_intro = ' '; }
              if (data.project.pro_industry === '') { data.project.pro_industry = {}; data.project.pro_industry.industry_name = ' '; }
              if (data.company.pro_status === '') { data.company.pro_status = {}; data.company.pro_status.status_name = '-'; }
              if (data.company.pro_website === '') { data.company.pro_website = {}; data.company.pro_website = '-'; }
              if (data.company.pro_company_scale === '') { data.company.pro_company_scale = {}; data.company.pro_company_scale.comp_scale_value = '-'; }
              if (data.project.pro_schedule === '') { data.project.pro_schedule = {}; data.project.pro_schedule.schedule_name = ''; data.project.pro_schedule.schedule_id = ''; }
              this.project = data.project;
              // 公司运营
              this.company = data.company;
              // 项目文件
              this.file.pro_BP.file_title = data.file.pro_BP.file_title + '.' + data.file.pro_BP.file_ext;
              this.file = data.file;
              // 融资信息
              this.financing = data.financing;
              // 里程碑
              this.milepost = data.milepost;
              // FA业务
              this.private = data.private;
              // 团队
              this.team.tag = this.getteam_tag(data.team.tag);
              this.team = data.team;

              // is_exclusive
              this.pro = data.pro_FA;
              // brand
              this.brands = data.brands;
              if (data.pro_schedule === '') { data.pro_schedule = {}; data.pro_schedule.schedule_name = ''; data.pro_schedule.schedule_id = ''; }
              resolve(3);
              this.loading = false;
            })
            .catch(err => {
              console.log(err);
            });
        });
      },
      // 推送项目
      pushProject () {
        this.$http.post(this.URL.pushProjectToUsers, this.pushMessage).then(res => {
          if (res.data.status_code === 2000000) {
            success('推送成功');
            this.loading = false;
            this.$store.dispatch('projectPushToProControl', false);
            this.$store.dispatch('projectPushToConControl', false);
            this.$store.dispatch('projectPushPreviewControl', false);
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
    computed: {
      ...mapState({
        projectPushPreviewDisplay: state => state.pushProject.projectPushPreviewDisplay,
        projectId: state => state.projectDetails.projectMessage.projectId,
        pushMessage: state => state.pushProject.pushMessage, // 推送的数据，包括邮箱所有数据
        userMessage: state => state.pushProject.userMessage, // 被推送的用户的数据
        userData: state => state.logining // 当前用户的部分信息
      })
    },
    create () {},
    watch: {
      projectPushPreviewDisplay: function (e) {
        if (e) {
          this.getProjectDetail();
        }
      }
    }
  };
</script>

<style lang="less">
  @import '../../assets/css/projectPreview';
</style>
