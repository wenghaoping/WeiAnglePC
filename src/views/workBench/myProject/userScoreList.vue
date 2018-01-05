<template>
  <!--普通用户评分列表-->
    <div id="scoreStatistics">
      <el-table :data="tableData" style="width: 100%;cursor: pointer"
                class="top-lists"
                stripe
                v-loading.body="loading" element-loading-text="拼命加载中">
        <el-table-column prop="user" label="用户" width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tooltip placement="top" :disabled="scope.row.user.user_name.length > 4 ? false:true">
              <div slot="content">
                <div class="tips-txt">{{scope.row.user.user_name}}</div>
              </div>
              <div>
                <div class="alone">{{scope.row.user.user_name}}</div>
                <span class="alone2 ad2 nowrap inlineBlock">{{scope.row.user.user_company_career}}</span>
                <span class="alone2 ad nowrap inlineBlock">{{scope.row.user.user_brand}}</span>
              </div>
            </el-tooltip>
            <div v-if="scope.row.user.user_name.length === 0">
              -
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="score" label="投资指数" min-width="100" show-overflow-tooltip>

        </el-table-column>

        <el-table-column prop="emark" label="评语" min-width="409" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tooltip placement="top" :disabled="scope.row.remark.length > 10 ? false:true">
              <div slot="content">
                <div class="tips-txt">{{scope.row.remark}}</div>
              </div>
              <div>
                {{scope.row.remark}}
              </div>
            </el-tooltip>
            <div v-if="scope.row.remark ==='' ">
              -
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="is_show" label="设为背书" width="75">
          <template slot-scope="scope">
            <el-switch
              class="fr"
              v-model="scope.row.is_show"
              :on-value=1
              :off-value=0
              on-text=""
              off-text=""
              @change="showChange(scope.row, $event)">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagenav" v-if="totalData>10">
        <el-pagination
          small
          @current-change="filterChangeCurrent"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="totalData">
        </el-pagination>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { error, success } from '@/utils/notification';
    export default {
      props: ['proid', 'schid'],
      data () {
        return {
          loading: false,
          project_id: this.proid,
          schedule_id: '',
          getPra: {}, // 筛选的请求参数
          currentPage: 1, // 当前页数
          totalData: 0, // 总页数
          tableData: [
            /* {
              user: {
                user_name: '林杰',
                user_brand: '金科娱乐',
                user_company_career: '投资经理'
              },
              core: 9,
              emark: '',
              s_show: 1,
              core_id: 71
            } */
          ]
        };
      },
      methods: {
        // 控制页码
        filterChangeCurrent (page) {
          delete this.getPra.page;
          this.loading = true;
          this.getPra.user_id = localStorage.user_id;
          this.getPra.project_id = this.project_id;
          this.getPra.schedule_id = this.schedule_id;
          this.getPra.page = page;// 控制当前页码
          this.$http.post(this.URL.getProjectUserScoreList, this.getPra)
            .then(res => {
              this.loading = false;
              let data = res.data.data;
              this.tableData = data;
              this.totalData = res.data.count;
            })
            .catch(err => {
              this.loading = false;
              console.log(err);
            });
        },
        // 改变值
        showChange (row, e) {
          this.$http.post(this.URL.editScoreShow,
            {user_id: localStorage.user_id, project_id: this.project_id, score_id: row.score_id, is_show: e})
            .then(res => {
              if (res.data.status_code === 2000000) {
                success('设置成功');
              } else {
                error(res.data.error_msg);
              }
              this.loading = false;
            })
            .catch(err => {
              this.loading = false;
              console.log(err);
            });
        }
      },
      // 当dom一创建时
      created () {
        this.filterChangeCurrent(1);
      },
      watch: {
        schid: function (e) {
          this.schedule_id = e;
          this.filterChangeCurrent(1);
        }
      }
    };
</script>
