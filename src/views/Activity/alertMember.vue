<template>
    <div class="alertMember">
      <el-dialog :visible="memberDisplay" custom-class="dialogFollow" :before-close="handleClose"
                 close-on-press-escape close-on-click-modal lock-scroll
                 :close-on-click-modal="showList" :close-on-press-escape="showList" size="small">
        <p class="tc" style="font-size:24px;color:#1f2d3d;margin-bottom: 24px;font-weight: bolder">— {{title}} —</p>
        <el-table :data="tableData"
                  v-loading="loading"
                  :row-class-name="tableRowClassName"
                  element-loading-text="拼命加载中">
          <el-table-column prop="user_real_name" label="成员" width="310">
            <template slot-scope="scope">
              <div class="heardimg fl">
                <img v-if="scope.row.user_avatar!=''" :src="scope.row.user_avatar">
                <span v-else class="header">{{scope.row.user_avatar_change}}</span>
              </div>
              <div class="fl" style="margin-left: 11px;">
                <el-tooltip class="fl" placement="top" :disabled="scope.row.user_name.length > 4 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.user_name}}</div>
                  </div>
                  <div class="name nowrap" style="max-width: 80px;">
                    {{scope.row.user_name | nullTo_}}
                  </div>
                </el-tooltip>
                <el-tooltip class="fl" placement="top" :disabled="scope.row.user_company_career.length > 4 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.user_company_career}}</div>
                  </div>
                  <div class="name nowrap" style="padding-left: 11px;max-width: 105px;font-weight: normal">
                    ( {{scope.row.user_company_career | nullTo_}} )
                  </div>
                </el-tooltip>

                <p class="company">
                  {{scope.row.user_brand !== '' ? scope.row.user_brand : scope.row.user_company_name | nullTo_}}
                </p>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="user_mobile" label="微信&电话" show-overflow-tooltip width="120">
            <template slot-scope="scope">
              <div class="mobile">
                {{scope.row.user_wechat | nullTo_}}
              </div>
              <div class="mobile">
                {{scope.row.user_mobile | nullTo_}}
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="user_email" label="邮箱" show-overflow-tooltip width="195">
            <template slot-scope="scope">
              <el-tooltip placement="top" :disabled="scope.row.user_email.length > 15 ? false:true">
                <div slot="content">
                  <div class="tips-txt">{{scope.row.user_email}}</div>
                </div>
                <div class="mobile">
                  {{scope.row.user_email | nullTo_}}
                </div>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column prop="apply_time" label="报名日期" show-overflow-tooltip width="100">
            <template slot-scope="scope">
              <div>
                {{scope.row.apply_time | timeToReallTime | nullTo_}}
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="is_sign" label="状态" show-overflow-tooltip width="92">
            <template slot-scope="scope">
              <div class="noSign" v-if="scope.row.is_sign === 0">
                未签到
              </div>
              <div class="isSign" v-if="scope.row.is_sign === 1">
                已签到
              </div>
            </template>
          </el-table-column>

        </el-table>
        <div class="pagenav fr" v-if="totalData > 10" style="margin-bottom: 31px;margin-top: 12px;">
          <el-pagination
            small
            @current-change="filterChangeCurrent"
            :current-page.sync="currentPage"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="totalData">
          </el-pagination>
        </div>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import * as formatData from '@/utils/formatData';
    import { mapState } from 'vuex';
    import { error } from '@/utils/notification';
    export default {
      props: {},
      computed: {
        ...mapState({
          memberDisplay: state => state.myActivity.memberDisplay,
          activityId: state => state.myActivity.activityData.activityId,
          isSign: state => state.myActivity.activityData.isSign
        }),
        title () {
          return this.isSign === 1 ? '签到成员' : '报名成员';
        }
      },
      data () {
        return {
          loading: false,
          showList: false,
          totalData: 1, // 总页数
          currentPage: 1, // 当前页数
//          activity_id: 'KQWNOp18', // 活动id
//          is_sign: 1, // 1代表签到成员
          getCon: {}, // 筛选的请求参数
          // 列表数据
          tableData: [
            /* {
              apply_id: 1,
              activity_id: 'KQWNOp18',
              user_id: 0,
              user_name: '朱甜甜',
              user_mobile: '17681888259',
              user_company_name: '杭州投着乐乐网络科技有限公司',
              user_brand: '微天使',
              user_company_career: 'php',
              user_email: '541920112@qq.com',
              user_wechat: '微信',
              apply_time: '1515552717', // 报名时间
              is_sign: 1, // 是否签到 1是 0否
              user_avatar: '', // 头像
              // https://i.imgur.com/SgDpf8x.jpg
              user_avatar_change: '朱'
            } */
          ]
        };
      },
      methods: {
        handleClose () {
          this.$store.dispatch('memberControl', false);
        },
        // 控制页码
        filterChangeCurrent (page = 1) {
          this.loading = true;
          this.getCon.user_id = localStorage.user_id;
          this.getCon.activity_id = this.activityId;
          this.getCon.is_sign = this.isSign;
          this.getCon.page = page;// 控制当前页码
          this.$http.post(this.URL.getActivityApplyUser, this.getCon)
            .then(res => {
              if (res.data.status_code === 2000000) {
                let data = res.data.data;
                this.tableData = this.setApplyUserList(data);
                this.totalData = res.data.count;
              } else {
                error(res.data.error_msg);
              }
              this.loading = false;
            })
            .catch(err => {
              this.loading = false;
              console.log(err, 2);
            });
        },
        // 总设置列表的数据处理
        setApplyUserList (list) {
          let arr = [];
          for (let i = 0; i < list.length; i++) {
            let obj = [];
            obj.user_avatar = list[i].user_avatar;
            obj.user_name = list[i].user_name;// 姓名
            obj.user_avatar_change = formatData.setUrlChange(list[i].user_avatar, list[i].user_name);// 代替名称
            obj.user_company_career = list[i].user_company_career;// 职位
            obj.user_company_name = list[i].user_company_name;// 公司名称
            obj.user_brand = list[i].user_brand;// 品牌
            obj.user_mobile = list[i].user_mobile;// 手机
            obj.user_email = list[i].user_email;// 邮箱
            obj.apply_time = list[i].apply_time;// 活跃时间
            obj.user_wechat = list[i].user_wechat;// 活跃时间
            obj.is_sign = list[i].is_sign;// 是否是评委
            arr.push(obj);
          }
          return arr;
        },
        // 设置颜色
        tableRowClassName (row, index) {
          if (index % 2 === 1) {
            return 'info';
          }
          return '';
        }
      },
      watch: {
        memberDisplay: function (e) {
          if (e) {
            this.filterChangeCurrent(1);
          } else {
            this.$store.dispatch('AllMemberControl', false);
          }
        }
      }
    };
</script>

<style lang="less">
.alertMember{
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background: #FFFFFF!important;
  }
  .table-thead{
    background:#e5e9f2;
    width:100%;
    height:50px;
    .thead-item{
      text-align: left;
      line-height: 50px;
      font-size: 12px;
      color:#475669;
      padding-left:16px;
      font-weight: 100;
      box-sizing: border-box;
    }
  }
  .el-table td, .el-table th.is-leaf{
    border: none;
  }
  .el-dialog{
    width: 818px;

  }
  .el-table thead tr{
    background:#e5e9f2!important;
    height: 50px;
  }
  .el-table .info {
    background: #F9FAFC;
  }
  .el-table{
    margin-top: 24px;
    .el-table__body-wrapper{
      .el-table__row{
        height:92px;
      }
    }
    .el-table__header{
      thead{
        tr{
          th{
            font-size:13px;
            color:#475669;
          }
        }
      }
    }

    thead th:nth-child(1){
      padding-left: 78px;
    }
    thead {
      .cell{
        font-size:13px;
        color:#475669;
      }
    }
  }
  .heardimg{
    margin-left: 10px;
    width: 53px;
    height: 53px;
    border-radius: 50%;
    background:#eff2f7;
    line-height: 53px;
    text-align: center;
    font-size:18px;
    overflow: hidden;
    color:#1f2d3d;
    img{
      width: 100%;
    }
  }
  .name{
    font-size:16px;
    color:#333333;
    font-weight: bold;
  }
  .company{
    font-size:14px;
    color:#8492a6;
    max-width: 196px;
  }
  .mobile{
    font-size:13px;
    color:#1f2d3d;
  }
  .noSign{
    font-size:14px;
    color:#f44c4c;
  }
  .isSign{
    font-size:14px;
    color:#c0ccda;
  }
  .el-dialog__body{
    padding: 0px;
  }

}
</style>
