<template>
  <div id="myproject">
    <div class="wrap-left fl">
      <div class="top-big-progress inlineBlock">
        <div class="pp-item pp-node pp-start" :class="{'pp-cur': node0}" @click="setNode(0)">
          <p class="pp-num pp-txt">{{nodeCount.whole}}</p>
          <span class="pp-sec-title">全部项目</span>
        </div>
      </div>

      <carousel ref="carousel" class="inlineBlock" :nodelist="nodeCount.nodelist"
                @setNode="setNode"
                v-loading.body="loading2" element-loading-text="拼命加载中" ></carousel>

      <el-button style="position: absolute;right: -50px;top: 65px;" @click.native="closeStage(true)">阶段设置</el-button>
      <div class="clearfx"></div>
      <div class="top-search-box">
        <div class="input-box">
          <el-input
            placeholder="搜索项目、公司名称"
            icon="search"
            v-model="searchinput"
            :on-icon-click="handleIconClick"
            @keyup.native.enter="handleIconClick">
          </el-input>
        </div>
        <div class="btns-box">
          <el-button @click="closeScore(true)" v-if="is_competition == 'true'">大赛评分指标</el-button>
          <el-button @click="openLists(true)">自定义列表</el-button>
          <el-button @click="scoreDownload" v-if="is_competition == 'true'">评分下载</el-button>
          <el-button type="primary" @click="uploadAll">批量上传项目</el-button>
          <el-button type="primary" @click="createProject">创建项目</el-button>
        </div>
      </div>
      <div class="top-lists" style="cursor: pointer">
          <template>
            <el-table :data="tableData" style="width: 100%"
                      @row-click="handleSelect"
                      @header-click="headerClick"
                      @sort-change="filterChange"
                      @filter-change="filterChange" stripe
                      v-loading="loading"
                      element-loading-text="拼命加载中">
            <el-table-column prop="pro_name" label="项目名称" min-width="170" show-overflow-tooltip
            v-if="this.column.findIndex(function(value, index, arr) {return value === 'pro_name';}) !== -1">
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

            <el-table-column prop="pro_intro" label="一句话介绍" min-width="222" show-overflow-tooltip
                             v-if="this.column.findIndex(function(value, index, arr) {return value === 'pro_intro';}) !== -1">
              <template slot-scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.pro_intro.length > 14 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.pro_intro}}</div>
                  </div>
                  <span class="pro_intro" :class="{ prointro: scope.row.pro_intro.length < 15, prointrolone: scope.row.pro_intro.length >= 15 }">
                    {{scope.row.pro_intro}}
                  </span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="pro_source" label="项目来源" min-width="96" :filters="pro_sourceFilters"
                             filter-placement="bottom-end"
                             column-key="pro_source"
                             show-overflow-tooltip
                             v-if="this.column.findIndex(function(value, index, arr) {return value === 'pro_source';}) !== -1">
              <template slot-scope="scope">
                <div v-if="scope.row.pro_source.length === 0">
                  -
                </div>
                <div v-if="scope.row.pro_source.length > 0">
                  {{scope.row.pro_source}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="pro_schedule" label="项目进度" min-width="96" :filters="pro_scheduleFilters"
                             filter-placement="bottom-end"
                             :filter-multiple="stateCheck"
                             column-key="pro_schedule"
                             sortable="custom"
                             v-if="this.column.findIndex(function(value, index, arr) {return value === 'pro_schedule';}) !== -1">
              <template slot-scope="scope">
                <div v-if="scope.row.pro_schedule==''">
                  -
                </div>
                <div else>
                  {{scope.row.pro_schedule}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="pro_industry" label="领域" min-width="166"
                             :filters="pro_industryFilters"
                             filter-placement="bottom-end"
                             show-overflow-tooltip
                             column-key="pro_industry"
                             v-if="this.column.findIndex(function(value, index, arr) {return value === 'pro_industry';}) !== -1">
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

            <el-table-column prop="is_exclusive" label="是否独家" min-width="98" :filters="soleFilters"
                             filter-placement="bottom-end" sortable="custom" column-key="is_exclusive"
                             v-if="this.column.findIndex(function(value, index, arr) {return value === 'is_exclusive';}) !== -1">
              <template slot-scope="scope">

                <el-tag :type="scope.row.is_exclusive === '独家' ? 'primary' : scope.row.is_exclusive === '非独家'  ? 'success':'gray' " close-transition>
                     <div v-if="scope.row.is_exclusive.length === 0">
                       -
                     </div>
                     <div else>
                       {{scope.row.is_exclusive}}
                     </div>
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="pro_stage" label="轮次" min-width="80" :filters="pro_stageFilters"
                             filter-placement="bottom-end"
                             sortable="custom" column-key="pro_stage"
                             v-if="this.column.findIndex(function(value, index, arr) {return value === 'pro_stage';}) !== -1">
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
                             column-key="pro_area"
                             :filters="pro_areaFilters"
                             filter-placement="bottom-end"
                             sortable="custom"
                             v-if="this.column.findIndex(function(value, index, arr) {return value === 'pro_area';}) !== -1">
              <template slot-scope="scope">
                <div v-if="scope.row.pro_area.length === 0">
                  -
                </div>
                <div v-if="scope.row.pro_area.length > 0">
                  {{scope.row.pro_area}}
                </div>
              </template>
            </el-table-column>

            <!--===============================默认隐藏区===============================-->

            <el-table-column prop="total_score" label="总分" min-width="80" show-overflow-tooltip
                             sortable="custom" column-key="total_score"
                             v-if="this.column.findIndex(function(value, index, arr) {return value === 'total_score';}) !== -1">
              <template slot-scope="scope">
                <div v-if="scope.row.total_score === ''">
                  -
                </div>
                <div v-else>
                  {{scope.row.total_score}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="average_score" label="投资指数" min-width="95" show-overflow-tooltip
                             sortable="custom" column-key="score"
                             v-if="this.column.findIndex(function(value, index, arr) {return value === 'average_score';}) !== -1">
              <template slot-scope="scope">
                <div v-if="scope.row.average_score === ''">
                  -
                </div>
                <div v-else>
                  {{scope.row.average_score}}
                </div>
              </template>
            </el-table-column>

            <!--===============================默认隐藏区===============================-->

            <el-table-column prop="pro_scale" label="期望融资" min-width="102"
                             :filters="pro_scaleFilters"
                             filter-placement="bottom-end"
                             column-key="pro_scale"
                             :filter-multiple="stateCheck"
                             v-if="this.column.findIndex(function(value, index, arr) {return value === 'pro_scale';}) !== -1">
              <template slot-scope="scope">
                <div v-if="scope.row.pro_scale.length === 0">
                  -
                </div>
                <div v-if="scope.row.pro_scale.length > 0">
                  {{scope.row.pro_scale}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="created_at" label="创建时间" min-width="96" show-overflow-tooltip
                             sortable="custom" column-key="created_at"
                             v-if="this.column.findIndex(function(value, index, arr) {return value === 'created_at';}) !== -1">
              <template slot-scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.created_at.length > 5 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.created_at}}</div>
                  </div>
                  <div>
                    {{scope.row.created_at}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.created_at.length === 0">
                  -
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="reset"
              label="重置"
              width="130" class="set-th">
              <template slot-scope="scope">
                <el-button
                  @click="handleEdit(scope.$index, scope.row)"
                  type="text"
                  size="small" class="edits-btn btn-cur">
                  编辑
                </el-button>
                <el-button
                  @click="addFollow(scope.$index, scope.row)"
                  type="text"
                  size="small" class="flow-btn btn-cur">
                  跟进
                </el-button>
                <el-button
                  @click="addprojectPush(scope.$index, scope.row)"
                  type="text"
                  size="small" class="send-btn btn-cur">
                  推送
                </el-button>
                <el-dropdown trigger="click" style="height: 19px;">
                  <el-button
                    type="text"
                    size="small" class="send-btn btn-cur">
                    <img src="../../../assets/images/more.png" alt="" class="more">
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><div @click="goScoreStatistics(scope.$index, scope.row)">项目评价</div></el-dropdown-item>
                    <el-dropdown-item><div @click="deleteProject(scope.$index, scope.row)">删除</div></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
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
        </template>
      </div>
    </div>

    <!--上传弹框-->
    <alertUpload :upload-display="uploadDisplay"
                 @uploadDisplayChange="uploadDisplayChange"
                 @reload="handleIconClick"></alertUpload>

    <!--写跟进弹框-->
    <addfollow></addfollow>

    <!--项目推送项目入口弹窗-->
    <projectpushtopro></projectpushtopro>

    <!--项目预览弹窗-->
    <projectpreview></projectpreview>

    <!--评分指标-->
    <score-index :scoreDisplay="scoreDisplay" @closeScore="closeScore" @chengeSchedule="chengeSchedule"></score-index>

    <!--自定义项目阶段-->
    <stage-custom :stageDisplay="stageDisplay" @closeStage="closeStage"></stage-custom>

    <!--自定义项目列表-->
    <project-lists-custom :listsDisplay="listsDisplay" @closeLists="closeLists"></project-lists-custom>

<!--    <div class="page-grid wrap-right contain-right-2 fl">
      <div class="main-box">
        <div class="title-box">
          <span class="lit-line"></span>
          <span class="title">动态记录</span>
          <span class="lit-line"></span>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import alertUpload from './alertUpload.vue';
  import scoreIndex from '@/views/components/scoreIndex.vue';
  import stageCustom from './stageCustom.vue';
  import projectListsCustom from './projectListsCustom.vue';
  import addfollow from '@/views/components/addFollow.vue';
  import projectpushtopro from '@/views/components/projectPushToPro.vue';
  import projectpreview from '@/views/components/projectPreview.vue';
  import carousel from '@/views/components/carousel.vue';
  import * as formatData from '@/utils/formatData';
  import { getTitleSift } from '@/utils/setSelect';
  import { error, success, warning } from '@/utils/notification';
  import { getTop } from '@/utils';
  export default {
    components: {
      alertUpload,
      addfollow,
      projectpreview,
      projectpushtopro,
      scoreIndex,
      stageCustom,
      carousel,
      projectListsCustom
    },
    data () {
      return {
        uploadDisplay: false, // 上传弹框控制
        previewDisplay: false, // 控制项目推送预览显隐
        scoreDisplay: false, // 评分指标弹窗
        stageDisplay: false, // 自定义阶段弹窗控制
        scoreDowlondDisplay: false, // 评分下载弹框
        listsDisplay: false, // 列表自定义弹窗
        projecmessage: {
          project_id: '',
          project_name: ''
        }, // 项目名称,ID,跟进弹窗用
        tableData: [
          /*            {
           pro_name: '公司名称公司名称公司名称公司名称',
           pro_intro:'我是项目介绍我是项目介绍我是项目介绍我是项目介绍',
           pro_company_name: '',
           pro_source: '我是项目来源1',
           pro_follow_up_user: '迪丽热巴',
           pro_schedule:'跟进状态1',
           pro_industry:'大数据、社交通讯，电商平台，教育培训',
           is_exclusive:'独家',
           pro_stage:'IPO上市后',
           pro_area:'北京',
           pro_scale:'3000万',
           project_id:''
           } */
        ],
        pro_sourceFilters: [/* { text: '约谈', value: '约谈' } */],
        pro_scheduleFilters: [/* { text: '项目线索', value: '项目线索' } */],
        pro_industryFilters: [/* { text: '大数据服务', value: '大数据服务' } */],
        soleFilters: [{text: '独家', value: 1}, {text: '非独', value: 2}, {text: '其他', value: 0}],
        pro_stageFilters: [/* { text: 'IPO上市后', value: 'IPO上市后' } */],
        pro_areaFilters: [],
        pro_scaleFilters: [/* { text: '3000万', value: '3000万' } */],
        stateCheck: false, // 状态单选
        searchinput: '', // 搜索输入框
        node0: true,
        currentPage: 1, // 当前第几页
        totalData: 0, // 总数据条数
        nodeCount: {
          whole: 0,
          nodelist: []
        },
        is_competition: false, // 是否是赛事方
        loading: false,
        loading2: false,
        filter: true,
        getPra: {}, // 筛选的请求参数
        getProjectListURL: '', // 首页获取列表的URL
        moreList: [{
          value: '0',
          label: '删除'
        }], // 更多的选项表单
        pro_schedule: '', // 筛选选项
        column: [], // 选中中
        columns: [
          'pro_name', 'pro_intro', 'pro_source',
          'pro_schedule', 'pro_industry', 'is_exclusive',
          'pro_stage', 'pro_area', 'pro_scale',
          'created_at'
        ],
        checkTime: null, // 点击放慢
        checkTimeTrue: true
      };
    },
    methods: {
      // 批量上传项目
      uploadAll () {
        this.uploadDisplay = true;
        this.zgClick('批量上传项目');
      },
      // 跳转到项目详情页面传参数
      handleSelect (row, event, column) {
        if (column.label !== '重置') {
          this.zgClick('查看项目详情');
          this.$router.push({name: 'projectDetails', query: {project_id: row.project_id, show: 'detail'}});
          this.setRouterData();
        }
      },
      // 跳转之后设置参数
      setRouterData () {
        this.$store.state.pageANDSelect.getPra = this.getPra;
        this.$store.state.pageANDSelect.pracurrentPage = this.currentPage;
      },
      // 从vuex中取数据
      getRouterData () {
        this.getPra = this.$store.state.pageANDSelect.getPra;
        this.currentPage = this.$store.state.pageANDSelect.pracurrentPage || 1;
        this.getPra.page = this.$store.state.pageANDSelect.pracurrentPage || 1;
        let node = this.$store.state.pageANDSelect.node || 0;
        this.searchinput = this.$store.state.pageANDSelect.proSearchinput || '';
        this.pro_schedule = node;
        this.setNodeCss(node);
      },
      // 跳转到编辑页
      handleEdit (index, row) {
        this.zgClick('编辑项目');
        this.$router.push({name: 'editproject', query: {project_id: row.project_id}});
        this.setRouterData();
      },
      // 跳转到创建项目页面
      createProject () {
        this.zgClick('创建项目');
        this.$router.push({name: 'creatproject'});
        this.setRouterData();
      },
      // 控制上传弹窗
      uploadDisplayChange (msg) {
        this.uploadDisplay = msg;
      },
      // 跟进
      // 点击写跟近按钮
      addFollow (index, row) {
        this.zgClick('添加跟进');
        this.$store.dispatch('followControl', true);
        this.$store.dispatch('setFollowUp', {projectId: row.project_id, projectIntro: row.pro_intro});
      },
      // 点击项目推送
      addprojectPush (index, row) {
        this.zgClick('项目推送');
        this.$store.dispatch('setFollowUp', {projectId: row.project_id, projectIntro: row.pro_intro});
        this.$store.dispatch('projectPushToProControl', true);
      },
      // 请求函数
      // 搜索===首次进入页面加载的数据
      handleIconClick () {
        getTop();
        this.loading = true;
        this.getPra.user_id = localStorage.user_id;
        this.getPra.search = this.searchinput;
        this.$store.state.pageANDSelect.proSearchinput = this.searchinput;
        this.currentPage = 1;
        this.getPra.page = 1;
        this.$http.post(this.getProjectListURL, this.getPra)
          .then(res => {
            let data = res.data.data;
            this.tableData = this.getProjectList(data);
            this.column = res.data.column === '' ? this.columns : res.data.column;
            this.loading = false;
            this.totalData = res.data.count;
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
          });
      },
      // 筛选 ascending升/descending降/
      filterChange (filters) {
        this.loading = true;
        this.currentPage = 1;
        this.getPra.user_id = localStorage.user_id;
        if (filters.pro_schedule) {
          if (parseInt(filters.pro_schedule)) {
            this.setNode(parseInt(filters.pro_schedule));
          } else if (filters.pro_schedule.length === 0) {
            this.setNode(0);
          }
        }// 设置顶部样式
        if (filters.order) {
          if (filters.order === 'ascending') filters.order = 'asc';// 升降序
          else filters.order = 'desc';
          this.getPra.order = filters.prop;
          this.getPra.sort = filters.order;
        } else {
//          let para="";
          for (let key in filters) {
            /*             for(let i=0;i<filters[key].length; i++){
             if(key=="pro_source") para+=filters[key][i]+',';
             else */
            /* para+=parseInt(filters[key][i])+',';
             } */
//            this.getPra[key]=parseInt(para.substr(0, para.length - 1));
            this.getPra[key] = filters[key];
          }
        } // 筛选
        for (let key in this.getPra) {
          if (this.getPra[key] === '' || this.getPra[key] === 'NaN') {
            delete this.getPra[key];
          }
        }// 删除空的查询项
//        console.log(this.getPra);
        this.$http.post(this.getProjectListURL, this.getPra)
          .then(res => {
            this.loading = false;
            let data = res.data.data;
            this.tableData = this.getProjectList(data);
            this.column = res.data.column === '' ? this.columns : res.data.column;
            this.totalData = res.data.count;
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
          });
      },
      // 控制页码
      filterChangeCurrent (page) {
        this.column = [];
        delete this.getPra.page;
        this.loading = true;
        this.getPra.user_id = localStorage.user_id;
        this.getPra.page = page;// 控制当前页码
        this.getPra.pro_schedule = this.pro_schedule;
        this.$http.post(this.getProjectListURL, this.getPra)
          .then(res => {
            this.loading = false;
            let data = res.data.data;
            this.tableData = this.getProjectList(data);
            this.totalData = res.data.count;
            this.column = res.data.column === '' ? this.columns : res.data.column;
            getTop();
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
          });
      },
      // 控制顶部样式并且筛选$ro
      setNode (id) {
        this.currentPage = 1;
        this.loading = true;
        this.setNodeCss(id);
        this.getPra.pro_schedule = parseInt(id);
        this.pro_schedule = this.getPra.pro_schedule;
        this.$http.post(this.getProjectListURL, {user_id: localStorage.user_id, pro_schedule: parseInt(id)})
          .then(res => {
            this.loading = false;
            let data = res.data.data;
            this.tableData = this.getProjectList(data);
            this.totalData = res.data.count;// 页码
          })
          .catch(err => {
            this.loading = false;
            console.log(err, 2);
          });
      },
      // 设置样式
      setNodeCss (id) {
        this.node0 = false;
        this.$store.state.pageANDSelect.node = id;
        if (id === 0) { this.node0 = true; };
      },
      // 点击重置按钮时
      headerClick (column, event) {
        if (column.label === '重置') {
          window.location.reload();
        }
      },
      // 获取项目节点数量
      getNodeCount () {
        this.loading2 = true;
        this.$http.post(this.URL.getNodeCount, {user_id: localStorage.user_id})
          .then(res => {
            let data = res.data.data;
            this.nodeCount.whole = data.count;// 全部项目
            this.nodeCount.nodelist = data.node_list;
            this.loading2 = false;
            this.carouselGoLeft();
          })
          .catch(err => {
            console.log(err);
            this.loading2 = false;
          });
      },
      // 修改完成后,表头恢复
      carouselGoLeft () {
        this.$refs.carousel.goLeft();
      },
      // 获取表头
      titleSift () {
        const titleSiftURL = this.URL.titleSift;
        this.$http.post(titleSiftURL, {user_id: localStorage.user_id})
          .then(res => {
            let data = res.data.data;
            let proArea = data.pro_area;// 地区
            let proIndustry = data.pro_industry;// 领域
            let proScale = data.pro_scale;// 期望融资
            let proSchedule = data.pro_schedule;// 跟进状态
            let proSsource = data.pro_source;// 项目来源
            let proStage = data.pro_stage;// 轮次
            this.pro_areaFilters = getTitleSift(proArea);
            this.pro_industryFilters = getTitleSift(proIndustry);
            this.pro_scaleFilters = getTitleSift(proScale);
            this.pro_scheduleFilters = getTitleSift(proSchedule);
            this.pro_sourceFilters = getTitleSift(proSsource);
            this.pro_stageFilters = getTitleSift(proStage);
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 总设置列表的数据处理
      getProjectList (list) {
        let arr = [];
        for (let i = 0; i < list.length; i++) {
          let obj = {};
          obj.pro_name = list[i].pro_name;
          obj.pro_intro = list[i].pro_intro;
          obj.pro_company_name = list[i].pro_company_name;
          obj.pro_source = formatData.setTagToString(list[i].pro_source, 'tag_name');
          obj.pro_follow_up_user = list[i].pro_follow_up_user;
          obj.pro_schedule = list[i].pro_schedule;
          obj.pro_industry = formatData.setTagToString(list[i].pro_industry, 'industry_name');
          obj.is_exclusive = list[i].is_exclusive;
          obj.pro_stage = formatData.setTagToString(list[i].pro_stage, 'stage_name');
          obj.pro_area = formatData.setTagToString(list[i].pro_area, 'area_title');
          obj.pro_scale = formatData.setTagToString(list[i].pro_scale, 'scale_money');
          obj.project_id = list[i].project_id;
          obj.created_at = list[i].created_at;
          obj.total_score = list[i].total_score;
          obj.average_score = list[i].average_score;
          arr.push(obj);
        }
        return arr;
      },
      // 删除项目
      deleteProject (index, row) {
        this.setRouterData();
        this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.zgClick('删除项目');
          this.loading = true;
          this.$http.post(this.URL.deleteProject, {user_id: localStorage.user_id, project_id: row.project_id})
            .then(res => {
              this.loading = false;
              success('删除成功');
              this.getRouterData();
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
      // 评分指标下载
      scoreDownload () {
        const url = this.URL.weitianshi + this.URL.exportScoreByCompetition + '?user_id=' + localStorage.user_id;
        window.open(url);
      },
      // 控制评分指标
      closeScore (e) {
        this.scoreDisplay = e;
      },
      setListsCheck () {
        console.log(this.checkTimeTrue, 1, '定时开始');
        this.checkTime = setTimeout(() => {
          this.checkTimeTrue = true;
          console.log(this.checkTimeTrue, 2, '定时结束');
        }, 5000);
      },
      // 控制自定义
      closeStage (e) {
        this.stageDisplay = e;
        if (!e) {
          this.getNodeCount();
        }
      },
      // 项目列表自定义
      closeLists (e) {
        this.listsDisplay = e;
        if (!e) {
          this.filterChangeCurrent(this.currentPage || 1);
        }
      },
      openLists (e) {
        if (this.checkTimeTrue) {
          this.listsDisplay = e;
          this.checkTimeTrue = false;
          this.setListsCheck();
        } else {
          warning('您操作太频繁，请等一会再试');
        }
      },
      // 改变指标
      chengeSchedule (e) {
        this.getPra.schedule_id = e;
        this.filterChangeCurrent(1);
      },
      // 跳转到评价
      goScoreStatistics (index, row) {
        this.$router.push({name: 'projectDetails', query: {project_id: row.project_id, show: 'scoreStatistics'}});
        this.setRouterData();
      }
    },
    computed: {},
    mounted () {},
    created () {
      this.is_competition = localStorage.is_competition;
      // 组件创建完后获取数据，
      this.getProjectListURL = this.URL.getProjectList;
      this.getRouterData();
      this.loading = true;
      this.getNodeCount();
      this.titleSift();
      this.filterChangeCurrent(this.currentPage || 1);
    }
  };
</script>

<style type="text/css" lang="less">
  @import '../../../assets/css/myproject';
</style>
