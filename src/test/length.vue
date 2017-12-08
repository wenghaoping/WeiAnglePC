<template>
  <div class="one"  v-for="(item,index) in myAllCont" >
    <div class="two">

    </div>
  </div>

</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {

        myAllCont: [{
          value: -1,
          label: '全部'
        }, {
          value: 0,
          label: '全站人脉'
        }, {
          value: 1,
          label: '我的人脉'
        }
        ]
      };
    },
    method: {

    }
  };
</script>
<style>
  .two{
    width:300px;
    height:100px;
    background: #009eff;
  }


</style>
