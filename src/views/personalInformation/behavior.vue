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
      <el-table-column prop="pro_name" label="项目名称" width="145" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tooltip placement="top" :disabled="scope.row.pro_name.length > 7 ? false:true">
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

      <el-table-column prop="pro_intro" label="项目介绍" width="175">
        <template slot-scope="scope">
          <el-tooltip placement="top" :disabled="scope.row.pro_intro.length > 12 ? false:true">
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

      <el-table-column prop="pro_company_name" label="项目公司" width="105"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tooltip placement="top" :disabled="scope.row.pro_company_name.length > 6 ? false:true">
            <div slot="content">
              <div class="tips-txt">{{scope.row.pro_company_name}}</div>
            </div>
            <div>
              {{scope.row.pro_company_name}}
            </div>
          </el-tooltip>
          <div v-if="scope.row.pro_company_name.length === 0">
            -
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="user_name" label="发布者" width="75"
                       show-overflow-tooltip>
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

      <el-table-column prop="service_desc" label="备注" width="240"
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
    props: ['userid'],
    data () {
      return {
        loading: false,
        activeName: 'browse',
        totalData: 0, // 总页数
        getPra: {}, // 筛选的请求参数
        currentPage: 1, // 当前页数
        user_id: this.userid,
        tableData: [
//          {
//            pro_name: '公司名称公司名称公司名称公司名称',
//            pro_intro: '我是项目介绍我是项目介绍我是项目介绍我是项目介绍',
//            pro_company_name: '迪丽热巴',
//            pro_follow_up_user: '迪丽热巴',
//            project_id: '',
//            created_at: '2017-08-08 13:00', // 更新时间
//            service_desc: '这是备注，这里是备注最大宽度是300，最大宽度是300'  // 备注
//          }
        ],
        URLChange: this.URL.getUserViewData// URL地址修改
      };
    },
    methods: {
      tabClick (tab, event) {
        switch (tab.name) {
          case 'browse':
            this.URLChange = this.URL.getUserViewData;
            break;
          case 'apply':
            this.URLChange = this.URL.getUserApplyData;
            break;
          case 'details':
            this.URLChange = this.URL.getUserDetailsData;
            break;
          case 'bp':
            this.URLChange = this.URL.getUserBPData;
            break;
          case 'contact':
            this.URLChange = this.URL.getUserServiceData;
            break;
          default:
            alert('错误');
            break;
        }
        this.currentPage = 1;
        this.filterChangeCurrent(1);
      },
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
            console.log(err);
          });
      }, // ascending升/descending降/
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
      }, // 控制页码
      getList (list) {
        let arr = [];
        for (let i = 0; i < list.length; i++) {
          let obj = {};
          obj.pro_name = list[i].pro_name;
          obj.pro_intro = list[i].pro_intro;
          obj.pro_company_name = list[i].pro_company_name;
          obj.user_name = list[i].user_name;
          obj.created_at = list[i].created_at;
          obj.service_desc = list[i].service_desc;
          arr.push(obj);
        }
        return arr;
      }// 总设置列表的数据处理
    },
    // 当dom一创建时
    created () {
      this.filterChangeCurrent(1);
    }
  };
</script>

<style lang="less">
  @import '../../assets/css/onlineData.less';
</style>
