<template>
  <!--项目列表自定义-->
  <div id="stageCustom">
    <el-dialog :visible="listsDisplay" custom-class="dialogFollow" :before-close="handleClose" close-on-press-escape close-on-click-modal lock-scroll
               :close-on-click-modal="showList" :close-on-press-escape="showList" size="tiny" title="项目列表自定义" :show-close="showList">
      <p class="inner">通过【勾选】设置项目列表，最多选择10项，最少2个项</p>
      <div class="dragUl" v-loading.body="loading"
           element-loading-text="拼命加载中">
        <el-checkbox-group v-model="checkList" :min="2" :max="10">
          <div class="check">
            <el-checkbox :label="customData.value" v-for="(customData, index) in customDatas"
                         :key="index" class="txt dragll" style="display: block;margin-left: 0px;">
              {{customData.label}}
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { error, success } from '@/utils/notification';
  export default {
    props: {
      listsDisplay: {
        type: Boolean,
        default: false,
        required: true
      }
    },
    data () {
      return {
        loading: false,
        showList: false,
        customDatas: [
          {value: 'pro_name', label: '项目名称'},
          {value: 'pro_intro', label: '一句话介绍'},
          {value: 'pro_source', label: '项目来源'},
          {value: 'pro_schedule', label: '项目进度'},
          {value: 'pro_industry', label: '领域'},
          {value: 'is_exclusive', label: '是否独家'},
          {value: 'pro_stage', label: '轮次'},
          {value: 'pro_area', label: '地区'},
          {value: 'total_score', label: '总分'},
          {value: 'average_score', label: '投资指数'},
          {value: 'pro_scale', label: '期望融资'},
          {value: 'created_at', label: '创建时间'}
        ],
        checkList: [],
        checkListAll: ['pro_name', 'pro_intro', 'pro_source', 'pro_schedule', 'pro_industry', 'is_exclusive', 'pro_stage', 'pro_area', 'pro_scale', 'created_at']
      };
    },
    methods: {
      // 关闭
      handleClose (e) {
        this.$emit('closeLists', false);
      },
      // 应用
      save () {
        this.$http.post(this.URL.editCheckedColumn, {user_id: localStorage.user_id, checked_column: this.checkList})
          .then(res => {
            if (res.data.status_code === 2000000) {
              success('保存成功');
              this.$emit('closeLists', false);
            } else {
              error('保存失败');
            }
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
          });
      },
      // 获取所有节点
      getCheckedColumn () {
        this.loading = true;
        this.$http.post(this.URL.getCheckedColumn, {user_id: localStorage.user_id})
          .then(res => {
            let data = res.data.data;
            this.checkList = data === '' ? this.checkListAll : data;
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
          });
      }
    },
    // 当dom一创建时
    created () {
      this.getCheckedColumn();
    },
    watch: {
      listsDisplay: function (e) {
        if (e) {
          this.getCheckedColumn();
        } else {
          this.checkList = [];
        }
      } // 清空数据
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
