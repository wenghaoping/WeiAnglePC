<template>
  <!--BP选择组件-->
  <div class="choiceBp">
    <div class="box inlineBlock relative" v-for="(bp, index) in bpData" :key="index">
      <div class="img">
        <img v-lazy="bp.bp_cover_src">
      </div>
      <div class="img model absolute position_auto tc cursor">
        <button class="cursor" @click="bpPreview(bp)">预览</button>
      </div>
      <div class="btn fr">
        <el-button type="primary" size="mini">{{bp.industry | nullToZ}}</el-button>
      </div>
    </div>
    <div v-if="totalData > 6">
      <el-pagination
        small
        class="fr"
        layout="prev, pager, next"
        @current-change="changeCurrent"
        :current-page="bpPage"
        :page-size="pageSize"
        :total="totalData">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import { mapState } from 'vuex';
    export default {
      props: {
        bpData: {
          type: Array,
          required: true,
          default: []
        },
        totalData: {
          type: [Number, String],
          default: 0
        },
        pageSize: {
          type: [Number, String],
          required: true,
          default: 1
        }
      },
      data () {
        return {
          loading: false,
          currentPage: 1
        };
      },
      computed: {
        ...mapState({
          bpPage: state => state.superBp.bpPage
        })
      },
      methods: {
        // 点击预览
        bpPreview (e) {
          localStorage.entrance = 'superBP'; // superBP
          if (localStorage.user_id) {
            this.$store.dispatch('setBpId', e.bp_id);
            this.$store.dispatch('bpPreviewControl', true);
            this.$store.dispatch('choiceBpControl', false);
            this.$store.dispatch('setIndestry', e.industry);
          } else {
            this.$router.push({name: 'telephoneLogin'});
          }
        },
        // 页码改变
        changeCurrent (e) {
          this.$emit('changeCurrent', e);
        }
      }
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
