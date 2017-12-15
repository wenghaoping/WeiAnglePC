<template>
  <!--BP选择行业弹框-->
  <div class="selectBpIndustry popbox">
    <el-dialog :visible="industryDisplay" :before-close="handleClose" close-on-press-escape close-on-click-modal lock-scroll
               :close-on-click-modal="showList" :close-on-press-escape="showList" size="large" :show-close="showList">
      <div slot="title" class="title">
        <span class="rander tc fl">1</span><span class="fl">选择行业和阶段</span>
      </div>

      <div class="choice">
        <p class="choice_title">选择行业</p>
        <div style="margin: 20px 0;"></div>
        <div class="check_box">
          <el-checkbox-group v-model="checkboxGroup1" size="large" :max="5" @change="industryChange">
            <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
      <div style="margin: 50px 0;"></div>
      <div class="choice">
        <p class="choice_title">选择阶段</p>
        <div style="margin: 20px 0;"></div>
        <div class="check_box">
          <el-checkbox-group v-model="checkboxGroup2" size="large" :max="1" @change="stageChange">
            <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="large">取 消</el-button>
        <el-button type="primary" @click="next" size="large">下一步</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
    const cityOptions = ['上海', '北京', '广州', '深圳', '上海', '北京', '广州', '深圳'];
    export default {
      props: {
        industryDisplay: {
          type: Boolean,
          default: false,
          required: true
        }
      },
      data () {
        return {
          //  industryDisplay: false
          showList: false,
          loading: false,
          checkboxGroup1: ['上海'],
          checkboxGroup2: ['上海'],
          cities: cityOptions
        };
      },
      computed: {},
      mounted () {},
      // 组件
      components: {},
      methods: {
        // 关闭
        handleClose (e) {
          this.$emit('closeIndustry', false);
        },
        // 下一步
        next () {
          this.$emit('industryNext', true);
        },
        // 行业改变
        industryChange (e) {
          console.log(e);
        },
        // 阶段改变
        stageChange (e) {
          console.log(e);
        }
      },
      // 当dom一创建时
      created () {},
      watch: {
        industryDisplay: function (e) {
          if (e) {

          } else {

          }
        }// 清空数据
      }
    };
</script>

<style lang="less">
  @import '../../assets/css/superBp.less';
</style>
