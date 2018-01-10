<template>
  <!--顶部轮播-->
  <div class="carousel clearfix" id="carousel" >
    <div class="goTo tc toleft" @click="goLeft">
      <img src="../../assets/images/zuobian.png">
    </div>
    <div class="top-big-progress-out">
      <div class="top-big-progress" ref="progress">
        <div v-for="(node, index) in nodelist" :key="index">
          <div class="pp-item pp-node" :class="{'pp-cur': getActive === node.schedule_id}" @click="setNode(node.schedule_id)">
            <p class="pp-num pp-txt">{{node.node_count}}</p>
            <span class="pp-sec-title">{{node.schedule_name}}</span>
          </div>
          <div class="pp-item pp-lines" v-if="index+1 !== nodelist.length">
            <span class="lp-line"> </span>
          </div>
        </div>
      </div>
    </div>
    <div class="goTo tc toright" @click="goRight">
      <img src="../../assets/images/youbian.png">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      props: {
        nodelist: {
          type: Array,
          default: []
        }
      },
      data () {
        return {};
      },
      computed: {
        getActive () {
          return this.$store.state.pageANDSelect.node;
        }
      },
      mounted () {},
      // 组件
      components: {},
      methods: {
        setNode (id) {
          this.$store.state.pageANDSelect.node = id;
          this.$emit('setNode', id);
        },
        goRight () {
          if (this.nodelist.length > 5) {
            this.$refs.progress.style.left = -1000 + 'px';
          }
        },
        goLeft (e) {
          if (this.nodelist.length > 5) {
            this.$refs.progress.style.left = 0 + 'px';
          }
        }
      }
    };
</script>

<style lang="less" scoped>
  #carousel{
    position: relative;
    .top-big-progress-out{
      margin-left: 107px;
      width: 894px;
      overflow: hidden;
      height: 88px;
      .top-big-progress{
        position: relative;
        left: 0px;
        top: 0px;
        width: 1720px;
        transition:all 0.4s ease-in-out;
        height: 88px;
        .pp-item{
          float: left;
        }
        .pp-num{
          font-size: 26px;
          color: #1f2d3d;
        }
        .pp-node{
          width: 90px;
          margin:10px 0;
          border-radius:4px;
          height:68px;
          text-align: center;
          color:#000;
          cursor: pointer;
          .pp-txt{
            width:100%;
            padding-top:10px;
            line-height: 26px;
          }
          .pp-sec-title{
            display: inline-block;
            font-size: 14px;
            line-height: 14px;
            margin-top: 5px;
            color:#475669;
          }
        }
        .pp-start{
          margin: 10px 0 10px 24px;
        }
        .pp-cur{
          background:#e5e9f2!important;
          .pp-num,.pp-sec-title{
            //color:#fff ;
          }
        }
        .pp-lines{
          margin-left: 7px;
          margin-right: 7px;
          position: relative;
          .lp-line{
            width:96px;
            height: 1px;
            display: inline-block;
            background: #e0e6ed;
            margin-top:43.5px;
          }
          .circle{
            position: absolute;
            width:8px;
            height: 8px;
            z-index: 2;
            top:40.5px;
            left:0;
            border-radius: 10px;
            border:1px solid #c0ccda;
            background: #fff;
            cursor: pointer;
          }
          .circle-0{
            left:48%;
          }
          .circle-1{
            left:19.9%;
          }
          .circle-2{
            left:39.9%;
          }
          .circle-3{
            left:59.9%;
          }
          .circle-4{
            left:79.9%;
          }
          .circle-5{
            left:68.9%;
          }
        }
      }
    }
    .goTo{
      width: 17px;
      height: 88px;
      font-size: 40px;
      line-height: 88px;
      position: absolute;
      cursor:pointer;
      top: 0px;
      z-index: 100;
      img{
        width: 100%;
        margin-top: 10px;
      }
    }
    .toleft{
      left: 0px;
      margin-left: 75px;

    }
    .toright{
      left: 1010px;
    }
    .progressFor {}
  }
</style>
