<template>
  <!--雷达图-->
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>
<script type="text/ecmascript-6">
  import echarts from 'echarts';
  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '300px'
      },
      height: {
        type: String,
        default: '300px'
      },
      indicator: {
        type: Array
      },
      innerValue: {
        type: Array
      }
    },
    data () {
      return {
        chart: null
        /* indicator: [
          {name: '竞争力', max: 100},
          {name: '商业前景', max: 100},
          {name: '发展战略', max: 100},
          {name: '团队素质', max: 100},
          {name: '财务管理', max: 100}
        ],
        value: [50, 60, 32, 80, 60, 90] */
      };
    },
    mounted () {
//      this.initCharts();
      this.chart = null;
    },
    computed: {},
    // 组件
    components: {},
    methods: {
      initCharts () {
        this.chart = echarts.init(document.getElementById(this.id));
        this.setOptions();
      },
      setOptions () {
        this.chart.setOption({
//          tooltip: {},
          radar: {
//            shape: 'circle',
            name: {
              textStyle: {
                color: '#8492a6',
                backgroundColor: '#ffffff',
                borderRadius: 3,
                padding: [1, 5]
              }
            },
            indicator: this.indicator,
            center: ['50%', '50%'],
            radius: 60,
            splitArea: {
              show: true,
              areaStyle: {
                color: ['white']  // 图表背景网格的颜色
              }
            },
            splitLine: {
              lineStyle: {
                width: 0.5 // 分隔线线宽
              }
            },
            axisLine: {
              lineStyle: {
                width: 0.5 // 坐标轴线宽
              }
            }
          },
          series: [{
            type: 'radar',
            symbol: 'none', // 拐角原点去处
            label: {
              normal: {
                position: 'center',
                textStyle: {
                  fontSize: '14' // 拐点字的大小
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#8492A6', // 图表中各个图区域的边框线拐点颜色
                lineStyle: {
                  color: '#E0E6ED' // 图表中各个图区域的边框线颜色
                }
              }
            },
            data: [
              {
                value: this.innerValue,
                name: '赛事统计',
                itemStyle: {
                  normal: {
                    areaStyle: {
                      type: 'default',
                      color: '#009eff' // 图表中各个图区域的颜色
                    }
                  }
                }
              }
            ]
          }]
        });
      }
    },
    beforeDestroy () {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();
      this.chart = null;
    },
    watch: {
      innerValue: function (e) {
        this.initCharts();
      }
    }
  };
</script>

