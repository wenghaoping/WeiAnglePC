<template>
  <!--推荐投资人-->
  <div id="myproject" class="recommendInvestor" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    <!-- 右侧底部主内容区 -->
    <div class="wrap-left">
      <div class="top-lists" v-if="tableData.length !== 0">
        <template>
          <el-table :data="tableData"
                    :show-header="false"
                    v-loading="loading"
                    element-loading-text="拼命加载中">
            <el-table-column prop="investor_name" label="姓名" min-width="300" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip class="fl name" placement="top" :disabled="scope.row.investor_name.length > 4 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.investor_name}}</div>
                  </div>
                  <div>
                    {{scope.row.investor_name}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.investor_name.length === 0">
                  -
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="investor_company" label="公司" show-overflow-tooltip min-width="144">
              <template slot-scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.investor_company.length > 10 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.investor_company}}</div>
                  </div>
                  <div>
                    {{scope.row.investor_company}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.investor_company.length === 0">
                  -
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="investor_career" label="职位" show-overflow-tooltip width="80">
              <template slot-scope="scope">
                <div v-if="scope.row.investor_career==''">
                  -
                </div>
                <div else>
                  {{scope.row.investor_career}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="investor_mobile" label="手机" show-overflow-tooltip width="200">
              <template slot-scope="scope">
                <div v-if="scope.row.investor_mobile==''">
                  -
                </div>
                <div else>
                  {{scope.row.investor_mobile}}
                </div>
              </template>
            </el-table-column>

          </el-table>
          <div class="pagenav fr" v-if="totalData > 5" style="margin: 5px 0;">
            <el-pagination
              small
              @current-change="filterChangeCurrent"
              :current-page.sync="activeCurrentPage"
              :page-size="10"
              layout="total, prev, pager, next"
              :total="totalData">
            </el-pagination>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { error } from '@/utils/notification';
  import { getTop } from '@/utils';
  export default {
    props: {},
    data () {
      return {
        loading: false,
        competition_id: '',
        searchinput: '', // 搜索绑定
        activeCurrentPage: 1, // 当前页数
        totalData: 1, // 总页数
        currentPage: 1, // 当前页数
        getCon: {}, // 筛选的请求参数
        // 列表数据
        tableData: [
          // {
          //   investor_id: 58971,
          //   investor_name: '郭辉',
          //   investor_company: '久秉',
          //   investor_career: '',
          //   investor_mobile: '18612571371'
          // }
        ], // 列表数据
        emptyType: true
      };
    },
    methods: {
      // 搜索===首次进入页面加载的数据
      handleIconClick () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.loading = true;
          this.emptyType = false;
          this.getCon.user_id = localStorage.user_id;
          this.getCon.competition_id = this.competition_id;
          this.getCon.search = this.searchinput;
          this.getCon.page = 1;
          // this.$store.dispatch('setUpSearch', {activeSearch: this.searchinput, activeCurrentPage: this.activeCurrentPage});
          this.$http.get(this.URL.investor, {params: this.getCon})
            .then(res => {
              if (res.data.status_code === 2000000) {
                let data = res.data.data;
                this.tableData = this.setProjectList(data.list);
                this.totalData = data.count;
                this.loading = false;
                resolve(3);
              } else {
                error(res.data.error_msg);
                this.loading = false;
              }
            })
            .catch(err => {
              this.loading = false;
              console.log(err, 2);
            });
        });
      },
      // 控制页码
      filterChangeCurrent (page) {
        delete this.getCon.page;
        this.loading = true;
        this.getCon.user_id = localStorage.user_id;
        this.getCon.competition_id = this.competition_id;
        this.getCon.page = page;// 控制当前页码
        // this.$store.dispatch('setUpSearch', {activeSearch: this.searchinput, activeCurrentPage: page});
        this.$http.get(this.URL.investor, {params: this.getCon})
          .then(res => {
            if (res.data.status_code === 2000000) {
              let data = res.data.data;
              this.tableData = this.setProjectList(data.list);
              this.totalData = data.count;
              getTop();
              this.loading = false;
            } else {
              error(res.data.error_msg);
              this.loading = false;
            }
          })
          .catch(err => {
            this.loading = false;
            console.log(err, 2);
          });
      },
      // 总设置列表的数据处理
      setProjectList (list) {
        let arr = [];
        for (let i = 0; i < list.length; i++) {
          let obj = {};
          obj.investor_id = list[i].investor_id;
          obj.investor_name = list[i].investor_name;
          obj.investor_company = list[i].investor_company;
          obj.investor_career = list[i].investor_career;
          obj.investor_mobile = list[i].investor_mobile;
          arr.push(obj);
        }
        return arr;
      },
      // 获取id
      getCompetitionId () {
        this.competition_id = this.$route.query.competition_id;
      }
    },
    created () {
      this.getCompetitionId();
      this.filterChangeCurrent(this.currentPage || 1);
    }
  };
</script>

<style lang="less">
  @import '../../../../assets/css/myproject';
  .recommendInvestor{
    .el-table{
      margin-top: 30px!important;
    }
  }
</style>
