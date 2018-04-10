<template>
  <div class="myMatch">
    <div class="top-search-box clearfix">
      <div class="input-box fl">
        <el-input
          placeholder="搜索赛事名称"
          icon="search"
          v-model="searchinput"
          :on-icon-click="handleIconClick"
          @keyup.native.enter="handleIconClick">
        </el-input>
      </div>
      <div class="btns-box fr">
        <el-button type="primary" size="large" @click="creatActivity">创建赛事</el-button>
      </div>
    </div>
    <div class="top-lists" style="cursor: pointer">
      <template>
        <el-table :data="tableData" style="width: 100%"
                  @row-click="handleSelect"
                  v-loading="loading"
                  element-loading-text="拼命加载中"
                  stripe>
          <el-table-column prop="competition_name" label="赛事名称" min-width="300" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tooltip placement="top" :disabled="scope.row.competition_name.length > 30 ? false:true">
                <div slot="content">
                  <div class="tips-txt">{{scope.row.competition_name}}</div>
                </div>
                <div>
                  {{scope.row.competition_name}}
                </div>
              </el-tooltip>
              <div v-if="scope.row.competition_name.length === 0">
                -
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="industry" label="赛事领域" show-overflow-tooltip width="300">
            <template slot-scope="scope">
              <div v-if="scope.row.industry==''">
                -
              </div>
              <div else>
                {{scope.row.industry}}
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="start_time" label="大赛时间" show-overflow-tooltip width="300">
            <template slot-scope="scope">
              <span v-if="scope.row.start_time !== ''">{{scope.row.start_time}}</span>
              <span v-else>-</span>
              <span v-if="scope.row.end_time !== ''">~</span>
              <span v-if="scope.row.end_time !== ''">{{scope.row.end_time}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="created_at" label="创建时间" show-overflow-tooltip width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.created_at.length !== 0">
                {{scope.row.created_at}}
              </div>
              <div v-else>
                -
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="reset"
            label="操作"
            width="100" class="edits-btn btn-cur">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small" class="flow-btn btn-cur"
                @click="handleEdit(scope.$index, scope.row)">
                编辑
              </el-button>
              <el-button
                type="text"
                size="small" class="send-btn btn-cur"
                @click="handleDelete(scope.$index, scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagenav" v-if="totalData > 10" style="float: right;">
          <el-pagination
            small
            @current-change="filterChangeCurrent"
            :current-page.sync="currentPage"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="totalData">
          </el-pagination>
        </div>
      </template>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import { error, success } from '@/utils/notification';
  import { setTagToString } from '@/utils/formatData';
  import { getTop } from '@/utils';
  export default {
    data () {
      return {
        loading: false,
        totalData: 1, // 总页数
        currentPage: 1, // 当前页数
        searchinput: '', // 搜索绑定
        getCon: {}, // 筛选的请求参数
        tableData: [
          /* {
            competition_id: '',
            competition_name: '我是标题', // 标题
            industry: '我是领域', // 领域
            start_time: '2017-12-12 14:00',
            end_time: '2017-12-12 14:00',
            created_at: '2017-12-12 14:00' // 创建时间
          } */
        ] // 列表数据
      };
    },
    methods: {
      // 搜索===首次进入页面加载的数据
      handleIconClick () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.loading = true;
          this.getCon.user_id = localStorage.user_id;
          this.getCon.search = this.searchinput;
          this.getCon.page = 1;
          this.$store.dispatch('setUpMatchSearch', {macthSearch: this.searchinput, matchPage: 1});
          this.$http.post(this.URL.getCompetitionList, this.getCon)
            .then(res => {
              if (res.data.status_code === 2000000) {
                let data = res.data.data;
                this.tableData = this.setCompetitionList(data);
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
      // 查看赛事详情
      handleSelect (row, event, column) {
        if (column.label !== '操作') {
          this.$router.push({name: 'matchDetail', query: {competition_id: row.competition_id}});
        }
      },
      // 点击编辑按钮,跳转
      handleEdit (index, row) {
        this.$router.push({name: 'creatMatch', query: {competition_id: row.competition_id}});
      },
      // 创建跳转
      creatActivity () {
        this.$router.push({name: 'creatMatch', query: {competition_id: 'creat'}});
      },
      // 总设置列表的数据处理
      setCompetitionList (list) {
        let arr = [];
        for (let i = 0; i < list.length; i++) {
          let obj = [];
          obj.competition_id = list[i].competition_id;
          obj.competition_name = list[i].competition_name;
          obj.industry = setTagToString(list[i].industry, 'industry_name');
          obj.start_time = list[i].start_time;
          obj.end_time = list[i].end_time;
          obj.created_at = list[i].created_at;
          arr.push(obj);
        }
        return arr;
      },
      // 点击删除按钮
      handleDelete (index, row) {
        this.$confirm('您确认要删除该赛事吗?, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          this.$http.post(this.URL.deleteCompetition, {user_id: localStorage.user_id, competition_id: row.competition_id})
            .then(res => {
              this.loading = false;
              success('删除成功');
              this.filterChangeCurrent(this.currentPage || 1);
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
      // 控制页码
      filterChangeCurrent (page) {
        delete this.getCon.page;
        this.loading = true;
        this.getCon.user_id = localStorage.user_id;
        this.getCon.page = page;// 控制当前页码
        this.$store.dispatch('setUpMatchSearch', {macthSearch: this.searchinput, matchPage: page});
        this.$http.post(this.URL.getCompetitionList, this.getCon)
          .then(res => {
            if (res.data.status_code === 2000000) {
              let data = res.data.data;
              this.tableData = this.setCompetitionList(data);
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
      }
    },
    computed: {
      ...mapState({
        macthSearch: state => state.myMatch.macthSearch || '',
        matchPage: state => state.myMatch.matchPage || 1
      })
    },
    // 当dom一创建时
    created () {
      this.searchinput = this.macthSearch;
      this.currentPage = this.matchPage;
      this.filterChangeCurrent(this.currentPage || 1);
    }
  };
</script>

<style lang="less">
  .myMatch{
    .top-lists{
      position: relative;
      .prointro{
        height: 50px;
        overflow: hidden;
      }
      .prointrolone{
        height: 25px;
        overflow: hidden;
        display: block;
        line-height: 23px;
      }
      .el-input__icon+.el-input__inner{
        padding-right: 0px;
      }
      .timeCheck{
        cursor: pointer;
        position: absolute;
        opacity: 0;
        top: 6px;
        right: 135px;
        .el-input{
          width: 30px;
        }
        .el-input__icon{
          display: none;
        }
      }
      .img{
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background:#eff2f7;
        line-height: 36px;
        text-align: center;
        font-size:14px;
        color:#40587a;
        img{
          width: 100%;
        }
      }
      .add{
        width: 35px;
        height: 25px;
        margin-top: 11px;
        padding-left: 8px;
        img{
          width: 100%;
        }
      }
      .name{
        max-width: 80px!important;
        margin-left: 16px!important;
        line-height: 36px!important;
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
      .item-1{
        width:211px;
        max-width: 211px;
        padding-left: 24px !important;
      }
      .item-2{
        width:90px;
        max-width: 90px
      }
      .item-3{
        width:75px;
        max-width: 75px
      }
      .item-4{
        width:72px;
        max-width: 72px;
      }
      .item-5{
        width:90px;
        max-width: 90px;
      }
      .item-6{
        width:200px;
        max-width: 200px;
      }
      .item-7{
        width:80px;
        max-width: 80px;
      }
      .item-8{
        width:65px;
        max-width: 65px;
      }
      .item-9{
        width:55px;
        max-width: 55px;
      }
      .item-10{
        width:80px;
        max-width: 80px;
      }
      .item-11{
        width:120px;
        max-width: 120px;
      }
      .table-tbody{
        .tbody-item{
          height: 64px;
          font-size:12px;
          color:#1f2d3d;
          padding-left: 16px;
          box-sizing: border-box;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .flow-pop{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .float-tip-window{
          position: absolute;
          left:0;
          top:0;
          background:rgba(31,45,61,0.85);
          border-radius:2px;
          font-size: 12px;

          white-space: normal;
          padding: 8px 10px;
          line-height: 16px;
          color:#fff;
          .san-angle{
            position: absolute;
            border: 6px solid transparent;
            border-top-color: rgba(31,45,61,0.85);
            width: 0px;
            left:5%;
            top:99%;
            height: 0px;
          }
        }
      }
      .tb-item-1{
        .pro-name{
          font-size:14px;
          color:#1f2d3d;
        }
        .pro-txt{
          display: inline-block;
          width: 100%;
          margin-top:6px;
          font-size: 12px;
          color:#5e6d82;
          line-height:12px;
        }
      }
      // 以上为原来
      .el-table{
        border:none;
        &::before,&::after{
          height: 0;
          width:0;
        }
        th{
          height: 50px;
        }
        td{
          height: 64px;
        }
      }

      .el-table--striped .el-table__body tr:hover{
        background: #eef1f6;
      }
      .el-table--striped .el-table__body tr:nth-child(2n){
        background: #f9fafc !important;
      }
      thead{
        th{
          font-size: 12px;
          font-weight: 100;
          border:none;
          &:nth-child(1){
            padding-left:23px;
          }
        }
        th:nth-last-child(2){
          .cell{
            color: #20a0ff ;
            cursor: pointer;
            padding-left:5px;
          }
        }
        //.el-table_1_column_11{
        //  .cell{
        //    color:#20a0ff;
        //    cursor: pointer;
        //  }
        //}

        .el-table_1_column_1{
          .cell{
            /*            margin-left: 53px;*/
          }
        }
        .el-table_1_column_55{
          .cell{
            color: #20a0ff!important;
          }
        }
      }
      tbody{

        td{
          border:none;
          .cell{
            font-size: 12px;
            div{
              overflow: hidden!important;
              white-space: nowrap!important;
              text-overflow: ellipsis!important;
            }
          }
          &:nth-child(1){
            padding-left:24px;
          }
        }

        .edits-btn{

          margin-left: 0;
          color:#c0ccda;

        }
        .btn-cur{
          color:#20a0ff !important;

        }
        .flow-btn,.send-btn{
          color:#c0ccda;
          margin-left: 5px;
        }
        .more{
          width: 12px;
          display: inline-block;

          vertical-align: middle;
          //margin-left: 8px;
          margin-top: -4px;
          cursor: pointer;
        }

      }
      .el-table {
        .cell{
          //padding-right:1px;
          padding-left: 0;
          .el-tag{
            padding:0 10px;
          }
          .el-tag--gray{
            background: transparent;
            border:none;
          }
          .el-table__column-filter-trigger{
            margin-left: 2px;
          }
          .caret-wrapper{
            margin-left: 0;
            width:15px;
          }
        }
      }
    }
    .top-search-box {
      padding: 24px;
      background: #FFFFFF;
      .input-box {
        height: 36px;
        line-height: 36px;
        width: 320px;
        border-radius: 5px;
        .el-input {
          .el-input__inner {
            font-size: 14px;
            background: #e5e9f2;
            border: 0px;
            border-radius: 2px;
          }
        }
      }
    }
  }
  /* 路由切换动效 */
  .fade-enter-active, .fade-leave-active {
    transition: all .2s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
    transform: translateX(100px);
  }
</style>
