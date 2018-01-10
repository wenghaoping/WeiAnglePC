<template>
    <div class="alertMember">
      <el-dialog :visible="memberDisplay" custom-class="dialogFollow" :before-close="handleClose"
                 close-on-press-escape close-on-click-modal lock-scroll
                 :close-on-click-modal="showList" :close-on-press-escape="showList" size="small">
        <el-table :data="tableData"
                  v-loading="loading"
                  element-loading-text="拼命加载中">
          <el-table-column prop="user_real_name" label="姓名" width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <!--<div class="img fl">
                <img v-if="scope.row.user_avatar_url!=''" :src="scope.row.user_avatar_url">
                <span v-else class="header">{{scope.row.user_avatar_url_change}}</span>
              </div>-->
              <el-tooltip class="fl name" placement="top" :disabled="scope.row.user_real_name.length > 4 ? false:true">
                <div slot="content">
                  <div class="tips-txt">{{scope.row.user_real_name}}</div>
                </div>
                <div>
                  {{scope.row.user_real_name}}
                </div>
              </el-tooltip>
              <span class="fl add" v-if="scope.row.is_add==false"><img src="../../assets/images/add.png"></span>
              <div v-if="scope.row.user_real_name.length === 0">
                -
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="user_company_career" label="职位" show-overflow-tooltip width="80">
            <template slot-scope="scope">
              <div v-if="scope.row.user_company_career==''">
                -
              </div>
              <div else>
                {{scope.row.user_company_career}}
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="card_company_name" label="公司" show-overflow-tooltip width="144">
            <template slot-scope="scope">
              <el-tooltip placement="top" :disabled="scope.row.user_company_name.length > 10 ? false:true">
                <div slot="content">
                  <div class="tips-txt">{{scope.row.user_company_name}}</div>
                </div>
                <div>
                  {{scope.row.user_company_name}}
                </div>
              </el-tooltip>
              <div v-if="scope.row.user_company_name.length === 0">
                -
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="user_brand" label="品牌" show-overflow-tooltip width="80">
            <template slot-scope="scope">
              <el-tooltip placement="top" :disabled="scope.row.user_brand.length > 5 ? false:true">
                <div slot="content">
                  <div class="tips-txt">{{scope.row.user_brand}}</div>
                </div>
                <div>
                  {{scope.row.user_brand}}
                </div>
              </el-tooltip>
              <div v-if="scope.row.user_brand.length === 0">
                -
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="user_mobile" label="手机" show-overflow-tooltip width="112">
            <template slot-scope="scope">
              <div v-if="scope.row.user_mobile==''">
                -
              </div>
              <div else>
                {{scope.row.user_mobile}}
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
    export default {
      props: [],
      data () {
        return {
          loading: false,
          showList: false,
          memberDisplay: true,
          // 列表数据
          tableData: [
            {
              apply_id: 1,
              activity_id: 'KQWNOp18',
              user_id: 0,
              user_name: 'ztt',
              user_mobile: '17681888259',
              user_company_name: '投着乐',
              user_brand: '微天使',
              user_company_career: 'php',
              user_email: '',
              user_wechat: '',
              apply_time: '',
              sign_time: null,
              is_sign: 1
            }
          ]
        };
      },
      computed: {},
      mounted () {

      },
      // 组件
      components: {},
      methods: {
        handleClose () {
          this.memberDisplay = false;
        }
      },
      // 当dom一创建时
      created () {

      },
      watch: {}
    };
</script>

<style lang="less">
.alertMember{
  .el-dialog{
    width: 818px;
  }
  .el-table{
    .el-table__body-wrapper{
      .el-table__row{
        height:92px;
      }
    }
  }
}
</style>
