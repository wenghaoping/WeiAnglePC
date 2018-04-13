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
          <el-button type="primary" size="large" @click="creatActivity">发布活动</el-button>
        </div>
      </div>
      <div class="top-lists clearfix" v-if="tableData.length !== 0">
        <template>
          <el-table :data="tableData"
                    :show-header="false"
                    v-loading="loading"
                    element-loading-text="拼命加载中">
            <el-table-column label="图片" width="180">
              <template slot-scope="scope">
                <div class="my_heardimg relative">
                  <img :src="scope.row.activity_theme_image" v-if="scope.row.activity_theme_image !== ''">
                  <img src="../../assets/images/morenIMG.png" v-else>
                  <div class="isSign absolute">
                    <img src="../../assets/images/isSign.png" v-if="scope.row.is_end === 0">
                    <img src="../../assets/images/noSign.png" v-if="scope.row.is_end === 1">
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="题目" width="645">
              <template slot-scope="scope">
                <p class="my_title">{{scope.row.activity_title | nullToB}}</p>
                <p class="my_small_title">主办方：{{scope.row.activity_user | nullToB}}</p>
                <p class="my_small_title">时间：{{scope.row.start_time | timeToReallTimeAll | nullToB}} ~ {{scope.row.end_time | timeToReallTimeAll | nullToB}}</p>
                <p class="my_small_title">地点：{{scope.row.activity_address | nullToB}}</p>
              </template>
            </el-table-column>

            <el-table-column label="报名" width="120">
              <template slot-scope="scope">
                <p class="my_sign tc">{{scope.row.activity_apply | nullToB}}</p>
                <p class="is_sign tc cursor" @click="toMember(scope.row, 0)">已报名</p>
                <div class="position_center_auto relative">
                  <el-button type="text" @click="getQrAcitivity(scope.row, 0)" class="hoverBtn is_img">报名二维码</el-button>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="报名2" width="120">
              <template slot-scope="scope">
                <p class="my_sign tc">{{scope.row.activity_sign | nullToB}}</p>
                <p class="is_sign tc cursor" @click="toMember(scope.row, 1)">已签到</p>
                <div class="position_center_auto relative">
                  <el-button type="text" @click="getQrAcitivity(scope.row, 1)" class="hoverBtn is_img">签到二维码</el-button>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              prop="reset"
              label="重置"
              width="220" class="edits-btn btn-cur ">
              <template slot-scope="scope">
                <div class="editBtn relative">
                  <el-button
                    type="text"
                    @click="handleEdit(scope.row)"
                    size="small">
                    编辑
                  </el-button>
                  <el-button
                    type="text"
                    @click="handleDelete(scope.row)"
                    size="small">
                    删除
                  </el-button>
                  <el-button
                    type="text"
                    :disabled="scope.row.competition_id !== 0"
                    @click="importRegistration(scope.row)"
                    size="small">
                    导入报名名单
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
              :page-size="5"
              layout="total, prev, pager, next"
              :total="totalData">
            </el-pagination>
          </div>
        </template>
      </div>
      <div class="emptyType" v-else v-loading="loading" element-loading-text="拼命加载中">
        <div class="position_auto absolute" style="width: 150px;height: 180px;">
          <div class="shape innImg absolute position_center_auto" v-if="emptyType">
            <img src="../../assets/images/shape.png">
          </div>
          <div class="empty_title tc absolute position_center_auto" style="top: 80px;" v-if="emptyType">
            你目前还没有任何活动
          </div>
          <div class="empty_title tc absolute position_center_auto" style="top: 80px;width: 210px;" v-if="!emptyType">
            暂时没有符合该搜索条件的活动
          </div>
          <el-button @click="creatActivity" class="absolute position_center_auto" style="top: 124px;left: 28px;" v-if="emptyType">马上发布</el-button>
        </div>
      </div>
    </div>
    <!--签到成员-->
    <alert-member></alert-member>
    <!--报名导入-->
    <import-registration></import-registration>
    <!--二维码-->
    <qr-code-activity></qr-code-activity>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import alertMember from '@/views/Activity/alertMember.vue';
  import importRegistration from '@/views/Activity/importRegistration.vue';
  import qrCodeActivity from '@/views/Activity/qrCodeActivity.vue';
  import { error, success } from '@/utils/notification';
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
          /* {
            activity_id: '',
            activity_title: '',
            activity_user: '',
            activity_address: '浙江省杭州市西湖区文一西路588号中节能西溪首座B3-51信用卡-1楼江省杭州市西湖区文一西路58vv',
            activity_theme_image: 'https://i.imgur.com/SgDpf8x.jpg',
            start_time: 1515377593,
            end_time: '',
            is_end: 0,
            activity_apply: 2, // 报名人数
            activity_sign: 1 // 签到人数
          } */
        ],
        emptyType: true
      };
    },
    computed: {
      ...mapState({
        activeSearch: state => state.myActivity.activeSearch || '',
        activeCurrentPage: state => state.myActivity.activeCurrentPage || 1,
        importRegistrationDisplay: state => state.myActivity.importRegistrationDisplay
      })
    },
    components: { alertMember, importRegistration, qrCodeActivity },
    methods: {
      // 点击编辑按钮,跳转
      handleEdit (row) {
        this.$router.push({name: 'creatMatchActive', query: {activity_id: row.activity_id}});
      },
      // 点击删除按钮
      handleDelete (row) {
        this.$confirm('删除后不可恢复，确定要删除该活动？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          this.$http.post(this.URL.deleteActivity, {user_id: localStorage.user_id, activity_id: row.activity_id})
            .then(res => {
              if (res.data.status_code === 2000000) {
                success('删除成功');
                this.filterChangeCurrent(this.activeCurrentPage || 1);
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
      // 添加人脉
      creatActivity () {
        this.$router.push({name: 'creatMatchActive', query: {activity_id: 'creat'}});// 路由传参
      },
      // 查看报名成员 / 签到成员
      toMember (row, type) {
        this.$store.dispatch('setActivityData', {activityId: row.activity_id, isSign: type});
        this.$store.dispatch('memberControl', true);
      },
      // 导入报名名单
      importRegistration (row) {
        this.$store.dispatch('importRegistrationControl', true);
        this.$store.dispatch('setActivityData', {activityId: row.activity_id});
      },
      // 查看二维码
      getQrAcitivity (row, type) {
        this.$store.dispatch('setActivityData', {activityId: row.activity_id, isSign: type});
        this.$store.dispatch('qrCodeActivityControl', true);
      },
      // 搜索===首次进入页面加载的数据
      handleIconClick () {
        return new Promise((resolve, reject) => {
          // 做一些异步操作
          this.loading = true;
          this.emptyType = false;
          this.getCon.user_id = localStorage.user_id;
          this.getCon.search = this.searchinput;
          this.getCon.page = 1;
          this.$store.dispatch('setUpSearch', {activeSearch: this.searchinput, activeCurrentPage: this.activeCurrentPage});
          this.$http.post(this.URL.getActivityList, this.getCon)
            .then(res => {
              if (res.data.status_code === 2000000) {
                let data = res.data.data;
                this.tableData = this.setProjectList(data);
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
      // 控制页码
      filterChangeCurrent (page) {
        delete this.getCon.page;
        this.loading = true;
        this.getCon.user_id = localStorage.user_id;
        this.getCon.page = page;// 控制当前页码
        this.$store.dispatch('setUpSearch', {activeSearch: this.searchinput, activeCurrentPage: page});
        this.$http.post(this.URL.getActivityList, this.getCon)
          .then(res => {
            if (res.data.status_code === 2000000) {
              let data = res.data.data;
              this.tableData = this.setProjectList(data);
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
      },
      // 总设置列表的数据处理
      setProjectList (list) {
        let arr = [];
        for (let i = 0; i < list.length; i++) {
          let obj = {};
          obj.activity_id = list[i].activity_id;
          obj.activity_title = list[i].activity_title;
          obj.activity_user = list[i].activity_user;
          obj.activity_address = list[i].activity_address;
          obj.activity_theme_image = list[i].activity_theme_image;
          obj.start_time = list[i].start_time;
          obj.end_time = list[i].end_time;
          obj.is_end = list[i].is_end;
          obj.competition_id = list[i].competition_id;
          obj.activity_apply = list[i].activity_apply;
          obj.activity_sign = list[i].activity_sign;
          arr.push(obj);
        }
        return arr;
      }
    },
    created () {
      getTop();
      this.searchinput = this.activeSearch;
      this.filterChangeCurrent(this.activeCurrentPage || 1);
    },
    watch: {
      importRegistrationDisplay: function (e) {
        if (!e) {
          this.filterChangeCurrent(1);
        }
      }
    }
  };
</script>

<style type="text/css" lang="less">
  @import '../../assets/css/myActivity';
</style>
