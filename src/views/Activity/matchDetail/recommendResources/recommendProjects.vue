<template>
  <!--推荐项目-->
  <div id="myproject" class="recommendProjects" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    <!-- 右侧底部主内容区 -->
    <div class="wrap-left">
      <div class="top-lists" v-if="tableData.length !== 0">
        <template>
          <el-table :data="tableData"
                    :show-header="false"
                    v-loading="loading"
                    element-loading-text="拼命加载中">
            <el-table-column prop="pro_intro" label="项目名称" min-width="430" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.pro_intro.length > 14 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.pro_intro}}</div>
                  </div>
                  <div>
                    {{scope.row.pro_intro}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.pro_intro.length === 0">
                  -
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="industry" label="领域" width="400"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.industry.length > 8 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.industry}}</div>
                  </div>
                  <div>
                    {{scope.row.industry}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.industry==''">
                  -
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="stage" label="轮次" min-width="80">
              <template slot-scope="scope">
                <div v-if="scope.row.stage.length === 0">
                  -
                </div>
                <div v-if="scope.row.stage.length > 0">
                  {{scope.row.stage}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="area" label="地区" min-width="80"
                             filter-placement="bottom-end">
              <template slot-scope="scope">
                <div v-if="scope.row.area.length === 0">
                  -
                </div>
                <div v-if="scope.row.area.length > 0">
                  {{scope.row.area}}
                </div>
              </template>
            </el-table-column>

            <el-table-column
              prop="reset"
              label="重置">
              <template slot-scope="scope">
                <div class="editBtn relative">
                  <el-button
                    style="font-size: 12px;"
                    v-if="scope.row.is_invited === 'false' || scope.row.is_invited === false"
                    @click="handleEdit(scope.row)">
                    邀请
                  </el-button>
                  <el-button
                    style="font-size: 12px;"
                    v-else
                    :disabled="true"
                    @click="handleEdit(scope.row)">
                    已邀请
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
  import { error, success } from '@/utils/notification';
  import { getTop } from '@/utils';
  export default {
    data () {
      return {
        loading: false,
        competition_id: '',
        searchinput: '', // 搜索绑定
        totalData: 1, // 总页数
        activeCurrentPage: 1, // 当前页数
        getCon: {}, // 筛选的请求参数
        // 列表数据
        tableData: [
          {
            project_id: 'RpALg5Wx',
            pro_name: '“学霸联盟”APP平台',
            pro_intro: '我们让你能够在大学“学业”，“友谊”，“财富”三丰收，学霸带你飞翔不在只是梦想，我们会为你插上学霸的翅膀；众里寻“她”无需千百度让你准确找到那个“她”；翻身消费做卖家，自食其力，拥抱财富梦想。',
            industry: '教育培训、电子商务、社交网络',
            stage: '',
            area: '垣曲县',
            is_invited: true
          }
        ],
        emptyType: true
      };
    },
    methods: {
      // 点击邀请
      handleEdit (row) {
        this.$http.post(this.URL.comInviteProject, {user_id: localStorage.user_id, competition_id: this.competition_id, project_id: row.project_id})
          .then(res => {
            if (res.data.status_code === 2000000) {
              success('邀请成功');
              this.filterChangeCurrent(this.activeCurrentPage || 1);
            } else {
              error(res.data.error_msg);
            }
          })
          .catch(err => {
            this.loading = false;
            console.log(err, 2);
          });
      },
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
          this.$http.get(this.URL.project, {params: this.getCon})
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
        this.$http.get(this.URL.project, {params: this.getCon})
          .then(res => {
            if (res.data.status_code === 2000000) {
              getTop();
              let data = res.data.data;
              this.tableData = this.setProjectList(data.list);
              this.totalData = data.count;
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
          obj.project_id = list[i].project_id;
          obj.pro_intro = list[i].pro_intro;
          obj.pro_name = list[i].pro_name;
          obj.industry = list[i].industry;
          obj.stage = list[i].stage;
          obj.area = list[i].area;
          obj.is_invited = list[i].is_invited;
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
.recommendProjects{
  .el-table{
    margin-top: 30px!important;
  }
  .el-tabs__content{
    overflow: unset;
  }
}
</style>
