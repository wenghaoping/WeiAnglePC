<template>
  <!--一键同步弹框-->
  <div id="syncProjectDetail" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    <el-dialog :visible="syncCreatProjectDetailDisplay"  :before-close="handleClose"
               close-on-press-escape close-on-click-modal lock-scroll>
      <!--弹窗上半部分-->
      <el-checkbox-group v-model="checkedSync" @change="checkChange" class="checkbox">
          <div class="up-floor item-lists item-lists-top clearfix" style="background: white;">
            <el-checkbox label="project">
              <div class="item-lists-inner-left">
              <div class="item height" style="vertical-align: middle;">
                <span class="projecname">{{project.pro_name}}</span>
                <span class="projectcompanyname">{{project.pro_company_name}}</span>
                <span class="projectIntro">{{project.pro_intro}}</span>
              </div>
              <div class="item height" style="margin-top:18px;">
                <span class="mid-tag" v-for="industry in project.pro_industry">{{industry.industry_name}}</span>
              </div>
              <div class="item height" style="margin-top:18px;">
                <span class="big-tag">{{project.pro_area.area_title}}</span><span class="split">｜</span>
                <span class="big-tag">{{project.pro_stage.stage_name}}</span>
              </div>
              <div class="tag" style="padding-top: 20px;display: inline-block;">
                <span class="tag-bottom" style="margin-right: 11px;" v-if="project.tag.length!=0"><img src="../../assets/images/tag2.png"></span>
                <span class="tag-bottom" v-if="project.tag.length!=0"><i v-for="tag in project.tag">{{tag}}　</i></span>
              </div>
              <div class="onlyone">
                <img v-if="project.is_exclusive==1" src="../../assets/images/onlyonedark.png"/>
                <img v-if="project.is_exclusive==2" src="../../assets/images/onlyonelight.png"/>
              </div>
            </div>
            </el-checkbox>
          </div>
      </el-checkbox-group>
      <!--按钮-->
      <div class="list tc">
        <div class="toButton" style="padding-left: 0">
          <el-button  @click="handleClose" type="primary">取消</el-button>
          <el-button  @click="syncTrue"  type="primary">同步</el-button>
          <el-checkbox v-model="cover" style="margin-left: 14px;">允许覆盖</el-checkbox>
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { warning } from '@/utils/notification';
  const checkAllOption = ['project'];
  export default {
    props: ['syncCreatProjectDetailDisplay', 'companyid'],
    data () {
      return {
        checkAll: false,
        isIndeterminate: false,
        checkedSync: [], // 已勾选数组
        checkedSyncS: checkAllOption, // 勾选数组所有的
        cover: false, // 是否允许覆盖
        loading: false, // 加载动画
        companyId: '', // 尽调搜索公司ID

        // 项目信息
        project: {
          follow_user: '暂无数据',
          open_status: 1,
          pro_company_name: '暂无数据',
          pro_intro: '暂无数据',
          pro_name: '暂无数据',
          pro_schedule: '0',
          pro_total_score: '0',
          pro_area: {
            area_title: '暂无数据'
          },
          pro_scale: {
            scale_money: '暂无数据'
          },
          pro_finance_stock_after: '-',
          pro_finance_value: '-',
          pro_stage: {
            stage_name: '暂无数据'
          },
          pro_industry: [{
            industry_id: 12,
            industry_name: '暂无数据'
          }],
          tag: []
        },
        team: {
          core_users: [{
            ct_member_career: '暂无数据',
            ct_member_intro: '暂无数据',
            ct_member_name: '暂无数据'
          }],

          tag: {
            tag_name: '暂无数据'
          }
        },
        financing: {
          pro_finance_use: '暂无数据',
          pro_history_finance: [
            /* {
             finance_time:1503331200,
             pro_finance_investor:'10000',
             pro_finance_scale:"天使轮",
             belongs_to_stage:{
             sort: 5,
             stage_id: 18,
             stage_name: ""
             }
             }, */
          ]
        },
        company: {
          pro_company_scale: {
            comp_scale_value: '暂无数据'
          },
          pro_website: '暂无数据'
        },
        milepost: {
          pro_develop: [
            /* {
             dh_start_time:1503331200,
             dh_event:'事件'
             }, */
          ]
        }, // 里程碑
        brands: {
          brand: []
        }// 产品
      };
    },
    methods: {
      // 关闭弹框
      handleClose () {
        this.$emit('changeSyncProjectDetail', false);
      },
      // 获取一键尽调同步数据
      getProjectDetail () {
        this.loading = true;
        this.$http.post(this.URL.getProjectAllData, {user_id: localStorage.user_id, com_id: this.companyId})
          .then(res => {
            if (res.data.status_code === 2000000) {
              let data = res.data.data;
              this.$store.state.syncData.data = data;
              this.project = data.project;
            }
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
          });
      },
      // 全选时
      handleCheckAllChange (event) {
        this.checkedSync = event.target.checked ? checkAllOption : [];
        this.isIndeterminate = false;
      },
      // 勾选时
      checkChange (value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.checkedSyncS.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkedSyncS.length;
      },
      // 确定同步
      syncTrue () {
        this.$store.state.syncData.checkedSync = this.checkedSync;
        if (this.checkedSync.length === 0) {
          warning('请勾选你要同步的模块');
        } else {
          this.$emit('syncCompanyData', {cover: this.cover});
          this.$emit('changeSyncProjectDetail', false);
        }
      }
    },
    created () {

    },
    watch: {
      syncCreatProjectDetailDisplay: function (e) {
        if (e) {
          this.companyId = this.companyid;
          this.getProjectDetail();
        }
      }
    }
  };
</script>

<style lang="less">
  #syncProjectDetail{
    .checkbox{
      .el-checkbox, .el-checkbox__input{
        display: block;

      }
      .el-checkbox__input{
        height: 0px;
      }
      .el-checkbox{
        margin-left: 0px!important;
      }
      .el-checkbox__inner{
        width: 22px;
        height: 22px;
        right: -768px;
        top: 19px;
      }
      .el-checkbox__label{
        padding-left: 0px;
      }
      .el-checkbox__inner::after{
        height: 14px;
        left: 6px;
        top: 0px;
        width: 7px;
      }
    }

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
        font-size:14px;
        color:#475669;
        line-height:18px;
        display: block;
        margin-left: 6px;
        overflow: hidden;
        word-break:keep-all;
        white-space:nowrap;
        text-overflow:ellipsis;
        width: 700px;
        margin-top: 14px;
      }
      .projecname{
        font-size:20px;
        color:#1f2d3d;
      }
      .projectcompanyname{
        font-size:16px;
        color:#475669;
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
          color:#475669;
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
          line-height:28px;

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
          /*display: inline-block;*/
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
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
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

      background: rgb(249, 250, 252);
      padding: 20px;
      margin-bottom:16px;
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
    }
    .list{
      height: 68px;
      .toButton{
        right: 0px;left: 0px;margin:auto;
        background:#ffffff;
        box-shadow:0 -2px 4px 0 rgba(64,88,122,0.10);
        width:881px;
        height: 68px;
        display: inline-block;
        padding-top: 15px;
        padding-left: 270px;
        .el-checkbox, .el-checkbox__input{
          display: inline-block;
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

