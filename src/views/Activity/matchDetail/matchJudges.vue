<template>
  <!--大赛评委-->
  <div id="mycontacts" class="matchJudges" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    <!-- 右侧底部主内容区 -->
    <div class="wrap-left" style="">
      <div class="top-search-box clearfix">
        <div class="input-box fl">
          <el-input
            placeholder="搜索姓名、手机、公司名称"
            icon="search"
            v-model="searchinput"
            :on-icon-click="handleIconClick"
            @keyup.native.enter="handleIconClick">
          </el-input>
        </div>
        <div class="btns-box fr">
          <el-button type="primary" @click="createJudges" size="large" >添加评委</el-button>
        </div>
      </div>
      <div class="top-lists" style="cursor: pointer">
        <template>
          <el-table :data="tableData" style="width: 100%"
                    @header-click="headerClick"
                    @sort-change="filterChange"
                    @filter-change="filterChange"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    stripe>
            <el-table-column prop="user_real_name" label="姓名" width="190" show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="img fl">
                  <img v-if="scope.row.user_avatar_url!=''" :src="scope.row.user_avatar_url">
                  <span v-else class="header">{{scope.row.user_avatar_url_change}}</span>
                </div>
                <el-tooltip class="fl name" placement="top" :disabled="scope.row.user_real_name.length > 4 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.user_real_name}}</div>
                  </div>
                  <div>
                    {{scope.row.user_real_name}}
                  </div>
                </el-tooltip>
                <span class="fl add" v-if="scope.row.is_add==false"><img src="../../../assets/images/add.png"></span>
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

            <el-table-column prop="user_email" label="邮箱" show-overflow-tooltip min-width="100">
              <template slot-scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.user_email.length > 17 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.user_email}}</div>
                  </div>
                  <div>
                    {{scope.row.user_email}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.user_email.length === 0">
                  -
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="schedule_name" label="评分阶段" show-overflow-tooltip
                             min-width="74"
                             :filters="scheduleFilters"
                             column-key="schedule_id"
                             :filter-multiple="stateCheck"
                             filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.schedule_name.length > 4 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.schedule_name}}</div>
                  </div>
                  <div>
                    {{scope.row.schedule_name}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.schedule_name.length === 0">
                  -
                </div>
              </template>
            </el-table-column>

            <el-table-column
              prop="reset"
              label="重置"
              width="130" class="edits-btn btn-cur">
              <template slot-scope="scope">
                <div class="prointrolone">
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
                </div>
                <div class="prointrolone">
                  <el-dropdown  trigger="click">
                    <el-button
                          type="text"
                          size="small" class="send-btn btn-cur">
                      评分阶段<i class="el-icon-caret-bottom el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for='(schedule, index) in schedule' :key="index">
                        <div @click="setJudgeAuth(scope.row.judge_id, schedule.value)">{{schedule.text}}</div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
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
        </template>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import { error, success } from '@/utils/notification';
  import { getTitleSift } from '@/utils/setSelect';
  import * as formatData from '@/utils/formatData';
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
        tagsValue: [], // 标签弹框数据绑定
        tableData: [
/*          {
            user_avatar_url: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epia77Br2Wk8RiaR8hMAxMG9DerJfzuRCGr5Pf0s2MNDj1FU6dwnpKycchqTRck13S0RTQ6Cg3qZy4A/0', // 头像
            user_avatar_url_change: '翁', // 代替图片
            user_real_name: '翁浩平', // 姓名
            is_add: true, // 标签,true显示,false不显示
            user_company_career: '投资总监', // 职位
            user_company_name: '杭州投着乐网络科技有限公司', // 公司名称
            user_brand: '微天使,FA', // 品牌
            user_mobile: '18910359282', // 手机
            user_email: '123@168.com', // 邮箱
            user_invest_industry: '电子商务', // 投资领域
            user_invest_stage: '种子轮 ', // 投资轮次
            tag: '海龟', // 标签
            tagArray: [], // 原版标签,设置标签用的
            login_time: '刚刚活跃', // 最近活跃
            is_bind: 0 // 编辑
          } */
        ], // 列表数据
        scheduleFilters: [/* { text: '3000万', value: '3000万' } */],
        stateCheck: false // 状态单选
      };
    },
    methods: {
      getAllNode () {
        this.$http.post(this.URL.comGetAllNode, {user_id: localStorage.user_id, competition_id: this.competition_id})
          .then(res => {
            let data = res.data.data;
            this.scheduleFilters = this.getTit(data);
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
          });
      },
      getTit (data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {};
          obj.text = data[i].schedule_name;
          obj.value = data[i].schedule_id;
          arr.push(obj);
        }
        return arr;
      },
      // 设置评委阶段
      setJudgeAuth (judgeId, schedulesId) {
        this.$http.post(this.URL.competitionSetJudgeAuth, {user_id: localStorage.user_id, judge_id: judgeId, schedule_id: schedulesId})
          .then(res => {
            if (res.data.status_code === 2000000) {
              success('设置成功');
              this.filterChangeCurrent(this.currentPage || 1);
            } else {
              error(res.data.error_msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 点击删除按钮
      handleDelete (index, row) {
        this.$confirm('您确认要删除该评委吗?, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          this.$http.post(this.URL.deleteJudge, {user_id: localStorage.user_id, judge_id: row.judge_id})
            .then(res => {
              if (res.data.status_code === 2000000) {
                success('删除成功');
                this.filterChangeCurrent(this.currentPage || 1);
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
      // 点击编辑按钮,跳转
      handleEdit (index, row) {
        this.zgClick('编辑人脉');
        this.$router.push({name: 'createJudges', query: {judge_id: row.judge_id, competition_id: this.competition_id}});
      },
      // 点击重置按钮时
      headerClick (column, event) {
        if (column.label === '重置') {
          window.location.reload();
        }
      },
      // 添加人脉
      createJudges () {
        this.$router.push({name: 'createJudges', query: {judge_id: 'creat', competition_id: this.competition_id}});// 路由传参
      },
      // 搜索===首次进入页面加载的数据
      handleIconClick () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.loading = true;
          this.getCon.user_id = localStorage.user_id;
          this.getCon.search = this.searchinput;
          this.getCon.competition_id = this.competition_id;
          this.currentPage = 1;
          this.getCon.page = 1;
          this.$http.post(this.URL.getJudgeList, this.getCon)
            .then(res => {
              let data = res.data.data;
              this.tableData = this.setProjectList(data);
              this.totalData = res.data.count;
              this.loading = false;
              resolve(3);
            })
            .catch(err => {
              this.loading = false;
              console.log(err, 2);
            });
        });
      },
      // 筛选 ascending升/descending降/
      filterChange (filters) {
        this.loading = true;
        this.currentPage = 1;
        this.getCon.page = 1;// 控制当前页码
        this.getCon.user_id = localStorage.user_id;
        this.getCon.competition_id = this.competition_id;
        if (filters.order) {
          if (filters.order === 'ascending') filters.order = 'asc';// 升降序
          else filters.order = 'desc';
          this.getCon.order = filters.prop;
          this.getCon.sort = filters.order;
        } else {
          for (let key in filters) {
            this.getCon[key] = filters[key];
          }
        } // 筛选
        for (let key in this.getCon) {
          if (this.getCon[key] === '' || this.getCon[key] === 'NaN') {
            delete this.getCon[key];
          }
        }// 删除空的查询项
        this.$http.post(this.URL.getJudgeList, this.getCon)
          .then(res => {
            this.loading = false;
            let data = res.data.data;
            this.tableData = this.setProjectList(data);
            this.totalData = res.data.count;
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
          });
      },
      // 控制页码
      filterChangeCurrent (page) {
        delete this.getCon.page;
        this.loading = true;
        this.getCon.user_id = localStorage.user_id;
        this.getCon.page = page;// 控制当前页码
        this.getCon.competition_id = this.competition_id;
        this.$http.post(this.URL.getJudgeList, this.getCon)
          .then(res => {
            let data = res.data.data;
            this.tableData = this.setProjectList(data);
            this.totalData = res.data.count;
            this.loading = false;
            getTop();
          })
          .catch(err => {
            this.loading = false;
            console.log(err, 2);
          });
      },
      // 获取表头
      titleSift () {
        this.$http.post(this.URL.userTitleSift, {user_id: localStorage.user_id})
          .then(res => {
            let data = res.data.data;
            let cardIndustry = data.card_industry;// 投资领域
            let cardStage = data.card_stage;// 投资轮次
            let cardTag = data.card_tag;// 标签
            let schedule = data.schedule;// 标签
            this.user_invest_industryFilters = getTitleSift(cardIndustry);
            this.user_invest_stageFilters = getTitleSift(cardStage);
            this.tagFilters = getTitleSift(cardTag);
            this.schedule_idFilters = getTitleSift(schedule);
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 总设置列表的数据处理
      setProjectList (list) {
        let arr = [];
        for (let i = 0; i < list.length; i++) {
          let obj = {};
          obj.competition_id = list[i].competition_id;
          obj.judge_id = list[i].judge_id;
          obj.user_avatar_url = list[i].user_avatar_url;
          obj.user_real_name = list[i].user_real_name;// 姓名
          obj.user_avatar_url_change = formatData.setUrlChange(list[i].user_avatar_url, list[i].user_real_name);// 代替名称
          obj.user_company_career = list[i].user_company_career;// 职位
          obj.user_company_name = list[i].user_company_name;// 公司名称
          obj.user_brand = list[i].user_brand;// 品牌
          obj.user_mobile = list[i].user_mobile;// 手机
          obj.user_email = list[i].user_email;// 邮箱
          obj.user_invest_industry = formatData.setTagToString(list[i].user_invest_industry, 'industry_name');// 投资领域
          obj.user_invest_stage = formatData.setTagToString(list[i].user_invest_stage, 'stage_name');// 投资轮次
          obj.tag = formatData.setTagToString(list[i].user_invest_tag, 'tag_name');// 标签
          if (list[i].belongs_to_schedule === null) {
            obj.schedule_name = '';
          } else {
            obj.schedule_name = list[i].belongs_to_schedule.schedule_name || '';// 评分阶段
          }
          arr.push(obj);
        }
        return arr;
      },
      // 获取所有下拉框的数据
      getWxProjectCategory () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          setTimeout(() => {
            this.addTags = this.$global.data.tags_user;// 设置人脉标签
            resolve(2);
          }, 200);
        });
      },
      // 获取id
      getCompetitionId () {
        this.competition_id = this.$route.query.competition_id;
      }
    },
    computed: {
      ...mapState({
        activeSearch: state => state.myActivity.activeSearch || '',
        schedule: state => state.myActivity.schedule || {}
      })
    },
    created () {
      this.getCompetitionId();
      this.getAllNode();
      this.filterChangeCurrent(this.currentPage || 1);
    }
  };
</script>

<style lang="less">
  @import '../../../assets/css/mycontacts';
.matchJudges{

}
</style>
