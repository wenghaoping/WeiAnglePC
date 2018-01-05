<template>
  <div id="alertContactsDetail">
    <!--===========================================认证弹窗=============================================-->
    <el-dialog :visible="identityDisplay" custom-class="dialogCon" :before-close="closeIdentity" close-on-press-escape close-on-click-modal
               v-loading="loading"
               element-loading-text="拼命加载中">
      <div class="contain-grid contain-center3 fl">
        <div class="main-box clearfix">
          <div class="renzheng_center">
            <div class="imgrenzhen">
              <div class="renzhen inlineBlock">
                <img v-if="auth_info.identify_status === 1" src="../../assets/images/shenhezhong.png"><!--!-->
                <img v-else-if="auth_info.identify_status === 2" src="../../assets/images/shenhetongguo.png"><!--勾-->
                <img v-else-if="auth_info.identify_status === 3" src="../../assets/images/weitongguo.png"><!--X-->
              </div>
              <div class="faweixin inlineBlock">
                <img src="../../assets/images/index-qr.png">
              </div>
            </div>
            <p class="maifang tc">{{maiFang}}</p>
            <p  class="maifangweixin tc">{{maiFangWeiXin}}</p>
          </div>
          <div class="item-lists clearfix">
            <div class="item-list item-list-main">
              <!--基本信息-->
              <div class="item clearfix">
                <div class="block clearfix" style="margin-bottom: 33px;">
                  <span class="title fl"><img class="img1" src="../../assets/images/rectangle.png">基本信息</span>
                </div>
                <div class="tit_second inlineBlock">
                  <div class="tit clearfix">
                    <div class="tit_left fl">姓名 ： </div>
                    <div class="tit_right1 fl">{{auth_info.iden_name | nullTo_}}</div>
                  </div>
                  <div class="tit clearfix">
                    <div class="tit_left fl">公司 ： </div>
                    <div class="tit_right1 fl">{{auth_info.iden_company_name | nullTo_}}</div>
                  </div>
                  <div class="tit clearfix">
                    <div class="tit_left fl">邮箱 ： </div>
                    <div class="tit_right1 fl">{{auth_info.iden_email | nullTo_}}</div>
                  </div>
                </div>
                <div class="tit_second inlineBlock">
                  <div class="tit clearfix">
                    <div class="tit_left fl">职位 ： </div>
                    <div class="tit_right1 fl">{{auth_info.iden_company_career | nullTo_}}</div>
                  </div>
                  <div class="tit clearfix">
                    <div class="tit_left fl">品牌 ： </div>
                    <div class="tit_right1 fl">{{auth_info.iden_brand | nullTo_}}</div>
                  </div>
                  <div class="tit clearfix">
                    <div class="tit_left fl">微信 ： </div>
                    <div class="tit_right1 fl">{{auth_info.iden_wx | nullTo_}}</div>
                  </div>
                </div>
                <div class="tit_second" v-if="auth_info.user_card_image.image_src !== ''">
                  <div class="tit clearfix">
                    <div class="tit_left fl">名片 ： </div>
                    <div class="tit_right1 fl"><div class="img"><img :src="auth_info.user_card_image.image_src"></div></div>
                  </div>
                </div>
              </div>
              <!--投资案例-->
              <div class="item" v-if="projectCases.projectCase.length!=0">
                <div class="block clearfix" style="margin-bottom: 33px;">
                  <span class="title fl"><img class="img1" src="../../assets/images/anli.png">投资案例</span>
                </div>
                <div class="block lh" v-for="projectCase in projectCases.projectCase">
                  <span class="radio" style=" line-height: 14px;"><img src="../../assets/images/radioTag.png"></span>
                  <span class="time" style="margin-left: 15px">{{projectCase.case_deal_time | timeToReallTime}}</span>
                  <span class="tag_To">{{projectCase.case_stage_name}}</span>
                  <span class="title1">{{projectCase.case_name}}</span>
                  <span class="title2">{{projectCase.case_money}}万元</span>
                  <span class="tags_To">{{projectCase.case_industry}}</span>
                  <span class="address">{{projectCase.case_city_name}}</span>
                </div>
              </div>
              <!--个人描述-->
              <div class="item" v-if="auth_info.iden_desc!=''">
                <div class="block clearfix" style="margin-bottom: 33px;">
                  <span class="title fl"><img class="img1" src="../../assets/images/miaoshu.png">个人描述</span>
                </div>
                <div class="block">
                  <div class="main">
                    {{auth_info.iden_desc}}
                  </div>
                </div>
              </div>
              <!--投资需求-->
              <div class="item" v-if="investment.industry!='' || investment.stage!='' || investment.scale!='' || investment.area!='' || investment.investor_desc!=''">
                <div class="block clearfix" style="margin-bottom: 33px;">
                  <span class="title fl"><img class="img1" src="../../assets/images/money2.png">投资需求</span>
                </div>
                <div class="block tit clearfix" v-if="investment.industry!=''">
                  <div class="tit_left fl">投资领域 ： </div>
                  <div class="tit_right fl">{{investment.industry}}</div>
                </div>
                <div class="block tit clearfix" v-if="investment.stage!=''">
                  <div class="tit_left fl">投资轮次 ： </div>
                  <div class="tit_right fl">{{investment.stage}}</div>
                </div>
                <div class="block tit clearfix" v-if="investment.scale!=''">
                  <div class="tit_left fl">投资金额 ： </div>
                  <div class="tit_right fl">{{investment.scale}}</div>
                </div>
                <div class="block tit clearfix" v-if="investment.area!=''">
                  <div class="tit_left fl">投资地区 ： </div>
                  <div class="tit_right fl">{{investment.area}}</div>
                </div>
                <div class="block tit clearfix" v-if="investment.investor_desc!=''">
                  <div class="tit_left fl">投资描述 ： </div>
                </div>
                <div class="block" v-if="investment.investor_desc!=''">
                  <div class="tit_mian">{{investment.investor_desc}}</div>
                </div>
              </div>
              <!--业务需求-->
              <div class="item" v-if="auth_info.is_financing === 1 || auth_info.is_alliance === 1 || auth_info.is_identify_member === 1 || auth_info.is_saas === 1 || auth_info.is_FA_part === 1">
                <div class="block clearfix" style="margin-bottom: 33px;">
                  <span class="title fl"><img class="img1" src="../../assets/images/anli.png">业务需求</span>
                </div>
                <div class="block tit clearfix" v-if="auth_info.is_financing === 1">
                  <div class="tit_left fl queren"><img src="../../assets/images/queren.png"></div>
                  <div class="tit_right2 fl ">需要FA（财务顾问）融资服务</div>
                </div>
                <div class="block tit clearfix" v-if="auth_info.is_alliance === 1">
                  <div class="tit_left fl queren"><img src="../../assets/images/queren.png"></div>
                  <div class="tit_right2 fl ">申请加入中国FA行业联盟</div>
                </div>
                <div class="block tit clearfix" v-if="auth_info.is_identify_member === 1">
                  <div class="tit_left fl queren"><img src="../../assets/images/queren.png"></div>
                  <div class="tit_right2 fl ">加入FA社群认证会员</div>
                </div>
                <div class="block tit clearfix" v-if="auth_info.is_saas === 1">
                  <div class="tit_left fl queren"><img src="../../assets/images/queren.png"></div>
                  <div class="tit_right2 fl ">申请试用创业项目库的管理saas系统</div>
                </div>
                <div class="block tit clearfix" v-if="auth_info.is_FA_part === 1">
                  <div class="tit_left fl queren"><img src="../../assets/images/queren.png"></div>
                  <div class="tit_right2 fl ">兼做FA业务</div>
                </div>
              </div>
            </div>
          </div>
          <div class="toButton" style="padding-left: 0;position: relative">
            <el-button type="primary" size="large" style="margin-left:45%;margin-bottom: 15px;" @click="newIdentity">重新认证</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as formatData from '@/utils/formatData';
  import * as validata from '@/utils/validata';
  import { error } from '@/utils/notification';
  export default {
    props: ['identityDisplay'],
    data () {
      return {
        loading: false, // 加载动画
        // 个人信息
        auth_info: {
          authenticate_id: 7906,
          created_at: '2017-09-05 14:38:41',
          deleted_at: '',
          group_id: 18,
          iden_brand: '',
          iden_company_career: '',
          iden_company_name: '',
          iden_desc: '',
          iden_email: '',
          iden_image_id: '',
          iden_name: '',
          iden_wx: '',
          identify_status: 2, // 认证情况
          is_FA_part: 0,
          is_alliance: 0,
          is_financing: 0,
          is_identify_member: 0,
          is_saas: 0,
          message_board: '',
          updated_at: '2017-09-05 20:42:41',
          user_card_image: '',
          user_id: '0'
        },
        // 投资需求
        investment: {
          industry: '', // 领域标签
          stage: '', // 轮次
          scale: '', // 投资金额
          area: '', // 所属地区1省级单位
          investor_desc: '' // 投资需求描述
        },
        // 成功案例数据
        projectCases: {
          projectCase: [{
            case_name: '', // 项目名称
            case_province: '', // 投资地区
            case_city: '', // 投资城市
            case_industry: '', // 项目领域
            case_money: '', // 投资金额
            case_deal_time: '', // 交易时间
            case_stage_name: '', // 项目轮次
            case_id: '' // 项目id
          }]
        }
      };
    },
    methods: {
      // 关闭弹窗
      closeIdentity () {
        this.$emit('closeIdentity', false);
      },
      // 设置投资案例
      setProjectCase (arr) {
        let newArr = [];
        arr.forEach((x) => {
          let obj = {};
          obj.case_deal_time = x.case_deal_time;
          obj.case_stage_name = x.case_stage_name;
          obj.case_name = x.case_name;
          obj.case_money = x.case_money;
          obj.case_industry = formatData.setTagToString(x.case_industry, 'industry_name');
          obj.case_city_name = x.case_city_name;
          newArr.push(obj);
        });
        return newArr;
      },
      // 获取认证个人详情
      getUserAuthenticateInfo () {
        this.loading = true;
        this.$http.post(this.URL.getUserAuthenticateInfo, {user_id: localStorage.user_id})
          .then(res => {
            let data = res.data;
            // 个人信息
            if (validata.isArray(data.auth_info.user_card_image)) {
              if (data.auth_info.user_card_image.length === 0) {
                data.auth_info.user_card_image = {};
                data.auth_info.user_card_image.image_src = '';
              }
            }
            localStorage.authenticate_id = data.auth_info.authenticate_id;
            this.auth_info = data.auth_info;
            // 投资需求
            data.invest_info.industry = formatData.setTagToString(data.invest_info.industry, 'industry_name');
            data.invest_info.stage = formatData.setTagToString(data.invest_info.stage, 'stage_name');
            data.invest_info.scale = formatData.setTagToString(data.invest_info.scale, 'scale_money');
            data.invest_info.area = formatData.setTagToString(data.invest_info.area, 'area_title');
            this.investment = data.invest_info;
            // 成功案例
            this.projectCases.projectCase = this.setProjectCase(data.project_case);
          })
          .catch(err => {
            console.log(err);
          });
        this.loading = false;
      },
      // 重新认证
      newIdentity () {
        this.$emit('closeIdentity', false);
        this.$router.push({name: 'identityChoose'});
      },
      // 是否认证过身份
      getUserGroupByStatus () {
        // 核对是否认证过身份
        this.$http.post(this.URL.getUserGroupByStatus, {
          user_id: localStorage.user_id
        }).then(res => {
          if (res.data.status_code === 2000000) {
            if (res.data.status === 1 || res.data.status === 2) {
              // 认证过了
            }
          } else {
            error('核对身份接口调用失败');
          }
        });
      }
    },
    created () {

    },
    computed: {
      maiFang () {
        if (this.auth_info.identify_status === 1) {
          return localStorage.group_title + '认证审核中';
        } else if (this.auth_info.identify_status === 2) {
          return localStorage.group_title + '认证审核通过';
        } else if (this.auth_info.identify_status === 3) {
          return localStorage.group_title + '认证审核未通过';
        }
      },
      maiFangWeiXin () {
        if (this.auth_info.identify_status === 1) {
          return '添加FA哥微信weitianshicn，加速审核';
        } else if (this.auth_info.identify_status === 2) {
          return '认证会员将由微天使创始人直接服务，添加微信weitianshicn';
        } else if (this.auth_info.identify_status === 3) {
          return '添加FA哥微信weitianshicn，重新审核';
        }
      }
    },
    watch: {
      identityDisplay: function (e) {
        if (e) {
          this.getUserAuthenticateInfo();
        } else {
          for (let key in this.contacts) {
            if (validata.isArray(this.contacts[key])) {
              this.contacts[key] = [];
            } else {
              this.contacts[key] = '';
            }
          }
        }
      }
    }
  };
</script>

<style lang="less">
  @import '../../assets/css/alertContactsDetail';
  .tit_second{
    width: 49%;
  }
  .tit_right1{
    font-size:14px;
    color:#475669;
    width: 320px;
    display: block;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    margin-left: 13px;
    .img{
      width:90px;
      height:54px;
      overflow: hidden;
      img{
        width: 100%;
      }

    }
  }
  .renzheng_center{
    width: 438px;
    margin: 0 auto;
    padding-top: 48px;
    .imgrenzhen{
      width: 210px;
      margin: 0 auto;
    }
    .renzhen{
      width:80px;
      height:80px;
      img{
        width: 100%;
      }
    }
    .faweixin{
      width:80px;
      height:80px;
      margin-left: 36px;
      img{
        width: 100%;
      }
    }
    .maifang{
      font-size:24px;
      color:#1f2d3d;
      margin-top: 27px;
    }
    .maifangweixin{
      font-size:16px;
      color:#8492a6;
      margin-top: 12px;
    }
  }
  .queren{
    width: 20px;
    height: 20px;
    img{
      width: 100%;
    }
  }
  .tit_right2{
    font-size:16px;
    color:#5e6d82;
    width: 320px;
    display: block;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    margin-left: 13px;
  }
</style>

