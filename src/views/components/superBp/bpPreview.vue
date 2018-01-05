<template>
  <!--BP预览组件-->
  <div class="bpPreview" >
    <el-dialog :visible="bpPreviewDisplay" :before-close="handClose" close-on-press-escape close-on-click-modal lock-scroll
               :close-on-click-modal="showList" :close-on-press-escape="showList" size="large">
      <div class="preview_inner relative" v-loading.body="loading" element-loading-text="拼命加载中">
        <el-carousel arrow="always" :autoplay="false" @change="carouselChange" ref="carousel"
                     indicator-position="none" class="ca1_height">
          <el-carousel-item v-for="(item, index) in items" :key="index">
            <div class="bigImg">
              <img v-lazy="item.image_src">
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="btn absolute">
          <div class="btn_inner absolute">
            <button class="opa_btn tc cursor" style="margin-right: 10px;" @click="prev">取消</button>
            <el-button type="primary" @click="next()">下载</el-button>
          </div>
        </div>
        <div style="height: 20px;"></div>
        <el-carousel type="card" :autoplay="false" @change="carouselChange"
                     ref="carousel2" class="ca2_height">
          <el-carousel-item v-for="(item, index) in items" :key="index">
            <div class="smallImg">
              <img v-lazy="item.image_src">
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import { error, warning } from '@/utils/notification';
  export default {
    props: {},
    data () {
      return {
        loading: false,
        showList: false,
        items: [
          /* {image_src: '', bp_id: 0, image_id: 0} */
        ]
      };
    },
    computed: {
      ...mapState({
        bpPreviewDisplay: state => state.superBp.bpPreviewDisplay,
        bpId: state => state.superBp.bpId,
        type: state => state.superBp.type
      }),
      bannerSrc () {
        return this.items[0].image_src;
      }
    },
    methods: {
      handClose () {
        this.$store.dispatch('AllControl', false);
      },
      // 上一步
      prev () {
        if (this.type) { // 正常途径进入
          this.$store.dispatch('bpPreviewControl', false);
          this.$store.dispatch('choiceBpControl', true);
        } else { // 首页预览
          this.$store.dispatch('AllControl', false);
        }
      },
      // 下一步
      next () {
        this.$store.dispatch('payBpControl', true);
        this.$store.dispatch('bpPreviewControl', false);
        this.$store.dispatch('setBpBannerUrl', this.bannerSrc);
      },
      // 切换状态
      carouselChange (e) {
        this.$refs.carousel.setActiveItem(e);
        this.$refs.carousel2.setActiveItem(e);
      },
      getBpPpt () {
        localStorage.entrance = 'superBP'; // superBP
        if (localStorage.user_id) {
          this.loading = true;
          this.$http.post(this.URL.getBpPpt, {user_id: localStorage.user_id, bp_id: this.bpId})
            .then(res => {
              this.loading = false;
              if (res.data.status_code === 2000000) {
                let data = res.data.data;
                if (data.length === 0) {
                  warning('对不起，当前项目暂不支持预览');
                  this.$store.dispatch('bpPreviewControl', false);
                  setTimeout(() => { this.$store.dispatch('industryControl', true); }, 1000);
                } else {
                  this.items = data;
                }
              } else {
                error(res.data.error_msg);
              }
            })
            .catch(err => {
              this.loading = false;
              console.log(err);
            });
        } else {
          this.$router.push({name: 'telephoneLogin'});
        }
      }
    },
    // 当dom一创建时
    created () {},
    watch: {
      bpPreviewDisplay: function (e) {
        if (e) {
          this.getBpPpt();
        }
      }
    }
  };
</script>

<style lang="less">
.bpPreview{
  .el-dialog{
    width:1002px;
    top: -15px!important;
  }
  .ca1_height{
    .el-carousel__container{
      height: 540px;
    }
  }
  .ca2_height{
    .el-carousel__container{
      height: 270px;
    }
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
    width: 481px;
    height: 270px;
    img{
      width: 100%;
      height: 100%;
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
  @media screen and(max-width: 1400px){
    .el-dialog{
      width:806px;
      top: -15px!important;
    }
    .ca1_height{
      .el-carousel__container{
        height: 432px;
      }
    }
    .ca2_height{
      .el-carousel__container{
        height: 225px;
      }
    }
    .bigImg{
      width: 768px;
      height: 432px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .smallImg{
      width: 382px;
      height: 216px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .btn{
      right: 0px;
      top: 357px;
      z-index: 123;
      width: 766px;
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
}
</style>
