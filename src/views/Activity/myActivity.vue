<template>
  <div class="myActivity">
    <!-- 右侧底部主内容区 -->
    <div class="wrap-left">
      <div class="top-search-box clearfix">
        <div class="input-box fl">
          <el-input
            placeholder="搜索活动名称、主办方"
            icon="search"
            v-model="searchinput"
            :on-icon-click="handleIconClick"
            @keyup.native.enter="handleIconClick">
          </el-input>
        </div>
        <div class="btns-box fr">
          <el-button type="primary" size="large" @click="addContacts">创建活动</el-button>
        </div>
      </div>
      <div class="top-lists" style="cursor: pointer">
        <template>
          <el-table :data="tableData"
                    :show-header="false"
                    v-loading="loading"
                    element-loading-text="拼命加载中">
            <el-table-column label="图片" width="170">
              <template slot-scope="scope">
                <div class="my_heardimg">
                  <img :src="scope.row.activity_theme_image">
                </div>
              </template>
            </el-table-column>

            <el-table-column label="题目" width="673">
              <template slot-scope="scope">
                <p class="my_title">{{scope.row.activity_title | nullToB}}</p>
                <p class="my_small_title">主办方：{{scope.row.activity_user | nullToB}}</p>
                <p class="my_small_title">时间：{{scope.row.start_time | timeToReallTimeAll | nullToB}} ~ {{scope.row.end_time | timeToReallTimeAll | nullToB}}</p>
                <p class="my_small_title">地点：{{scope.row.activity_address | nullToB}}</p>
              </template>
            </el-table-column>

            <el-table-column label="报名" min-width="100">
              <template slot-scope="scope">
                <p class="my_sign tc">{{scope.row.activity_apply | nullToB}}</p>
                <p class="is_sign tc cursor">已报名</p>
                <p class="is_img tc cursor position_center_auto relative"><img :src="scope.row.activity_theme_image"></p>
              </template>
            </el-table-column>

            <el-table-column label="报名2" width="100">
              <template slot-scope="scope">
                <p class="my_sign tc">{{scope.row.activity_sign | nullToB}}</p>
                <p class="is_sign tc cursor">已签到</p>
                <p class="is_img tc cursor position_center_auto relative"><img :src="scope.row.activity_theme_image"></p>
              </template>
            </el-table-column>

            <el-table-column
              prop="reset"
              label="重置"
              width="220" class="edits-btn btn-cur">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small">
                  编辑
                </el-button>
                <el-button
                  type="text"
                  size="small">
                  删除
                </el-button>
                <el-button
                  type="text"
                  size="small">
                  导入报名名单
                </el-button>
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

    <alert-member></alert-member>
  </div>
</template>

<script type="text/ecmascript-6">
  import alertMember from '@/views/components/alertMember.vue';
  import { error, success } from '@/utils/notification';
  import * as formatData from '@/utils/formatData';
  import { isArray } from '@/utils/validata';
  import { getTop } from '@/utils';
  export default {
    data () {
      return {
        close: false,
        loading: false, // 加载
        searchinput: '', // 搜索绑定
        totalData: 1, // 总页数
        currentPage: 1, // 当前页数
        getCon: {}, // 筛选的请求参数
        // 列表数据
        tableData: [
          {
            activity_id: 'KQWNOp18',
            activity_title: '第一届中国微天使节和第二十届中国BD岁末嘉年华（杭州场）开始报名啦！',
            activity_user: '',
            activity_address: '浙江省杭州市西湖区文一西路588号中节能西溪首座B3-51信用卡-1楼江省杭州市西湖区文一西路58vv',
            activity_theme_image: 'https://i.imgur.com/SgDpf8x.jpg',
            start_time: 1515377593,
            end_time: '',
            is_end: 0,
            activity_apply: 2, // 报名人数
            activity_sign: 1 // 签到人数
          }
        ]
      };
    },
    components: { alertMember },
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
        this.$router.push({name: 'creatActivity', query: {activity_id: row.activity_id}});
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
      // 添加人脉
      addContacts () {
        this.$router.push({name: 'creatActivity', query: {activity_id: 'creat'}});// 路由传参
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
      }
    },
    created () {
//      getTop();
//      this.getRouterData();
//      this.loading = true;
//      this.is_competition = localStorage.is_competition;
//      this.$global.func.getWxProjectCategory()
//        .then((data) => {
//          return this.getWxProjectCategory();
//        })
//        .then((data) => {
//          return this.filterChangeCurrent(this.currentPage || 1);
//        });
//      this.titleSift();
    }
  };
</script>

<style type="text/css" lang="less">
  .myActivity{
    .wrap-left{
      margin: 24px auto 0;
      width: 1336px;
      background: rgb(255, 255, 255);
      padding: 24px;
    }
    .top-search-box {
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
    .el-table{
      margin-top: 48px;
    }
    .my_heardimg{
      border-radius:4px;
      width:162px;
      height:120px;
      img{
        width: 100%;
      }
    }
    .my_title{
      font-weight: bold;
      font-size:20px;
      color:#1f2d3d;
      line-height:26px;
      max-width: 623px;
      height: 52px;
      margin-bottom: 6px;
    }
    .my_small_title{
      font-size:13px;
      color:#8492a6;
      max-width: 623px;
    }
    .my_sign{
      font-size:28px;
      color:#1f2d3d;
    }
    .is_sign{
      margin-top: 8px;
      font-size:13px;
      color:#475669;
      text-decoration: underline;
    }
    .is_img{
      width: 18px;
      height: 18px;
      margin-top: 8px;
      img{
        width: 100%;
      }
    }
  }
</style>
