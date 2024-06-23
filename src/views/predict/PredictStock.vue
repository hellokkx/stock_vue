<template>
  <div class="container">
      <!-- 纵向布局 -->
      <div class="vertical-layout">
        <!-- 第一个部分 -->
        <div class="section section1">
          <div class="input-group">
            <h3>预测模块</h3>
            <el-input v-model="tsCode" placeholder="请输入代码tsCode" style="width: 230px;margin-right: 10px;"></el-input>
            <el-select v-model="model" placeholder="请选择预测模型" style="width: 230px;margin-right: 10px;">
              <el-option
                  v-for="item in modelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              ></el-option>
            </el-select>
<!--            <el-button type="success" @click="showBasicInfo">基本情况</el-button>-->
            <el-button type="primary" @click="predict">点击预测</el-button>
          </div>
        </div>

        <!-- 第二个部分 -->
        <div class="section section2">
          <div v-if="showLine" style="height: 500px;width: 900px;margin-left: 0px;text-align: center">
            <h1 style="margin-top: 100px">欢迎使用理财大师预测模块</h1>
          </div>
          <div v-if="showKLine" id="chart-container2" style="height: 500px;width: 900px;margin-left: 40px"></div>
        </div>
      </div>

  </div>
</template>

<script>
import * as echarts from 'echarts'
import {getStockDataBySymbol, predictStockData} from "@/api"

export default {
  data() {
    return {
      showLine:true,
      showKLine:false,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      tsCode: '',
      model: '',
      modelOptions: [
        { label: 'DSFormer', value: 'DSFormer' },
        { label: 'itransformer', value: 'itransformer' },
        { label: 'patchTST', value: 'patchTST' }
      ],
      response: []
      // 存储后台返回的数据
    };
  },
  methods: {

    //点击预测按钮
    predict() {
      // 进行预测的逻辑
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

      //请求数据
      var ts_code=this.tsCode
      var alg=this.model
      predictStockData({ts_code,alg}).then(res=> {
        console.log(res)
        if (res.code === 200) {
          const rawData=res.response
          console.log(rawData)

          //处理数据da
          const data0 = this.splitData(rawData);
          const option2 = {
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
                start: 40,
                end: 70,
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

        }
      }).catch(err => {
        console.log(err);
        this.$message.error(err.data);
      });
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

.input-group {
  display: flex;
  margin-top: 10px;
  align-items: center;
}

.input-group > * {
  margin-right: 10px;
}

</style>
