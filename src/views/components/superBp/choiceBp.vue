<template>
  <!--BP选择组件-->
  <div class="choiceBp" v-loading.body="loading" element-loading-text="拼命加载中">
    <div class="box inlineBlock relative">
      <div class="img">
        <img src="../../../assets/images/demo_test.png">
      </div>
      <div class="img model absolute position_auto tc cursor">
        <button class="cursor" @click="bpPreview">预览</button>
      </div>
      <div class="btn fr">
        <el-button type="primary" size="mini">果蔬</el-button>
      </div>
    </div>
    <div v-if="totalData.length > 9">
      <el-pagination
        small
        class="fr"
        layout="prev, pager, next"
        @current-change="changeCurrent"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="totalData">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      props: {
/*        choiceBpDate: {
          type: Array,
          required: true,
          default: []
        }, */
        totalData: {
          type: [Number, String],
          required: true,
          default: 0
        },
        currentPage: {
          type: [Number, String],
          required: true,
          default: 1
        },
        pageSize: {
          type: [Number, String],
          required: true,
          default: 1
        }
      },
      data () {
        return {
          loading: false
        };
      },
      computed: {},
      mounted () {},
      // 组件
      components: {},
      methods: {
        bpPreview (e) {
          this.$emit('bpPreviewOn', e);
        },
        // 页码改变
        changeCurrent (e) {
          this.$emit('changeCurrent', e);
        }
      },
      // 当dom一创建时
      created () {},
      watch: {}
    };
</script>

<style lang="less" scoped>
  .choiceBp{
    width: 1016px;
    .box{
      &:nth-child(3n) {
        margin-right: 0;
      }
      background:#ffffff;
      box-shadow:0 0 8px 0 rgba(64,88,122,0.20);
      width:324px;
      height:232px;
      margin: 0 17px 24px 0;
      .img{
        width: 299px;
        height: 170px;
        margin: 12px;
        img{
          width: 100%;
          height: 100%;
        }
        transition:all 0.5s;
        & + .model:hover {
          opacity: 1;
        }
      }
      .btn{
        margin-right: 12px;
      }
      .model{
        opacity: 0;
        line-height: 170px;
        transition:all 0.5s;
        background: rgba(0,0,0,0.3);
        button{
          border:1px solid #ffffff;
          border-radius:2px;
          width:78px;
          height:30px;
          font-size:16px;
          color:#ffffff;
        }
      }
    }
  }
</style>
