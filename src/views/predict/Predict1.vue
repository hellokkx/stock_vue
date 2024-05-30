<template>
  <div class="container">
    <!-- 左边占 70% -->
    <div class="left-block">
      <!-- 纵向布局 -->
      <div class="vertical-layout">
        <!-- 第一个部分 -->
        <div class="section section1">
          <div class="input-group">
            <h3>预测模块</h3>
            <el-input v-model="symbol" placeholder="请输入代码" style="width: 230px;margin-right: 10px;"></el-input>
            <el-select v-model="model" placeholder="选择模型" style="width: 230px;margin-right: 10px;">
              <el-option
                  v-for="item in modelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              ></el-option>
            </el-select>
            <el-button type="success" @click="showBasicInfo">基本情况</el-button>
            <el-button type="primary" @click="predict">点击预测</el-button>
          </div>
        </div>

        <!-- 第二个部分 -->
        <div class="section section2">
          <div v-if="showLine" id="chart-container" style="height: 350px;"></div>
          <div v-if="showKLine" id="chart-container2" style="height: 350px;"></div>
        </div>
        <!-- 第三个部分 -->
        <div class="section section3">
          <h2>Section 3</h2>
          <p>This is the third section</p>
        </div>
      </div>
    </div>
    <!-- 右边占 30% -->
    <div class="right-block">
      <!-- 纵向布局 -->
      <div class="vertical-layout">

        <!-- 第0个部分 -->
        <div class="section right-section0">
          <p><strong>建议减持</strong></p>
        </div>

        <!-- 第一个部分 -->
        <div class="section right-section1">
          <p><strong>资金综合评价：</strong>资金强度低</p>
          <p><strong>资金综合评价：</strong>资金强度低</p>
        </div>

        <!-- 第二个部分 -->
        <div class="section right-section2">
          <p><strong>资金综合评价：</strong>资金强度低</p>
          <p><strong>资金综合评价：</strong>资金强度低</p>
        </div>

        <!-- 第三个部分 -->
        <div class="section right-section3">
          <p><strong>资金综合评价：</strong>资金强度低</p>
          <p><strong>资金综合评价：</strong>资金强度低</p>

        </div>

        <!-- 第四个部分 -->
        <div class="section right-section4">
          <p><strong>资金综合评价：</strong>资金强度低</p>
          <p><strong>资金综合评价：</strong>资金强度低</p>

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
      symbol: '',
      model: '',
      modelOptions: [
        { label: '模型1', value: 'model1' },
        { label: '模型2', value: 'model2' },
        { label: '模型3', value: 'model3' }
      ],
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
          // 获取横坐标数据
          const xAxisData = res.response.map(item => item.tradeDate);
          // 获取系列数据
          const seriesData = res.response.map(item => [
            item.open, // 开盘价
            item.close, // 收盘价
            item.low, // 最低价
            item.high // 最高价
          ]);

          // 配置折线图的选项
          const option = {
            title: {
              text: '原始数据'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['Open', 'High', 'Low', 'Close']
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
              end: 50,
              top:'93%',
              height:15,
            }, {
              type: 'slider',
              show: true,
              start: 0,
              end: 50,
              top:'93%',
              height:15,
            }],
            series: [
              {
                name: 'Open',
                type: 'line',
                data: seriesData.map(item => item[0])
              },
              {
                name: 'Close',
                type: 'line',
                data: seriesData.map(item => item[1])
              },
              {
                name: 'Low',
                type: 'line',
                data: seriesData.map(item => item[2])
              },
              {
                name: 'High',
                type: 'line',
                data: seriesData.map(item => item[3])
              }
            ]

          };

          // 使用配置项渲染折线图
          myChart.setOption(option);
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
      const rawData=[]
      const data0 = this.splitData(rawData);

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
            height: 15 // 设置滑动条高度为20像素
          },
          {
            show: true,
            type: 'slider',
            top: '92%',
            start: 0,
            end: 20,
            height: 15 // 设置滑动条高度为20像素
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

<style>
*{
  padding: 0;
  margin:0;
}
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

.section3 {}

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
  border: 1px solid #ccc;
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
