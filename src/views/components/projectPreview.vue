<template>
  <div id="projectPreview" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <!--===========================================项目推送预览弹框=============================================-->
    <el-dialog :visible="projectPushPreviewDisplay" :show-close="close"
               custom-class="dialogCon" :before-close="closePreview"
               close-on-press-escape close-on-click-modal>
      <div class="top_pro">
        <p style="font-size:14px;color:#1f2d3d;font-weight: bold">{{pushMessage.title}}</p><!--用户写的标题-->
        <p style="font-size:14px;color:#1f2d3d;margin-top: 20px;">尊敬的{{userMessage.user_real_name}}:</p><!--尊敬的翁浩平/被推送的人-->

        <p style="font-size:16px;color:#333333;font-weight: 500;margin-top: 20px;">
          <i v-if="userData.user_brand!=''">{{userData.user_brand}} · </i>
          <i v-else>{{userData.user_real_name}}<i v-if="userData.user_real_name==''"> · </i></i>
          <i v-if="userData.user_company_career!=''">{{userData.user_company_career}} · </i>
          <i v-if="userData.user_real_name!=''">{{userData.user_real_name}}</i>
          <i>给您推荐了一个投资项目。</i>
        </p>
        <p style="line-height: 20px;margin-top: 20px;">{{pushMessage.body}}</p>
      </div>

      <div class="contain-grid contain-center2">
        <div class="main-box clearfix">
          <div class="item-lists item-lists-top clearfix"  style="padding-top: 60px;">
            <div class="item-lists-inner-left">
              <div class="item height" style="width: 518px;height: 48px;overflow: hidden;">
                <span class="title relative" v-if="project.pro_name !== ''" style="color:#3378e0;font-size:18px;line-height: 25px;">
                  <i style="font-weight: 900">【{{project.pro_name}}】——</i> {{project.pro_intro}}</span>
              </div>
              <button class="btn11 absolute">查看详情</button>

              <div class="item height" style="margin-top:22px;">
                <span class="mid-tag" v-for="industry in project.pro_industry">{{industry.industry_name}}</span>
              </div>
              <div class="item height" style="margin-top:18px;">
                <span class="big-tag">{{project.pro_stage.stage_name}} · </span>
                <span class="big-tag">{{project.pro_area.area_title}} · </span>
                <span class="big-tag">{{project.pro_scale.scale_money}} · </span>
                <span class="big-tag">{{project.pro_finance_stock_after}}%</span>

              </div>
              <div class="item" style="width: 824px;">
              </div>
            </div>
          </div>
          <div class="item-lists clearfix" style="padding: 0px;">
            <div class="ul-lists" style="margin-top:16px;padding: 0">
                <div class="item">
                  <div  v-show="project.goodness.pro_goodness.length!=0"  style="margin-bottom: 20px">
                    <div class="goodnesstitle">投资亮点：</div>
                    <div class="prod-doc" v-for=" (goodness1,index) in project.goodness.pro_goodness">
                       <span class="sp1">
                         <span class="sp2">{{goodness1.goodness_title}}&nbsp;:&nbsp;</span>
                      {{goodness1.goodness_desc}}
                       </span>
                    </div>
                  </div>
                  <div  v-show="project.goodness.pro_market_genera.length!=0" style="margin-bottom: 20px">
                    <div class="goodnesstitle">市场概况：</div>
                    <div class="prod-doc" v-for="goodness2 in project.goodness.pro_market_genera">
                       <span class="sp1">
                         <span class="sp2">{{goodness2.goodness_title}}&nbsp;:&nbsp;</span>
                      {{goodness2.goodness_desc}}
                       </span>
                    </div>
                  </div>
                  <div v-show="project.goodness.pro_business_model.length!=0" style="margin-bottom: 20px">
                    <div class="goodnesstitle">商业模式：</div>
                    <div class="prod-doc" v-for="goodness3 in project.goodness.pro_business_model">
                       <span class="sp1">
                         <span class="sp2">{{goodness3.goodness_title}}</span>&nbsp;:&nbsp;
                      {{goodness3.goodness_desc}}
                       </span>
                    </div>
                  </div>
                  <div v-if="project.goodness.pro_service.length!=0"  style="margin-bottom: 20px">
                    <div class="goodnesstitle">产品概况：</div>
                    <div class="prod-doc" v-for="goodness4 in project.goodness.pro_service">
                       <span class="sp1">
                         <span class="sp2">{{goodness4.goodness_title}}&nbsp;:&nbsp;</span>
                      {{goodness4.goodness_desc}}
                       </span>
                    </div>
                  </div>
                </div>
              </div>
            <div class="list tc relative">
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
      // 关闭当前弹窗
      closePreview () {
        this.$store.dispatch('projectPushPreviewControl', false);
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
