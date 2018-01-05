<template>
  <div id="onlineData">
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="浏览" name="browse"></el-tab-pane>
      <el-tab-pane label="申请" name="apply"></el-tab-pane>
      <el-tab-pane label="查看详情" name="details"></el-tab-pane>
      <el-tab-pane label="查看BP" name="bp"></el-tab-pane>
      <el-tab-pane label="请求联系" name="contact"></el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" style="width: 100%;cursor: pointer"
              class="top-lists"
              @sort-change="filterChange"
              stripe
              v-loading.body="loading" element-loading-text="拼命加载中">
      <el-table-column prop="pro_name" label="姓名" width="85" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tooltip placement="top" :disabled="scope.row.user_name.length > 4 ? false:true">
            <div slot="content">
              <div class="tips-txt">{{scope.row.user_name}}</div>
            </div>
            <div>
              {{scope.row.user_name}}
            </div>
          </el-tooltip>
          <div v-if="scope.row.user_name.length === 0">
            -
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="user_organization" label="机构" width="205">
        <template slot-scope="scope">
          <el-tooltip placement="top" :disabled="scope.row.user_organization.length > 14 ? false:true">
            <div slot="content">
              <div class="tips-txt">{{scope.row.user_organization}}</div>
            </div>
            <div>
              {{scope.row.user_organization}}
            </div>
          </el-tooltip>
          <div v-if="scope.row.user_organization.length === 0">
            -
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="group_title" label="角色" width="75"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tooltip placement="top" :disabled="scope.row.group_title.length > 3 ? false:true">
            <div slot="content">
              <div class="tips-txt">{{scope.row.group_title}}</div>
            </div>
            <div>
              {{scope.row.group_title}}
            </div>
          </el-tooltip>
          <div v-if="scope.row.group_title.length === 0">
            -
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="created_at" label="更新时间" width="140"
                       column-key="created_at"
                       sortable="custom">
        <template slot-scope="scope">
          <div v-if="scope.row.created_at==''">
            -
          </div>
          <div else>
            {{scope.row.created_at}}
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="service_desc" label="备注" width="280"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tooltip placement="top" :disabled="scope.row.service_desc.length > 25 ? false:true">
            <div slot="content">
              <div class="tips-txt">{{scope.row.service_desc}}</div>
            </div>
            <div>
              {{scope.row.service_desc}}
            </div>
          </el-tooltip>
          <div v-if="scope.row.service_desc==''">
            -
          </div>
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
    <br>
    <br>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getTop } from '@/utils';
  export default {
    props: ['proid'],
    data () {
      return {
        loading: false,
        activeName: 'browse',
        totalData: 0, // 总页数
        getPra: {}, // 筛选的请求参数
        currentPage: 1, // 当前页数
        project_id: this.proid,
        tableData: [
          /* {
           user_name : "张三疯子",//姓名
           user_organization : "杭州投着乐了网络科技有限公司",//机构
           group_title : "投资方",//角色
           created_at : "2017-08-08 13:00", //更新时间
           service_desc : "这是备注，这里是备注最大宽度是300，最大宽度是300",  //备注
           } */
        ],
        URLChange: this.URL.getProjectViewData// URL地址修改
      };
    },
    methods: {
      tabClick (tab, event) {
        switch (tab.name) {
          case 'browse':
            this.URLChange = this.URL.getProjectViewData;
            break;
          case 'apply':
            this.URLChange = this.URL.getProjectApplyData;
            break;
          case 'details':
            this.URLChange = this.URL.getProjectDetailsData;
            break;
          case 'bp':
            this.URLChange = this.URL.getProjectBPData;
            break;
          case 'contact':
            this.URLChange = this.URL.getProjectServiceData;
            break;
          default:
            alert('错误');
            break;
        }
        this.currentPage = 1;
        this.filterChangeCurrent(1);
      },
      // ascending升/descending降/
      filterChange (filters) {
        this.loading = true;
        this.currentPage = 1;
        this.getPra.user_id = localStorage.user_id;
        this.getPra.project_id = this.project_id;
        if (filters.order === 'ascending') filters.order = 'asc';// 升降序
        else filters.order = 'desc';
        this.getPra.order = filters.order;
        this.getPra.sort = filters.prop;

        this.$http.post(this.URLChange, this.getPra)
          .then(res => {
            this.loading = false;
            let data = res.data.data;
            this.tableData = this.getList(data);
            this.totalData = res.data.count;
          })
          .catch(err => {
            this.loading = false;
            console.log(err, 2);
          });
      },
      // 控制页码
      filterChangeCurrent (page) {
        delete this.getPra.page;
        this.loading = true;
        this.getPra.user_id = localStorage.user_id;
        this.getPra.project_id = this.project_id;
        this.getPra.page = page;// 控制当前页码
        this.$http.post(this.URLChange, this.getPra)
          .then(res => {
            this.loading = false;
            let data = res.data.data;
            this.tableData = this.getList(data);
            this.totalData = res.data.count;
            getTop();
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
          });
      },
      // 总设置列表的数据处理
      getList (list) {
        let arr = [];
        for (let i = 0; i < list.length; i++) {
          let obj = {};
          obj.user_name = list[i].user_name;
          obj.user_organization = list[i].user_organization;
          obj.group_title = list[i].group_title;
          obj.created_at = list[i].created_at;
          obj.service_desc = list[i].service_desc;
          arr.push(obj);
        }
        return arr;
      }
    },
    // 当dom一创建时
    created () {
      this.filterChangeCurrent(1);
    }
  };
</script>

<style lang="less">
  @import '../../../assets/css/onlineData.less';
</style>
