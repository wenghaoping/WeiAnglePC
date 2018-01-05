<template>
  <div id="downloadEchart">
    <el-tabs v-model="downloadEchartName" @tab-click="handleClick">
      <!--App下载量-->
      <el-tab-pane label="App下载量" name="1"></el-tab-pane>
      <!--浏览页面-->
      <el-tab-pane label="浏览页面" name="2"></el-tab-pane>
      <!--访问用户-->
      <el-tab-pane label="访问用户" name="3"></el-tab-pane>
      <!--访问时长-->
      <el-tab-pane label="访问时长" name="4"></el-tab-pane>
    </el-tabs>
    <div id="pieBox" style="width:803px;height:432px;diplay:block"></div>
    <p class="sec"><i>{{title}}：</i>{{main}}</p>
    <div class="op"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import echarts from 'echarts';
  export default {
    props: ['comid', 'compName', 'chartData'],
    data () {
      return {
        compaName: '',
        downloadEchartName: '1',
        title: '累计下载量',
        main: '综合各大应用市场的历史累计下载量，加权计算后的值。该指标是可以表明App存量用户量的指标。',
        xdata: [], // 时间
        // APP下载量
        download: {
          ydataTotal: [], // 获取的数据
          ydataAverage: []// 平均数据
        },
        // 活跃用户
        dau: {
          ydataTotal: [],
          ydataAverage: []
        },
        // 浏览页面
        pv: {
          ydataTotal: [],
          ydataAverage: []
        },
        // 访问用户数
        uv: {
          ydataTotal: [],
          ydataAverage: []
        },
        // 访问时长
        time: {
          ydataTotal: [],
          ydataAverage: []
        },
        chart: '',
        chartCheck: true

      };
    },
    methods: {
      // 获取图表数据变成json
      getChart (data) {
        if (data[0].project_views !== '') {
          return JSON.parse(data[0].project_views);
        } else {
          return {data: []};
        }
      },
      // 获取平均数
      getAverage (data) {
        let arr = [];
        let index = this.xdata.length;
        for (let i = 0; i < index; i++) {
          arr[i] = data;
        };
        return arr;
      },
      // 获取爬来的数据
      getTotal (data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i] === '') data[i] = 0;
        };
        return data;
      },
      handleClick (tab, event) {
        let index = tab.index;
        switch (index) {
          case '0':
            this.getdownload();
            break;
          case '1':
            this.getpv();
            break;
          case '2':
            this.getuv();
            break;
          case '3':
            this.gettime();
            break;
          default:
            alert('你瞎按了吧');
            break;
        };
      },
      eChart (xdata, ydata1, ydata2) {
        if (this.chartCheck) {
          this.chart = echarts.init(document.getElementById('pieBox'));
        }
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
        this.chart.setOption(option);
        this.chartCheck = false;
      },
      // 累计下载量
      getdownload () {
        this.title = '累计下载量';
        this.main = '综合各大应用市场的历史累计下载量，加权计算后的值。该指标是可以表明App存量用户量的指标。';
        this.eChart(this.xdata, this.download.ydataTotal, this.download.ydataAverage);
      },
      // 浏览页面数
      getpv () {
        this.title = '浏览页面数(PV)';
        this.main = '对目标公司网站在全网的日均访问量加总,并经过加权计算的值,值越高,访问量越大.该指标反映了用户对目标公司官方网站的访问情况,是可以表明目标公司网站内容受访问热度的指标.';
        this.eChart(this.xdata, this.pv.ydataTotal, this.pv.ydataAverage);
      },
      // 访问用户数
      getuv () {
        this.title = '访问用户数(UV)';
        this.main = '对目标公司网站在全网的日均独立访问用户量加总,并经过加权计算的值,值越高,访问量越大.该指标反映了木不熬公司官方网站吸引用户的能力,是可以表明目标公司网站的获客能力的指标.';
        this.eChart(this.xdata, this.uv.ydataTotal, this.uv.ydataAverage);
      },
      // 访问时长
      gettime () {
        this.title = '访问时长';
        this.main = '所有访问用户在统计时间段内,从进入到离开该网站的时长平均值,是可以表现公司网站用户粘性的指标.';
        this.eChart(this.xdata, this.time.ydataTotal, this.time.ydataAverage);
      },
      // 获取项目
      getCrawlerProject () {
        let data = this.getChart(this.chartData).data;
        this.chartDataCheck = data.length;
        if (data.length !== 0) {
          this.xdata = data.three_month;
          this.download.ydataTotal = this.getAverage(data.total_download_mid);
          this.download.ydataAverage = this.getTotal(data.total_download[0].value);

          this.pv.ydataTotal = this.getAverage(data.pv_mid);
          this.pv.ydataAverage = this.getTotal(data.pv[0].value);

          this.uv.ydataTotal = this.getAverage(data.uv_mid);
          this.uv.ydataAverage = this.getTotal(data.uv[0].value);

          this.time.ydataTotal = this.getAverage(data.time_mid);
          this.time.ydataAverage = this.getTotal(data.time[0].value);
          this.getdownload();
        } else {
          this.clearData();
        }
      },
      clearData () {
        this.download.ydataTotal = [];
        this.download.ydataAverage = [];
        this.pv.ydataTotal = [];
        this.pv.ydataAverage = [];
        this.uv.ydataTotal = [];
        this.uv.ydataAverage = [];
        this.time.ydataTotal = [];
        this.time.ydataAverage = [];
        this.downloadEchartName = '1';
      }
    },
    // Echart组件
    mounted () {},
    watch: {
      chartData: function (e) {
        this.clearData();
        if (e.length !== 0) {
          this.getCrawlerProject();
        }
      }// 获取图表数据
    }
  };
</script>

<style lang="less">
  #downloadEchart{
    position: relative;
    .op{
      width: 169px;
      height: 23px;
      opacity: 0;
      position: absolute;
      left: 317px;
      top: 43px;
    }
  }
  .sec{
    position: relative;
    font-size:13px;
    color:#5e6d82;
    margin-top:48px;
    line-height: 23px;
    i{
      color:#475669;
      font-weight: bolder;
      line-height: 23px;

    }
  }

</style>
