<template>
  <!--BP预览组件-->
  <div class="bpPreview" v-loading.body="loading" element-loading-text="拼命加载中">
    <el-dialog :visible="bpPreviewDisplay" :before-close="handleClose" close-on-press-escape close-on-click-modal lock-scroll
               :close-on-click-modal="showList" :close-on-press-escape="showList" :show-close="showList" size="large">
      <div class="preview_inner relative">
        <el-carousel arrow="always" :autoplay="false" @change="carouselChange" ref="carousel" indicator-position="none">
          <el-carousel-item v-for="(item, index) in items" :key="index" :name="item.name">
            <div class="bigImg">
              <img :src="item.src">
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="btn absolute">
          <div class="btn_inner absolute">
            <button class="opa_btn tc cursor" style="margin-right: 10px;" @click="prev">取消</button>
            <el-button type="primary" @click="next">下载</el-button>
          </div>
        </div>
        <div style="height: 20px;"></div>
        <el-carousel type="card" height="200px" :autoplay="false" @change="carouselChange" ref="carousel2">
          <el-carousel-item v-for="(item, index) in items" :key="index" :name="item.name">
            <div class="smallImg">
              <img :src="item.src">
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import supueBPindex from '../../../assets/images/supueBPindex.jpg';
  import supueBPindex2 from '../../../assets/images/supueBPindex2.png';
  import supueBPindex3 from '../../../assets/images/supueBPindex3.png';
  export default {
    props: {
      bpPreviewDisplay: {
        type: Boolean,
        default: false,
        required: true
      }
    },
    data () {
      return {
        loading: false,
//        bpPreviewDisplay: false,
        showList: false,
        items: [
          {src: supueBPindex, name: '我是1'},
          {src: supueBPindex2, name: '我是2'},
          {src: supueBPindex2, name: '我是2'},
          {src: supueBPindex2, name: '我是2'},
          {src: supueBPindex3, name: '我是3'}
        ]
      };
    },
    computed: {},
    mounted () {},
    // 组件
    components: {},
    methods: {
      // 关闭
      handleClose (e) {
        this.$emit('closeBpPreview', false);
      },
      // 上一步
      prev () {
        this.$emit('bpPreviewPrev', false);
      },
      // 下一步
      next () {
        this.$emit('bpPreviewNext', true);
      },
      // 切换状态
      carouselChange (e) {
        this.$refs.carousel.setActiveItem(e);
        this.$refs.carousel2.setActiveItem(e);
      }
    },
    // 当dom一创建时
    created () {},
    watch: {}
  };
</script>

<style lang="less">
.bpPreview{
  .el-dialog{
    width:1002px;
  }
  .el-carousel__container{
    height: 540px;
  }
  .bigImg{
    width: 960px;
    height: 540px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .smallImg{
    width: 559px;
    height: 176px;
    img{
      width: 100%;
    }
  }
  .btn{
    right: 2px;
    top: 463px;
    z-index: 123;
    width: 960px;
    height: 75px;
    background: rgba(0,0,0,0.3);
    .btn_inner{
      right: 40px;
      bottom: 17px;
    }
    .opa_btn{
      width: 60px;
      height: 36px;
      line-height: 36px;
      color: #ffffff;
      border: 1px solid #ffffff;
      border-radius: 4px;
      &:hover{
        background: rgba(255,255,255,0.3);
      }
    }
  }
}
</style>
