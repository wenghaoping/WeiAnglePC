<template>
  <div id="topNav">
    <ul class="selectTop ulfl tc">
      <li @click="toggle(index)" v-for="(tab,index) in tabs">
        <router-link :to=" tab.jump " :class="{border:active===index}">
          {{tab.type}}
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        active: 0,
        tabs: [
          {type: '我的项目', jump: {name: 'myProject', query: {activeTo: 0}}},
          {type: '我的人脉', jump: {name: 'myContacts', query: {activeTo: 1}}},
          {type: '跟进记录', jump: {name: 'followUp', query: {activeTo: 2}}}
        ]
      };
    },
    methods: {
      toggle (i) {
        this.active = i;
      }
    },
    watch: {
      '$route' (to, from) {
        this.active = to.query.activeTo;
      }
    },
    created () {
      this.active = parseInt(this.$route.query.activeTo) || 0;
    }
  };
</script>

<style lang="less">
#topNav{
  .selectTop{
    height: 42px;
    cursor: pointer;
    background-color: #eff2f7;
    width: 1336px;
    border-bottom:1px solid #d3dce6;
    width:1336px;
    li{
      /*width: 100px;height: 50px;line-height: 50px;margin-right: 0px;*/
      transition: all .3s cubic-bezier(.645,.045,.355,1);
      font-size:14px;
      a{
        /*height: 40px;color:#8492a6;display: block;font-size: 15px;*/
        padding: 0 16px;
        height: 42px;
        line-height: 42px;
        display: inline-block;
        color:#8492a6;
      }
    }

    .border{
/*      border-bottom: 2px #20a0ff solid;
      color: #20a0ff;*/
      border: 1px solid rgb(209, 219, 229);
      border-bottom-color: rgb(255, 255, 255);
      border-radius: 4px 4px 0 0;
      background: #ffffff;
      color:#20a0ff;
    }
  }
}

</style>
