<template>
  <!--项目阶段自定义-->
  <div id="stageCustom">
    <el-dialog :visible="stageDisplay" custom-class="dialogFollow" :before-close="handleClose" close-on-press-escape close-on-click-modal lock-scroll
               :close-on-click-modal="showList" :close-on-press-escape="showList" size="tiny" title="项目阶段自定义" :show-close="showList">
      <p class="inner">通过【勾选】【移动】【新增】设置项目阶段</p>
      <div class="dragUl">
        <el-form :model="customData" ref="customData">
          <draggable v-model="customData.customDatas" :move="getdata" @update="datadragEnd">
            <transition-group>
              <div v-for="(custom, index) in customData.customDatas" :key="index" class="dragll">
                <div class="check fl">
                  <el-checkbox v-model="custom.is_select_check" :disabled="custom.is_select_boolean" @change="checkLength"></el-checkbox>
                </div>
                <div class="txt fl cursor" v-if="custom.user_id === 0">{{custom.schedule_name}}</div>
                <div class="shuru fl input" v-if="custom.user_id !== 0">
                  <el-form-item
                      prop="schedule_name"
                      :prop="'customDatas.' + index + '.schedule_name'"
                      :rules="[{required: true, message: '不能为空', trigger: 'blur'},{max:20,message: '最大20个字符'}]">
                    <el-input size="mini" v-model="custom.schedule_name" placeholder="请输入内容" @focus="focus($event)"></el-input>
                  </el-form-item>
                </div>
                <div class="del fl cursor" v-if="custom.user_id !== 0" @click="deleteStage(custom)">删除</div>
                <div class="yidong fr cursor"><img src="../../../assets/images/yidong.png"></div>
              </div>
            </transition-group>
          </draggable>
        </el-form>
      </div>
      <div class="addhover">
        <i class="addmemberimg fl"><img src="../../../assets/images/tianjia.png"></i>
        <el-button type="text" @click="addStage" class="addMember fl">新 增</el-button>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import draggable from 'vuedraggable';
  import { error, success } from '@/utils/notification';
  export default {
    props: {
      stageDisplay: {
        type: Boolean,
        default: false,
        required: true
      }
    },
    data () {
      return {
        showList: false,
        customData: {
          customDatas: [
            {
              'schedule_id': 10,
              'schedule_name': '初赛',
              'user_id': 'OrwRjRjp',
              'is_select': 0
            }
          ]
        }
      };
    },
    // 组件
    components: {
      draggable
    },
    methods: {
      // 关闭
      handleClose (e) {
        this.$emit('closeStage', false);
      },
      // 应用
      save () {
        this.$refs['customData'].validate((valid) => {
          if (valid) {
            let scheData = this.customData.customDatas.slice(0);
            scheData.forEach(x => {
              if (x.is_select_check === true) {
                x.is_select = 1;
              } else if (x.is_select_check === false) {
                x.is_select = 0;
              }
              delete x.is_select_check;
              delete x.is_select_boolean;
            });
            this.$http.post(this.URL.setScheduleOrder, {user_id: localStorage.user_id, schedule: scheData})
              .then(res => {
                if (res.data.status_code === 2000000) {
                  success('保存成功');
                  this.$emit('closeStage', false);
                } else {
                  error('保存失败');
                }
              })
              .catch(err => {
                this.loading = false;
                console.log(err);
              });
          } else {
            error('输入有误');
            return false;
          }
        });
      },
      // 获取所有节点
      getAllNode () {
        this.$http.post(this.URL.getAllNode, {user_id: localStorage.user_id})
          .then(res => {
            let data = res.data.data;
            data.forEach(x => {
              if (x.is_select === 1) {
                x.is_select_check = true;
              } else if (x.is_select === 0) {
                x.is_select_check = false;
              }
              x.is_select_boolean = false;
            });
            this.customData.customDatas = data;
            this.checkLength();
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
          });
      },
      // 添加节点
      addStage () {
        this.customData.customDatas.push({
          schedule_id: 0,
          schedule_name: '',
          user_id: localStorage.user_id,
          is_select: 0,
          is_select_check: false,
          is_select_boolean: false
        });
        this.checkLength();
      },
      // 删除节点
      deleteStage (item) {
        if (item.schedule_id === 0) {
          let index = this.customData.customDatas.indexOf(item);
          if (index !== -1) {
            this.customData.customDatas.splice(index, 1);
          }
        } else {
          this.$http.post(this.URL.deleteSchedule, {
            user_id: localStorage.user_id,
            schedule_id: item.schedule_id
          })
            .then(res => {
              if (res.data.status_code === 2000000) {
                success('删除成功');
                let index = this.customData.customDatas.indexOf(item);
                if (index !== -1) {
                  this.customData.customDatas.splice(index, 1);
                }
              }
            })
            .catch(err => {
              error('删除失败');
              console.log(err);
            });
        }
      },
      // 计算函数,计算要不要给勾
      checkLength () {
        let checkData = this.customData.customDatas;
        let length = 0;
        checkData.forEach(x => {
          if (x.is_select_check === true) {
            length++;
          }
        });
        checkData.forEach(x => {
          if (length > 9) {
            if (x.is_select_check === false) {
              x.is_select_boolean = true;
            } else if (x.is_select_check === true) {
              x.is_select_boolean = false;
            };
          } else {
            x.is_select_boolean = false;
          }
        });
      },
      // 勾选的时候触发
      checkChange (e) {
        this.checkLength();
      },
      // 冒泡
      focus (ev) {
        let oEv = ev || window.event;
        oEv.cancelBubble = true;
      },
      getdata (evt) {},
      datadragEnd (evt) {}
    },
    // 当dom一创建时
    created () {
      this.getAllNode();
    },
    watch: {
      stageDisplay: function (e) {
        if (e) {
          this.getAllNode();
        }
      }// 清空数据
    }
  };
</script>

<style lang="less">
  #stageCustom{
    .inner{
      font-size:12px;
      color:#99a9bf;
    }
    .el-dialog__body{
      padding-top: 8px;
    }
    .el-dialog .el-dialog__header{
      padding-left: 20px;
    }
    .el-dialog{
      width: 390px;
    }
    .yidong{
      width: 20px;
      height: 20px;
      display: inline-block;
      img{
        width: 100%;
      }
    }
    .dragUl{
      margin-top: 15px;
      .dragll{
        height: 45px;
        width: 350px;
        line-height: 20px;
        .check ,.txt ,.yidong{
          margin: 11px 0
        }
        .txt{
          margin-left: 15px;
          font-size:14px;
          color:#1f2d3d;
        }
        .input{
          margin-top: 3px;
        }
        .del{
          font-size:12px;
          color:#f44c4c;
          margin-left: 12px;
          line-height: 45px;
        }
        .shuru{
          margin-left: 15px;
        }
      }
    }
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
    .el-form-item{
      margin-bottom: 0px;
    }
    .el-form-item__error{
      padding-top: 0px;
    }

  }
</style>
