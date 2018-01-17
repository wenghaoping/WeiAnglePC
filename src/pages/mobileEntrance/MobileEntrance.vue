<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default{
    name: 'APP'
  };
</script>

<style lang="less">
  @import '../../assets/css/base.css'; // 全局自定义的css样式
  #app{
    font-family: "Microsoft YaHei", "微软雅黑";
  }
</style>
