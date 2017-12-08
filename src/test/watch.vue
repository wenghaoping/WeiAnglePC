<template>
  <div id="create">
    <input type="text" v-model="test" @change="change"/>
    {{test}}

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        test: ''
      };
    },
    methods: {
      change (e) {
        var va = e.target.value;
        console.log(va);
        console.log(this.test);
      }
    },
    watch: {
      test: function (e) {
        console.log(e);
      }
    },
    computed: {

    }
  };
</script>

<style scoped lang="less">

</style>
