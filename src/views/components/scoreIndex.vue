<template>
  <!--评分指标-->
  <div id="scoreIndex">
    <el-dialog :visible="scoreDisplay" custom-class="dialogFollow" :before-close="handleClose" close-on-press-escape close-on-click-modal lock-scroll
               :close-on-click-modal="showList" :close-on-press-escape="showList" size="small"
               title="大赛评分指标">
      <div class="main" v-loading.body="loading" element-loading-text="拼命加载中">
        <el-form :model="competition" ref="competition" label-width="100px" class="padding" label-position="top">
          <el-row :span="24" :gutter="32">
            <el-col :span="18">
              <el-form-item
                label="赛事名称"
                prop="competition_name" :rules="[{required: true, message: '不能为空', trigger: 'blur'},{max:40,message: '不超过40个字符'}]">
                <el-input v-model="competition.competition_name" placeholder="赛事名称">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                label="阶段"
                prop="schedule_id">
                <el-select v-model="schedule_id"
                           placeholder="请选择" @change="getCompetitionIndex2">
                  <el-option
                    v-for="item in schedule"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24" :gutter="32" style="margin-bottom: 12px;">
            <el-col :span="9">指标</el-col>
            <el-col :span="9">描述</el-col>
            <el-col :span="5">分值</el-col>
          </el-row>
          <el-row :span="24" :gutter="32">
            <el-col :span="9">
              <el-form-item
                :prop="'competition_index.' + index + '.index_name'"
                v-for="(compe, index) in competition.competition_index"
                :key="compe.index"
                :rules="[{required: true, message: '不能为空', trigger: 'blur'},{max:20,message: '不超过20个字符'}]">
                <el-input v-model="compe.index_name" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item
                :prop="'competition_index.' + index + '.index_desc'"
                v-for="(compe, index) in competition.competition_index"
                :key="compe.index"
                :rules="[{required: true, message: '不能为空', trigger: 'blur'},{max:100,message: '不超过100个字符'}]">
                <el-input v-model="compe.index_desc" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                :prop="'competition_index.' + index + '.index_score'"
                v-for="(compe, index) in competition.competition_index"
                :key="compe.index"
                :rules="hunderdRule">
                <el-input v-model="compe.index_score" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-form-item
                v-for="(compe, index) in competition.competition_index"
                :key="compe.index"
                style="margin-left: 12px;">
                <span class="imgdele fr" @click="deleteScore(compe)">删除</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="marginAuto">
          <div class="addhover">
            <i  class="addmemberimg"><img src="../../assets/images/tianjia.png"></i>
            <el-button type="text" @click="addScore" class="addMember fl">添加更多</el-button>
          </div>
        </div>
        <div slot="footer" class="dialog-footer fr" style="padding: 32px 0;">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="save">保 存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
    import { error, success, warning } from '@/utils/notification';
    import * as validata from '@/utils/validata';
    export default {
      props: {
        scoreDisplay: {
          type: Boolean,
          default: false
        },
        schid: {
          type: [Number, String],
          default: 0
        }
      },
      data () {
        var checkHundred = (rule, value, callback) => {
          if (!validata.getNull(value)) {
            setTimeout(() => {
              if (validata.checkNumber(value)) {
                if (value > 100) {
                  callback(new Error('请输入小于100的值'));
                } else {
                  callback();
                }
              } else {
                callback(new Error('请输入数字'));
              }
            }, 100);
          } else {
            callback(new Error('不能为空'));
          }
        };// 可以为空,必须为数字,比例数值1-100判断
        return {
          showList: false,
          loading: false,
          competition: {
            competition_id: '',
            schedule_id: '',
            competition_name: '',
            competition_index: [
              /* {
                index_id: 1,
                user_id: 181424,
                competition_id: 2,
                index_name: '团队协作',
                index_desc: '团队',
                index_score: 20,
                schedule_id: 2
              } */
            ]
          },
          competitionMust: false,
          hunderdRule: {validator: checkHundred, trigger: 'blur'}, // 可以为空,必须为数字,比例数值1-100
          schedule_id: '',
          schedule: []
        };
      },
      methods: {
        getWxProjectCategory () {
          return new Promise((resolve, reject) => {
            // 做一些异步操作
            this.schedule = this.$global.data.schedule;// 设置项目跟进状态
            resolve(2);
          });
        },
        // 关闭
        handleClose (e) {
          this.$emit('closeScore', false);
        },
        // 获取大赛评分指标
        getCompetitionIndex (scheduleId = 0) {
          this.loading = true;
          this.$http.post(this.URL.getCompetitionIndex, {
            user_id: localStorage.user_id,
            schedule_id: scheduleId
          })
            .then(res => {
              let data = res.data.data;
              if (res.data.status_code === 2000000) {
                if (data.schedule_id === 0) {
                  data.schedule_id = this.schedule[0].value;
                }
                if (this.schid) {
                  this.schedule_id = this.schid;
                } else {
                  this.schedule_id = data.schedule_id;
                }
                this.competition = data;
                if (data.competition_index.length === 0) {
                  this.addScore();
                }
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
        // change时
        getCompetitionIndex2 (scheduleId) {
          this.loading = true;
          this.$http.post(this.URL.getCompetitionIndex, {
            user_id: localStorage.user_id,
            schedule_id: scheduleId
          })
            .then(res => {
              let data = res.data.data;
              if (res.data.status_code === 2000000) {
                this.competition = data;
                if (data.competition_index.length === 0) {
                  this.addScore();
                }
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
        // 添加指标
        addScore () {
          if (this.competition.competition_index.length > 4) {
            warning('最多添加5项');
          } else {
            this.competition.competition_index.push({
              index_name: '',
              index_desc: '',
              index_score: '',
              index_id: 0
            });
          }
        },
        // 删除指标
        deleteScore (item) {
          if (item.index_id === 0) {
            let index = this.competition.competition_index.indexOf(item);
            if (index !== -1) {
              this.competition.competition_index.splice(index, 1);
            }
          } else {
            this.loading = true;
            this.$http.post(this.URL.deleteCompetitionIndex, {
              user_id: localStorage.user_id,
              index_id: item.index_id,
              schedule_id: item.schedule_id
            })
              .then(res => {
                this.loading = false;
                success('删除成功');
                let index = this.competition.competition_index.indexOf(item);
                if (index !== -1) {
                  this.competition.competition_index.splice(index, 1);
                }
              })
              .catch(err => {
                this.loading = false;
                error('删除失败');
                console.log(err);
              });
          }
        },
        //* 检查所有必填项目以及获取所有数据/true过.false不过
        submitForm (formName, checkName) {
          this.$refs[formName].validate((valid) => {
            this[checkName] = !valid;
          });
        },
        // 保存
        save () {
          var submit = () => {
            return new Promise((resolve, reject) => {
              // 做一些异步操作
              this.submitForm('competition', 'competitionMust');
              resolve(true);
            });
          };
          var check = () => {
            return new Promise((resolve, reject) => {
              // 做一些异步操作
              setTimeout(() => {
                if (this.competitionMust) {
                  error('填写有误');
                } else {
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
                this.loading = true;
                this.competition.user_id = localStorage.user_id;
                this.competition.schedule_id = this.schedule_id;
                this.$http.post(this.URL.createCompetitionIndex, this.competition)
                  .then(res => {
                    if (res.data.status_code === 2000000) {
                      success('编辑成功');
                      this.$emit('closeScore', false);
                      this.$emit('chengeSchedule', this.schedule_id);
                    } else {
                      error(res.data.error_msg);
                    }
                    this.loading = false;
                  })
                  .catch(err => {
                    error('请求失败');
                    console.log(err);
                    this.loading = false;
                  });
              }
            });
        }
      },
      // 当dom一创建时
      created () {},
      watch: {
        scoreDisplay: function (e) {
          if (e) {
            this.$global.func.getWxProjectCategory()
              .then((data) => {
                return this.getWxProjectCategory();
              })
              .then((data) => {
                return this.getCompetitionIndex(this.schid);
              });
          } else {
            this.$refs['competition'].resetFields();
          }
        }// 清空数据
      }
    };
</script>

<style lang="less">
#scoreIndex{
  .el-dialog .el-dialog__header{
    padding-left: 64px;
  }
  .el-dialog{
    width: 880px;
  }
  .el-dialog__body{
    padding: 30px 64px;
  }
  .imgdele{
    cursor: pointer;
    width: 30px;
    height: 36px;
    display: inline-block;
    font-size:12px;
    color:#f44c4c;
  }
  .marginAuto{
    display: block;
    margin: 0 auto;
    width: 140px;
    height: 32px;
    margin-bottom: 20px;
    .addhover{
      display: inline-block;
      position:relative;
    }
    .addhover:hover .addmemberimg{
      transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
    }
    .addMember {
      transition: all .5s;
      font-size:16px;
      color:#009eff;
    }
    /*.addmemberimg:hover i{*/
    /*transform: rotate(360deg);*/
    /*-webkit-transform: rotate(360deg);*/
    /*-moz-transform: rotate(360deg);*/
    /*-o-transform: rotate(360deg);*/
    /*-ms-transform: rotate(360deg);*/
    /*}*/
    .addMember2{
      margin-left: 22px;
    }
    .addmemberimg{
      transform:  rotate(0) ;
      display: inline-block;
      float: left;
      margin-top: 11px;
      width: 17px;
      height: 17px;
      margin-right: 7px;
      transition: all .5s;
      img{
        width:100%;
      }
    }
    .addmemberimg :hover{
      transform: rotate(360deg);
    }
  }
}
</style>
