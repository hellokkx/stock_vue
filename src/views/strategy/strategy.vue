<template xmlns="http://www.w3.org/1999/html">
  <div class="container">
    <!-- 选择股票和策略 -->
    <div class="strategy-selection">
      <h2 style="margin-left:20px;margin-right: 50px;">策略模块</h2>
      <el-input style="width:200px; margin-right: 50px" v-model="input" placeholder="请输入股票代码"></el-input>
      <el-select style="width:200px; margin-right: 50px" v-model="value" filterable placeholder="请选择">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>
    <!-- 状态栏-->
    <div class="top-bar">
      <input type="date">
      <span>-</span>
      <input type="date">
      <input style="width:100px;height:20px;vertical-align:middle;" type="text" value="￥100000">
      <select style="height:20px" v-model="selectedPythonVersion">
        <option value="Python3">Python3</option>
        <option value="Python2">Python2</option>
      </select>
      <span>|</span>
      <div style="width: 35%; display: flex; align-items: center;" class="status" >
        <h4 style="font-weight: 400;margin-right: 10px">状态:</h4>
        <progress v-if="isRunning" :value="progress" max="100"></progress>
        <span v-if="!isRunning && statusMessage === '运行成功'" style="color: green;">✔</span>
        <span>{{ statusMessage }}</span>
      </div>
      <span>|</span>
      <button style="background-color: dodgerblue;color: white;border: none; padding: 5px 10px;border-radius: 3px"
              @click="runBacktest">运行回测</button>
    </div>
    <!-- 策略信息 -->
    <div class="strategy-info">
      <table>
        <tr v-for="(Info, index) in Info" :key="index + Info.income">
          <td>策略收益<br> {{ Info.income }}</td>
          <td>基准收益<br>  {{ Info.benchmark }}</td>
          <td>年化收益<br> {{ Info.annualized_return }}</td>
          <td>Beta<br>  {{ Info.beta }}</td>
          <td>盈利次数<br> {{ Info.profit_times }}</td>
        </tr>
        <tr v-for="(Info, index) in Info" :key="index">
          <td>Alpha<br> {{ Info.alpha }}</td>
          <td>Sharpe<br>{{ Info.sharpe }}</td>
          <td>最大回撤<br>{{ Info.max_drawdown }}</td>
          <td>盈亏比<br>{{ Info.profit_loss_ratio }}</td>
          <td>亏损次数<br>{{ Info.loss_times }}</td>
        </tr>
      </table>
    </div>
    <div class="chart" ref="chart" ></div>

  </div>
</template>

<script>
import * as echarts from 'echarts';
// import $ from 'jquery';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import {startStrategy, uploadStrategy} from "@/api";
export default {
  name: "Strategy",
  data() {
    return {
      options: [{
        value: '选项1',
        label: '首版潜力股'
      }, {
        value: '选项2',
        label: '多因子策略'
      }, {
        value: '选项3',
        label: 'ETF追涨杀跌'
      }, {
        value: '选项4',
        label: '强趋势模型策略'
      }],
      value: '',
      input:'',
      selectedPythonVersion: 'Python3',
      Info: [
        {
          income: '94.05%',
          benchmark: '43.65%',
          annualized_return: '433.67%',
          beta: '0.668',
          profit_times: '40',
          alpha: '3.321',
          sharpe: '14.164',
          max_drawdown: '6.108%',
          profit_loss_ratio: '27.059',
          loss_times: '3'
        }
      ],
      isRunning: false,
      progress: 0,
      statusMessage: '',
      chart: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.chart = echarts.init(this.$refs.chart);
      // this.drawChart();
    });
  },
  methods: {
    // 模拟回测运行状态
    runBacktest() {
      this.isRunning = true;
      this.statusMessage = '运行中...';
      let startTime = new Date(); // 记录开始时间
      // 模拟一个定时任务来更新进度
      const intervalId = setInterval(() => {
        this.progress += 1;
        if (this.progress >= 100) {
          clearInterval(intervalId);
          this.isRunning = false;
          this.statusMessage = '回测完成';
          this.isRunning = false;
          let endTime = new Date();
          let runTime = (endTime - startTime) / 1000;
          this.statusMessage = '运行成功，实际耗时：' + runTime + '秒';
        }
      }, 10);
      this.drawChart();
    },
    generateData(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const data = [];

      let lastBenchmarkReturn = 0;
      let lastStrategyReturn = 0;
      const smoothingFactor = 0.05; // 平滑因子，可以根据需要调整

      for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        // 生成-10%到300%之间的随机收益率
        let benchmarkReturn = (Math.random() * 310 - 10).toFixed(2);
        let strategyReturn = (Math.random() * 310 - 10).toFixed(2);

        // 通过平滑因子使数据变化平缓，有起伏但总体增长
        benchmarkReturn = lastBenchmarkReturn * (1 - smoothingFactor) + benchmarkReturn * smoothingFactor;
        strategyReturn = lastStrategyReturn * (1 - smoothingFactor) + strategyReturn * smoothingFactor;

        lastBenchmarkReturn = benchmarkReturn;
        lastStrategyReturn = strategyReturn;

        // 将日期转换为'yyyy/mm/dd'格式
        const date = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;

        data.push([date, benchmarkReturn, strategyReturn]);
      }

      return data;
    },

    //---------获取回测数据---------------
    drawChart() {
      var ts_code='000001.SZ'
      var str='mva'
      startStrategy({ts_code,str}).then(res=>{
        if(res.code===200){
          // console.log(res)
          this.dialogVisible = false;
          const data=res.response.graph
          const data0 = data.map(item => [item.data, item.benchmark, item.strategy]);
          // const data0 = this.generateData('2023/10/1', '2024/4/1');
          console.log("data0"+data0)

          const dates = data0.map(item => item[0]);
          const benchmarkReturns = data0.map(item => item[1]);
          const strategyReturns = data0.map(item => item[2]);

          const option = {
            tooltip: {
              trigger: 'axis',
              formatter: function(params) {
                const date = params[0].axisValue;
                const strategyReturn = params[0].data.toFixed(2);
                const benchmarkReturn = params[1].data.toFixed(2);
                return `
      ${date}<br/>
      策略收益：${strategyReturn}%<br/>
      基准收益：${benchmarkReturn}%`;
              }
            },
            dataZoom: [
              {
                type: 'inside',
                start: 0,
                end: 100
              },
              {
                type: 'slider',
                bottom: 25, // 调整控件的位置
                height: 15, // 调整控件的高度
                start: 0,
                end: 100
              }
            ],
            xAxis: {
              type: 'category',
              data: dates,
              axisLine: {
                lineStyle: {
                  color: '#000',
                  width: 2
                }
              }
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: '{value}%' // 纵轴数据类型是百分比
              },
              axisLine: {
                lineStyle: {
                  color: '#000',
                  width: 2
                }
              }
            },
            series: [
              {
                name: '基准收益',
                data: benchmarkReturns,
                type: 'line',
                lineStyle: {
                  color: 'rgb(255, 70, 131)',
                }
              },
              {
                name: '策略收益',
                data: strategyReturns,
                type: 'line',
                lineStyle: {
                  color: 'rgb(0, 191, 255)',
                }
              }
            ]
          };
          this.chart.setOption(option);
        }
      }).catch(err=>{
        //异常处理
        console.error('获取数据失败:', error);
      })

      // console.log("data"+data)
      // // const data0 = data.map(item => [item.data, item.benchmark, item.strategy]);
      // const data0 = this.generateData('2023/10/1', '2024/4/1');
      // // console.log(data0)
      //
      // const dates = data0.map(item => item[0]);
      // const benchmarkReturns = data0.map(item => item[1]);
      // const strategyReturns = data0.map(item => item[2]);
      //
      // const option = {
      //   tooltip: {
      //     trigger: 'axis',
      //     formatter: function(params) {
      //       const date = params[0].axisValue;
      //       const strategyReturn = params[0].data.toFixed(2);
      //       const benchmarkReturn = params[1].data.toFixed(2);
      //       return `
      // ${date}<br/>
      // 策略收益：${strategyReturn}%<br/>
      // 基准收益：${benchmarkReturn}%`;
      //     }
      //   },
      //   dataZoom: [
      //     {
      //       type: 'inside',
      //       start: 0,
      //       end: 100
      //     },
      //     {
      //       type: 'slider',
      //       bottom: 25, // 调整控件的位置
      //       height: 15, // 调整控件的高度
      //       start: 0,
      //       end: 100
      //     }
      //   ],
      //   xAxis: {
      //     type: 'category',
      //     data: dates,
      //     axisLine: {
      //       lineStyle: {
      //         color: '#000',
      //         width: 2
      //       }
      //     }
      //   },
      //   yAxis: {
      //     type: 'value',
      //     axisLabel: {
      //       formatter: '{value}%' // 纵轴数据类型是百分比
      //     },
      //     axisLine: {
      //       lineStyle: {
      //         color: '#000',
      //         width: 2
      //       }
      //     }
      //   },
      //   series: [
      //     {
      //       name: '基准收益',
      //       data: benchmarkReturns,
      //       type: 'line',
      //       lineStyle: {
      //         color: 'rgb(255, 70, 131)',
      //       }
      //     },
      //     {
      //       name: '策略收益',
      //       data: strategyReturns,
      //       type: 'line',
      //       lineStyle: {
      //         color: 'rgb(0, 191, 255)',
      //       }
      //     }
      //   ]
      // };
      // this.chart.setOption(option);
    },
  }
}
</script>

<style scoped>
.container {
  flex-direction: row;
}
.strategy-selection {
  margin-top:10px;
  margin-bottom: 20px;
  display: flex;
  height: 35px;
  align-items: center;
}
.strategy-option input {
  width: 100%;
  margin-top: 15px;
}
.strategy-option ul {
  padding: 0;
  list-style-type: none;
}
.strategy-option li {
  font-size: 12px;
  white-space: nowrap;
}
.top-bar {
  width: 100%;
  height : 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background-color:rgba(242, 244, 252, 0.78);;
}

.strategy-info table {
  width: auto;
  border-collapse: separate;
  border-spacing:12px;
  margin-left: auto;
  margin-right: auto;
}

.strategy-info td {
  border: 1px solid rgba(0, 0, 0, 0.22);
  padding: 5px;
  box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  text-align: center;
  font-size: 12px;
  width: 80px;
}
.chart{
  margin-top: -40px;
  width: 100%;
  height: 400px;
}
</style>