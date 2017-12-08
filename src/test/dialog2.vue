<template>
  <div id="dialog">
    <el-select
      v-model="value10"
      multiple
      filterable
      allow-create
      popper-class="block"
      default-first-option
      remote
      @change="change"
      :remote-method="remoteMethod"
      placeholder="请选择文章标签">
      <el-option
        v-for="item in options5"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        options5: [{
          value: 'HTML',
          label: 'HTML'
        }, {
          value: 'CSS',
          label: 'CSS'
        }, {
          value: 'JavaScript',
          label: 'JavaScript'
        }],
        value10: [],
        block: 'display: none;'
      };
    },
    methods: {
      change (e) {
        console.log(e);
      },
      remoteMethod (query) {
        console.log(query);
      }
    }
  };
</script>

<style lang="less">
.block{
  display: none;
}
</style>
