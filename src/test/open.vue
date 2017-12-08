<template>
  <div id="open">
    <el-button @click="console">点击</el-button>
    <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable */
  export default {
    data () {
      return {
        xdata: [

        ],
        ydata1: [],
        ydata2: []
      };
    },
    mounted () {
      this.eChart(this.xdata, this.ydata1, this.ydata2);
    },
    methods: {
      console () {

      },
      eChart (xdata, ydata1, ydata2) {
        let myChart = this.$echart.init(document.getElementById('myChart'));
        let option = {
          title: {},
          color: ['#28DC41', '#009eff'],
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(31,45,61,0.85);',
            padding: [10],
            transitionDuration: 0.5,
            extraCssText: 'border-radius:8px;',
            formatter: function (e) {
              let res = e[0].axisValue.slice(0, 4) + '.' + e[0].axisValue.slice(4, 6) + '.' + e[0].axisValue.slice(6, 8) + '</br>';
              res += '尽调公司:　' + e[0].value + '</br>';
              res += '行业平均:　' + e[1].value;
              return res;
            }
          },
          legend: {
            data: ['行业平均', '尽调公司']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {

          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: {
              show: true
            },
            data: xdata
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '尽调公司',
            type: 'line',
            smooth: true,
            symbolSize: 8,
            data: ydata2
          }, {
            name: '行业平均',
            type: 'line',
            symbolSize: 8,
            smooth: true,
            data: ydata1
          }]
        };
        myChart.setOption(option);
      }
    },
    created () {
      setTimeout(() => {
          this.xdata = [
            '20170322',
            '20170323'
          ];
          this.ydata1 = [1, 2];
          this.ydata2 = [5, 1];
          console.log('1111');
          console.log(this.ydata2);
          this.eChart(this.xdata, this.ydata1, this.ydata2);
        }
        , 1000);
    }
  };
</script>

<style lang="less">

</style>
