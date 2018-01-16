<template>
  <!--项目推送人脉入口（单选)-->
  <div id="projectPush">
    <el-dialog :visible="projectPushToConDisplay" :before-close="closeProjectPush" class="projectPushToProDialog">
     <span slot="title" class="dialog-title clearfix">
        <div class="lines fl"></div>
        <div class="title fl">项目推送</div>
        <div class="lost fl">今日剩余推送<i>{{pushCount}}</i>次</div>
        <el-tooltip content="Top center" placement="top">
          <div slot="content">每天可以推送5次，1个项目推送给1个投资人计1次，1个项目推送给多个投资人计多次</div>
          <div class="img fl" style="cursor: pointer"><img src="../../assets/images/why.png"></div>
        </el-tooltip>
      </span>

       <el-form label-position="top" :model="email2" label-width="80px" style="position: relative" ref="email2">
        <el-form-item label="推送人脉"
                      prop="nameEmail"
                      :rules="emailRule">
          <el-input v-model="email2.nameEmail" placeholder="该用户未填写邮箱，请完善对方邮箱"></el-input>
        </el-form-item>
      </el-form>
      <div class="message">
        <span class="message_innder fl" v-if="userMessage.user_real_name!=''">{{userMessage.user_real_name}}</span>
        <span class="message_innder fl" v-else>&#45;&#45;</span>
        <span class="lines fl"></span>
        <span class="message_innder fl" v-if="userMessage.user_company_career!=''">{{userMessage.user_company_career}}</span>
        <span class="message_innder fl" v-else>&#45;&#45;</span>
        <span class="lines fl"></span>
        <span class="message_innder fl" v-if="userMessage.user_company_name!=''">{{userMessage.user_company_name}}</span>
        <span class="message_innder fl" v-else>&#45;&#45;</span>
      </div>
            <el-form label-position="top" label-width="80px">
              <el-form-item label="推送项目">
                <el-select v-model="projectList" filterable
                           remote placeholder="请输入项目关键词"
                           multiple @remove-tag="removeTag"
                           :remote-method="remoteMethod"  popper-class="popper">
                  <el-option v-for="item in projectAll" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
      <div class="select">
              <el-tabs v-model="activeName">
                <el-tab-pane label="我的项目" name="first"></el-tab-pane>
              </el-tabs>
            </div>
            <div class="top-lists" style="background: #f3f4f8;cursor: pointer;margin-bottom: 29px;" >
              <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%"
                max-height="430"
                @row-click="handleSelect"
                :row-class-name="tableRowClassName">
                <el-table-column
                  width="64">
                  <template slot-scope="scope">
                    <el-radio class="radio" v-model="projectRadio" :label="scope.row.project_id"></el-radio>
                  </template>
                </el-table-column>
                <el-table-column
                  label="项目介绍"
                  min-width="570">
                  <template slot-scope="scope">
                    <el-tooltip placement="top" :disabled="scope.row.pro_intro.length > 30 ? false:true">
                      <div slot="content">
                        <div class="tips-txt">{{scope.row.pro_intro}}</div>
                      </div>
                      <div>
                        {{scope.row.pro_intro}}
                      </div>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="wts_match_weight"
                  label="匹配度"
                  min-width="80">
                  <template slot-scope="scope">
                    <div class="origin">
                      {{scope.row.wts_match_weight}}%
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                class="pagination fr"
                small
                v-if="totalMatchProject > 10"
                @current-change="filterChangeMatchProject"
                :current-page.sync="currentPageMatchProject"
                layout="prev, pager, next"
                :page-size="10"
                :total="totalMatchProject">
              </el-pagination>
            </div>

            <el-form label-position="top" label-width="80px" ref="email" :model="email">
              <el-form-item label="标题" prop="title"
              :rules="[{max: 100, message: '长度不能大于100个字符', trigger: 'blur' }]">
                <el-input v-model="email.title" placeholder="浙江安琪创投-投资VP-杜兴国推荐项目|微天使乐投平台—互联网化FA平台—AI驱动的智能云投行"></el-input>
              </el-form-item>
              <el-form-item label="正文"
                            prop="body"
                            :rules="[{max: 500, message: '长度不能大于500个字符', trigger: 'blur' }]">
                <el-input type="textarea"
                          v-model="email.body"
                          placeholder="请输入简要项目介绍，作为邮件正文，便于投资人快速了解项目"
                          :autosize="{ minRows: 4, maxRows: 7}"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="preview">预览</el-button>
              <el-button type="primary" @click="push(1)">推送</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import * as validata from '@/utils/validata';
  import { error, success, warning } from '@/utils/notification';
  export default {
    props: {
      enterType: {
        type: String,
        default: 'list' // atlas
      }
    },
    computed: {
      ...mapState({
        projectPushToConDisplay: state => state.pushProject.projectPushToConDisplay,
        userMessage: state => state.pushProject.userMessage,
        projectMessage: state => state.projectDetails.projectMessage
      })
    },
    data () {
      var checkEmail = (rule, value, callback) => {
        if (validata.getNull(value)) {
          return callback(new Error('邮箱不能为空'));
        }
        setTimeout(() => {
          if (!validata.checkEmail(value)) {
            callback(new Error('请输入正确的邮箱'));
          } else {
            callback();
          }
        }, 300);
      };// 邮箱判断
      var checkTitle = (rule, value, callback) => {
        if (validata.getNull(value)) {
          return callback(new Error('不能为空'));
        } else {
          callback();
        }
      };// 不为空判断
      return {
        emailRule: {validator: checkEmail, trigger: 'blur'},
        titleRule: {validator: checkTitle, trigger: 'blur'},
        close: false, // 默认关闭
        loading: false, // 加载动画
        activeName: 'first',
        // 主标题
        email: {
          title: '', // 邮件标题
          body: ''// 邮件正文
        },
        // 输入框中单独一个
        email2: {
          nameEmail: ''// 人脉的邮箱(一个)
        },
        projectList: [], // 推送的项目列表
        projectAll: [], // 项目列表下拉框基本是不用的
        tableData3: [
          /*          {
           pro_intro: '项目的一句话介绍，字数可能会有点长，但不管怎样，就显示一行，如果显示不下那但不管怎样，就显示一行，如果显示不下那但不管怎样，就显示一行，如果显示不下那',
           match_weight : '100',
           project_id:1
           } */
        ],
        // 绑定当前项目数据,单选框的数据(project_id)
        projectRadio: '',
        pushCount: 0, // 剩余推送次数
        totalMatchProject: 0, // 项目加载总页数
        currentPageMatchProject: 1, // 当前第几页
        searchProject: {}, // 搜索项目的数据
        searchProjectInput: '', // 搜素项目用的
        emailMust: false,
        email2Must: false
      };
    },
    methods: {
      // 关闭项目推送
      closeProjectPush () {
        this.$store.dispatch('projectPushToConControl', false);
        this.$store.dispatch('clearMessage', false);
        this.$store.dispatch('clearProjectMessage', false);
      },
      title () {
        this.user_company_name = localStorage.user_company_name;
        this.user_brand = localStorage.user_brand;
        this.user_company_career = localStorage.user_company_career + '-' || '';
        this.user_real_name = localStorage.user_real_name;
        if (!this.user_brand) {
          this.pushbrand = this.user_company_name + '-' || '';
        } else {
          this.pushbrand = this.user_brand + '-' || '';
        }
        return this.pushbrand + this.user_company_career + this.user_real_name + '推荐项目|微天使乐投平台—互联网化FA平台—AI驱动的智能云投行';
      },
      // 推送预览
      preview () {
        if (this.pushCount !== 0) {
          if (this.projectRadio === '' || this.projectRadio === undefined) error('请选择要推送的项目');
          else if (!validata.checkEmail(this.email2.nameEmail)) error('请输入正确的邮箱');
          else if (this.email.title.length > 100) error('标题不能大于100个字');
          else if (this.email.body.length > 500) error('正文不能大于500个字');
          else {
            this.zgClick('预览');
            let obj = {
              email: this.email2.nameEmail,
              title: this.email.title,
              body: this.email.body,
              receive_users: [this.userMessage.investor_id],
              project_id: this.projectRadio
            };
            this.$store.dispatch('setFollowUp', {projectId: this.projectRadio}); // 设置项目id
            this.$store.dispatch('setPushMessage', obj);
            this.$store.dispatch('projectPushPreviewControl', true);
          }
        } else {
          warning('您今日的推送次数已用完,请明天再试');
        }
      },
      // 推送按钮
      push () {
        if (this.pushCount !== 0) {
          const submit = () => {
            return new Promise((resolve, reject) => {
              // 做一些异步操作
              this.submitForm('email', 'emailMust');
              this.submitForm('email2', 'email2Must');
              resolve(true);
            });
          };
          const check = () => {
            return new Promise((resolve, reject) => {
              // 做一些异步操作
              setTimeout(() => {
                if (this.emailMust) {
                } else if (this.email2Must) {
                } else if (this.projectRadio === '' || this.projectRadio === undefined) error('请选择要推送的项目');
                else if (!validata.checkEmail(this.email2.nameEmail)) error('请输入正确的邮箱');
                else if (this.email.title.length > 100) error('标题不能大于100个字');
                else if (this.email.body.length > 500) error('正文不能大于500个字');
                else {
                  resolve(true);
                }
              }, 200);
            });
          };
          submit()
            .then((data) => {
              return check();
            })
            .then((data) => {
              if (data) {
                this.$http.post(this.URL.pushProjectToUsers, {
                  user_id: localStorage.user_id,
                  project_id: this.projectRadio,
                  title: this.email.title,
                  body: this.email.body,
                  email: this.email2.nameEmail,
                  receive_users: [this.userMessage.investor_id],
                  card_id: [this.userMessage.card_id]
                }).then(res => {
                  if (res.data.status_code === 2000000) {
                    success('推送成功');
                    this.getpushCount();
                    this.loading = false;
                    this.open2('推送成功', '推送成功', '继续推送', '返回');
                  } else {
                    this.loading = false;
                  }
                })
                  .catch(err => {
                    console.log(err);
                    this.loading = false;
                  });
              }
            });
        } else {
          warning('您今日的推送次数已用完');
        }
      },
      // 项目搜索
      remoteMethod (query) {
        return new Promise((resolve, reject) => {
          if (query === '') this.projectRadio = '';
          this.loading = true;
          this.currentPageMatchProject = 1;
          this.searchProject.user_id = localStorage.user_id;
          if (this.enterType === 'atlas') {
            this.searchProject.investor_id = this.userMessage.investor_id || 0; // 买家图谱
          } else {
            this.searchProject.card_id = this.userMessage.card_id || 0; // 人脉列表
          }
          this.searchProject.pro_intro = query || '';
          this.searchProject.page = 1;
          this.$http.post(this.URL.getPushProjects, this.searchProject)
            .then(res => {
              let data = res.data.data;
              this.tableData3 = data;
              this.projectAll = this.setProjectAll(data);
              this.totalMatchProject = data.count;
              this.loading = false;
              resolve(1);
            })
            .catch(err => {
              console.log(err);
              this.loading = false;
            });
        });
      },
      // 页码控制
      filterChangeMatchProject (page) {
        this.loading = true;
        this.searchProject.page = page;
        this.searchProject.investor_id = this.userMessage.investor_id;
        this.searchProject.pro_intro = this.searchProjectInput;
        this.$http.post(this.URL.matchProject, this.searchProject)
          .then(res => {
            let data = res.data.data;
            this.tableData3 = data;
            this.projectAll = this.setProjectAll(data);
            this.loading = false;
            this.totalMatchProject = data.count;
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
          });
      },
      // 删除标签
      removeTag (e) {
        this.projectRadio = '';
        this.remoteMethod('');
      },
      // 设置项目下拉框,虽然没什么卵用
      setProjectAll (data) {
        let arr = [];
        data.forEach((x) => {
          let obj = {};
          obj.label = x.pro_intro;
          obj.value = x.project_id;
          arr.push(obj);
        });
        return arr;
      },
      // 控制列表颜色
      tableRowClassName (row, index) {
        if (index % 2 === 1) {
          return 'info-row';
        }
        return '';
      },
      // 获取项目详情
      getIntroduce (id) {
        if (id !== '') {
          this.projectList = [];
          this.projectList.push(id);
          let arr = this.tableData3;
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].project_id === id) {
              this.$store.dispatch('setFollowUp', {projectId: arr[i].project_id, projectIntro: arr[i].pro_intro});
            }
          }
        }
      },
      // 检查所有必填项目以及获取所有数据/true过.false不过
      submitForm (formName, checkName) {
        this.$refs[formName].validate((valid) => {
          this[checkName] = !valid;
        });
      },
      // 获取剩余推送次数
      getpushCount () {
        this.$http.post(this.URL.pushCount, {
          user_id: localStorage.user_id})
          .then(res => {
            let data = res.data.data;
            this.pushCount = data.push_count.remain_times || 0;
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
          });
      },
      // 点击单选
      handleSelect (row, event, column) {
        this.projectRadio = row.project_id;
        this.remoteMethod(row.pro_intro);
      },
      open2 (title, main, confirm, cancel) {
        this.$confirm(main, title, {
          confirmButtonText: confirm,
          cancelButtonText: cancel,
          type: 'success'
        }).then(() => {
          this.remoteMethod('');
          this.getpushCount();
          this.clearData();
        }).catch(() => {
          this.$store.dispatch('projectPushToConControl', false);
          this.clearData();
        });
      },
      clearData () {
        this.projectRadio = ''; // 清空项目选择选项
        this.projectList = []; // 清空项目选择选项
      }
    },
    watch: {
      projectRadio: function (e) {
        this.getIntroduce(e);
      },
      projectPushToConDisplay: function (e) {
        if (e) {
          this.getCheckUserInfo(localStorage.user_id);
          setTimeout(() => { this.email.title = this.title(); }, 1000);
          this.email2.nameEmail = '';
          this.projectList = [];
          this.tableData3 = [];
          this.projectRadio = '';
          this.email2.nameEmail = this.userMessage.investor_email;
          if (this.projectMessage.projectId !== '' || this.projectMessage.projectId !== undefined) {
            this.remoteMethod(this.projectMessage.projectIntro)
              .then((data) => {
                this.projectRadio = this.projectMessage.projectId;
              });
          } else {
            this.remoteMethod('');
            this.$store.dispatch('clearProjectMessage', true);
          }
        }
        this.getpushCount();
      }
    }
  };
</script>

<style lang="less">
  @import '../../assets/css/projectPush';
  .popper{
    display: none;
  }
</style>
