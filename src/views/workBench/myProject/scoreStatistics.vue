<template>
  <!--评分统计-->
    <div id="scoreStatistics">
      <el-row :span="24" class="grid-border" v-if="is_competition == 'true'">
        <el-col :span="8" class="grid-content content-left" v-loading.body="scoreloading" element-loading-text="拼命加载中">
          <p class="tc last">最终得分</p>
          <p class="tc score">{{total_score}}</p>
          <div class="tc progress">
            <div class="el-progress el-progress--line">
              <div class="el-progress-bar">
                <div class="el-progress-bar__outer" style="height: 6px;">
                  <div class="el-progress-bar__inner" :style="{width: progressBar}"></div>
                </div>
              </div>
              <div class="el-progress__text" style="font-size: 14px;">{{score_sum}}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="grid-content content-left" v-loading.body="scoreloading" element-loading-text="拼命加载中">
          <p class="tc last">投资指数</p>
          <p class="tc score">{{average_score}}</p>
          <p class="tc have">有投资价值</p>
          <p class="tc ico">
            <el-rate
              v-model="Number.parseFloat(average_score) / 2"
              disabled
              text-color="#ff9900">
            </el-rate>
          </p>
        </el-col>
        <el-col :span="8" class="grid-content" v-loading.body="chartloading" element-loading-text="拼命加载中">
          <div class='chart-container content-left' v-show="innerValue.length === 0">
            <p class="tc last" style="margin:58px 0 5px;">设置评分指标查看图表信息</p>
            <p class="tc score"><el-button @click="closeScore(true)">设置指标</el-button></p>
          </div>
          <div class='chart-container' v-show="innerValue.length !== 0">
            <radar height='213px' width='261px' :indicator="indicator" :innerValue="innerValue" ref="radar"></radar>
          </div>
        </el-col>
        <div class="fr" style="height: 44px;">
          <el-select v-model="schedule_id" placeholder="请选择"
                     class="inlineBlock selectf" @change="selectChange">
            <el-option
              v-for="item in schedule"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="addhover inlineBlock cursor" @click="download">
            <i class="addmemberimg"><img src="../../../assets/images/xiazai.png"></i>
            <el-button type="text" class="addMember fl">评分下载</el-button>
          </div>
        </div>
      </el-row>

      <!--赛事用户-->
      <div style="margin-bottom: 32px;" v-if="is_competition == 'true'">
        <el-table :data="tableData.data" style="width: 100%;cursor: pointer"
                  class="top-lists"
                  stripe
                  v-loading.body="loading" element-loading-text="拼命加载中">
          <el-table-column prop="user" label="评委" width="155" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tooltip placement="top" :disabled="scope.row.user.user_name.length > 4 ? false:true">
                <div slot="content">
                  <div class="tips-txt">{{scope.row.user.user_name}}</div>
                </div>
              </el-tooltip>
              <div>
                <div class="alone">{{scope.row.user.user_name}}</div>
                <span class="alone2 ad2 nowrap inlineBlock">{{scope.row.user.user_company_career}}</span>
                <span class="alone2 ad nowrap inlineBlock">
                <el-tooltip placement="top" :disabled="scope.row.user.user_brand.length > 5 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.user.user_brand}}</div>
                  </div>
                  <div>
                    {{scope.row.user.user_brand}}
                  </div>
                </el-tooltip>
                </span>
              </div>
              <div v-if="scope.row.user.user_name.length === 0">
                -
              </div>
            </template>
          </el-table-column>

          <el-table-column :key='index' v-for='(score,index) in tableData.scores' :label="score.index_name" min-width="65" class="overhidd">
            <template slot-scope="scope">
              {{scope.row.index_score[score.index_name]}}
            </template>
          </el-table-column>

          <el-table-column prop="index_sum" label="总评分" min-width="60" show-overflow-tooltip>

          </el-table-column>

          <el-table-column prop="score" label="投资指数" min-width="68" show-overflow-tooltip>

          </el-table-column>

          <el-table-column prop="remark" label="评语" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tooltip placement="top" :disabled="scope.row.remark.length > 6 ? false:true">
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
      </div>

      <!--普通用户-->
      <div>
        <user-score-list :proid="project_id" :schid="schedule_id"></user-score-list>
      </div>

      <!--评分指标-->
      <score-index :scoreDisplay="scoreDisplay" @closeScore="closeScore" @chengeSchedule="chengeSchedule" :schid="schedule_id"></score-index>
    </div>
</template>

<script type="text/ecmascript-6">
    import radar from '@/components/Charts/radar.vue';
    import scoreIndex from '@/views/components/scoreIndex.vue';
    import userScoreList from './userScoreList.vue';
    import { error, success } from '@/utils/notification';
    export default {
      props: ['proid', 'scheduleid'],
      data () {
        return {
          loading: false,
          scoreloading: false,
          chartloading: false,
          scoreDisplay: false,
          project_id: this.proid,
          schedule_id: '',
          getPra: {}, // 筛选的请求参数
          currentPage: 1, // 当前页数
          totalData: 0, // 总页数
          tableData: {
            /* data: [
              {
                index_sum: 187,
                is_show: 1,
                remark: '定阿斯蒂芬好绝望偶尔会个',
                score: 9.9,
                index_score: {
                  '指标': 22,
                  '一二三四五六七八九十一二三四五六七八九十': 99,
                  '指标指标': 66,
                  '指标指标1': 66
                },
                user: {
                  user_brand: '有限公司',
                  user_company_career: 'PHP',
                  user_name: '朱甜甜'
                }
              }
            ],
            scores: [
              {index_name: '指标'},
              {index_name: '一二三四五六七八九十一二三四五六七八九十'},
              {index_name: '指标指标'},
              {index_name: '指标指标1'}
            ] */
          },
          indicator: [
            /* {name: '竞争力', max: 100},
            {name: '商业前景', max: 100},
            {name: '发展战略', max: 100},
            {name: '发展战略', max: 100},
            {name: '发展战略', max: 100} */
          ],
          innerValue: [ /* 50, 60, 32, 100, 72 */ ],
          average_score: 0, // 投资指数
          total_score: 0, // 最终得分
          score_sum: 0, // 最终总分
          schedule: [], // 项目进度
          is_competition: false // 是否是赛事方
        };
      },
      computed: {
        investment () {
          return (Number.parseFloat(this.average_score) / 2);
        },
        progressBar () {
          return (Number.parseInt(this.total_score) / Number.parseInt(this.score_sum)) * 100 + '%';
        }
      },
      // 组件
      components: {
        radar,
        userScoreList,
        scoreIndex
      },
      methods: {
        // 控制页码
        filterChangeCurrent (page) {
          this.tableData.data = [];
          this.tableData.scores = [];
          delete this.getPra.page;
          this.loading = true;
          this.getPra.user_id = localStorage.user_id;
          this.getPra.project_id = this.project_id;
          this.getPra.schedule_id = this.schedule_id;
          this.getPra.page = page;// 控制当前页码
          this.$http.post(this.URL.getProjectJudgeScoreList, this.getPra)
            .then(res => {
              this.loading = false;
              this.tableData.data = res.data.data;
              this.tableData.scores = res.data.scores;
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
        },
        // 获取最终评分,投资指数
        getScoreStatistics () {
          this.scoreloading = true;
          this.$http.post(this.URL.getScoreStatistics,
            {user_id: localStorage.user_id, project_id: this.project_id, schedule_id: this.schedule_id})
            .then(res => {
              let data = res.data.data;
              if (data.length !== 0) {
                this.total_score = data.total_score;
                this.average_score = data.average_score;
                this.score_sum = res.data.score_sum;
              } else {
                this.total_score = 0;
                this.average_score = 0;
                this.score_sum = 100;
              }
              this.scoreloading = false;
            })
            .catch(err => {
              this.scoreloading = false;
              console.log(err);
            });
        },
        // 平均分,图表使用
        getScoreStatisticsGroup () {
          this.chartloading = true;
          this.$http.post(this.URL.getScoreStatisticsGroup,
            {user_id: localStorage.user_id, project_id: this.project_id, schedule_id: this.schedule_id})
            .then(res => {
              let data = res.data.data;
              if (data.length !== 0) {
                this.setScoreStatistics(data);
              } else {
                this.indicator = [{name: '竞争力', max: 100}];
                this.innerValue = [];
              }
              this.chartloading = false;
            })
            .catch(err => {
              this.chartloading = false;
              console.log(err);
            });
        },
        // 设置图表数据
        setScoreStatistics (data) {
          let indicator = [];
          let innerValue = [];
          data.forEach(x => {
            let obj = {};
            obj.name = x.index_name.length > 4 ? x.index_name.substring(0, 4) : x.index_name;
            obj.max = Number.parseInt(x.index_score);
            indicator.push(obj);
            innerValue.push(Number.parseInt(x.average_score));
          });
          this.indicator = indicator;
          this.innerValue = innerValue;
        },
        // 下载评分
        download () {
          const url = this.URL.weitianshi + this.URL.exportProjectScoreByCompetition + '?user_id=' + localStorage.user_id + '&schedule_id=' + this.schedule_id + '&project_id=' + this.project_id;
          window.open(url);
        },
        // 获取所有下拉框的数据
        getWxProjectCategory () {
          return new Promise((resolve, reject) => {
            // 做一些异步操作
            this.schedule = this.$global.data.schedule;// 设置项目跟进状态
            resolve(2);
          });
        },
        // 控制评分指标
        closeScore (e) {
          this.scoreDisplay = e;
        },
        // 切换项目阶段
        selectChange (e) {
          this.schedule_id = e;
          this.getScoreStatistics();
          this.getScoreStatisticsGroup();
          this.filterChangeCurrent(1);
        },
        // 改变指标
        chengeSchedule (e) {
          this.schedule_id = e;
          this.filterChangeCurrent(1);
          this.getScoreStatisticsGroup();
          this.getScoreStatistics();
        }
      },
      // 当dom一创建时
      created () {
        this.is_competition = localStorage.is_competition;
        this.$global.func.getWxProjectCategory()
          .then((data) => {
            return this.getWxProjectCategory();
          });
      },
      watch: {
        scheduleid: function (e) {
          this.schedule_id = e;
        }
      }
    };
</script>

<style lang="less">
#scoreStatistics{
  .selectf{
    .el-input__inner{
      border: none;
      padding-right: 0px;
    }
    .el-input{
      width: 100px;
    }
  }
  .el-select{
    top: -9px;
  }
  .addhover{
    margin-right: 25px;
    position:relative;
    right: 0px;
    top: 3px;
  }
  .addmemberimg{
    transform:  rotate(0) ;
    display: inline-block;
    float: left;
    margin-top: 8px;
    width: 14px;
    height: 14px;
    margin-right: 7px;
    transition: all .5s;
    img{
      width:100%;
    }
  }
  .alone .alone2{
    height: 25px;
    overflow: hidden;
    display: block;
    line-height: 23px;
    font-size:12px;
  }
  .alone2 {
    color:#8492a6;
  }
  .alone {
    color:#1f2d3d;
  }
  .ad{
    width: 81px
  }
  .ad2{
    width: 48px
  }
  thead{
    th{
      font-size: 12px;
      font-weight: 100;
      border:none;
      color:#475669;
      &:nth-child(1){
        padding-left:24px;
      }
    }

  }
  tbody{

    td{
      border:none;
      .cell{
        font-size: 12px;
        div{
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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
  .el-table th>.cell{
    line-height: 17px;
    /*white-space: nowrap;*/
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
  }
  .grid-border{
    margin: 15px 0 30px;
    background:#ffffff;
    box-shadow:0 0 6px 0 rgba(64,88,122,0.20);
    border-radius:2px;
    .grid-content{
      height: 215px;
      border: 1px #eff2f7 solid;
      border-right: none;
      .chart-container{
        position: relative;
        width: 261px;
        height: 213px;
      }
      &:last-child{
        border-right: 1px #eff2f7 solid;
      }

    }
    .content-left{
      padding: 15px;
      .last{font-size:12px;color:#8492a6; margin: 42px 0 0px}
      .score{font-size:36px;color:#1f2d3d;}
      .progress{margin-top: 40px;}
      .have{font-size:14px;color:#475669;margin: 2px 0 18px;}
      .ico{i {font-size: 24px;}}
    }
  }
}
</style>
