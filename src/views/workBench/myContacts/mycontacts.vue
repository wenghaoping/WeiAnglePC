<template>
  <div id="mycontacts" >
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
          <el-button type="primary" @click="addContacts">添加人脉</el-button>
        </div>
      </div>
      <div class="top-lists" style="cursor: pointer">
        <template>
          <el-table :data="tableData" style="width: 100%"
                    @row-click="handleSelect"
                    @header-click="headerClick"
                    @sort-change="filterChange"
                    @filter-change="filterChange"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    stripe>
            <el-table-column prop="user_real_name" label="姓名" width="200" show-overflow-tooltip>
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

            <el-table-column prop="user_email" label="邮箱" show-overflow-tooltip width="148">
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
<!--不是赛事方列表-->
            <el-table-column prop="user_invest_industry" label="投资领域"
                             show-overflow-tooltip
                             width="128"
                             column-key="industry"
                             :filters="user_invest_industryFilters"
                             filter-placement="bottom-end"
                             v-if="is_competition == 'false'">
              <template slot-scope="scope">
                  <div>
                    {{scope.row.user_invest_industry}}
                  </div>
                <div v-if="scope.row.user_invest_industry == ''">
                  -
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="user_invest_stage" label="投资轮次"
                             show-overflow-tooltip
                             width="140"
                             column-key="stage"
                             :filters="user_invest_stageFilters"
                             filter-placement="bottom-end"
                             v-if="is_competition == 'false'">
              <template slot-scope="scope">
                  <div>
                    {{scope.row.user_invest_stage}}
                  </div>
                <div v-if="scope.row.user_invest_stage == ''">
                   -
                </div>
              </template>
            </el-table-column>
<!--赛事方列表-->
            <el-table-column prop="is_judge" label="是否评委"
                             show-overflow-tooltip
                             width="128"
                             column-key="is_judge"
                             :filters="is_judgeFilters"
                             :filter-multiple="stateCheck"
                             filter-placement="bottom-end"
                             v-if="is_competition == 'true'">
              <template slot-scope="scope">
                <div>
                  {{scope.row.is_judge}}
                </div>
                <div v-if="scope.row.is_judge == ''">
                  -
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="schedule" label="评分阶段"
                             show-overflow-tooltip
                             width="140"
                             column-key="schedule_id"
                             :filters="schedule_idFilters"
                             :filter-multiple="stateCheck"
                             filter-placement="bottom-end"
                             v-if="is_competition == 'true'">
              <template slot-scope="scope">
                <div>
                  {{scope.row.schedule}}
                </div>
                <div v-if="scope.row.schedule == ''">
                  -
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="tag" label="标签" show-overflow-tooltip
                             width="74"
                             column-key="tag"
                             :filters="tagFilters"
                             filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.tag.length > 4 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.tag}}</div>
                  </div>
                  <div>
                    {{scope.row.tag}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.tag.length === 0">
                  -
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="login_time" label="最近活跃"
                             width="100" show-overflow-tooltip
                             column-key="login_time"
                             :filters="login_timeFilters"
                             :filter-multiple="stateCheck"
                             filter-placement="bottom-end"
                             sortable="custom">
              <template slot-scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.login_time.length > 4 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.login_time}}</div>
                  </div>
                  <div>
                    {{scope.row.login_time}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.login_time.length === 0">
                  -
                </div>
              </template>
            </el-table-column>

            <el-table-column
              prop="reset"
              label="重置"
              width="130" class="edits-btn btn-cur">
              <template slot-scope="scope">
                <div :class="{ prointrolone: is_competition == 'true'}">
                  <el-button
                    @click="handlePush(scope.$index, scope.row)"
                    type="text"
                    size="small" class="edits-btn btn-cur">
                    推送
                  </el-button>
                  <el-button
                    type="text"
                    size="small" class="flow-btn btn-cur" v-if="scope.row.is_bind==0"
                    @click="handleEdit(scope.$index, scope.row)">
                    编辑
                  </el-button>
                  <el-button
                    type="text"
                    size="small" class="flow-btn btn-cur"
                    v-if="scope.row.is_bind==1"
                    @click="handleTag(scope.$index, scope.row)">
                    标签
                  </el-button>
                  <el-button
                    type="text"
                    size="small" class="send-btn btn-cur"
                    @click="handleDelete(scope.$index, scope.row)">
                    删除
                  </el-button>
                </div>
                <div :class="{ prointrolone: is_competition == 'true'}" v-if="is_competition == 'true'">
                  <el-button
                    type="text"
                    size="small"
                    :disabled="scope.row.type === 'card'"
                    @click="judgeSetValue(scope.$index, scope.row)">
                    评委设置
                  </el-button>
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

    <!--标签设置弹框-->
    <el-dialog
      title="标签设置"
      :visible.sync="addTagDislpay"
      :show-close="close"
      size="tiny">
      <el-select
        v-model="tagsValue"
        multiple
        :multiple-limit="multiplelimit"
        filterable
        allow-create
        style="width:100%"
        @change="addChangeTag"
        default-first-option
        placeholder="请输入标签">
        <el-option
          v-for="item in addTags"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="tagTitle">准确设置项目标签便于查找，并参与项目匹配度计算</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addTagDislpay = false">取 消</el-button>
        <el-button type="primary" @click="addTag">确 定</el-button>
      </span>
    </el-dialog>

    <!--项目推送弹窗人脉入口-->
    <projectpush></projectpush>

    <!--项目预览弹窗-->
    <projectpreview></projectpreview>

    <!--设置评委-->
    <judge-setting :judgeDisplay="judgeDisplay" @closeJudge="closeJudge"
                   :judgeSet="judgeSet"></judge-setting>
  </div>
</template>

<script type="text/ecmascript-6">
  import projectpush from '@/views/components/projectPush.vue';
  import projectpreview from '@/views/components/projectPreview.vue';
  import judgeSetting from './judgeSetting.vue';
  import { error, success } from '@/utils/notification';
  import { getTitleSift, getTagsPro } from '@/utils/setSelect';
  import * as formatData from '@/utils/formatData';
  import { isArray } from '@/utils/validata';
  import { getTop } from '@/utils';
  export default {
    data () {
      return {
        addTagDislpay: false, // 标签弹框设置
        judgeDisplay: false, // 设为评委弹框
        close: false,
        activeName: 'second',
        loading: false, // 加载
        searchinput: '', // 搜索绑定
        totalData: 1, // 总页数
        currentPage: 1, // 当前页数
        getCon: {}, // 筛选的请求参数
        tagsValue: [], // 标签弹框数据绑定
        addTags: [], // 人脉标签展示数据
        tableData: [
          /* {
           user_avatar_url:"https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epia77Br2Wk8RiaR8hMAxMG9DerJfzuRCGr5Pf0s2MNDj1FU6dwnpKycchqTRck13S0RTQ6Cg3qZy4A/0",//头像
           user_avatar_url_change:"翁",//代替图片
           user_real_name:'翁浩平',//姓名
           is_add: true,//标签,true显示,false不显示
           user_company_career:'投资总监',//职位
           user_company_name:'杭州投着乐网络科技有限公司',//公司名称
           user_brand:'微天使,FA',//品牌
           user_mobile: "18910359282",//手机
           user_email: "123@168.com",//邮箱
           user_invest_industry: "电子商务",//投资领域
           user_invest_stage: "种子轮 ",//投资轮次
           tag:"海龟",//标签
           tagArray:[],//原版标签,设置标签用的
           login_time:"刚刚活跃",//最近活跃
           is_bind:0,//编辑
           } */
        ], // 列表数据
        user_invest_industryFilters: [], // 投资领域筛选条件
        user_invest_stageFilters: [], // 投资轮次筛选
        tagFilters: [], // 标签筛选条件
        is_judgeFilters: [
          {text: '是', value: 1},
          {text: '否', value: 0}
        ], // 是否是评委
        schedule_idFilters: [], // 评分阶段筛选
        userMessage: {
          user_real_name: '', // 姓名
          user_company_career: '', // 职位
          user_company_name: ''// 公司名称
        }, // 传递给推送的数据
        userEmail: '',
        tags: {
          changecont: [], // 项目标签新增
          index: '', // 取数据保存的位置
          card_id: ''// 人脉id
        },
        multiplelimit: 5, // 标签控制5个
        timeSelect: '', // 时间选择器
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now() - 8.64e7 + 3600 * 1000 * 24;
          }
        },
        login_timeFilters: [
          { text: '刚刚活跃', value: 0 },
          { text: '一天前活跃', value: 1 },
          { text: '两天前活跃', value: 2 },
          { text: '三天前活跃', value: 3 },
          { text: '一周前活跃', value: 7 }
        ], // 最近活跃
        stateCheck: false, // 跟进状态单选
        is_competition: false, // 是否是赛事方
        judgeSet: {} // 评委设置数据
      };
    },
    components: {
      projectpush,
      projectpreview,
      judgeSetting
    },
    methods: {
      // 跳转到人脉详情页面传参数
      handleSelect (row, event, column) {
        if (column.label !== '重置') {
          this.$router.push({name: 'contactsDetails', query: {user_id: row.user_id, card_id: row.card_id, investor_id: row.investor_id}});
          this.setRouterData();
        }
      },
      // 点击编辑按钮,跳转
      handleEdit (index, row) {
        this.zgClick('编辑人脉');
        this.$router.push({name: 'createContacts', query: {card_id: row.card_id}});
        this.setRouterData();
      },
      // 跳转之后设置参数
      setRouterData () {
        this.$store.state.pageANDSelect.getPra = this.getCon;
        this.$store.state.pageANDSelect.concurrentPage = this.currentPage;
      },
      // 从vuex中取数据
      getRouterData () {
        this.getCon = this.$store.state.pageANDSelect.getCon;
        this.getCon.page = this.$store.state.pageANDSelect.concurrentPage || 1;
        this.currentPage = this.$store.state.pageANDSelect.concurrentPage || 1;
        this.searchinput = this.$store.state.pageANDSelect.conSearchinput;
      },
      // 点击标签按钮
      handleTag (index, row) {
        this.addTagDislpay = true;
        this.tags.index = index;
        this.tags.card_id = row.card_id;
        this.tagsValue = formatData.setIdToArr(this.tableData[index].tagArray, 'tag_id');
        this.tags.changecont = formatData.setIdToArr(this.tableData[index].tagArray, 'tag_id');
      },
      // 点击删除按钮
      handleDelete (index, row) {
        this.setRouterData();
        this.$confirm('此操作将永久删除该人脉, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.zgClick('删除人脉');
          this.loading = true;
          this.$http.post(this.URL.deleteConnectUser, {user_id: localStorage.user_id, card_id: row.card_id})
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
      // 点击重置按钮时
      headerClick (column, event) {
        if (column.label === '重置') {
          window.location.reload();
        }
      },
      // 点击推送,并且传送数据给推送弹框
      handlePush (index, row) {
        this.zgClick('推送项目');
        let obj = {
          user_real_name: row.user_real_name,
          user_company_career: row.user_company_career,
          user_company_name: row.user_company_name,
          card_id: row.card_id,
          investor_email: row.user_email
        };
        this.$store.dispatch('setUserMessage', obj);
        this.$store.dispatch('projectPushToConControl', true);
      },
      // 添加人脉
      addContacts () {
        this.zgClick('添加人脉');
        this.$router.push({name: 'createContacts', query: {card_id: 'creat'}});// 路由传参
      },
      // 搜索===首次进入页面加载的数据
      handleIconClick () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.loading = true;
          this.getCon.user_id = localStorage.user_id;
          this.getCon.search = this.searchinput;
          this.$store.state.pageANDSelect.conSearchinput = this.searchinput;
          this.currentPage = 1;
          this.getCon.page = 1;
          this.$http.post(this.URL.getConnectUser, this.getCon)
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
        this.$http.post(this.URL.getConnectUser, this.getCon)
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
        this.$http.post(this.URL.getConnectUser, this.getCon)
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
          let obj = [];
          obj.user_id = list[i].user_id;
          obj.user_avatar_url = list[i].user_avatar_url;
          obj.user_real_name = list[i].user_real_name;// 姓名
          obj.user_avatar_url_change = formatData.setUrlChange(list[i].user_avatar_url, list[i].user_real_name);// 代替名称
          obj.is_add = list[i].is_add;// 标签
          obj.is_bind = list[i].is_bind;// 编辑
          obj.user_company_career = list[i].user_company_career;// 职位
          obj.user_company_name = list[i].user_company_name;// 公司名称
          obj.user_brand = list[i].user_brand;// 品牌
          obj.user_mobile = list[i].user_mobile;// 手机
          obj.user_email = list[i].user_email;// 邮箱
          obj.user_invest_industry = formatData.setTagToString(list[i].user_invest_industry, 'industry_name');// 投资领域
          obj.user_invest_stage = formatData.setTagToString(list[i].user_invest_stage, 'stage_name');// 投资轮次
          obj.tag = formatData.setTagToString(list[i].user_invest_tag, 'tag_name');// 标签
          obj.tagArray = list[i].user_invest_tag;// 标签
          obj.login_time = list[i].login_time;// 活跃时间
          obj.card_id = list[i].card_id;// 活跃时间
          obj.investor_id = list[i].investor_id;// 活跃时间
          obj.type = list[i].type;// 类型
          obj.is_judge = list[i].is_judge;// 是否是评委
          obj.schedule = isArray(list[i].schedule) ? '' : list[i].schedule.schedule_name;// 评分阶段
          obj.schedule_id = isArray(list[i].schedule) ? '' : list[i].schedule.schedule_id;// 评分阶段
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
      // 添加项目标签
      addChangeTag (e) {
        let tagName = formatData.checkArr(e, this.addTags);
        if (tagName !== undefined) {
          if (tagName.length > 40) {
            error('最多输入40个字');
            this.tagsValue.pop();
          } else {
            this.$http.post(this.URL.createCustomTag, {user_id: localStorage.user_id, type: 3, tag_name: tagName})
              .then(res => {
                let newState = {};
                newState.label = tagName;
                newState.value = res.data.tag_id;
                this.tags.changecont.push(newState);
                this.$global.func.getWxProjectCategory();
              })
              .catch(err => {
                error('添加失败');
                console.log(err);
              });
          }
        }
      },
      // 保存标签选择
      addTag () {
        this.loading = true;
        formatData.setTag(this.tagsValue, this.tags.changecont);
        this.$http.post(this.URL.setConnectTag, {user_id: localStorage.user_id, card_id: this.tags.card_id, tag: this.tagsValue})
          .then(res => {
            this.loading = false;
            success('设置成功');
            this.addTagDislpay = false;
            this.handleIconClick();
            this.gettags_user();
          })
          .catch(err => {
            this.loading = false;
            error('设置失败');
            console.log(err);
            this.addTagDislpay = false;
          });
      },
      // 设置人脉标签
      gettags_user () {
        this.$http.post(this.URL.getWxProjectCategory, {user_id: localStorage.user_id})
          .then(res => {
            let data = res.data.data;
            this.addTags = getTagsPro(data.tags_user);// 设置人脉标签
          });
      },
      // 打开关闭设置评委
      closeJudge (e) {
        this.judgeDisplay = e;
        if (!e) {
          this.filterChangeCurrent(this.currentPage || 1);
        }
      },
      // 评委设置
      judgeSetValue (index, row) {
        this.judgeDisplay = true;
        this.judgeSet = row;
      }
    },
    created () {
      getTop();
      this.getRouterData();
      this.loading = true;
      this.is_competition = localStorage.is_competition;
      this.$global.func.getWxProjectCategory()
        .then((data) => {
          return this.getWxProjectCategory();
        })
        .then((data) => {
          return this.filterChangeCurrent(this.currentPage || 1);
        });
      this.titleSift();
    }
  };
</script>

<style type="text/css" lang="less">
  @import '../../../assets/css/mycontacts';
</style>
