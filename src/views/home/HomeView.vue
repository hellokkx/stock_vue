<template>
  <div class="home-view">
    <!-- Top Section - Introduction -->
    <div class="intro-section">
      <h1 class="intro-title">量化投资，从理财大师开始</h1>
      <h1 class="intro-text">我们提供免费的量化数据、投研工具、量化学习体系、在线交流社区</h1>
    </div>
    <!-- Middle Section - Strategy Selection -->
    <div class="strategy-section">
      <h2 class="strategy-title">策略精选</h2>

      <div class="strategy-box">

        <el-card class="box-card">
          <span style="font-size: large;font-weight:bold;">低估价值选股策略</span>
<!--          <div>-->
<!--            <span style="color: dodgerblue;margin-right: 5px;margin-left: 120px">● 策略收益</span>-->
<!--            <span style="color: indianred;">● 基准收益</span>-->
<!--          </div>-->
          <div style="margin-top: 17px">
            <span style="background-color: rgba(65, 132, 225, 0.14);color:#4184E1;padding: 3px">历史回测</span>
            <span style="color: #4572a7;margin-right: 5px;margin-left: 75px">● 策略收益</span>
            <span style="color: #aa4643;">● 基准收益</span>
          </div>
          <div ref="chart1" style="width: 100%; height: 200px;"></div>
          <el-row style="text-align: center;border-bottom: 1px solid lightgray;margin-bottom: 10px;padding-bottom: 10px">
            <el-col :span="8" style="border-right: 1px solid #e6e6e6;">
              <div style="font-size: smaller;color: #596878">年化收益</div>
              <div style="font-size: large;color: #aa4643">21.91%</div>
            </el-col>
            <el-col :span="8" style="border-right: 1px solid #e6e6e6;">
              <div style="font-size: smaller;color: #596878">最大回撤</div>
              <div style="font-size: large;">11.89%</div>
            </el-col>
            <el-col :span="8" >
              <div style="font-size: smaller;color: #596878">初始资金</div>
              <div style="font-size: large;">50万</div>
            </el-col>
          </el-row>
          <el-button type="primary" size="small" style="margin: 0px auto; display: block;" @click="download1">获取源码</el-button>
        </el-card>

        <el-card class="box-card">
          <span style="font-size: large;font-weight:bold;">多因子策略</span>
<!--          <div>-->
<!--            <span style="color: dodgerblue;margin-right: 5px;margin-left: 120px">● 策略收益</span>-->
<!--            <span style="color: indianred;">● 基准收益</span>-->
<!--          </div>-->
          <div style="margin-top: 17px">
            <span style="background-color: rgba(65, 132, 225, 0.14);color:#4184E1;padding: 3px">历史回测</span>
            <span style="color: #4572a7;margin-right: 5px;margin-left: 75px">● 策略收益</span>
            <span style="color: #aa4643;">● 基准收益</span>
          </div>
          <div ref="chart2" style="width: 100%; height: 200px;"></div>
          <el-row style="text-align: center;border-bottom: 1px solid lightgray;margin-bottom: 10px;padding-bottom: 10px">
            <el-col :span="8" style="border-right: 1px solid #e6e6e6;">
              <div style="font-size: smaller;color: #596878">年化收益</div>
              <div style="font-size: large;color: #aa4643">199.68%</div>
            </el-col>
            <el-col :span="8" style="border-right: 1px solid #e6e6e6;">
              <div style="font-size: smaller;color: #596878">最大回撤</div>
              <div style="font-size: large;">6.11%</div>
            </el-col>
            <el-col :span="8" >
              <div style="font-size: smaller;color: #596878">初始资金</div>
              <div style="font-size: large;">100万</div>
            </el-col>
          </el-row>
          <el-button type="primary" size="small" style="margin: 0px auto; display: block;" @click="download2">获取源码</el-button>
        </el-card>

        <el-card class="box-card">
          <span style="font-size: large;font-weight:bold;">小市值策略</span>
<!--          <div>-->
<!--            <span style="color: dodgerblue;margin-right: 5px;margin-left: 120px">● 策略收益</span>-->
<!--            <span style="color: indianred;">● 基准收益</span>-->
<!--          </div>-->
          <div style="margin-top: 17px">
            <span style="background-color: rgba(65, 132, 225, 0.14);color:#4184E1;padding: 3px">历史回测</span>
            <span style="color: #4572a7;margin-right: 5px;margin-left: 75px">● 策略收益</span>
            <span style="color: #aa4643;">● 基准收益</span>
          </div>
          <div ref="chart3" style="width: 100%; height: 200px;"></div>
          <el-row style="text-align: center;border-bottom: 1px solid lightgray;margin-bottom: 10px;padding-bottom: 10px">
            <el-col :span="8" style="border-right: 1px solid #e6e6e6;">
              <div style="font-size: smaller;color: #596878">年化收益</div>
              <div style="font-size: large;color: #aa4643">56.11%</div>
            </el-col>
            <el-col :span="8" style="border-right: 1px solid #e6e6e6;">
              <div style="font-size: smaller;color: #596878">最大回撤</div>
              <div style="font-size: large;">17.13%</div>
            </el-col>
            <el-col :span="8" >
              <div style="font-size: smaller;color: #596878">初始资金</div>
              <div style="font-size: large;">100万</div>
            </el-col>
          </el-row>
          <el-button type="primary" size="small" style="margin: 0px auto; display: block;" @click="download3">获取源码</el-button>

        </el-card>
      </div>
    </div>
    <!-- Bottom Section - bottom -->
    <el-divider></el-divider>
    <div class="bottom-content">
      <!-- 图片部分 -->
      <div class="bottom-image">
        <img src="../home/image/home2.png" alt="Bottom Image" />
      </div>
      <!-- 文字部分 -->
      <div class="bottom-text">
        <h2>从零开始的量化投资之路</h2>
        <p>只有持续学习才能不断进取，最终攀登量化投资高峰，通过模型赢得属于自己的胜利。量化课堂为你准备了从基础知识到投资策略模型的完整解读。无论你是交易者、还是金融从业者、还是IT开发者，在量化课堂，都可以提升开发实力，启迪策略思路。</p>
        <router-link to="/class">→点击进入量化课堂</router-link>
      </div>
    </div>
    <div class="bottom-section">
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Home",
  data() {
    return {
      charts: [],
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.charts = [];

      ['chart1', 'chart2', 'chart3'].forEach((refName) => {
        const el = this.$refs[refName];
        if (el) {
          const chart = echarts.init(el);
          this.charts.push(chart);
          this.drawChart(chart, refName); // 为每个图表绘制数据
        }
      });
    });
  },
  methods: {
    generateData(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const data = [];

      let lastBenchmarkReturn = 0;
      let lastStrategyReturn = 0;
      const smoothingFactor = 0.05; // 平滑因子，可以根据需要调整

      for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        // 生成-10%到300%之间的随机收益率
        let benchmarkReturn = (Math.random() * 300 - 1).toFixed(2);
        let strategyReturn = (Math.random() * 300 - 1).toFixed(2);

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
    drawChart(chart, refName)  {
      for (let i = 0; i < this.charts.length; i++) {
        const chart = this.charts[i];
        const chartData = this.generateData('2023/10/1', '2024/4/1'); // 为每个图表生成不同的数据
        const dates = chartData.map(item => item[0]);
        const benchmarkReturns = chartData.map(item => item[1]);
        const strategyReturns = chartData.map(item => item[2]);

        const option = {
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              const date = params[0].axisValue;
              const strategyReturn = params[0].data.toFixed(4);
              const benchmarkReturn = params[1].data.toFixed(4);
              return `
      ${date}<br/>
      策略收益：${strategyReturn}%<br/>
      基准收益：${benchmarkReturn}%`;
            }
          },
          xAxis: {
            type: 'category',
            data: dates,
            // axisLine: {
            //   lineStyle: {
            //     color: '#000',
            //     width: 2
            //   }
            // },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#e0e6f1',
                type: 'solid'
              }
            }

          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}%'
            },
            axisLine: {
              lineStyle: {
                color: '#000',
                width: 2
              }
            }
          },
          grid: {
            left: '15%',
            right: '2%',
            top: '15%',
            bottom: '25%'
          },
          series: [
            {
              name: '基准收益',
              data: benchmarkReturns,
              type: 'line',
              lineStyle: {
                color: '#aa4643',
              }
            },
            {
              name: '策略收益',
              data: strategyReturns,
              type: 'line',
              lineStyle: {
                color: '#4572a7',
              }
            }
          ]
        };
        chart.setOption(option);
      }
    },

    //------------------------------------下载策略数据---------------------------------------
    download1() {
      console.log(this.strategy)
      const fileName = "低估价值选股策略.py";
      const filePath = "http://localhost:8080/code/" + fileName;

      // 创建一个隐藏的a标签
      const link = document.createElement('a');
      link.href = filePath;
      link.download = fileName;

      // 将a标签添加到文档中并触发点击事件
      document.body.appendChild(link);
      link.click();

      // 点击完成后从文档中移除a标签
      document.body.removeChild(link);
    },
    download2() {
      console.log(this.strategy)
      const fileName = "多因子策略.py";
      const filePath = "http://localhost:8080/code/" + fileName;

      // 创建一个隐藏的a标签
      const link = document.createElement('a');
      link.href = filePath;
      link.download = fileName;

      // 将a标签添加到文档中并触发点击事件
      document.body.appendChild(link);
      link.click();

      // 点击完成后从文档中移除a标签
      document.body.removeChild(link);
    },
    download3() {
      console.log(this.strategy)
      const fileName = "小市值策略.py";
      const filePath = "http://localhost:8080/code/" + fileName;

      // 创建一个隐藏的a标签
      const link = document.createElement('a');
      link.href = filePath;
      link.download = fileName;

      // 将a标签添加到文档中并触发点击事件
      document.body.appendChild(link);
      link.click();

      // 点击完成后从文档中移除a标签
      document.body.removeChild(link);
    },
  }
}
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  /*width: 100%;*/
  width: 1000px;
  /*max-width: 1000px;*/
  padding: 0px;
  margin-right: 10px;

}

.intro-section {
  height: 230px;
  width: 100%;
  background-image: url("image/home1.png");
  background-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中 */
  justify-content: center; /* 垂直居中 */
  text-align: center; /* 对齐文本内容 */
}

.intro-title {
  font-size: 32px;
  color: white;
  text-align: center;
}

.intro-text {
  font-weight: lighter;
  font-size: 16px;
  color: white;
  text-align: center;
  /*margin-left: 400px;*/
}

.strategy-title {
  text-align: center;
  font-size: 24px;
  color: black;
}

.strategy-section {
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 50px;
  background-color: white;
}

.strategy-box {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85%;

}

.box-card {
  width: 330px;
  margin: 10px;
  padding-left: 5px;
  padding-right: 5px;
  font-size: small;
}


.bottom-section {
  height: 70px;
  background-image: url("image/home1.png");
  background-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.bottom-content {
  display: flex;
  justify-content: space-between;
}

.bottom-image {
  width: 50%;
}

.bottom-image img {
  width: 100%;
}

.bottom-text {
  width: 50%;
  padding: 20px;
}

.bottom-text h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.bottom-text p {
  font-size: 16px;
  margin-bottom: 20px;
}

.bottom-text a {
  font-size: 16px;
  color: #1a73e8;
  text-decoration: none;
}
</style>