<template>
    <div class="alertMember">
      <el-dialog :visible="memberDisplay" custom-class="dialogFollow" :before-close="handleClose"
                 close-on-press-escape close-on-click-modal lock-scroll
                 :close-on-click-modal="showList" :close-on-press-escape="showList" size="small">
        <p class="tc" style="font-size:24px;color:#1f2d3d;margin-bottom: 24px;">— {{title}} —</p>
        <el-table :data="tableData"
                  v-loading="loading"
                  element-loading-text="拼命加载中">
          <el-table-column prop="user_real_name" label="成员" min-width="310" show-overflow-tooltip>
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
                  <div class="name">
                    {{scope.row.user_name | nullTo_}}
                  </div>
                </el-tooltip>
                <div class="name nowrap" style="padding-left: 11px;">
                  ( {{scope.row.user_company_career | nullTo_}} )
                </div>
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

          <el-table-column prop="user_email" label="邮箱" show-overflow-tooltip width="200">
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

          <el-table-column prop="is_sign" label="状态" show-overflow-tooltip width="80">
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
        <div class="pagenav" v-if="totalData > 10">
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
          this.$store.dispatch('AllMemberControl', false);
        },
        // 控制页码
        filterChangeCurrent (page = 1) {
          delete this.getCon.page;
          this.loading = true;
          this.getCon.user_id = localStorage.user_id;
          this.getCon.activity_id = this.activityId;
          this.getCon.is_sign = this.isSign;
          this.getCon.page = page;// 控制当前页码
          this.$http.post(this.URL.getActivityApplyUser, this.getCon)
            .then(res => {
              let data = res.data.data;
              this.tableData = this.setApplyUserList(data);
              this.totalData = res.data.count;
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
            obj.is_sign = list[i].is_sign;// 是否是评委
            arr.push(obj);
          }
          return arr;
        }
      },
      watch: {
        memberDisplay: function (e) {
          if (e) {
            this.filterChangeCurrent(1);
          }
        }
      }
    };
</script>

<style lang="less">
.alertMember{
  .el-dialog{
    width: 860px;
  }
  .el-table{
    .el-table__body-wrapper{
      .el-table__row{
        height:92px;
      }
    }
    thead th:nth-child(1){
      padding-left: 67px;
    }
    thead {
      .cell{
        font-size:13px;
        color:#475669;
      }
    }
  }
  .heardimg{
    width: 53px;
    height: 53px;
    border-radius: 50%;
    background:#eff2f7;
    line-height: 53px;
    text-align: center;
    font-size:18px;
    color:#40587a;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  .name{
    font-size:16px;
    color:#333333;
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
}
</style>
