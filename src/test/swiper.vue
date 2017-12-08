<template>
  <el-carousel indicator-position="outside" >
    <el-carousel-item v-for="banner in banners" :key="banner" >
      <img :src="banner" alt="" style="width: 100%;z-index: 111111">
    </el-carousel-item>
  </el-carousel>
</template>
<script type="text/ecmascript-6">
  import one from '../../static/images/284.jpg';
  import two from '../../static/images/285.jpg';
  import three from '../../static/images/286.jpg';
  import four from '../../static/images/287.jpg';
  export default {
    data () {
      return {
        one: one,
        two: two,
        three: three,
        four: four,
        banners: [ one, two, three, four ],
        url: ['http://baidu.com', 'http://element.eleme.io/#/zh-CN/component/upload', 'http://element.eleme.io/#/zh-CN/component/alert', 'http://element.eleme.io/#/zh-CN/component/installation']
      };
    },
    method: {
      getCode () {
        for (let i = 0; i < this.url.length; i++) {
          window.location.href = this.url[i];
        }
      }
    }
  };
</script>
<style>
  .el-carousel__container{
    height:500px!important;
  }
  .el-carousel__item h3 {
    text-align: center;
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background:#ffffff;
  }

  .el-carousel__item:nth-child(2n+1) {
    background: #ffffff;
  }

</style>
