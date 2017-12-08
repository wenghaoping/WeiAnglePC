<template>
  <div id="selectbox">
    <div class="block">
      <span class="demonstration">默认</span>
      <el-date-picker
        v-model="value1"
        type="date"
        format="yyyy/WW 周"
        placeholder="选择日期">
      </el-date-picker>
    </div>


<buttom @click="change">点击</buttom>
  </div>
</template>

<script type="text/ecmascript-6">
  import visible from './dialog2.vue';
  export default {
    data () {
      return {
        value1: ''
      };
    },
    methods: {
// 1498060800
//      var timestamp3 = 1403058804;
//  var newDate = new Date();
//  newDate.setTime(timestamp3 * 1000);
      change (e) {
        console.log(new Date(1403058804));
      }
    }
  };
</script>

<style scoped lang="less">

</style>
