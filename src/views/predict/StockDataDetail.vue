<template>
  <div class="container">
    <!-- 左边占 70% -->
    <div class="left-block">
      <!-- 纵向布局 -->
      <div class="vertical-layout">
        <!-- 第一个部分 -->
        <div class="section section1">
          <div class="input-group">
            <h3>查询股票</h3>
            <el-input v-model="symbol" placeholder="请输入代码" style="width: 350px;margin-right: 20px;"></el-input>
            <el-button type="primary" @click="showBasicInfo">查询</el-button>
          </div>
        </div>

        <!-- 第二个部分 -->
        <div class="section section2">
          <div v-if="showLine" id="chart-container" style="height: 350px;"></div>
        </div>
        <!-- 第三个部分 -->
        <div class="section3">
          <!--          <div v-if="showLine" id="chart-container3" style="height: 350px;"></div>-->
          <div id="chart-container3" style="height: 220px"></div>
        </div>
      </div>
    </div>
    <!-- 右边占 30% -->
    <div class="right-block">
      <!-- 纵向布局 -->
      <div class="vertical-layout">

        <!-- 第0个部分 -->
        <div class="section right-section0">
          <el-p><strong>{{ statement }}</strong></el-p>
        </div>

        <!-- 第一个部分 -->
        <div class="section right-section1">
          <el-p><strong>资金综合评价：</strong>{{ evaluation1 }}</el-p>
          <el-rate v-model="ratevalue1" disabled show-score text-color="#ff9900" score-template="{value}" :colors="colors" style="margin-top: 5px;"></el-rate>
          <el-statistic group-separator="," :precision="2" :value="statisticvalue1" :title="title1" style="margin-top: 5px"></el-statistic>

        </div>

        <!-- 第二个部分 -->
        <div class="section right-section2">
          <el-p><strong>估值综合评价：</strong>{{ evaluation2 }}</el-p>
          <el-rate v-model="ratevalue2" disabled show-score text-color="#ff9900" score-template="{value}" :colors="colors" style="margin-top: 5px;"></el-rate>
          <el-statistic group-separator="," :precision="2" :value="statisticvalue2" :title="title2" style="margin-top: 5px"></el-statistic>
        </div>

        <!-- 第三个部分 -->
        <div class="section right-section3">
          <el-p><strong>财务综合评价：</strong>{{ evaluation3 }}</el-p>
          <el-rate v-model="ratevalue3" disabled show-score text-color="#ff9900" score-template="{value}" :colors="colors" style="margin-top: 5px;"></el-rate>
          <el-statistic group-separator="," :precision="2" :value="statisticvalue3" :title="title3" style="margin-top: 5px"></el-statistic>


        </div>

        <!-- 第四个部分 -->
        <div class="section right-section4">
          <el-p><strong>技术综合评价：</strong>{{ evaluation4 }}</el-p>
          <el-rate v-model="ratevalue4" disabled show-score text-color="#ff9900" score-template="{value}" :colors="colors" style="margin-top: 5px;"></el-rate>
          <el-statistic group-separator="," :precision="2" :value="statisticvalue4" :title="title4" style="margin-top: 5px"></el-statistic>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {getStockDataBySymbol} from "@/api"

export default {
  data() {
    return {
      showLine:true,
      showKLine:false,
      statement:'相关建议',
      ratevalue1:0,
      ratevalue2:0,
      ratevalue3:0,
      ratevalue4:0,
      statisticvalue1:0,
      statisticvalue2:0,
      statisticvalue3:0,
      statisticvalue4:0,
      evaluation1:'',
      evaluation2:'',
      evaluation3:'',
      evaluation4:'',
      title1:'换手率',
      title2:'市盈率',
      title3:'市值',
      title4:'涨跌幅',
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      symbol: '',
      // model: '',
      // modelOptions: [
      //   { label: '模型1', value: 'model1' },
      //   { label: '模型2', value: 'model2' },
      //   { label: '模型3', value: 'model3' }
      // ],
      response: []
      // 存储后台返回的数据
    };
  },
  methods: {
    showBasicInfo() {
      console.log('显示基本情况');
      this.showLine=true;
      this.showKLine=false;
      // 执行显示基本情况的逻辑
      this.initLineChart();
      this.initRadarChart();
    },

    initRadarChart(){
      var chartDom3 = document.getElementById('chart-container3');
      var myChart3 = echarts.init(chartDom3);
      var option3;

      option3 = {
        title: {
          text: '综合判断'
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '资金', max: 6500 },
            { name: '技术', max: 16000 },
            { name: '估值', max: 30000 },
            { name: '财务', max: 38000 },
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000],
              },
            ]
          }
        ]
      };

      myChart3.setOption(option3);
    },

    initLineChart() {
      // 初始化折线图
      const chartContainer = document.getElementById('chart-container');
      const myChart = echarts.init(chartContainer);
      var symbol=this.symbol
      console.log(symbol)

      //请求数据
      getStockDataBySymbol({symbol}).then(res=>{
        console.log(res)
        if(res.code===200){
          console.log(res.response)

          //绘制折线图
          // 获取横坐标数据
          const xAxisData = res.response.map(item => item.tradeDate).reverse();
          // 获取系列数据
          const seriesData = res.response.map(item => [
            item.open, // 开盘价
            item.close, // 收盘价
            item.low, // 最低价
            item.high // 最高价
          ]);

          // 配置折线图的选项
          const option = {
            // title: {
            //   text: ''
            // },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['开盘价', '最高价', '最低价', '收盘价']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '10%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xAxisData
            },
            yAxis: {
              type: 'value',
              min: 'dataMin', // 最小值为数据中的最小值
              max: 'dataMax'  // 最大值为数据中的最大值
            },

            dataZoom: [{ // 添加数据缩放功能
              type: 'inside',
              start: 0,
              end: 20,
              top:'90%',
              height:10,
            }, {
              type: 'slider',
              show: true,
              start: 0,
              end: 50,
              top:'90%',
              height:10,
            }],
            series: [
              {
                name: '开盘价',
                type: 'line',
                data: seriesData.map(item => item[0]),
                itemStyle: {
                  color: '#162a55' // 修改为你想要的颜色
                }
              },
              {
                name: '收盘价',
                type: 'line',
                data: seriesData.map(item => item[1]),
                itemStyle: {
                  color: '#e8a215' // 修改为你想要的颜色
                }
              },
              {
                name: '最低价',
                type: 'line',
                data: seriesData.map(item => item[2]),
                itemStyle: {
                  color: '#05857d' // 修改为你想要的颜色
                }
              },
              {
                name: '最高价',
                type: 'line',
                data: seriesData.map(item => item[3]),
                itemStyle: {
                  color: '#a8000b' // 修改为你想要的颜色
                }
              }
            ]

          };

          // 使用配置项渲染折线图
          myChart.setOption(option);

          //获取评分数据
          // 解析后端返回的 JSON 数据中的 response 字段
          var responseArray = res.response;

          // 初始化 turnover_rate 总和为 0
          let totalTurnoverRate = 0;
          let totalPe = 0;
          let Total_mv = 0;
          let totalpct_chg = 0;

          // 遍历所有对象，计算 turnover_rate 的总和
          responseArray.forEach(obj => {
            totalTurnoverRate += obj.turnover_rate;
            totalPe += obj.pe;
            Total_mv += obj.total_mv;
            totalpct_chg += obj.pctChg;
          });

          // 计算平均值
          const averageTurnoverRate = totalTurnoverRate / responseArray.length;
          const averagePe = totalPe / responseArray.length;
          const averagemv = Total_mv / responseArray.length;
          const averagepct_chg = totalpct_chg / responseArray.length;
          console.log("平均 turnover_rate:", averageTurnoverRate);
          this.statisticvalue1=averageTurnoverRate
          this.statisticvalue2=averagePe
          this.statisticvalue3=averagemv
          this.statisticvalue4=averagepct_chg

          //换手率
          if(averageTurnoverRate<=0.4){
            this.evaluation1='强度很低'
            this.ratevalue1=1
          }
          else if(averageTurnoverRate<=0.8){
            this.evaluation1='强度低'
            this.ratevalue1=2
          }
          else if(averageTurnoverRate<=1.6){
            this.evaluation1='强度中等'
            this.ratevalue1=3
          }
          else if(averageTurnoverRate<=1.8){
            this.evaluation1='强度高'
            this.ratevalue1=4
          }
          else{
            this.evaluation1='强度很高'
            this.ratevalue1=5
          }


          //市盈率
          if(averagePe<=5){
            this.evaluation2='价值低'
            this.ratevalue2=1
          }
          else if(averagePe<=10){
            this.evaluation2='价值较低'
            this.ratevalue2=2
          }
          else if(averagePe<=15){
            this.evaluation2='价值中等'
            this.ratevalue2=3
          }
          else if(averagePe<=20){
            this.evaluation2='价值较高'
            this.ratevalue2=4
          }
          else{
            this.evaluation2='价值高'
            this.ratevalue2=5
          }

          //市值
          if(averagemv<=5){
            this.ratevalue3=1
          }
          else if(averagemv<=10){
            this.ratevalue3=2
          }
          else if(averagemv<=15){
            this.ratevalue3=3
          }
          else if(averagemv<=20){
            this.ratevalue3=4
          }
          else{
            this.ratevalue3=5
          }
          this.evaluation3=this.ratevalue3

          //涨跌幅
          if(averagepct_chg<=0){
            this.evaluation4='很差'
            this.ratevalue4=1
          }
          else if(averagepct_chg<=5){
            this.evaluation4='差'
            this.ratevalue4=2
          }
          else if(averagepct_chg<=10){
            this.evaluation4='中等'
            this.ratevalue4=3
          }
          else if(averagepct_chg<=15){
            this.evaluation4='好'
            this.ratevalue4=4
          }
          else{
            this.evaluation4='很好'
            this.ratevalue4=5
          }

          //建议
          var sum= this.ratevalue1+this.ratevalue2+this.ratevalue3+this.ratevalue4
          if(sum<=6){
            this.statement='建议减持'
          }
          else if(sum<=12){
            this.statement='建议观望'
          }
          else{
            this.statement='建议增持'
          }

        }
      }).catch(err => {
        console.log(err);
        this.$message.error(err.data);
      });
    },

    //点击预测按钮
    predict() {
      // 进行预测的逻辑
      console.log('进行预测');
      this.showLine=false;
      this.showKLine=true;
      // 初始化 K 线图
      this.initKLineChart();

    },


    initKLineChart() {
      const chartContainer2 = document.getElementById('chart-container2');
      const myChart2 = echarts.init(chartContainer2);
      const upColor = '#ec0000';
      const upBorderColor = '#8A0000';
      const downColor = '#00da3c';
      const downBorderColor = '#008F28';
      const data0 = this.splitData(rawData).reverse();

      const option2 = {
        // title: {
        //   text: '上证指数',
        //   left: 0
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
        },
        legend: {
          top:5,
          data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          data: data0.categoryData,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          min: 'dataMin',
          max: 'dataMax'
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 20,
            height: 10 // 设置滑动条高度为20像素
          },
          {
            show: true,
            type: 'slider',
            top: '90%',
            start: 0,
            end: 20,
            height: 10 // 设置滑动条高度为20像素
          }
        ],
        series: [
          {
            name: '日K',
            type: 'candlestick',
            data: data0.values,
            itemStyle: {
              color: upColor,
              color0: downColor,
              borderColor: upBorderColor,
              borderColor0: downBorderColor
            },
            markPoint: {
              label: {
                formatter: function (param) {
                  return param != null ? Math.round(param.value) + '' : '';
                }
              },
              data: [
                {
                  name: 'Mark',
                  // coord: ['2013/5/31', 2300],
                  // value: 2300,
                  // itemStyle: {
                  //   color: 'rgb(41,60,85)'
                  // }
                },
                {
                  name: 'highest value',
                  type: 'max',
                  symbolSize: 35, // 设置标记点大小为5像素
                  symbol:'pin',
                  valueDim: 'highest',
                  itemStyle: {
                    color: 'rgb(41,60,85)'
                  }
                },
                {
                  name: 'lowest value',
                  type: 'min',
                  symbolSize: 35, // 设置标记点大小为5像素
                  symbol:'pin',
                  valueDim: 'lowest',
                  itemStyle: {
                    color: 'rgb(41,60,85)'
                  }
                },
                {
                  name: 'average value on close',
                  type: 'average',
                  symbolSize: 35, // 设置标记点大小为5像素
                  symbol:'pin',
                  valueDim: 'close',
                  itemStyle: {
                    color: 'rgb(41,60,85)'
                  }
                }
              ],
              tooltip: {
                formatter: function (param) {
                  return param.name + '<br>' + (param.data.coord || '');
                }
              }
            },
            markLine: {
              symbol: ['none', 'none'],
              data: [
                [
                  {
                    name: 'from lowest to highest',
                    type: 'min',
                    valueDim: 'lowest',
                    symbol: 'circle',
                    symbolSize: 10,
                    label: {
                      show: false
                    },
                    emphasis: {
                      label: {
                        show: false
                      }
                    }
                  },
                  {
                    type: 'max',
                    valueDim: 'highest',
                    symbol: 'circle',
                    symbolSize: 10,
                    label: {
                      show: false
                    },
                    emphasis: {
                      label: {
                        show: false
                      }
                    }
                  }
                ],
                {
                  name: 'min line on close',
                  type: 'min',
                  valueDim: 'close'
                },
                {
                  name: 'max line on close',
                  type: 'max',
                  valueDim: 'close'
                }
              ]
            }
          },
          {
            name: 'MA5',
            type: 'line',
            data: this.calculateMA(5, data0),
            smooth: true,
            lineStyle: {
              opacity: 0.5
            }
          },
          {
            name: 'MA10',
            type: 'line',
            data: this.calculateMA(10, data0),
            smooth: true,
            lineStyle: {
              opacity: 0.5
            }
          },
          {
            name: 'MA20',
            type: 'line',
            data: this.calculateMA(20, data0),
            smooth: true,
            lineStyle: {
              opacity: 0.5
            }
          },
          {
            name: 'MA30',
            type: 'line',
            data: this.calculateMA(30, data0),
            smooth: true,
            lineStyle: {
              opacity: 0.5
            }
          }
        ]
      };

      myChart2.setOption(option2);
    },



    splitData(rawData) {
      const categoryData = [];
      const values = [];
      for (let i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].tradeDate); // 提取时间戳
        values.push([
          rawData[i].open, // 开盘价
          rawData[i].close, // 收盘价
          rawData[i].low, // 最低价
          rawData[i].high // 最高价
        ]);
      }
      return {
        categoryData: categoryData,
        values: values
      };
    },


    //计算移动平均
    calculateMA(dayCount, data) {
      var result = [];
      for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-');
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += +data.values[i - j][1];
        }
        result.push(sum / dayCount);
      }
      return result;
    },
  }
};
</script>

<style scoped>

/**{*/
/*  padding: 0;*/
/*  margin:0;*/
/*}*/
.container {
  display: flex;
}

.left-block {
  flex: 80%;
}

.right-block {
  flex: 20%;
}

.vertical-layout {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
}

.section {
  padding: 0;
  margin: 0;
}

.input-group h3 {
  margin-left: 20px;
  margin-right: 20px;
  /*margin-top: 15px;*/
}

.section p {
  margin-bottom: 0;
}

.section1 {
  height: 60px;
  /*background-color: blue;*/
}

.section2 {}

.section3 {
  margin-top: -10px;
}

.input-group {
  display: flex;
  margin-top: 10px;
  align-items: center;
}

.input-group > * {
  margin-right: 10px;
}

.right-section0{
  /* 在样式表中添加以下样式 */
  /*border: 1px solid #ccc;*/
  padding-bottom: 5px;
  padding-top: 5px;
  font-size: 25px;
  text-align: center;
  color:green;
  border-radius: 5px; /* 圆角半径为 5px */
  margin-bottom: 10px; /* 为了更好地分隔模块 */
  /*padding-top: -10px; !* 为了更好地分隔模块 *!*/
}

.right-section1{
  /* 在样式表中添加以下样式 */
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px; /* 圆角半径为 5px */
  margin-bottom: 10px; /* 为了更好地分隔模块 */
}


.right-section2{
  /* 在样式表中添加以下样式 */
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px; /* 圆角半径为 5px */
  margin-bottom: 10px; /* 为了更好地分隔模块 */
}

.right-section3{
  /* 在样式表中添加以下样式 */
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px; /* 圆角半径为 5px */
  margin-bottom: 10px; /* 为了更好地分隔模块 */
}

.right-section4{
  /* 在样式表中添加以下样式 */
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px; /* 圆角半径为 5px */
  margin-bottom: 10px; /* 为了更好地分隔模块 */
}
</style>
