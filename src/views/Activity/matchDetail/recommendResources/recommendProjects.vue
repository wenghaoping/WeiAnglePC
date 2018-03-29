<template>
  <!--推荐项目-->
  <div id="myproject" class="recommendProjects" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    <!-- 右侧底部主内容区 -->
    <div class="wrap-left">
      <div class="top-lists clearfix" v-if="tableData.length !== 0">
        <template>
          <el-table :data="tableData"
                    :show-header="false"
                    v-loading="loading"
                    element-loading-text="拼命加载中">
            <el-table-column prop="pro_name" label="项目名称" min-width="430" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.pro_name.length > 14 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.pro_name}}</div>
                  </div>
                  <div>
                    {{scope.row.pro_name}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.pro_name.length === 0">
                  -
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="pro_industry" label="领域" width="400"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.pro_industry.length > 8 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.pro_industry}}</div>
                  </div>
                  <div>
                    {{scope.row.pro_industry}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.pro_industry==''">
                  -
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="pro_stage" label="轮次" min-width="80">
              <template slot-scope="scope">
                <div v-if="scope.row.pro_stage.length === 0">
                  -
                </div>
                <div v-if="scope.row.pro_stage.length > 0">
                  {{scope.row.pro_stage}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="pro_area" label="地区" min-width="80"
                             filter-placement="bottom-end">
              <template slot-scope="scope">
                <div v-if="scope.row.pro_area.length === 0">
                  -
                </div>
                <div v-if="scope.row.pro_area.length > 0">
                  {{scope.row.pro_area}}
                </div>
              </template>
            </el-table-column>

            <el-table-column
              prop="reset"
              label="重置">
              <template slot-scope="scope">
                <div class="editBtn relative">
                  <el-button
                    @click="handleEdit(scope.row)">
                    编辑
                  </el-button>
                </div>
              </template>
            </el-table-column>

          </el-table>
          <div class="pagenav fr" v-if="totalData > 5" style="margin: 5px 0;">
            <el-pagination
              small
              @current-change="filterChangeCurrent"
              :current-page.sync="activeCurrentPage"
              :page-size="5"
              layout="total, prev, pager, next"
              :total="totalData">
            </el-pagination>
          </div>
        </template>
      </div>
      <div class="emptyType" v-else v-loading="loading" element-loading-text="拼命加载中">
        <div class="position_auto absolute" style="width: 150px;height: 180px;">
          <div class="shape innImg absolute position_center_auto" v-if="emptyType">
            <img src="../../../../assets/images/shape.png">
          </div>
          <div class="empty_title tc absolute position_center_auto" style="top: 80px;" v-if="emptyType">
            你目前还没有任何活动
          </div>
          <div class="empty_title tc absolute position_center_auto" style="top: 80px;width: 210px;" v-if="!emptyType">
            暂时没有符合该搜索条件的活动
          </div>
          <el-button @click="creatMatchActive" class="absolute position_center_auto" style="top: 124px;left: 28px;" v-if="emptyType">马上发布</el-button>
        </div>
      </div>
    </div>
    <!--签到成员-->
    <alert-member></alert-member>
    <!--二维码-->
    <qr-code-activity></qr-code-activity>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import alertMember from '@/views/Activity/alertMember.vue';
  import qrCodeActivity from '@/views/Activity/qrCodeActivity.vue';
  import { error, success } from '@/utils/notification';
  import { getTop } from '@/utils';
  export default {
    props: {},
    data () {
      return {
        loading: false,
        competition_id: '',
        searchinput: '', // 搜索绑定
        totalData: 1, // 总页数
        currentPage: 1, // 当前页数
        getCon: {}, // 筛选的请求参数
        // 列表数据
        tableData: [
          {
            pro_name: '公司名称公司名称公司名称公司名称',
            pro_intro: '我是项目介绍我是项目介绍我是项目介绍我是项目介绍',
            pro_company_name: '',
            pro_source: '我是项目来源1',
            pro_follow_up_user: '迪丽热巴',
            pro_schedule: '跟进状态1',
            pro_industry: '大数据、社交通讯，电商平台，教育培训',
            is_exclusive: '独家',
            pro_stage: 'IPO上市后',
            pro_area: '北京',
            pro_scale: '3000万',
            project_id: ''
          }
        ],
        emptyType: true
      };
    },
    methods: {
      // 点击编辑按钮,跳转
      handleEdit (row) {
        this.$router.push({name: 'creatMatchActive', query: {competition_id: row.competition_id}});
      },
      // 点击删除按钮
      handleDelete (row) {
        this.$confirm('删除后不可恢复，确定要删除该活动？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          this.$http.post(this.URL.deleteActivity, {user_id: localStorage.user_id, activity_id: row.activity_id})
            .then(res => {
              if (res.data.status_code === 2000000) {
                success('删除成功');
                this.filterChangeCurrent(this.activeCurrentPage || 1);
              } else {
                error(res.data.error_msg);
              }
              this.loading = false;
            })
            .catch(err => {
              this.loading = false;
              error('删除失败');
              console.log(err);
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 添加人脉
      creatMatchActive () {
        this.$router.push({name: 'creatMatchActive', query: {competition_id: 'creat'}});// 路由传参
      },
      // 查看报名成员 / 签到成员
      toMember (row, type) {
        this.$store.dispatch('setActivityData', {activityId: row.activity_id, isSign: type});
        this.$store.dispatch('memberControl', true);
      },
      // 查看二维码
      getQrAcitivity (row, type) {
        this.$store.dispatch('setActivityData', {activityId: row.activity_id, isSign: type});
        this.$store.dispatch('qrCodeActivityControl', true);
      },
      // 搜索===首次进入页面加载的数据
      handleIconClick () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.loading = true;
          this.emptyType = false;
          this.getCon.user_id = localStorage.user_id;
          this.getCon.search = this.searchinput;
          this.getCon.page = 1;
          this.$store.dispatch('setUpSearch', {activeSearch: this.searchinput, activeCurrentPage: this.activeCurrentPage});
          this.$http.post(this.URL.getActivityList, this.getCon)
            .then(res => {
              if (res.data.status_code === 2000000) {
                let data = res.data.data;
                this.tableData = this.setProjectList(data);
                this.totalData = res.data.count;
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
        this.getCon.page = page;// 控制当前页码
        this.$store.dispatch('setUpSearch', {activeSearch: this.searchinput, activeCurrentPage: page});
        this.$http.post(this.URL.getActivityList, this.getCon)
          .then(res => {
            if (res.data.status_code === 2000000) {
              let data = res.data.data;
              this.tableData = this.setProjectList(data);
              this.totalData = res.data.count;
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
          let obj = [];
          obj.activity_id = list[i].activity_id;
          obj.activity_title = list[i].activity_title;
          obj.activity_user = list[i].activity_user;
          obj.activity_address = list[i].activity_address;
          obj.activity_theme_image = list[i].activity_theme_image;
          obj.start_time = list[i].start_time;
          obj.end_time = list[i].end_time;
          obj.is_end = list[i].is_end;
          obj.activity_apply = list[i].activity_apply;
          obj.activity_sign = list[i].activity_sign;
          arr.push(obj);
        }
        return arr;
      }
    },
    components: { alertMember, qrCodeActivity },
    computed: {
      ...mapState({
        activeSearch: state => state.myActivity.activeSearch || ''
      })
    },
    created () {},
    watch: {}
  };
</script>

<style lang="less">
  @import '../../../../assets/css/myproject';
.recommendProjects{
  .el-table{
    margin-top: 30px!important;
  }
}
</style>
