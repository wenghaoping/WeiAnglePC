/* eslint-disable */
option = {
  title: {

  },
  color: ['#28DC41', '#009eff'],
  tooltip: {
    trigger: 'axis',

    formatter: function (params) {
      return params[i].componentType;
    }

  },
  legend: {
    data: ['行业平均', '微天使乐投平台']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
    value: '{value}K'
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['0224', '0225', '0226', '0227', '0228', '0229']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    name: '行业平均',
    type: 'line',
    smooth: true,
    symbolSize: 8,
    stack: '总量',
    data: [20000, 40000, 60000, 10000, 80000, 10000]
  }, {
    name: '微天使乐投平台',
    type: 'line',
    stack: '总量',
    symbolSize: 8,
    smooth: true,
    data: [10000, 30000, 10000, 11000, 20000, 40000]
  }]
};
