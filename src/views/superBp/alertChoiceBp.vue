<template>
  <!--BP选择弹框-->
  <div class="choiceBp popbox">
    <el-dialog :visible="choiceBpDisplay" :before-close="handleClose" close-on-press-escape close-on-click-modal lock-scroll
               :close-on-click-modal="showList" :close-on-press-escape="showList" :show-close="showList" size="large">
      <div slot="title" class="title">
        <span class="rander tc fl">2</span><span class="fl">选择模板</span>
      </div>
      <choice-bp @bpPreviewOn="next" :totalData="5" :currentPage="1" :pageSize="9"></choice-bp>
      <div slot="footer" class="dialog-footer">
        <el-button @click="prev" size="large">上一步</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import choiceBp from '@/views/components/superBp/choiceBp.vue';
  export default {
    props: {
      choiceBpDisplay: {
        type: Boolean,
        default: false,
        required: true
      }
    },
    data () {
      return {
        loading: false,
        showList: false
      };
    },
    computed: {},
    mounted () {},
    // 组件
    components: {
      choiceBp
    },
    methods: {
      // 关闭
      handleClose (e) {
        this.$emit('closeChoiceBp', false);
      },
      // 上一步
      prev () {
        this.$emit('choiceBpPrev', false);
      },
      // 开启预览
      next () {
        this.$emit('choiceBpNext', true);
      }
    },
    // 当dom一创建时
    created () {},
    watch: {}
  };
</script>

<style lang="less">
  @import '../../assets/css/superBp.less';
</style>
