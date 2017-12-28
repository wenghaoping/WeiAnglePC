<template>
  <div class="move-dialog"><!--@click="doMouseMove($event)"-->
    <div class="el-dialog el-dialog--tiny" ref="moveDialog"
         :class="{moveDisplayNone: !moveDisplay, moveDisplayBlock: moveDisplay}"
         :style="{width: `${width}px`}">
      <div class="el-dialog__header"><span class="el-dialog__title"></span>
        <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click="handleClose"><i
          class="el-dialog__close el-icon el-icon-close"></i></button>
      </div>
      <div class="el-dialog__body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
//        moveDisplay: {
//          type: Boolean,
//          default: false,
//          required: true
//        }
      width: {
        type: Number,
        default: 391
      }
    },
    data () {
      return {
        loading: false,
        showList: false,
        moveDisplay: false
      };
    },
    computed: {},
    mounted () {},
    // 组件
    components: {},
    methods: {
      // 关闭
      handleClose (e) {
        this.moveDisplay = false;
      },
      doMouseMove (event) {
        let e = event || window.event;
        this.$refs.moveDialog.style.left = `${e.clientX}px`;
        this.$refs.moveDialog.style.top = `${e.clientY}px`;
        console.log({'x': e.clientX, 'y': e.clientY});
      }
    },
    // 当dom一创建时
    created () {},
    watch: {}
  };
</script>

<style lang="less">
  .move-dialog {
    .el-dialog{
      transition: all .3s;
    }
    .moveDisplayNone {
      display: none;
    }
    .moveDisplayBlock {
      display: block;
    }
  }
</style>
